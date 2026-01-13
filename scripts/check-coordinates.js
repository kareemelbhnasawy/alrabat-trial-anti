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

async function checkCoordinates() {
  console.log("Checking Supabase projects...");
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, coordinates")
    .limit(5);

  if (error) {
    console.error("Error fetching projects:", error);
    return;
  }

  console.log("Projects found:", data.length);
  data.forEach((p) => {
    console.log(`[${p.title}] Coordinates:`, JSON.stringify(p.coordinates));
  });
}

checkCoordinates();
