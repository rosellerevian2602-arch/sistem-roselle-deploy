import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const updatedSOPB = await db.pembelian.update({
      where: { id },
      data: {
        status: 'APPROVED'
      }
    })

    return NextResponse.json(updatedSOPB)
  } catch (error) {
    console.error('Error approving SOPB:', error)
    return NextResponse.json(
      { error: 'Failed to approve SOPB' },
      { status: 500 }
    )
  }
}