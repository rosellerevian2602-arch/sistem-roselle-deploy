import { db } from '@/lib/db'

async function addMoreData() {
  try {
    // Update SOPB status to APPROVED
    await db.pembelian.update({
      where: { nomor: 'SOPB-2024-001' },
      data: { status: 'APPROVED' }
    })

    // Create another SOPB with APPROVED status
    const pembelian2 = await db.pembelian.create({
      data: {
        nomor: 'SOPB-2024-002',
        supplierId: (await db.supplier.findFirst({ where: { kode: 'SUP002' } }))!.id,
        totalHarga: 500000,
        catatan: 'Pesanan kemasan',
        status: 'APPROVED',
        detailPembelian: {
          create: [
            {
              barangId: (await db.barang.findFirst({ where: { kode: 'BRG003' } }))!.id,
              kuantitas: 250,
              hargaSatuan: 2000,
              totalHarga: 500000
            }
          ]
        }
      }
    })

    // Create sample Surat Jalan
    await db.suratJalan.create({
      data: {
        nomor: 'SJ-2024-001',
        pembelianId: pembelian2.id,
        pengirim: 'Kurir CV. Sentosa Makmur',
        status: 'RECEIVED',
        tanggalTerima: new Date(),
        detailPenerimaan: {
          create: [
            {
              barangId: (await db.barang.findFirst({ where: { kode: 'BRG003' } }))!.id,
              kuantitasDikirim: 250,
              kuantitasDiterima: 245,
              keterangan: '5 pcs rusak'
            }
          ]
        }
      }
    })

    // Create sample Faktur
    await db.faktur.create({
      data: {
        nomor: 'F-2024-001',
        pembelianId: pembelian2.id,
        jumlahTagihan: 500000,
        tanggalJatuhTempo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: 'UNPAID',
        catatan: 'Pembayaran tempo 30 hari'
      }
    })

    console.log('Additional data created successfully!')
    console.log('Updated SOPB and SJ/Faktur data')

  } catch (error) {
    console.error('Error adding more data:', error)
  }
}

addMoreData()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))