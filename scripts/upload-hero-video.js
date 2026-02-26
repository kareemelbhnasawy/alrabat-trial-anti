import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load env variables manually as before
const envPath = path.resolve(process.cwd(), ".env");
let supabaseUrl = "";
let supabaseKey = ""; // Assuming service role key is needed for storage if RLS is strict, or anon key if public.
// Ideally use anon key if bucket is public.

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
  console.log("Missing Supabase credentials.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadVideo() {
  const sourceArg = process.argv[2] || "public/rabat.mp4";
  const targetArg = process.argv[3] || "hero-rabat.mp4";

  const filePath = path.resolve(process.cwd(), sourceArg);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${sourceArg} not found!`);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(filePath);
  const fileName = targetArg;
  const bucketName = "videos"; // Assuming a bucket named 'videos' exists. If not, try 'public' or 'assets'.

  // Trying to upload to 'videos' bucket first
  console.log(`Uploading ${fileName} to bucket '${bucketName}'...`);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      contentType: "video/mp4",
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error);
    // Try 'public' bucket as fallback
    console.log("Trying 'public' bucket...");
    const { data: data2, error: error2 } = await supabase.storage
      .from("public")
      .upload(fileName, fileBuffer, {
        contentType: "video/mp4",
        upsert: true,
      });

    if (error2) {
      console.error("Upload error (public):", error2);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("public")
      .getPublicUrl(fileName);

    console.log("Upload successful!");
    console.log("Public URL:", publicUrlData.publicUrl);
  } else {
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    console.log("Upload successful!");
    console.log("Public URL:", publicUrlData.publicUrl);
  }
}

uploadVideo();
