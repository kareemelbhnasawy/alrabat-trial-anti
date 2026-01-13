import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsPath = path.resolve(__dirname, "../src/data/projects.json");
const projectsContent = fs.readFileSync(projectsPath, "utf-8");
const projects = JSON.parse(projectsContent);

const updatedProjects = projects.map((p) => {
  if (p.gallery && Array.isArray(p.gallery)) {
    // Check if it's already objects or strings
    const isStringArray =
      p.gallery.length > 0 && typeof p.gallery[0] === "string";

    if (isStringArray) {
      p.gallery = p.gallery.map((url) => ({
        url: url,
        divisionSlug:
          p.divisionSlugs && p.divisionSlugs.length > 0
            ? p.divisionSlugs[0]
            : "",
        caption: "",
      }));
    }
  }
  return p;
});

fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 4));
console.log("Migrated projects.json gallery structure.");
