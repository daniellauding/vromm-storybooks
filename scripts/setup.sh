#!/bin/bash

# Vromm Design System Setup Script
echo "🚀 Setting up Vromm Design System..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 pnpm not found. Installing pnpm..."
    npm install -g pnpm
fi

# Clean any existing node_modules and lock files
echo "🧹 Cleaning existing installations..."
rm -rf node_modules
rm -rf examples/*/node_modules
rm -rf pnpm-lock.yaml

# Install dependencies for the main project only first
echo "📦 Installing main dependencies..."
pnpm install --ignore-workspace

# Build the design system
echo "🔨 Building the design system..."
pnpm run build

# Now install workspace dependencies
echo "📦 Installing workspace dependencies..."
pnpm install

# Start Storybook for development
echo "📚 Starting Storybook..."
echo "🌐 Storybook will be available at http://localhost:6006"
echo ""
echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  pnpm run storybook       - Start Storybook development server"
echo "  pnpm run build           - Build the library for production"
echo "  pnpm run build-storybook - Build Storybook for deployment"
echo "  pnpm run lint            - Lint the codebase"
echo "  pnpm run type-check      - Type check the codebase"
echo ""

pnpm run storybook 