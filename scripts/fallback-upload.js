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
  const fallbackBuckets = ["avatars", "images", "static", "common", "files"];

  for (const bucket of fallbackBuckets) {
    console.log(`Trying upload to '${bucket}'...`);
    const filePath = path.resolve(process.cwd(), "public/new-hero.mp4");
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = "hero-v2.mp4";

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileBuffer, {
        contentType: "video/mp4",
        upsert: true,
      });

    if (!error) {
      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
      console.log(
        `SUCCESS! Uploaded to '${bucket}'. URL: ${publicUrlData.publicUrl}`,
      );
      process.exit(0);
    } else {
      console.log(`Failed '${bucket}': ${error.message}`);
    }
  }
  console.log("All fallbacks failed.");
}

run();
