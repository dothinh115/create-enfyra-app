# Create Enfyra App

🚀 **CLI Tool for Creating Enfyra Frontend Applications with Nuxt 3**

Create Enfyra App is a command-line interface tool that quickly scaffolds new Enfyra frontend projects using Nuxt 3 framework with pre-configured settings and integrations.

## Quick Start

```bash
# Using npx (recommended)
npx @enfyra/create-enfyra-app my-app

# Using npm init
npm init @enfyra/enfyra-app my-app

# Using yarn
yarn create @enfyra/enfyra-app my-app

# Using pnpm
pnpm create @enfyra/enfyra-app my-app

# Using bun
bun create @enfyra/enfyra-app my-app

# Or install globally
npm install -g @enfyra/create-enfyra-app
create-enfyra-app my-app
```

## Features

### 🎯 Interactive Setup
- Automatic package manager detection (npm, yarn, pnpm, bun)
- Project name configuration
- API base URL configuration
- Development server port selection

### 🛠 Automated Project Setup
- Clones the official [Enfyra App template](https://github.com/dothinh115/enfyra_app)
- Updates package.json with project name
- Configures Nuxt with API endpoints
- Generates environment variables (.env file)
- Installs dependencies automatically
- Initializes Git repository with initial commit

### 📦 Pre-configured Stack
The generated project includes:
- **Nuxt 3** - Modern Vue.js framework
- **@enfyra/sdk-nuxt** - Enfyra SDK integration
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Auto-imports** - Components and composables

## Requirements

- **Node.js** >= 20.0.0
- **Git** (for template cloning)
- Package manager with minimum versions:
  - npm >= 8.0.0
  - yarn >= 1.22.0
  - pnpm >= 7.0.0
  - bun >= 1.0.0

## Usage

### Basic Command
```bash
create-enfyra-app [project-name]
```

If no project name is provided, the CLI will prompt you for one.

### Options
```bash
create-enfyra-app --help     # Show help
create-enfyra-app --version  # Show version
```

### Configuration Prompts

During setup, you'll be asked for:

1. **Project name** (if not provided as argument)
2. **Package manager** - Choose from detected managers
3. **API base URL** - Your backend API endpoint (e.g., `http://localhost:3001`)
4. **Development port** - Port for the dev server (default: 3000)

## Generated Project Structure

```
my-app/
├── .env                  # Environment variables
├── .gitignore           
├── nuxt.config.ts       # Nuxt configuration
├── package.json         
├── tsconfig.json        
├── app.vue              # Root component
├── components/          # Vue components
├── composables/         # Vue composables
├── layouts/             # App layouts
├── pages/               # App pages
├── plugins/             # Nuxt plugins
├── public/              # Static assets
└── server/              # Server API routes
```

## Environment Variables

The generated `.env` file includes:

```env
# Application
NODE_ENV=development
PORT=3000

# API Configuration
API_URL=http://localhost:3001
API_BASE_URL=http://localhost:3001

# Nuxt Configuration
NUXT_PORT=3000
NUXT_HOST=localhost

# Security Keys (auto-generated)
JWT_SECRET=...
SESSION_SECRET=...
COOKIE_SECRET=...
```

## Post-Installation

After creating your project:

```bash
# Navigate to project
cd my-app

# Start development server
npm run dev       # or yarn dev, pnpm dev, bun dev

# Build for production
npm run build     # or yarn build, pnpm build, bun build

# Preview production build
npm run preview   # or yarn preview, pnpm preview, bun preview
```

## Development

### Local Development
```bash
git clone https://github.com/dothinh115/create-enfyra-app.git
cd create-enfyra-app
npm install
npm link

# Test the CLI locally
create-enfyra-app test-project
```

### Project Files
- `index.js` - Main CLI entry point
- `components/prompts.js` - User prompts configuration
- `components/project-setup.js` - Project scaffolding logic
- `components/validators.js` - Input validation functions
- `components/env-builder.js` - Environment file generator

## Troubleshooting

### Common Issues

1. **"No compatible package managers found"**
   - Install or update npm/yarn/pnpm/bun to meet minimum version requirements

2. **"Directory already exists"**
   - Choose a different project name or remove the existing directory

3. **Git clone fails**
   - Ensure Git is installed and you have internet connection
   - Check if you can access https://github.com

4. **Dependency installation fails**
   - Check your package manager is working correctly
   - Clear package manager cache and try again

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 [Issues](https://github.com/dothinh115/create-enfyra-app/issues)
- 📧 [Email](mailto:dothinh115@gmail.com)

## Related Projects

- [Enfyra App Template](https://github.com/dothinh115/enfyra_app) - The Nuxt 3 template used by this CLI
- [Enfyra BE](https://github.com/dothinh115/enfyra_be) - Backend framework
- [Create Enfyra BE](https://github.com/dothinh115/create-enfyra-be) - Backend scaffolding tool

---

Created by dothinh115