import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Try to load env from .env file if possible, or just use process.env if the runner handles it.
// Since we are in a node environment, we might need to manually parse .env or rely on the user having set it.
// Assuming the environment variables are available or I can read them from the file.

// I will read the .env file locally.
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

if (!supabaseUrl || !supabaseKey) {
  console.log("Could not find Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
  console.log("Checking storage buckets...");
  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Error listing buckets:", error);
    return;
  }

  if (!buckets || buckets.length === 0) {
    console.log("No buckets found.");
    return;
  }

  console.log(
    "Buckets:",
    buckets.map((b) => b.name),
  );

  for (const bucket of buckets) {
    console.log(`\nListing files in bucket: ${bucket.name}`);
    const { data: files, error: filesError } = await supabase.storage
      .from(bucket.name)
      .list();

    if (filesError) {
      console.error(`Error listing files in ${bucket.name}:`, filesError);
      continue;
    }

    if (files) {
      files.forEach((f) => {
        console.log(` - ${f.name}`);
        if (f.name.includes("hero") || f.name.endsWith(".mp4")) {
          const { data } = supabase.storage
            .from(bucket.name)
            .getPublicUrl(f.name);
          console.log(`   -> FOUND POTENTIAL HERO VIDEO: ${data.publicUrl}`);
        }
      });
    }
  }
}

checkStorage();
