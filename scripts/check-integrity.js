const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const requiredFiles = [
  "package.json",
  "index.html",
  "src/main.js",
  "public/build/potree/potree.js",
  "public/build/potree/potree.css",
  "public/build/potree/sidebar.html",
  "node_modules/vite/package.json",
];

const errors = [];

function checkFile(relativePath, options = {}) {
  const filePath = path.join(rootDir, relativePath);

  if (!fs.existsSync(filePath)) {
    errors.push(`Missing: ${relativePath}`);
    return;
  }

  const stats = fs.statSync(filePath);

  if (options.nonEmpty && stats.size === 0) {
    errors.push(`Empty file: ${relativePath}`);
  }
}

for (const file of requiredFiles) {
  checkFile(file, { nonEmpty: true });
}

try {
  require.resolve("vite");
} catch (error) {
  errors.push(`Dependency resolution failed for vite: ${error.message}`);
}

const packageJsonPath = path.join(rootDir, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const scripts = packageJson.scripts || {};

if (scripts.dev !== "vite") {
  errors.push('Unexpected "dev" script in package.json');
}

if (scripts.build !== "vite build") {
  errors.push('Unexpected "build" script in package.json');
}

if (scripts.start !== "vite") {
  errors.push('Unexpected "start" script in package.json');
}

if (scripts.preview !== "vite preview") {
  errors.push('Unexpected "preview" script in package.json');
}

if (scripts.check !== "node scripts/check-integrity.js") {
  errors.push('Unexpected "check" script in package.json');
}

if (errors.length > 0) {
  console.error("Integrity check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Integrity check passed.");
