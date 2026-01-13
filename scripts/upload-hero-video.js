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

const videoName = "20686633-uhd_3840_2160_30fps.mp4";
const videoPath = path.resolve(__dirname, `../assets/hero-image/${videoName}`);

async function uploadHeroVideo() {
  console.log("Reading video from:", videoPath);

  if (!fs.existsSync(videoPath)) {
    console.error("Video file not found!");
    return;
  }

  const fileBuffer = fs.readFileSync(videoPath);
  const targetPath = "media/videos/hero-main.mp4";

  console.log(`Uploading to ${targetPath}...`);
  const { data, error } = await supabase.storage
    .from("media")
    .upload(targetPath, fileBuffer, {
      contentType: "video/mp4",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading video:", error.message);
    return;
  }

  const { data: publicData } = supabase.storage
    .from("media")
    .getPublicUrl(targetPath);

  console.log(`✅ Uploaded successfully!`);
  console.log(`URL: ${publicData.publicUrl}`);
}

uploadHeroVideo();
