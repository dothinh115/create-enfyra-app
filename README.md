# Create Enfyra App

🚀 **The fastest way to create new Enfyra frontend applications**

Create Enfyra App is a CLI tool that instantly scaffolds new Enfyra frontend projects with all the essentials configured for you.

## ⚠️ Prerequisites

**Important:** You need to have an Enfyra backend running before creating your frontend application. The frontend will connect to your backend API.

📋 **Set up your backend first:**
```bash
npx @enfyra/create-enfyra-be my-backend
```

👉 **[Backend Setup Guide](https://www.npmjs.com/package/@enfyra/create-enfyra-be)** - Complete instructions for setting up your Enfyra backend

## Quick Start

```bash
# Using npx (recommended)
npx @enfyra/create-enfyra-app my-app

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

## What You Get

✅ **Nuxt 3** application ready to go  
✅ **Enfyra SDK** pre-configured  
✅ **TypeScript** support  
✅ **Tailwind CSS** styling  
✅ **Environment** variables setup  
✅ **Dependencies** installed automatically  

## Requirements

- **Node.js** 20.0.0 or higher
- **Package manager**: npm (8+), yarn (1.22+), pnpm (7+), or bun (1+)

## Usage

### Create a new project
```bash
npx @enfyra/create-enfyra-app my-project
```

### Interactive setup
The CLI will guide you through:
- Package manager selection
- API endpoint configuration  
- Development port setup

### Environment Variables
After project creation, you can modify the `.env` file at any time to configure:
- API endpoints
- Port

The `.env` file is automatically created and can be customized for your specific needs.

### Start developing
```bash
cd my-project
npm run dev
```

## After Installation

Your new Enfyra app is ready! Here's what to do next:

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Learn More

📖 **[Complete Documentation](https://github.com/dothinh115/enfyra-app#readme)** - Full guide to building with Enfyra  
🔧 **[API Reference](https://github.com/dothinh115/enfyra-app/blob/main/docs/API.md)** - Backend integration  
🎨 **[UI Components](https://github.com/dothinh115/enfyra-app/blob/main/docs/COMPONENTS.md)** - Pre-built components  
⚡ **[Best Practices](https://github.com/dothinh115/enfyra-app/blob/main/docs/BEST_PRACTICES.md)** - Development guidelines  

## Support

Having issues? We're here to help:

- 🐛 [Report bugs](https://github.com/dothinh115/create-enfyra-app/issues)
- 💬 [Ask questions](https://github.com/dothinh115/enfyra-app/discussions)
- 📧 [Email support](mailto:dothinh115@gmail.com)

## Related

- **[Enfyra App](https://github.com/dothinh115/enfyra-app)** - The frontend template
- **[Enfyra BE](https://github.com/dothinh115/enfyra_be)** - Backend framework
- **[Create Enfyra BE](https://github.com/dothinh115/create-enfyra-be)** - Backend CLI

---

Built by [dothinh115](https://github.com/dothinh115) • MIT License