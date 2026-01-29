import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CSV_PATH = path.join(__dirname, "../data/projects.csv");

function parseCSVLine(line) {
  const chars = line.split("");
  const fields = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === '"') {
      if (inQuotes && chars[i + 1] === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      fields.push(currentField);
      currentField = "";
    } else {
      currentField += char;
    }
  }
  fields.push(currentField);
  return fields.map((f) => f.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));
}

async function importProjects() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found at ${CSV_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  if (lines.length < 2) {
    console.error("CSV file is empty or has no data rows");
    process.exit(1);
  }

  // Parse headers
  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  console.log("Headers:", headers);

  // Helper to get value case-insensitively
  const getValue = (values, colName) => {
    const idx = headers.findIndex(
      (h) => h.toLowerCase() === colName.toLowerCase(),
    );
    if (idx === -1) return undefined;
    return values[idx];
  };

  let successCount = 0;
  let errorCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    while (values.length < headers.length) values.push("");

    const title = getValue(values, "Project Name");
    if (!title) continue;

    try {
      const rawSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const divisionRaw = getValue(values, "Responsible Division") || "";
      let divisionSlugs = [];
      if (divisionRaw.includes("Infrastructure"))
        divisionSlugs.push("infrastructure");
      if (divisionRaw.includes("Soil")) divisionSlugs.push("soil-improvement");
      if (divisionRaw.includes("Enabling")) divisionSlugs.push("enabling");
      if (divisionRaw.includes("Marine")) divisionSlugs.push("marine");

      const dateAwarded = getValue(values, "Date Project Awarded");
      let year = new Date().getFullYear().toString();
      if (dateAwarded) {
        const parts = dateAwarded.split("/");
        if (parts.length === 3) year = parts[2];
      }

      const projectType = getValue(values, "Project Type") || "";
      const scope = projectType
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const tags = [...scope];
      const description = getValue(values, "Project Description") || title;

      const latStr = getValue(values, "Latitude");
      const lngStr = getValue(values, "Longitude");
      let coordinates = null;
      if (latStr && lngStr && latStr !== "-" && lngStr !== "-") {
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);
        if (!isNaN(lat) && !isNaN(lng)) {
          coordinates = { lat, lng };
        }
      }

      // Check existence
      const { data: existing, error: fetchError } = await supabase
        .from("projects")
        .select("id")
        .eq("slug", rawSlug)
        .maybeSingle();

      if (fetchError) {
        console.error(
          `Error checking duplicate for ${title}:`,
          fetchError.message,
        );
        errorCount++;
        continue;
      }

      let opError;
      if (existing) {
        // Update
        const projectData = {
          title: title,
          slug: rawSlug,
          divisionSlug: divisionSlugs[0] || "infrastructure", // Fix
          divisionSlugs: divisionSlugs,
          category: "Projects", // Default
          location: "Dubai, UAE",
          year: year,
          summary: description,
          scope: scope,
          challenges: [],
          solutions: [],
          tags: tags,
          heroImage: "/placeholder.jpg",
          gallery: [],
          metrics: {},
        };
        if (coordinates) projectData.coordinates = coordinates;

        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", existing.id);
        opError = error;
      } else {
        // Insert
        const projectData = {
          id: randomUUID(),
          title: title,
          slug: rawSlug,
          divisionSlug: divisionSlugs[0] || "infrastructure", // Fix
          divisionSlugs: divisionSlugs,
          category: "Projects",
          location: "Dubai, UAE",
          year: year,
          summary: description,
          scope: scope,
          challenges: [],
          solutions: [],
          tags: tags,
          heroImage: "/placeholder.jpg",
          gallery: [],
          metrics: {},
        };
        if (coordinates) projectData.coordinates = coordinates;

        const { error } = await supabase.from("projects").insert(projectData);
        opError = error;
      }

      if (opError) {
        console.error(`Error importing ${title}:`, opError.message);
        errorCount++;
      } else {
        console.log(`Imported: ${title} (${existing ? "Updated" : "Created"})`);
        successCount++;
      }
    } catch (err) {
      console.error(`Failed to process line ${i + 1}:`, err.message);
      errorCount++;
    }
  }

  console.log(`\nImport Summary:`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
}

importProjects();
