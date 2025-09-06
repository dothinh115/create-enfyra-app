#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const { checkNodeVersion } = require('./components/validators');
const { promptForConfiguration } = require('./components/prompts');
const { setupProject } = require('./components/project-setup');

const program = new Command();
const packageJson = require('./package.json');

// ASCII Art Banner
const banner = `
${chalk.cyan.bold('╔═══════════════════════════════════════╗')}
${chalk.cyan.bold('║')}  ${chalk.white.bold('🚀 Create Enfyra App')}                ${chalk.cyan.bold('║')}
${chalk.cyan.bold('║')}  ${chalk.gray('Frontend scaffolding made easy')}      ${chalk.cyan.bold('║')}
${chalk.cyan.bold('╚═══════════════════════════════════════╝')}
`;

async function main() {
  console.log(banner);
  
  try {
    // Check Node.js version
    checkNodeVersion();
    
    // Get project name from command line or prompt
    let projectName = program.args[0];
    
    if (!projectName) {
      const { name } = await require('inquirer').prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project name:',
          validate: (input) => {
            if (!input || input.trim().length === 0) {
              return 'Project name is required';
            }
            return true;
          }
        }
      ]);
      projectName = name;
    }

    // Validate project name and directory
    const projectPath = path.resolve(projectName);
    
    if (fs.existsSync(projectPath)) {
      console.log(chalk.red(`❌ Directory ${chalk.bold(projectName)} already exists!`));
      process.exit(1);
    }

    // Prompt for configuration
    console.log(chalk.blue('📋 Project Configuration\n'));
    const config = await promptForConfiguration(projectName);
    
    // Confirm configuration
    console.log(chalk.blue('\n📝 Configuration Summary:'));
    console.log(chalk.gray('─'.repeat(40)));
    console.log(`${chalk.white('Project Name:')} ${chalk.green(config.projectName)}`);
    console.log(`${chalk.white('Framework:')} ${chalk.green(config.framework)}`);
    console.log(`${chalk.white('Package Manager:')} ${chalk.green(config.packageManager)}`);
    console.log(`${chalk.white('API URL:')} ${chalk.green(config.apiUrl)}`);
    console.log(`${chalk.white('Port:')} ${chalk.green(config.port)}`);
    console.log(chalk.gray('─'.repeat(40)));
    
    const { confirm } = await require('inquirer').prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Proceed with project creation?',
        default: true
      }
    ]);

    if (!confirm) {
      console.log(chalk.yellow('⚠️  Project creation cancelled.'));
      process.exit(0);
    }

    // Setup project
    await setupProject(config, projectPath);
    
    // Success message
    console.log(chalk.green.bold('\n🎉 Project created successfully!'));
    console.log(chalk.blue('\n📝 Next steps:'));
    console.log(chalk.gray(`  cd ${projectName}`));
    console.log(chalk.gray(`  ${config.packageManager} run dev`));
    console.log();

  } catch (error) {
    console.error(chalk.red.bold('\n❌ Error creating project:'));
    console.error(chalk.red(error.message));
    
    if (error.stack && process.env.DEBUG) {
      console.error(chalk.gray(error.stack));
    }
    
    process.exit(1);
  }
}

// Program setup
program
  .name('create-enfyra-app')
  .description('Create a new Enfyra frontend application')
  .version(packageJson.version)
  .argument('[project-name]', 'Name of the project to create')
  .action(main);

program.parse();