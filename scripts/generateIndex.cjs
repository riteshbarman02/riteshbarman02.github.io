// scripts/generateIndex.cjs

const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '../public/content/project');
const outputFile = path.join(projectDir, 'index.json');

// Get all .md files, excluding index.json itself
const mdFiles = fs.readdirSync(projectDir)
  .filter(file => file.endsWith('.md'));

fs.writeFileSync(outputFile, JSON.stringify(mdFiles, null, 2));
console.log('✅ index.json generated with', mdFiles.length, 'files.');
