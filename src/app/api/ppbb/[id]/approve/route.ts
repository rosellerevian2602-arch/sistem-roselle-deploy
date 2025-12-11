import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const updatedPPBB = await db.permintaanPembelian.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedBy: 'System Admin',
        approvedAt: new Date()
      }
    })

    return NextResponse.json(updatedPPBB)
  } catch (error) {
    console.error('Error approving PPBB:', error)
    return NextResponse.json(
      { error: 'Failed to approve PPBB' },
      { status: 500 }
    )
  }
}