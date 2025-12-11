import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const suratJalan = await db.suratJalan.findMany({
      include: {
        pembelian: {
          include: {
            supplier: {
              select: {
                kode: true,
                nama: true
              }
            }
          }
        },
        detailPenerimaan: {
          include: {
            barang: {
              select: {
                kode: true,
                nama: true,
                satuan: true
              }
            }
          }
        },
        _count: {
          select: {
            detailPenerimaan: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(suratJalan)
  } catch (error) {
    console.error('Error fetching Surat Jalan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Surat Jalan data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pembelianId, pengirim, items } = body

    // Generate nomor Surat Jalan
    const count = await db.suratJalan.count()
    const nomor = `SJ-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`

    // Create surat jalan with details
    const suratJalan = await db.suratJalan.create({
      data: {
        nomor,
        pembelianId,
        pengirim,
        status: 'SENT',
        detailPenerimaan: {
          create: items.map((item: any) => ({
            barangId: item.barangId,
            kuantitasDikirim: item.kuantitasDikirim,
            kuantitasDiterima: item.kuantitasDiterima || 0,
            keterangan: item.keterangan
          }))
        }
      },
      include: {
        pembelian: {
          include: {
            supplier: true
          }
        },
        detailPenerimaan: {
          include: {
            barang: true
          }
        }
      }
    })

    return NextResponse.json(suratJalan, { status: 201 })
  } catch (error) {
    console.error('Error creating Surat Jalan:', error)
    return NextResponse.json(
      { error: 'Failed to create Surat Jalan' },
      { status: 500 }
    )
  }
}