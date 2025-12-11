import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const pembelian = await db.pembelian.findMany({
      where: {
        status: {
          in: ['APPROVED', 'SENT']
        }
      },
      include: {
        supplier: {
          select: {
            kode: true,
            nama: true
          }
        },
        detailPembelian: {
          include: {
            barang: {
              select: {
                id: true,
                kode: true,
                nama: true,
                satuan: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(pembelian)
  } catch (error) {
    console.error('Error fetching pembelian:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pembelian data' },
      { status: 500 }
    )
  }
}