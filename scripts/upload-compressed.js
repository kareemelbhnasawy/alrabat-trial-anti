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

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const fileName = "hero-v2.mp4"; // Keep same name as in code
  const filePath = path.resolve(process.cwd(), "public/hero-compressed.mp4");

  if (!fs.existsSync(filePath)) {
    console.error("Compressed video not found!");
    process.exit(1);
  }

  const stats = fs.statSync(filePath);
  console.log(
    `Uploading compressed video (${(stats.size / 1024 / 1024).toFixed(2)} MB) to 'videos/hero-v2.mp4'...`,
  );

  const fileBuffer = fs.readFileSync(filePath);

  const { data, error } = await supabase.storage
    .from("videos")
    .upload(fileName, fileBuffer, {
      contentType: "video/mp4",
      upsert: true,
    });

  if (error) {
    console.error(`Upload failed: ${error.message}`);
  } else {
    // Success
    const { data: publicUrlData } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName);
    console.log(`SUCCESS: ${publicUrlData.publicUrl}`);
  }
}

run();
