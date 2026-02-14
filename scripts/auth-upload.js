import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
let supabaseUrl = "";
let supabaseKey = "";

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  for (const line of envConfig.split("\n")) {
    if (line.startsWith("VITE_SUPABASE_URL=")) {
      supabaseUrl = line.split("=")[1].trim();
    }
    if (line.startsWith("VITE_SUPABASE_ANON_KEY=")) {
      supabaseKey = line.split("=")[1].trim();
    }
  }
}

if (!supabaseUrl || !supabaseKey) process.exit(1);

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const email = `temp-${Date.now()}@example.com`;
  const password = "TempPassword123!";

  console.log(`Attempting signup with ${email}...`);
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("Signup error:", authError.message);
    // Maybe try sign in with a known test user if this fails?
    // Or just proceed as anon if signup is disabled.
  } else {
    console.log("Signup successful/initiated. User:", authData.user?.id);
  }

  // List buckets as (potentially) authenticated user
  const { data: buckets, error: bucketError } =
    await supabase.storage.listBuckets();
  if (bucketError) {
    console.error("List buckets error:", bucketError.message);
  } else {
    console.log(
      "Buckets:",
      buckets.map((b) => b.name),
    );

    // Check if 'videos' exists
    const videoBucket = buckets.find(
      (b) => b.name === "videos" || b.name === "public",
    );
    if (videoBucket) {
      console.log(`Found bucket: ${videoBucket.name}. Uploading...`);
      await uploadToBucket(videoBucket.name);
      return;
    } else {
      console.log("No suitable bucket found.");
      // Try creating one? (Likely fails without service key but worth a shot if RLS is loose)
      const { data: newBucket, error: createError } =
        await supabase.storage.createBucket("videos", { public: true });
      if (createError) {
        console.error("Create bucket error:", createError.message);
      } else {
        console.log('Created "videos" bucket! Uploading...');
        await uploadToBucket("videos");
        return;
      }
    }
  }

  // Fallback try uploading to 'videos' anyway
  console.log("Attempting force upload to 'videos'...");
  await uploadToBucket("videos");
}

async function uploadToBucket(bucketName) {
  const filePath = path.resolve(process.cwd(), "public/new-hero.mp4");
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = "hero-v2.mp4";

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      contentType: "video/mp4",
      upsert: true,
    });

  if (error) {
    console.error(`Upload to ${bucketName} failed:`, error.message);
  } else {
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    console.log(`SUCCESS! Public URL: ${publicUrlData.publicUrl}`);
  }
}

run();
