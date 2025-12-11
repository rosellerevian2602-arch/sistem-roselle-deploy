import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const faktur = await db.faktur.findMany({
      include: {
        pembelian: {
          include: {
            supplier: {
              select: {
                kode: true,
                nama: true,
                alamat: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(faktur)
  } catch (error) {
    console.error('Error fetching Faktur:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Faktur data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pembelianId, jumlahTagihan, tanggalJatuhTempo, catatan } = body

    // Generate nomor Faktur
    const count = await db.faktur.count()
    const nomor = `F-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`

    // Create faktur
    const faktur = await db.faktur.create({
      data: {
        nomor,
        pembelianId,
        jumlahTagihan: parseFloat(jumlahTagihan),
        tanggalJatuhTempo: new Date(tanggalJatuhTempo),
        catatan,
        status: 'UNPAID'
      },
      include: {
        pembelian: {
          include: {
            supplier: true
          }
        }
      }
    })

    return NextResponse.json(faktur, { status: 201 })
  } catch (error) {
    console.error('Error creating Faktur:', error)
    return NextResponse.json(
      { error: 'Failed to create Faktur' },
      { status: 500 }
    )
  }
}