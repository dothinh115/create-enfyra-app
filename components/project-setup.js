const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { spawn } = require('child_process');
const { generateEnvFile } = require('./env-builder');

async function setupProject(config, projectPath) {
  const spinner = ora();
  
  try {
    // Create project directory
    spinner.start(chalk.blue('Creating project directory...'));
    await fs.ensureDir(projectPath);
    spinner.succeed(chalk.green('Project directory created'));

    // Clone template repository based on framework
    const templateRepo = getTemplateRepository(config.framework);
    spinner.start(chalk.blue(`Cloning ${config.framework} template...`));
    await cloneTemplate(templateRepo, projectPath);
    spinner.succeed(chalk.green('Template cloned successfully'));

    // Clean up git history
    spinner.start(chalk.blue('Cleaning up git history...'));
    await cleanupGitHistory(projectPath);
    spinner.succeed(chalk.green('Git history cleaned'));

    // Update package.json
    spinner.start(chalk.blue('Updating package.json...'));
    await updatePackageJson(projectPath, config);
    spinner.succeed(chalk.green('Package.json updated'));

    // Generate environment file
    spinner.start(chalk.blue('Generating environment configuration...'));
    await generateEnvFile(projectPath, config);
    spinner.succeed(chalk.green('Environment file created'));

    // Install dependencies
    spinner.start(chalk.blue(`Installing dependencies with ${config.packageManager}...`));
    await installDependencies(projectPath, config);
    spinner.succeed(chalk.green('Dependencies installed successfully'));

    // Initialize git repository
    spinner.start(chalk.blue('Initializing git repository...'));
    await initializeGit(projectPath);
    spinner.succeed(chalk.green('Git repository initialized'));

  } catch (error) {
    spinner.fail(chalk.red('Setup failed'));
    
    // Cleanup on failure
    if (fs.existsSync(projectPath)) {
      await fs.remove(projectPath);
    }
    
    throw error;
  }
}

function getTemplateRepository(framework) {
  const repositories = {
    'nuxt3': 'https://github.com/dothinh115/enfyra_app.git'
  };
  
  return repositories[framework] || repositories['nuxt3'];
}

async function cloneTemplate(repoUrl, projectPath) {
  return new Promise((resolve, reject) => {
    const gitClone = spawn('git', [
      'clone',
      '--depth', '1',
      repoUrl,
      projectPath
    ], {
      stdio: 'pipe'
    });

    let stderr = '';

    gitClone.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    gitClone.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Git clone failed: ${stderr}`));
      }
    });

    gitClone.on('error', (error) => {
      reject(new Error(`Git clone error: ${error.message}`));
    });
  });
}

async function cleanupGitHistory(projectPath) {
  const gitDir = path.join(projectPath, '.git');
  if (fs.existsSync(gitDir)) {
    await fs.remove(gitDir);
  }
}

async function updatePackageJson(projectPath, config) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('package.json not found in template');
  }
  
  const packageJson = await fs.readJson(packageJsonPath);
  
  // Update project name
  packageJson.name = config.projectName;
  
  // Update version
  packageJson.version = '0.1.0';
  
  // Clear repository info
  delete packageJson.repository;
  delete packageJson.bugs;
  delete packageJson.homepage;
  
  // Framework-specific updates
  if (config.framework === 'nuxt3') {
    // Add/remove Nuxt modules based on user selection
    if (config.modules && Array.isArray(config.modules)) {
      // This would need to be implemented based on the actual nuxt.config structure
    }
    
    // Update port in nuxt config if needed
    if (config.port !== 3000) {
      await updateNuxtPort(projectPath, config.port);
    }
  }
  
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

async function updateNuxtPort(projectPath, port) {
  const nuxtConfigPath = path.join(projectPath, 'nuxt.config.ts');
  
  if (fs.existsSync(nuxtConfigPath)) {
    let config = await fs.readFile(nuxtConfigPath, 'utf8');
    
    // Simple regex replacement - in a real implementation, you'd want to use an AST
    if (config.includes('devServer:')) {
      config = config.replace(
        /devServer:\s*{[^}]*port:\s*\d+[^}]*}/,
        `devServer: {\n    port: ${port}\n  }`
      );
    } else {
      // Add devServer config
      config = config.replace(
        /export default defineNuxtConfig\(\{/,
        `export default defineNuxtConfig({\n  devServer: {\n    port: ${port}\n  },`
      );
    }
    
    await fs.writeFile(nuxtConfigPath, config);
  }
}

async function installDependencies(projectPath, config) {
  return new Promise((resolve, reject) => {
    const commands = {
      npm: ['install'],
      yarn: ['install'],
      pnpm: ['install'],
      bun: ['install']
    };
    
    const args = commands[config.packageManager] || commands.npm;
    
    const install = spawn(config.packageManager, args, {
      cwd: projectPath,
      stdio: 'pipe'
    });
    
    let stderr = '';
    
    install.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    install.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Package installation failed: ${stderr}`));
      }
    });
    
    install.on('error', (error) => {
      reject(new Error(`Package manager error: ${error.message}`));
    });
  });
}

async function initializeGit(projectPath) {
  return new Promise((resolve, reject) => {
    const gitInit = spawn('git', ['init'], {
      cwd: projectPath,
      stdio: 'pipe'
    });
    
    gitInit.on('close', (code) => {
      if (code === 0) {
        // Add initial commit
        const gitAdd = spawn('git', ['add', '.'], {
          cwd: projectPath,
          stdio: 'pipe'
        });
        
        gitAdd.on('close', (addCode) => {
          if (addCode === 0) {
            const gitCommit = spawn('git', ['commit', '-m', 'Initial commit from create-enfyra-app'], {
              cwd: projectPath,
              stdio: 'pipe'
            });
            
            gitCommit.on('close', (commitCode) => {
              if (commitCode === 0) {
                resolve();
              } else {
                resolve(); // Don't fail the whole process for git commit issues
              }
            });
          } else {
            resolve(); // Don't fail for git add issues
          }
        });
      } else {
        resolve(); // Don't fail for git init issues
      }
    });
    
    gitInit.on('error', () => {
      resolve(); // Don't fail if git is not available
    });
  });
}

module.exports = {
  setupProject
};