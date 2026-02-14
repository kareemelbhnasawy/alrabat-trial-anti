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

async function diagnose() {
  console.log("--- DIAGNOSIS START ---");

  // 1. Check File Size
  const filePath = path.resolve(process.cwd(), "public/new-hero.mp4");
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(
      `File 'public/new-hero.mp4' exists. Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`,
    );
  } else {
    console.error("File 'public/new-hero.mp4' NOT FOUND.");
  }

  // 2. List Buckets
  console.log("Listing buckets...");
  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error(`Error listing buckets: ${error.message}`);
    if (error.status === 401 || error.status === 403) {
      console.log(
        "Likely permission issue (RLS). Ensure your anon key has access to list buckets or at least public read access.",
      );
    }
  } else {
    console.log(
      "Buckets found:",
      buckets.map((b) => `${b.name} (public: ${b.public})`),
    );
    const videoBucket = buckets.find((b) => b.name === "videos");
    if (videoBucket) {
      console.log("Bucket 'videos' EXISTS.");
    } else {
      console.error("Bucket 'videos' NOT FOUND.");
    }
  }

  console.log("--- DIAGNOSIS END ---");
}

diagnose();
