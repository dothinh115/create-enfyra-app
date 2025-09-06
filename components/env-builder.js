const fs = require('fs-extra');
const path = require('path');

async function generateEnvFile(projectPath, config) {
  const envContent = buildEnvContent(config);
  const envPath = path.join(projectPath, '.env');
  
  await fs.writeFile(envPath, envContent);
}

function buildEnvContent(config) {
  const lines = [
    `API_URL=${config.apiUrl}`,
    `PORT=${config.port}`
  ];

  return lines.join('\n');
}

module.exports = {
  generateEnvFile
};