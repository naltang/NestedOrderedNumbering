import { existsSync, readFileSync } from "node:fs";

const errors = [];
const required = [
  "README.md",
  "LICENSE",
  "manifest.json",
  "versions.json",
  "main.js",
  "styles.css",
];
for (const path of required) {
  if (!existsSync(path)) errors.push(`Missing required release file: ${path}`);
}

const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const versions = JSON.parse(readFileSync("versions.json", "utf8"));

if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) {
  errors.push("manifest.version must use x.y.z Semantic Versioning.");
}
if (manifest.version !== packageJson.version) {
  errors.push("package.json and manifest.json versions do not match.");
}
if (versions[manifest.version] !== manifest.minAppVersion) {
  errors.push("versions.json does not map the current plugin version to minAppVersion.");
}
if (!manifest.author || manifest.author.startsWith("TODO_")) {
  errors.push("Set the final public author in manifest.json.");
}
if (!packageJson.repository || !packageJson.bugs || !packageJson.homepage) {
  errors.push("Add repository, bugs, and homepage URLs to package.json.");
}
if (manifest.id.includes("obsidian")) {
  errors.push("The plugin id must not contain the word obsidian.");
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Release ${manifest.version} is ready.`);
