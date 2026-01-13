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
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY; // Using anon key, hope bucket allows public upload or sufficient perms
const supabase = createClient(supabaseUrl, supabaseKey);

const assetsDir = path.resolve(__dirname, "../assets/pdf-images");

async function uploadAssets() {
  console.log("Reading from:", assetsDir);
  const files = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".jpg"));

  console.log(`Found ${files.length} images to upload.`);
  const uploadedUrls = [];

  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const fileBuffer = fs.readFileSync(filePath);

    // Ensure unique name or overwrite if already exists
    const fileName = `demo-gallery/${file}`;

    console.log(`Uploading ${fileName}...`);
    const { data, error } = await supabase.storage
      .from("media")
      .upload(fileName, fileBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading ${file}:`, error.message);
    } else {
      const { data: publicData } = supabase.storage
        .from("media")
        .getPublicUrl(fileName);
      console.log(`✅ Uploaded: ${publicData.publicUrl}`);
      uploadedUrls.push(publicData.publicUrl);
    }
  }

  console.log("\n--- UPLOADED URLS ---");
  console.log(JSON.stringify(uploadedUrls, null, 2));
}

uploadAssets();
