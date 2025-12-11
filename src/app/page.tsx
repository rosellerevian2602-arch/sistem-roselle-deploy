'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PPBBForm } from '@/components/forms/PPBBForm'
import { SOPBForm } from '@/components/forms/SOPBForm'
import { SuratJalanForm } from '@/components/forms/SuratJalanForm'
import { FakturForm } from '@/components/forms/FakturForm'
import { SupplierForm } from '@/components/forms/SupplierForm'
import { BarangForm } from '@/components/forms/BarangForm'
import { SupplierView } from '@/components/views/SupplierView'
import { BarangView } from '@/components/views/BarangView'
import { PPBBDetail } from '@/components/views/PPBBDetail'
import { SOPBDetail } from '@/components/views/SOPBDetail'
import { SuratJalanDetail } from '@/components/views/SuratJalanDetail'
import { FakturDetail } from '@/components/views/FakturDetail'
import { 
  ShoppingCart, 
  FileText, 
  Truck, 
  Receipt, 
  Package, 
  Users,
  PlusCircle,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

interface Supplier {
  id: string
  kode: string
  nama: string
}

interface Barang {
  id: string
  kode: string
  nama: string
  satuan: string
  harga: number
}

interface PermintaanPembelian {
  id: string
  nomor: string
  tanggal: string
  departemen: string
  pemohon: string
  kuantitas: number
  kebutuhan: string
  status: string
  barang: {
    kode: string
    nama: string
    satuan: string
  }
}

interface Pembelian {
  id: string
  nomor: string
  tanggal: string
  status: string
  totalHarga: number
  supplier: {
    kode: string
    nama: string
  }
  _count: {
    detailPembelian: number
  }
  detailPembelian?: {
    barang: {
      id: string
      kode: string
      nama: string
      satuan: string
    }
    kuantitas: number
  }[]
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showPPBBForm, setShowPPBBForm] = useState(false)
  const [showSOPBForm, setShowSOPBForm] = useState(false)
  const [showSuratJalanForm, setShowSuratJalanForm] = useState(false)
  const [showFakturForm, setShowFakturForm] = useState(false)
  const [showSupplierForm, setShowSupplierForm] = useState(false)
  const [showBarangForm, setShowBarangForm] = useState(false)
  const [showSupplierView, setShowSupplierView] = useState(false)
  const [showBarangView, setShowBarangView] = useState(false)
  const [selectedPPBB, setSelectedPPBB] = useState<PermintaanPembelian | null>(null)
  const [selectedSOPB, setSelectedSOPB] = useState<Pembelian | null>(null)
  const [selectedSuratJalan, setSelectedSuratJalan] = useState<any>(null)
  const [selectedFaktur, setSelectedFaktur] = useState<any>(null)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [barang, setBarang] = useState<Barang[]>([])
  const [ppbbList, setPpbbList] = useState<PermintaanPembelian[]>([])
  const [sopbList, setSopbList] = useState<Pembelian[]>([])
  const [suratJalanList, setSuratJalanList] = useState<any[]>([])
  const [fakturList, setFakturList] = useState<any[]>([])
  const [pembelianForSJ, setPembelianForSJ] = useState<Pembelian[]>([])
  const [pembelianForFaktur, setPembelianForFaktur] = useState<Pembelian[]>([])

  useEffect(() => {
    fetchSuppliers()
    fetchBarang()
    fetchPPBB()
    fetchSOPB()
    fetchSuratJalan()
    fetchFaktur()
    fetchPembelianForSJ()
    fetchPembelianForFaktur()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers')
      if (response.ok) {
        const data = await response.json()
        setSuppliers(data)
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error)
    }
  }

  const fetchBarang = async () => {
    try {
      const response = await fetch('/api/barang')
      if (response.ok) {
        const data = await response.json()
        setBarang(data)
      }
    } catch (error) {
      console.error('Error fetching barang:', error)
    }
  }

  const fetchPPBB = async () => {
    try {
      const response = await fetch('/api/ppbb')
      if (response.ok) {
        const data = await response.json()
        setPpbbList(data)
      }
    } catch (error) {
      console.error('Error fetching PPBB:', error)
    }
  }

  const fetchSOPB = async () => {
    try {
      const response = await fetch('/api/sopb')
      if (response.ok) {
        const data = await response.json()
        setSopbList(data)
      }
    } catch (error) {
      console.error('Error fetching SOPB:', error)
    }
  }

  const fetchPembelianForSJ = async () => {
    try {
      const response = await fetch('/api/pembelian')
      if (response.ok) {
        const data = await response.json()
        setPembelianForSJ(data)
      }
    } catch (error) {
      console.error('Error fetching pembelian for SJ:', error)
    }
  }

  const fetchPembelianForFaktur = async () => {
    try {
      const response = await fetch('/api/pembelian')
      if (response.ok) {
        const data = await response.json()
        setPembelianForFaktur(data)
      }
    } catch (error) {
      console.error('Error fetching pembelian for faktur:', error)
    }
  }

  const fetchSuratJalan = async () => {
    try {
      const response = await fetch('/api/surat-jalan')
      if (response.ok) {
        const data = await response.json()
        setSuratJalanList(data)
      }
    } catch (error) {
      console.error('Error fetching surat jalan:', error)
    }
  }

  const fetchFaktur = async () => {
    try {
      const response = await fetch('/api/faktur')
      if (response.ok) {
        const data = await response.json()
        setFakturList(data)
      }
    } catch (error) {
      console.error('Error fetching faktur:', error)
    }
  }

  const handlePPBBSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/ppbb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowPPBBForm(false)
        fetchPPBB()
        alert('PPBB berhasil dibuat!')
      } else {
        alert('Gagal membuat PPBB')
      }
    } catch (error) {
      console.error('Error creating PPBB:', error)
      alert('Terjadi kesalahan')
    }
  }

  const handleSOPBSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/sopb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowSOPBForm(false)
        fetchSOPB()
        fetchPembelianForSJ()
        fetchPembelianForFaktur()
        alert('SOPB berhasil dibuat!')
      } else {
        alert('Gagal membuat SOPB')
      }
    } catch (error) {
      console.error('Error creating SOPB:', error)
      alert('Terjadi kesalahan')
    }
  }

  const handleSuratJalanSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/surat-jalan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowSuratJalanForm(false)
        alert('Surat Jalan berhasil dibuat!')
      } else {
        alert('Gagal membuat Surat Jalan')
      }
    } catch (error) {
      console.error('Error creating Surat Jalan:', error)
      alert('Terjadi kesalahan')
    }
  }

  const handleFakturSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/faktur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowFakturForm(false)
        fetchFaktur()
        alert('Faktur berhasil dibuat!')
      } else {
        alert('Gagal membuat Faktur')
      }
    } catch (error) {
      console.error('Error creating Faktur:', error)
      alert('Terjadi kesalahan')
    }
  }

  const handleSupplierSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowSupplierForm(false)
        fetchSuppliers()
        alert('Supplier berhasil ditambahkan!')
      } else {
        const errorData = await response.json()
        alert(`Gagal menambahkan supplier: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating supplier:', error)
      alert('Terjadi kesalahan')
    }
  }

  const handleBarangSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/barang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowBarangForm(false)
        fetchBarang()
        alert('Barang berhasil ditambahkan!')
      } else {
        const errorData = await response.json()
        alert(`Gagal menambahkan barang: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating barang:', error)
      alert('Terjadi kesalahan')
    }
  }

  const handleApprovePPBB = async (id: string) => {
    try {
      const response = await fetch(`/api/ppbb/${id}/approve`, {
        method: 'PUT'
      })

      if (response.ok) {
        fetchPPBB()
        alert('PPBB berhasil disetujui!')
      } else {
        alert('Gagal menyetujui PPBB')
      }
    } catch (error) {
      console.error('Error approving PPBB:', error)
      alert('Terjadi kesalahan')
    }
  }

  const handleApproveSOPB = async (id: string) => {
    try {
      const response = await fetch(`/api/sopb/${id}/approve`, {
        method: 'PUT'
      })

      if (response.ok) {
        fetchSOPB()
        fetchPembelianForSJ()
        fetchPembelianForFaktur()
        alert('SOPB berhasil disetujui!')
      } else {
        alert('Gagal menyetujui SOPB')
      }
    } catch (error) {
      console.error('Error approving SOPB:', error)
      alert('Terjadi kesalahan')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'DRAFT':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case 'SENT':
        return <Badge className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />Sent</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sistem Pembelian Kredit Terintegrasi
          </h1>
          <p className="text-muted-foreground">
            Manajemen lengkap dari permintaan hingga pembayaran
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="ppbb">PPBB</TabsTrigger>
            <TabsTrigger value="sopb">SOPB</TabsTrigger>
            <TabsTrigger value="sj">Surat Jalan</TabsTrigger>
            <TabsTrigger value="faktur">Faktur</TabsTrigger>
            <TabsTrigger value="master">Master</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">PPBB Pending</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ppbbList.filter(p => p.status === 'PENDING').length}</div>
                  <p className="text-xs text-muted-foreground">
                    Menunggu persetujuan
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SOPB Aktif</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sopbList.filter(s => s.status !== 'COMPLETED').length}</div>
                  <p className="text-xs text-muted-foreground">
                    Pesanan pembelian
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{suppliers.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Supplier terdaftar
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Barang</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{barang.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Item tersedia
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>
                  Alur proses terkini dalam sistem pembelian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ppbbList.slice(0, 3).map((ppbb) => (
                    <div key={ppbb.id} className="flex items-center space-x-4">
                      <Badge variant="secondary">PPBB</Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{ppbb.nomor} - {ppbb.barang.nama}</p>
                        <p className="text-xs text-muted-foreground">Diajukan oleh {ppbb.pemohon} ({ppbb.departemen})</p>
                      </div>
                      {getStatusBadge(ppbb.status)}
                    </div>
                  ))}
                  
                  {sopbList.slice(0, 2).map((sopb) => (
                    <div key={sopb.id} className="flex items-center space-x-4">
                      <Badge variant="secondary">SOPB</Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{sopb.nomor} - {sopb.supplier.nama}</p>
                        <p className="text-xs text-muted-foreground">{sopb._count.detailPembelian} item - Total: Rp {sopb.totalHarga.toLocaleString('id-ID')}</p>
                      </div>
                      {getStatusBadge(sopb.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PPBB Module */}
          <TabsContent value="ppbb" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Permintaan Pembelian Bahan Baku</h2>
                <p className="text-muted-foreground">Kelola permintaan dari departemen produksi</p>
              </div>
              <Dialog open={showPPBBForm} onOpenChange={setShowPPBBForm}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Buat PPBB Baru
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Buat PPBB Baru</DialogTitle>
                    <DialogDescription>
                      Permintaan Pembelian Bahan Baku
                    </DialogDescription>
                  </DialogHeader>
                  <PPBBForm
                    onSubmit={handlePPBBSubmit}
                    onCancel={() => setShowPPBBForm(false)}
                    barangList={barang}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Permintaan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ppbbList.map((ppbb) => (
                      <div key={ppbb.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{ppbb.nomor}</p>
                          <p className="text-sm text-muted-foreground">{ppbb.barang.nama} - {ppbb.kuantitas} {ppbb.barang.satuan}</p>
                          <p className="text-xs text-muted-foreground">Diajukan: {ppbb.pemohon} ({ppbb.departemen}), {new Date(ppbb.tanggal).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(ppbb.status)}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedPPBB(ppbb)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Detail
                          </Button>
                        </div>
                      </div>
                    ))}
                    {ppbbList.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Belum ada data PPBB
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SOPB Module */}
          <TabsContent value="sopb" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Surat Order Pembelian Barang</h2>
                <p className="text-muted-foreground">Kelola pesanan pembelian ke supplier</p>
              </div>
              <Dialog open={showSOPBForm} onOpenChange={setShowSOPBForm}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Buat SOPB Baru
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl">
                  <DialogHeader>
                    <DialogTitle>Buat SOPB Baru</DialogTitle>
                    <DialogDescription>
                      Surat Order Pembelian Barang
                    </DialogDescription>
                  </DialogHeader>
                  <SOPBForm
                    onSubmit={handleSOPBSubmit}
                    onCancel={() => setShowSOPBForm(false)}
                    supplierList={suppliers}
                    barangList={barang}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Pesanan Pembelian</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sopbList.map((sopb) => (
                      <div key={sopb.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{sopb.nomor}</p>
                          <p className="text-sm text-muted-foreground">{sopb.supplier.nama} - {sopb._count.detailPembelian} item</p>
                          <p className="text-xs text-muted-foreground">Total: Rp {sopb.totalHarga.toLocaleString('id-ID')} - {new Date(sopb.tanggal).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(sopb.status)}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedSOPB(sopb)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Detail
                          </Button>
                        </div>
                      </div>
                    ))}
                    {sopbList.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Belum ada data SOPB
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Surat Jalan Module */}
          <TabsContent value="sj" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Surat Jalan</h2>
                <p className="text-muted-foreground">Kelola penerimaan barang dari supplier</p>
              </div>
              <Dialog open={showSuratJalanForm} onOpenChange={setShowSuratJalanForm}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Terima Barang
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl">
                  <DialogHeader>
                    <DialogTitle>Buat Surat Jalan Baru</DialogTitle>
                    <DialogDescription>
                      Penerimaan Barang dari Supplier
                    </DialogDescription>
                  </DialogHeader>
                  <SuratJalanForm
                    onSubmit={handleSuratJalanSubmit}
                    onCancel={() => setShowSuratJalanForm(false)}
                    pembelianList={pembelianForSJ}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Surat Jalan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Data Surat Jalan akan muncul di sini
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Faktur Module */}
          <TabsContent value="faktur" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Faktur Pembayaran</h2>
                <p className="text-muted-foreground">Kelola faktur dan proses pembayaran</p>
              </div>
              <Dialog open={showFakturForm} onOpenChange={setShowFakturForm}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Buat Faktur
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Buat Faktur Baru</DialogTitle>
                    <DialogDescription>
                      Faktur Pembayaran
                    </DialogDescription>
                  </DialogHeader>
                  <FakturForm
                    onSubmit={handleFakturSubmit}
                    onCancel={() => setShowFakturForm(false)}
                    pembelianList={pembelianForFaktur}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Faktur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Data Faktur akan muncul di sini
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Master Data */}
          <TabsContent value="master" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Data Master</h2>
              <p className="text-muted-foreground">Kelola data master supplier dan barang</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Data Supplier
                  </CardTitle>
                  <CardDescription>
                    Total {suppliers.length} supplier terdaftar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Dialog open={showSupplierForm} onOpenChange={setShowSupplierForm}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Tambah Supplier Baru
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Tambah Supplier Baru</DialogTitle>
                          <DialogDescription>
                            Masukkan informasi supplier baru
                          </DialogDescription>
                        </DialogHeader>
                        <SupplierForm
                          onSubmit={handleSupplierSubmit}
                          onCancel={() => setShowSupplierForm(false)}
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog open={showSupplierView} onOpenChange={setShowSupplierView}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Daftar Supplier
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                        <SupplierView
                          suppliers={suppliers}
                          onClose={() => setShowSupplierView(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Data Barang
                  </CardTitle>
                  <CardDescription>
                    Total {barang.length} barang tersedia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Dialog open={showBarangForm} onOpenChange={setShowBarangForm}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Tambah Barang Baru
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Tambah Barang Baru</DialogTitle>
                          <DialogDescription>
                            Masukkan informasi barang baru
                          </DialogDescription>
                        </DialogHeader>
                        <BarangForm
                          onSubmit={handleBarangSubmit}
                          onCancel={() => setShowBarangForm(false)}
                          supplierList={suppliers}
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog open={showBarangView} onOpenChange={setShowBarangView}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Katalog Barang
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                        <BarangView
                          barang={barang}
                          onClose={() => setShowBarangView(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Detail Dialogs */}
        <Dialog open={!!selectedPPBB} onOpenChange={() => setSelectedPPBB(null)}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            {selectedPPBB && (
              <PPBBDetail
                ppbb={selectedPPBB}
                onClose={() => setSelectedPPBB(null)}
                onApprove={handleApprovePPBB}
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedSOPB} onOpenChange={() => setSelectedSOPB(null)}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            {selectedSOPB && (
              <SOPBDetail
                sopb={selectedSOPB}
                onClose={() => setSelectedSOPB(null)}
                onApprove={handleApproveSOPB}
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedSuratJalan} onOpenChange={() => setSelectedSuratJalan(null)}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            {selectedSuratJalan && (
              <SuratJalanDetail
                suratJalan={selectedSuratJalan}
                onClose={() => setSelectedSuratJalan(null)}
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedFaktur} onOpenChange={() => setSelectedFaktur(null)}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            {selectedFaktur && (
              <FakturDetail
                faktur={selectedFaktur}
                onClose={() => setSelectedFaktur(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}