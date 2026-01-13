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

async function checkData() {
  console.log("Checking Supabase data structure...");

  // Check Projects
  const { data: projData, error: projError } = await supabase
    .from("projects")
    .select("*")
    .limit(1);

  if (projData && projData.length > 0) {
    console.log("Sample Project Gallery:", JSON.stringify(projData[0].gallery));
    const keys = Object.keys(projData[0]);
    if (keys.includes("divisionSlugs"))
      console.log("✅ Projects: divisionSlugs exists");
    else console.log("❌ Projects: divisionSlugs MISSING");

    // Check if gallery is JSON (array of objects or strings)
    if (Array.isArray(projData[0].gallery)) {
      console.log("✅ Projects: gallery is Array");
    } else {
      console.log("⚠️ Projects: gallery is NOT Array or Mixed");
    }
  } else {
    console.log("⚠️ Projects: No data found");
  }

  // Check News
  const { data: newsData, error: newsError } = await supabase
    .from("news")
    .select("*")
    .limit(1);

  if (newsData && newsData.length > 0) {
    const keys = Object.keys(newsData[0]);
    if (keys.includes("gallery")) console.log("✅ News: gallery column exists");
    else console.log("❌ News: gallery column MISSING");
  } else {
    if (newsError) console.log("❌ News: Error fetching", newsError);
    else console.log("⚠️ News: No data found");
  }
}

checkData();
