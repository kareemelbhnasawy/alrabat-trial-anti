import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load env
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

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Checking 'videos' bucket...");
  const fileName = "hero-v2.mp4";
  const filePath = path.resolve(process.cwd(), "public/new-hero.mp4");

  if (!fs.existsSync(filePath)) {
    console.error("Video file not found locally!");
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(filePath);

  // Try direct upload to 'videos'
  const { data, error } = await supabase.storage
    .from("videos")
    .upload(fileName, fileBuffer, {
      contentType: "video/mp4",
      upsert: true,
    });

  if (error) {
    console.log(`Upload failed: ${error.message}`);
    // Try listing to confirm if bucket exists
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();
    if (listError) console.log(`List buckets failed: ${listError.message}`);
    else
      console.log(
        `Available buckets: ${buckets.map((b) => b.name).join(", ")}`,
      );

    if (error.message.includes("Bucket not found")) {
      console.log(
        "ACTION REQUIRED: Please create a public bucket named 'videos' in Supabase.",
      );
    }
  } else {
    // Success
    const { data: publicUrlData } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName);
    console.log(`SUCCESS: ${publicUrlData.publicUrl}`);
  }
}

run();
