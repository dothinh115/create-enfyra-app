#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const { checkNodeVersion } = require('./components/validators');
const { promptForConfiguration } = require('./components/prompts');
const { setupProject, detectPackageManagers } = require('./components/project-setup');

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
    
    // Detect available package managers
    const availableManagers = detectPackageManagers();
    
    if (availableManagers.length === 0) {
      console.log(chalk.red('❌ No compatible package managers found!'));
      console.log(chalk.yellow('Please install npm (v8+), yarn (v1.22+), pnpm (v7+), or bun (v1+)'));
      process.exit(1);
    }
    
    // Show detected package managers with versions
    console.log(chalk.gray('Detected package managers:'));
    availableManagers.forEach(pm => {
      console.log(chalk.gray(`  • ${pm.name} v${pm.version}`));
    });
    console.log('');
    
    // Get project name from command line or prompt
    let projectName = program.args[0];
    
    if (!projectName) {
      const { name } = await inquirer.prompt([
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
    const config = await promptForConfiguration(projectName, availableManagers);

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
    console.error(chalk.gray(error.stack));
    
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