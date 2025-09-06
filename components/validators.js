const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

function checkNodeVersion() {
  const currentVersion = process.version;
  const requiredVersion = '20.0.0';
  
  const current = parseVersion(currentVersion.slice(1)); // Remove 'v' prefix
  const required = parseVersion(requiredVersion);
  
  if (compareVersions(current, required) < 0) {
    console.error(chalk.red.bold('❌ Node.js version error'));
    console.error(chalk.red(`Current version: ${currentVersion}`));
    console.error(chalk.red(`Required version: >= v${requiredVersion}`));
    console.error(chalk.yellow('Please update Node.js to continue.'));
    process.exit(1);
  }
}

function parseVersion(version) {
  return version.split('.').map(Number);
}

function compareVersions(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const aPart = a[i] || 0;
    const bPart = b[i] || 0;
    
    if (aPart > bPart) return 1;
    if (aPart < bPart) return -1;
  }
  return 0;
}

function validateProjectName(name) {
  if (!name || typeof name !== 'string') {
    return 'Project name is required';
  }
  
  if (name.length < 1) {
    return 'Project name cannot be empty';
  }
  
  if (name.length > 214) {
    return 'Project name cannot exceed 214 characters';
  }
  
  if (!/^[a-z0-9-_]+$/i.test(name)) {
    return 'Project name can only contain letters, numbers, hyphens, and underscores';
  }
  
  if (/^[.-]/.test(name)) {
    return 'Project name cannot start with a dot or hyphen';
  }
  
  if (/[.-]$/.test(name)) {
    return 'Project name cannot end with a dot or hyphen';
  }
  
  // Check for reserved names
  const reservedNames = [
    'node_modules', '.git', '.env', 'package.json', 'dist', 'build',
    'src', 'public', 'assets', 'components', 'pages', 'layouts',
    'middleware', 'plugins', 'utils', 'server', 'static'
  ];
  
  if (reservedNames.includes(name.toLowerCase())) {
    return `"${name}" is a reserved name and cannot be used`;
  }
  
  // Check if directory already exists
  const projectPath = path.resolve(name);
  if (fs.existsSync(projectPath)) {
    return `Directory "${name}" already exists`;
  }
  
  return true;
}

function validatePort(port) {
  const portNum = parseInt(port, 10);
  
  if (isNaN(portNum)) {
    return 'Port must be a number';
  }
  
  if (portNum < 1 || portNum > 65535) {
    return 'Port must be between 1 and 65535';
  }
  
  return true;
}

function validateApiUrl(url) {
  if (!url) return true; // Optional field
  
  try {
    new URL(url);
    return true;
  } catch {
    return 'Please enter a valid URL (e.g., http://localhost:3001)';
  }
}

function validateNonEmpty(value, fieldName) {
  if (!value || value.trim().length === 0) {
    return `${fieldName} cannot be empty`;
  }
  return true;
}

function validatePositiveNumber(value, fieldName) {
  const num = parseInt(value, 10);
  
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  
  if (num < 1) {
    return `${fieldName} must be a positive number`;
  }
  
  return true;
}

module.exports = {
  checkNodeVersion,
  validateProjectName,
  validatePort,
  validateApiUrl,
  validateNonEmpty,
  validatePositiveNumber
};