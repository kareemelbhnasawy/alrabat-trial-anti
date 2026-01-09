import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually
const envPath = path.resolve(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf-8");
const envConfig = {};
envContent.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    envConfig[key.trim()] = value.trim();
  }
});

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const FILE_PATH = path.resolve(__dirname, "../professional_construction.mp4");
const BUCKET_NAME = "media";
const DEST_PATH = "videos/construction-professional.mp4";

async function upload() {
  console.log("Uploading professional video...");
  const fileContent = fs.readFileSync(FILE_PATH);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(DEST_PATH, fileContent, {
      upsert: true,
      contentType: "video/mp4",
    });

  if (error) {
    console.error("Upload failed:", error);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(DEST_PATH);

  console.log("Upload successful!");
  console.log("Public URL:", publicUrl);
}

upload();
