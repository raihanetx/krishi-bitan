#!/bin/bash

# Post-install script - runs automatically after bun install
# This will push the database schema if .env exists

echo ""
echo "🔍 Checking database setup..."

# Skip on Vercel (read-only build environment)
if [ -n "$VERCEL" ]; then
    echo "ℹ️ Running on Vercel - skipping database setup."
else
    # Only run if .env exists
    if [ -f .env ]; then
        echo "🗄️ Setting up database schema..."
        bun run db:push 2>/dev/null || echo "ℹ️ Database already set up or connection pending"
    else
        echo "ℹ️ No .env file found. Run 'cp .env.example .env' and fill in your values."
    fi
fi

echo ""
