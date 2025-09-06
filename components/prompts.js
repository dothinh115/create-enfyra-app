const inquirer = require('inquirer');
const { validateProjectName, validatePort, validateApiUrl } = require('./validators');

async function promptForConfiguration(initialProjectName) {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: initialProjectName,
      validate: validateProjectName
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Choose your framework:',
      choices: [
        {
          name: '🟢 Nuxt 3 (Vue.js framework with SSR)',
          value: 'nuxt3',
          short: 'Nuxt 3'
        }
      ],
      default: 'nuxt3'
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Package manager:',
      choices: [
        {
          name: '📦 npm (Node Package Manager)',
          value: 'npm',
          short: 'npm'
        },
        {
          name: '🧶 Yarn (Fast, reliable dependency management)',
          value: 'yarn',
          short: 'Yarn'
        },
        {
          name: '🚀 Bun (Ultra-fast JavaScript runtime)',
          value: 'bun',
          short: 'Bun'
        },
        {
          name: '⚡ pnpm (Performant npm)',
          value: 'pnpm',
          short: 'pnpm'
        }
      ],
      default: 'npm'
    },
    {
      type: 'input',
      name: 'apiUrl',
      message: 'API base URL:',
      default: 'http://localhost:3001',
      validate: validateApiUrl
    },
    {
      type: 'input',
      name: 'port',
      message: 'Development server port:',
      default: '3000',
      validate: validatePort,
      filter: (value) => parseInt(value, 10)
    }
  ];

  // Conditional questions based on framework choice
  const basicAnswers = await inquirer.prompt(questions);

  let additionalQuestions = [];

  // Framework-specific questions - only Nuxt 3 for now
  if (basicAnswers.framework === 'nuxt3') {
    additionalQuestions = [
      {
        type: 'list',
        name: 'renderMode',
        message: 'Rendering mode:',
        choices: [
          {
            name: '🔄 Universal (SSR + SPA)',
            value: 'universal',
            short: 'Universal'
          },
          {
            name: '📱 SPA (Single Page Application)',
            value: 'spa',
            short: 'SPA'
          }
        ],
        default: 'spa'
      }
    ];
  }

  let additionalAnswers = {};
  if (additionalQuestions.length > 0) {
    additionalAnswers = await inquirer.prompt(additionalQuestions);
  }

  return {
    ...basicAnswers,
    ...additionalAnswers
  };
}

module.exports = {
  promptForConfiguration
};