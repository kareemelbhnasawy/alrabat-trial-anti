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

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase credentials not found in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const ASSETS_DIR = path.resolve(__dirname, "../assets");
const BUCKET_NAME = "media";

async function uploadFile(filePath, relativePath) {
  const fileContent = fs.readFileSync(filePath);
  // Normalize path for bucket (forward slashes)
  const bucketPath = relativePath.split(path.sep).join("/");

  console.log(`Uploading ${bucketPath}...`);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(bucketPath, fileContent, {
      upsert: true,
      contentType: getContentType(filePath),
    });

  if (error) {
    console.error(`Error uploading ${bucketPath}:`, error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(bucketPath);

  return publicUrl;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

async function processDirectory(dir, baseDir) {
  const files = fs.readdirSync(dir);
  const mapping = {};

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subMapping = await processDirectory(fullPath, baseDir);
      Object.assign(mapping, subMapping);
    } else {
      const relativePath = path.relative(baseDir, fullPath);
      // Ignore .DS_Store or other hidden files
      if (file.startsWith(".")) continue;

      const publicUrl = await uploadFile(fullPath, relativePath);
      if (publicUrl) {
        // Key format matches how we import/reference them roughly
        // e.g., "assets/logos/file.png"
        const key = "assets/" + relativePath.split(path.sep).join("/");
        mapping[key] = publicUrl;
      }
    }
  }
  return mapping;
}

async function main() {
  try {
    console.log("Starting upload...");
    const mapping = await processDirectory(ASSETS_DIR, ASSETS_DIR);

    console.log("\n--- UPLOAD COMPLETE ---\n");
    console.log(JSON.stringify(mapping, null, 2));

    // Save mapping to a file for easy reference
    fs.writeFileSync(
      path.join(__dirname, "asset-mapping.json"),
      JSON.stringify(mapping, null, 2)
    );
    console.log("\nMapping saved to scripts/asset-mapping.json");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

main();
