# কৃষি বিতান - Krishi Bitan E-Commerce

একটি সম্পূর্ণ ই-কমার্স ওয়েবসাইট যা Next.js এবং PostgreSQL দিয়ে তৈরি।

A complete e-commerce website built with Next.js and PostgreSQL.

---

## 🚀 দ্রুত ডিপ্লয় (Vercel - Recommended)

### ধাপ ১: Vercel এ প্রজেক্ট ইম্পোর্ট

1. https://vercel.com এ যান এবং Sign up / Login করুন
2. **"Add New Project"** ক্লিক করুন
3. **"Import Git Repository"** সিলেক্ট করুন
4. GitHub repository paste করুন:
   ```
   https://github.com/raihanetx/glowing-octo-couscous
   ```

### ধাপ ২: Environment Variables সেট করুন

Vercel এ **"Environment Variables"** সেকশনে যান এবং দুটি ভেরিয়েবল যোগ করুন:

| Name | Value | কোথায় পাবেন |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Neon.tech থেকে (নিচে দেখুন) |
| `SESSION_SECRET` | যেকোনো ৩২+ অক্ষর | নিচের উদাহরণ থেকে |

**SESSION_SECRET উদাহরণ:**
```
krishi-bitan-secret-key-2024-production-super-secure
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0-xyz
my-awesome-ecommerce-secret-session-key-minimum-32
```

### ধাপ ৩: Deploy করুন

1. **"Deploy"** বাটন ক্লিক করুন
2. ২-৩ মিনিট অপেক্ষা করুন
3. Deploy হয়ে গেলে আপনার সাইট URL পাবেন

### ধাপ ৪: ডাটাবেস সেটআপ

1. আপনার সাইট URL এ যান + `/setup`
   ```
   https://your-site.vercel.app/setup
   ```
2. **"ডাটাবেস ইনিশিয়ালাইজ করুন"** বাটন ক্লিক করুন
3. হয়ে গেছে! 🎉

---

## 🗄️ ডাটাবেস সেটআপ (Neon - ফ্রি)

### Neon.tech এ ডাটাবেস তৈরি:

1. https://neon.tech এ যান
2. **"Sign up"** করুন (GitHub দিয়ে সহজ)
3. **"Create a project"** ক্লিক করুন
4. Project name দিন: `krishi-bitan`
5. Region সিলেক্ট করুন: `Singapore (ap-southeast-1)` বা কাছাকাছি
6. **"Create project"** ক্লিক করুন
7. **Connection string** কপি করুন:
   ```
   postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
8. এই string টি Vercel এ `DATABASE_URL` হিসেবে বসান

---

## ✅ ক্রেডেনশিয়াল (প্রথম লগইন)

Setup পেজ থেকে ডাটাবেস ইনিশিয়ালাইজ করার পর:

| Item | Value |
|------|-------|
| **Admin URL** | `https://your-site.vercel.app/admin` |
| **Email** | `admin@krishibitan.com` |
| **Password** | `admin123` |

⚠️ **প্রথম লগইনের পর পাসওয়ার্ড পরিবর্তন করুন!**

---

## 📋 সব ধাপ এক নজরে

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOYMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ১. Neon.tech এ ফ্রি ডাটাবেস তৈরি করুন                      │
│     ↓                                                       │
│  ২. Vercel এ GitHub repo import করুন                       │
│     ↓                                                       │
│  ৩. Environment Variables সেট করুন:                         │
│     - DATABASE_URL (Neon থেকে কপি)                          │
│     - SESSION_SECRET (৩২+ অক্ষর)                            │
│     ↓                                                       │
│  ৪. Deploy ক্লিক করুন                                       │
│     ↓                                                       │
│  ৫. /setup পেজে যান                                         │
│     ↓                                                       │
│  ৬. "ডাটাবেস ইনিশিয়ালাইজ করুন" ক্লিক করুন                   │
│     ↓                                                       │
│  ৭. /admin এ গিয়ে লগইন করুন                                │
│                                                             │
│                    ✅ সম্পন্ন!                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 ফিচার সমূহ

| Category | Features |
|----------|----------|
| **Products** | ✅ Add/Edit/Delete, Variants, Images, FAQs, Related Products |
| **Categories** | ✅ Icon/Image support, Status management |
| **Orders** | ✅ Status tracking, Customer details, Courier integration |
| **Customers** | ✅ Order history, Contact info |
| **Coupons** | ✅ Percentage/Fixed, Category-specific, Expiry |
| **Analytics** | ✅ Sales, Views, Abandoned carts |
| **Settings** | ✅ Logo, Hero images, Delivery charges, Contact info |
| **Localization** | ✅ বাংলা (Bengali) language support |
| **Payment** | ✅ Cash on Delivery (COD) |

---

## 🔧 Environment Variables

```env
# REQUIRED - Database connection
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# REQUIRED - Session secret (32+ characters)
SESSION_SECRET=your-secret-key-at-least-32-characters-long
```

---

## 📞 সাহায্য

সমস্যা হলে চেক করুন:

1. ✅ `DATABASE_URL` ঠিক আছে কিনা
2. ✅ `SESSION_SECRET` ৩২+ অক্ষর কিনা
3. ✅ Neon database active আছে কিনা
4. ✅ Vercel redeploy করুন

---

## 🌐 Demo

- **Shop**: `https://your-site.vercel.app`
- **Admin**: `https://your-site.vercel.app/admin`
- **Setup**: `https://your-site.vercel.app/setup`

---

**Made with ❤️ for Krishi Bitan E-Commerce**
