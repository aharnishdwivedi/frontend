#!/bin/bash

# AI-Powered Incident Triage Assistant - React Frontend Setup Script

echo "🚀 Setting up AI-Powered Incident Triage Assistant - React Frontend"
echo "================================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    echo "Please upgrade Node.js to version 16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
# API Configuration
REACT_APP_API_URL=http://localhost:8080/api/v1

# Environment
REACT_APP_ENVIRONMENT=development
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Run tests to verify setup
echo "🧪 Running tests to verify setup..."
npm test -- --watchAll=false --passWithNoTests

if [ $? -ne 0 ]; then
    echo "⚠️  Some tests failed. This might be expected if the backend is not running."
    echo "   You can still start the development server."
else
    echo "✅ Tests passed"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start the Go backend server on http://localhost:8080"
echo "2. Run 'npm start' to start the React development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Available commands:"
echo "  npm start          - Start development server"
echo "  npm test           - Run unit tests"
echo "  npm run test:coverage - Run tests with coverage"
echo "  npm run test:e2e   - Run E2E tests"
echo "  npm run build      - Build for production"
echo ""
echo "Happy coding! 🚀"
