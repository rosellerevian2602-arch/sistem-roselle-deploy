import { db } from '@/lib/db'

async function seedData() {
  try {
    // Create sample suppliers
    const supplier1 = await db.supplier.create({
      data: {
        kode: 'SUP001',
        nama: 'PT. Maju Jaya Abadi',
        alamat: 'Jl. Industri No. 123, Jakarta',
        telepon: '021-1234567',
        email: 'info@majujaya.com'
      }
    })

    const supplier2 = await db.supplier.create({
      data: {
        kode: 'SUP002',
        nama: 'CV. Sentosa Makmur',
        alamat: 'Jl. Pabrik No. 456, Surabaya',
        telepon: '031-7654321',
        email: 'sales@sentosa.com'
      }
    })

    // Create sample barang
    const barang1 = await db.barang.create({
      data: {
        kode: 'BRG001',
        nama: 'Bahan Baku Type A',
        deskripsi: 'Bahan baku utama untuk produksi',
        harga: 50000,
        stok: 100,
        satuan: 'kg',
        supplierId: supplier1.id
      }
    })

    const barang2 = await db.barang.create({
      data: {
        kode: 'BRG002',
        nama: 'Bahan Baku Type B',
        deskripsi: 'Bahan baku pendukung produksi',
        harga: 75000,
        stok: 50,
        satuan: 'kg',
        supplierId: supplier1.id
      }
    })

    const barang3 = await db.barang.create({
      data: {
        kode: 'BRG003',
        nama: 'Kemasan Plastik',
        deskripsi: 'Kemasan untuk produk jadi',
        harga: 2000,
        stok: 500,
        satuan: 'pcs',
        supplierId: supplier2.id
      }
    })

    // Create sample PPBB
    await db.permintaanPembelian.create({
      data: {
        nomor: 'PPBB-2024-001',
        departemen: 'PRODUKSI',
        pemohon: 'Budi Santoso',
        barangId: barang1.id,
        kuantitas: 20,
        kebutuhan: 'Untuk produksi batch #123',
        status: 'PENDING'
      }
    })

    await db.permintaanPembelian.create({
      data: {
        nomor: 'PPBB-2024-002',
        departemen: 'PRODUKSI',
        pemohon: 'Siti Nurhaliza',
        barangId: barang2.id,
        kuantitas: 15,
        kebutuhan: 'Stok cadangan untuk bulan depan',
        status: 'APPROVED',
        approvedBy: 'Manager Produksi',
        approvedAt: new Date()
      }
    })

    // Create sample SOPB
    const pembelian1 = await db.pembelian.create({
      data: {
        nomor: 'SOPB-2024-001',
        supplierId: supplier1.id,
        totalHarga: 1500000,
        catatan: 'Pengiriman diharapkan secepatnya',
        status: 'DRAFT',
        detailPembelian: {
          create: [
            {
              barangId: barang1.id,
              kuantitas: 20,
              hargaSatuan: 50000,
              totalHarga: 1000000
            },
            {
              barangId: barang2.id,
              kuantitas: 10,
              hargaSatuan: 75000,
              totalHarga: 750000
            }
          ]
        }
      }
    })

    console.log('Sample data created successfully!')
    console.log('Suppliers:', await db.supplier.count())
    console.log('Barang:', await db.barang.count())
    console.log('PPBB:', await db.permintaanPembelian.count())
    console.log('SOPB:', await db.pembelian.count())

  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seedData()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))