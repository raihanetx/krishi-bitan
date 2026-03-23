#!/bin/bash

# ============================================================
# কৃষি বিতান - অটো সেটআপ স্ক্রিপ্ট
# Krishi Bitan - Auto Setup Script
# ============================================================

echo "🚀 কৃষি বিতান সেটআপ শুরু হচ্ছে..."
echo "🚀 Starting Krishi Bitan Setup..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env ফাইল পাওয়া যায়নি!"
    echo "❌ .env file not found!"
    echo ""
    echo "📝 অনুগ্রহ করে .env.example ফাইলটি .env নামে কপি করুন"
    echo "📝 Please copy .env.example to .env and fill in the values"
    echo ""
    echo "কমান্ড (Command):"
    echo "  cp .env.example .env"
    echo ""
    exit 1
fi

echo "✅ .env ফাইল পাওয়া গেছে"
echo "✅ .env file found"
echo ""

# Install dependencies
echo "📦 ডিপেন্ডেন্সি ইনস্টল হচ্ছে..."
echo "📦 Installing dependencies..."
bun install
echo ""

# Push database schema
echo "🗄️ ডাটাবেস স্কিমা পুশ হচ্ছে..."
echo "🗄️ Pushing database schema..."
bun run db:push
echo ""

echo "✅ সেটআপ সম্পন্ন!"
echo "✅ Setup Complete!"
echo ""
echo "🌐 এখন রান করুন:"
echo "🌐 Now run:"
echo "  bun run dev"
echo ""
