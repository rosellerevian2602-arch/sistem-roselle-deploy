import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const pembelian = await db.pembelian.findMany({
      include: {
        supplier: {
          select: {
            kode: true,
            nama: true,
            alamat: true
          }
        },
        detailPembelian: {
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
            detailPembelian: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(pembelian)
  } catch (error) {
    console.error('Error fetching SOPB:', error)
    return NextResponse.json(
      { error: 'Failed to fetch SOPB data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { supplierId, catatan, items } = body

    // Generate nomor SOPB
    const count = await db.pembelian.count()
    const nomor = `SOPB-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`

    // Calculate total harga
    const totalHarga = items.reduce((sum: number, item: any) => {
      return sum + (item.kuantitas * item.hargaSatuan)
    }, 0)

    // Create pembelian with details
    const pembelian = await db.pembelian.create({
      data: {
        nomor,
        supplierId,
        totalHarga,
        catatan,
        status: 'DRAFT',
        detailPembelian: {
          create: items.map((item: any) => ({
            barangId: item.barangId,
            kuantitas: item.kuantitas,
            hargaSatuan: item.hargaSatuan,
            totalHarga: item.kuantitas * item.hargaSatuan
          }))
        }
      },
      include: {
        supplier: true,
        detailPembelian: {
          include: {
            barang: true
          }
        }
      }
    })

    return NextResponse.json(pembelian, { status: 201 })
  } catch (error) {
    console.error('Error creating SOPB:', error)
    return NextResponse.json(
      { error: 'Failed to create SOPB' },
      { status: 500 }
    )
  }
}