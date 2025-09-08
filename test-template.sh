#!/bin/bash

# Quick template testing script
echo "🔄 Rebuilding template..."

# Stop containers
docker compose down

# Rebuild only the app service
docker compose up --build app -d

# Wait for app to start
echo "⏳ Waiting for app to start..."
sleep 10

# Check if app is running
if docker compose ps app | grep -q "Up"; then
    echo "✅ Template updated! Visit http://localhost:3000"
    echo "📝 Edit apps/artboard/src/templates/latex.tsx and run this script again"
else
    echo "❌ App failed to start. Check logs with: docker compose logs app"
fi
