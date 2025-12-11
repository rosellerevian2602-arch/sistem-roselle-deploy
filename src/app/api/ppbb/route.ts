import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const permintaan = await db.permintaanPembelian.findMany({
      include: {
        barang: {
          select: {
            kode: true,
            nama: true,
            satuan: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(permintaan)
  } catch (error) {
    console.error('Error fetching PPBB:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PPBB data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { departemen, pemohon, barangId, kuantitas, kebutuhan, catatan } = body

    // Generate nomor PPBB
    const count = await db.permintaanPembelian.count()
    const nomor = `PPBB-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`

    const permintaan = await db.permintaanPembelian.create({
      data: {
        nomor,
        departemen,
        pemohon,
        barangId,
        kuantitas: parseInt(kuantitas),
        kebutuhan,
        catatan,
        status: 'PENDING'
      },
      include: {
        barang: true
      }
    })

    return NextResponse.json(permintaan, { status: 201 })
  } catch (error) {
    console.error('Error creating PPBB:', error)
    return NextResponse.json(
      { error: 'Failed to create PPBB' },
      { status: 500 }
    )
  }
}