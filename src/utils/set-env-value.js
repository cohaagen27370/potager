const fs = require('fs');
const targetPath = 'src/environments/environment.ts';
const customValue = process.env.API_METEO_TOKEN || '';
fs.readFile(targetPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${targetPath}`, err);
    process.exit(1);
  }
  const updatedData = data.replace(/{{API_METEO_TOKEN}}/g, customValue);
  fs.writeFile(targetPath, updatedData, 'utf8', (err) => {
  if (err) {
    console.error(`Error writing file: ${targetPath}`, err);
    process.exit(1);
  }
  console.log(`Custom value set to: ${customValue}`);
  });
});
