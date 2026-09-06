#!/bin/bash

# AeroX Security Bot - Quick Deploy Script for Railway
# This script helps you deploy the bot to Railway in seconds

echo "🚀 AeroX Security Bot - Railway Deployment Guide"
echo "=================================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🔐 Preparing deployment..."
echo ""
echo "Before proceeding, make sure you have:"
echo "  ✓ DISCORD_TOKEN from Discord Developer Portal"
echo "  ✓ MONGODB_URL from MongoDB Atlas"
echo ""

# Option 1: GitHub Integration
echo "📝 OPTION 1: Using GitHub Integration (Recommended)"
echo "  1. Go to https://railway.app"
echo "  2. Create new project"
echo "  3. Select 'Deploy from GitHub'"
echo "  4. Connect repository"
echo "  5. Select 'slash-commands' branch"
echo "  6. Add environment variables in dashboard"
echo ""

# Option 2: Railway CLI
echo "📝 OPTION 2: Using Railway CLI"
echo "  Run these commands:"
echo ""
echo "  railway login"
echo "  railway init"
echo "  railway variables set DISCORD_TOKEN=<your_token>"
echo "  railway variables set MONGODB_URL=<your_mongodb_url>"
echo "  railway up"
echo ""

echo "✅ Deployment Information:"
echo "  Branch: slash-commands"
echo "  Start Command: node src/index.js"
echo "  Node Version: 16+ recommended"
echo "  Memory: 512MB minimum"
echo ""

echo "📚 Documentation:"
echo "  - RAILWAY_DEPLOY.md"
echo "  - SLASH_COMMANDS_GUIDE.md"
echo ""

echo "💡 After deployment:"
echo "  1. Bot will auto-register all slash commands"
echo "  2. Commands appear with '/'"
echo "  3. Check Railway logs for confirmation"
echo ""

echo "Need help? Check the docs or Railway dashboard logs"
