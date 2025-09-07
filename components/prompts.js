const inquirer = require('inquirer');
const { validateProjectName, validatePort, validateApiUrl } = require('./validators');

function getPrompts(availableManagers) {
  const questions = [
    {
      type: 'list',
      name: 'packageManager',
      message: 'Package manager:',
      choices: availableManagers.map(pm => ({
        name: `${getPackageManagerIcon(pm.name)} ${pm.name} (v${pm.version})`,
        value: pm.value,
        short: pm.name
      })),
      default: availableManagers.find(pm => pm.value === 'npm')?.value || availableManagers[0]?.value,
    },
    {
      type: 'input',
      name: 'apiUrl',
      message: 'API base URL (must include http:// or https://):',
      validate: validateApiUrl
    },
    {
      type: 'input',
      name: 'port',
      message: 'App port:',
      default: '3000',
      validate: validatePort,
      filter: (value) => parseInt(value, 10)
    }
  ];

  return questions;
}

function getPackageManagerIcon(name) {
  const icons = {
    npm: '📦',
    yarn: '🧶', 
    pnpm: '⚡',
    bun: '🚀'
  };
  return icons[name] || '📦';
}

async function promptForConfiguration(initialProjectName, availableManagers) {
  const prompts = getPrompts(availableManagers);
  const config = await inquirer.prompt(prompts);
  
  // Add project name to config
  config.projectName = initialProjectName;
  
  return config;
}

module.exports = {
  promptForConfiguration
};