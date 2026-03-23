import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { settings } from '@/db/schema'
import bcrypt from 'bcryptjs'

// ============================================
// AUTO INIT API - Setup database automatically
// ============================================
// GET /api/init - Check if initialized
// POST /api/init - Initialize database

export async function GET() {
  try {
    // Check if settings exist (indicates database is set up)
    const existingSettings = await db.select().from(settings).limit(1)
    
    if (existingSettings.length > 0) {
      return NextResponse.json({
        success: true,
        initialized: true,
        message: 'Database already initialized'
      })
    }
    
    return NextResponse.json({
      success: true,
      initialized: false,
      message: 'Database needs initialization'
    })
  } catch {
    // Database might not be set up yet
    return NextResponse.json({
      success: false,
      initialized: false,
      message: 'Database connection failed or tables not created'
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { 
      adminEmail = 'admin@krishibitan.com', 
      adminPassword = 'admin123',
      websiteName = 'Krishi Bitan',
      slogan = 'Fresh groceries delivered to your doorstep'
    } = body

    console.log('[INIT] Starting database initialization...')

    // Step 1: Create default settings with admin credentials
    console.log('[INIT] Creating default settings...')
    
    const existingSettings = await db.select().from(settings).limit(1)
    
    if (existingSettings.length === 0) {
      // Hash the admin password
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      await db.insert(settings).values({
        id: 1,
        websiteName,
        slogan,
        logoUrl: '',
        faviconUrl: '',
        heroImages: '[]',
        whatsappNumber: '',
        phoneNumber: '',
        facebookUrl: '',
        messengerUsername: '',
        insideDhakaDelivery: '60',
        outsideDhakaDelivery: '120',
        freeDeliveryMin: '500',
        universalDelivery: false,
        universalDeliveryCharge: '60',
        firstSectionName: 'Categories',
        firstSectionSlogan: '',
        secondSectionName: 'Offers',
        secondSectionSlogan: '',
        thirdSectionName: 'All Products',
        thirdSectionSlogan: '',
        // Admin credentials stored in settings
        adminUsername: adminEmail,
        adminPassword: hashedPassword,
      } as any)
      console.log('[INIT] Default settings and admin created')
    } else {
      console.log('[INIT] Settings already exist, skipping')
    }

    console.log('[INIT] Database initialization complete!')

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully!',
      data: {
        adminEmail,
        adminPassword,
        loginUrl: '/admin',
        note: 'Please change the admin password after first login!'
      }
    })

  } catch (error) {
    console.error('[INIT] Initialization failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Make sure DATABASE_URL is set correctly in environment variables'
    }, { status: 500 })
  }
}
