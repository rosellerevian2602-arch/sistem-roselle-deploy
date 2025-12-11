import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const barang = await db.barang.findMany({
      include: {
        supplier: {
          select: {
            kode: true,
            nama: true
          }
        }
      },
      orderBy: {
        nama: 'asc'
      }
    })

    return NextResponse.json(barang)
  } catch (error) {
    console.error('Error fetching barang:', error)
    return NextResponse.json(
      { error: 'Failed to fetch barang' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { kode, nama, deskripsi, harga, stok, satuan, supplierId } = body

    const barang = await db.barang.create({
      data: {
        kode,
        nama,
        deskripsi,
        harga: parseFloat(harga),
        stok: parseInt(stok),
        satuan,
        supplierId: supplierId && supplierId !== "no-supplier" ? supplierId : null
      },
      include: {
        supplier: true
      }
    })

    return NextResponse.json(barang, { status: 201 })
  } catch (error) {
    console.error('Error creating barang:', error)
    return NextResponse.json(
      { error: 'Failed to create barang', details: error.message },
      { status: 500 }
    )
  }
}