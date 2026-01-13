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

const projectsPath = path.resolve(__dirname, "../src/data/projects.json");

async function syncProjects() {
  console.log("Reading projects from:", projectsPath);
  const projectsRaw = fs.readFileSync(projectsPath, "utf-8");
  const projects = JSON.parse(projectsRaw);

  console.log(`Found ${projects.length} projects to sync.`);

  for (const project of projects) {
    console.log(`Syncing ${project.title}...`);

    // Exclude relatedSlugs as it's not in the DB schema
    const { relatedSlugs, ...rest } = project;

    // Prepare payload
    const payload = {
      ...rest,
      gallery: project.gallery || [],
      divisionSlug: project.divisionSlug || project.divisionSlugs?.[0] || "",
    };

    const { error } = await supabase
      .from("projects")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      console.error(`❌ Error syncing ${project.title}:`, error.message);
    } else {
      console.log(`✅ Synced: ${project.title}`);
    }
  }
  console.log("Sync complete.");
}

syncProjects();
