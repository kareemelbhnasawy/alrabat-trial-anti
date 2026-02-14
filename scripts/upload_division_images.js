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
const supabaseKey =
  envConfig.VITE_SUPABASE_SERVICE_ROLE_KEY || envConfig.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const IMAGES_DIR = path.resolve(__dirname, "../Images"); // Assuming Images is in root/Images as per list_dir earlier
const BUCKET_NAME = "media";

const IMAGE_MAPPING = [
  {
    local: "Image-01.jpg",
    remote: "division-heroes/specialized-engineering.jpg",
  },
  { local: "Image-08.jpg", remote: "division-heroes/foundations.jpg" },
  { local: "Image-06.jpg", remote: "division-heroes/ground-improvement.jpg" },
  { local: "Image-07.jpg", remote: "division-heroes/infrastructure.jpg" },
  { local: "Image-10.jpg", remote: "division-heroes/marine.jpg" },
  { local: "Image-12.jpg", remote: "division-heroes/equipment.jpg" },
];

async function uploadImages() {
  console.log("Starting upload process...");

  for (const { local, remote } of IMAGE_MAPPING) {
    const localPath = path.join(IMAGES_DIR, local);

    if (!fs.existsSync(localPath)) {
      console.error(`❌ File not found: ${localPath}`);
      continue;
    }

    console.log(`Uploading ${local} to ${remote}...`);
    const fileContent = fs.readFileSync(localPath);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(remote, fileContent, {
        upsert: true,
        contentType: "image/jpeg",
      });

    if (error) {
      console.error(`❌ Upload failed for ${local}:`, error.message);
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(remote);

      console.log(`✅ Upload successful: ${publicUrl}`);
    }
  }
  console.log("Upload process completed.");
}

uploadImages();
