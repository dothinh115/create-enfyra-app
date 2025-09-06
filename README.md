# Create Enfyra App

🚀 **Scaffolding tool for Enfyra frontend applications**

Create Enfyra App is a CLI tool that helps you quickly bootstrap new Enfyra frontend projects with your preferred framework and configuration.

## Quick Start

```bash
# Using npm
npm create @enfyra/enfyra-app my-app

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

## Supported Frameworks

- **🟢 Nuxt 3** - Vue.js framework with SSR/SPA support

*More frameworks coming soon: Vue 3, React + Vite, Vanilla + Vite*

## Features

### Interactive Configuration
- Framework selection with multiple options
- Package manager detection and selection
- Development server port configuration
- API base URL setup
- Framework-specific module selection

### Smart Setup
- Automatic template cloning based on framework choice
- Environment file generation with sensible defaults
- Package.json customization
- Git repository initialization
- Dependency installation with your preferred package manager

### Framework-Specific Options

#### Nuxt 3
- Rendering mode selection (Universal/SPA)
- Pre-configured with:
  - @nuxt/ui (UI components)
  - @nuxt/icon (Icon components)
  - @nuxtjs/tailwindcss (Tailwind CSS)
  - @enfyra/sdk-nuxt (Enfyra SDK)

## Requirements

- **Node.js** >= 20.0.0
- **Git** (for template cloning)
- One of: npm, yarn, pnpm, or bun

## Usage

### Basic Usage
```bash
# Direct usage
npx @enfyra/create-enfyra-app my-project

# Or if installed globally
create-enfyra-app my-project
```

### Options
```bash
create-enfyra-app --help
create-enfyra-app --version
```

## What's Included

When you create a new project, you get:

### 📁 Project Structure
- Well-organized directory structure
- Pre-configured build tools
- Development server setup
- Environment configuration

### 🔧 Development Tools
- Hot module replacement
- TypeScript support (where applicable)
- Linting and formatting
- Git hooks (if applicable)

### 🎨 Styling
- Tailwind CSS integration
- Component library setup
- Responsive design utilities

### 🔌 API Integration
- Enfyra SDK pre-configured
- Environment-based API URLs
- Authentication helpers
- CRUD operations ready

### 📝 Documentation
- README with setup instructions
- Code examples
- Best practices guide

## Environment Variables

The CLI generates a comprehensive `.env` file with:

```env
# Application Settings
NODE_ENV=development
PORT=3000

# API Configuration
API_URL=http://localhost:3001
API_BASE_URL=http://localhost:3001

# Framework-specific variables
NUXT_PORT=3000
NUXT_HOST=localhost
NUXT_SSR=true

# Security (auto-generated)
JWT_SECRET=...
SESSION_SECRET=...
```

## Examples

### Create a Nuxt 3 SPA
```bash
create-enfyra-app my-spa-app
# Select: Nuxt 3 -> SPA -> modules of choice
```

### Create a React App
```bash
create-enfyra-app my-react-app
# Select: React + Vite -> features of choice
```

### Create with Custom API URL
```bash
create-enfyra-app my-app
# During setup, specify your API URL: https://api.myproject.com
```

## Development

### Local Development
```bash
git clone https://github.com/enfyra/create-enfyra-app.git
cd create-enfyra-app
npm install
npm link
```

### Testing
```bash
npm test
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://docs.enfyra.com)
- 💬 [Discord Community](https://discord.gg/enfyra)
- 🐛 [Issues](https://github.com/enfyra/create-enfyra-app/issues)
- 📧 [Email Support](mailto:support@enfyra.com)

## Related Projects

- [Enfyra BE](https://github.com/dothinh115/enfyra_be) - Backend framework
- [Create Enfyra BE](https://github.com/dothinh115/create-enfyra-be) - Backend scaffolding tool
- [Enfyra SDK](https://github.com/enfyra/sdk) - JavaScript/TypeScript SDK

---

Made with ❤️ by the Enfyra Team