'use client'

import { useState, useEffect } from 'react'

export default function SetupPage() {
  const [status, setStatus] = useState<'checking' | 'needed' | 'initializing' | 'done' | 'error'>('checking')
  const [message, setMessage] = useState('')
  const [initData, setInitData] = useState<{
    adminEmail: string
    adminPassword: string
    loginUrl: string
  } | null>(null)

  // Check initialization status
  useEffect(() => {
    fetch('/api/init')
      .then(res => res.json())
      .then(data => {
        if (data.initialized) {
          setStatus('done')
          setMessage('Database is already initialized!')
        } else {
          setStatus('needed')
          setMessage('Database needs to be initialized')
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Failed to connect to database. Check your DATABASE_URL environment variable.')
      })
  }, [])

  // Initialize database
  const handleInitialize = async () => {
    setStatus('initializing')
    setMessage('Initializing database...')

    try {
      const res = await fetch('/api/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: 'admin@krishibitan.com',
          adminPassword: 'admin123',
          websiteName: 'Krishi Bitan',
          slogan: 'Fresh groceries delivered to your doorstep'
        })
      })

      const data = await res.json()

      if (data.success) {
        setStatus('done')
        setMessage('Database initialized successfully!')
        setInitData(data.data)
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to initialize database')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to connect to server')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
            <i className="ri-plant-line text-4xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 font-bangla">কৃষি বিতান</h1>
          <p className="text-gray-500 text-sm">Setup Wizard</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {status === 'checking' && (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-bangla">ডাটাবেস চেক হচ্ছে...</p>
            </div>
          )}

          {status === 'needed' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="ri-database-2-line text-3xl text-yellow-600"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 font-bangla">সেটআপ প্রয়োজন</h2>
              <p className="text-gray-500 mb-6 text-sm font-bangla">
                আপনার ডাটাবেস প্রস্তুত, এখন শুধু ইনিশিয়ালাইজ করতে হবে।
              </p>
              <button
                onClick={handleInitialize}
                className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors font-bangla"
              >
                ডাটাবেস ইনিশিয়ালাইজ করুন
              </button>
            </div>
          )}

          {status === 'initializing' && (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-bangla">ডাটাবেস সেটআপ হচ্ছে...</p>
              <p className="text-gray-400 text-sm mt-2">এটি কয়েক সেকেন্ড সময় নিতে পারে</p>
            </div>
          )}

          {status === 'done' && initData && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-3xl text-green-600"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 font-bangla">সেটআপ সম্পন্ন!</h2>
              <p className="text-gray-500 mb-6 text-sm font-bangla">
                আপনার ওয়েবসাইট প্রস্তুত। নিচের তথ্য দিয়ে লগইন করুন।
              </p>

              {/* Credentials */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Login Credentials</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Email:</span>
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded border">{initData.adminEmail}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Password:</span>
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded border">{initData.adminPassword}</span>
                  </div>
                </div>
              </div>

              <a
                href="/admin"
                className="block w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors font-bangla text-center"
              >
                অ্যাডমিন প্যানেলে যান
              </a>

              <p className="text-yellow-600 text-xs mt-4 font-bangla">
                ⚠️ অনুগ্রহ করে প্রথম লগইনের পর পাসওয়ার্ড পরিবর্তন করুন!
              </p>
            </div>
          )}

          {status === 'done' && !initData && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-3xl text-green-600"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 font-bangla">ডাটাবেস প্রস্তুত!</h2>
              <p className="text-gray-500 mb-6 text-sm font-bangla">
                আপনার ডাটাবেস ইতিমধ্যে সেটআপ করা আছে।
              </p>
              <a
                href="/admin"
                className="block w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors font-bangla text-center"
              >
                অ্যাডমিন প্যানেলে যান
              </a>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-error-warning-line text-3xl text-red-600"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 font-bangla">সমস্যা হয়েছে</h2>
              <p className="text-gray-500 mb-4 text-sm">{message}</p>
              <div className="bg-gray-50 rounded-xl p-4 text-left mb-4">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-2">সমাধান:</p>
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1 font-bangla">
                  <li>Vercel Dashboard এ যান</li>
                  <li>Settings → Environment Variables</li>
                  <li>DATABASE_URL ঠিক আছে কিনা চেক করুন</li>
                  <li>Redeploy করুন</li>
                </ol>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors font-bangla"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Krishi Bitan E-Commerce © 2024
        </p>
      </div>
    </div>
  )
}
