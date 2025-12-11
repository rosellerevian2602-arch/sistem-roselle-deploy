'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Truck, 
  Calendar, 
  Users, 
  Package, 
  CheckCircle, 
  Clock,
  X,
  MessageSquare,
  User
} from 'lucide-react'

interface SuratJalan {
  id: string
  nomor: string
  tanggal: string
  status: string
  pengirim: string
  penerima?: string
  tanggalTerima?: string
  catatan?: string
  pembelian: {
    nomor: string
    supplier: {
      kode: string
      nama: string
    }
  }
  detailPenerimaan: {
    id: string
    barang: {
      kode: string
      nama: string
      satuan: string
    }
    kuantitasDikirim: number
    kuantitasDiterima: number
    keterangan?: string
  }[]
}

interface SuratJalanDetailProps {
  suratJalan: SuratJalan
  onClose: () => void
  onVerify?: (id: string) => void
}

export function SuratJalanDetail({ suratJalan, onClose, onVerify }: SuratJalanDetailProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="secondary">Draft</Badge>
      case 'SENT':
        return <Badge className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />Sent</Badge>
      case 'RECEIVED':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Received</Badge>
      case 'VERIFIED':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalDikirim = suratJalan.detailPenerimaan.reduce((sum, item) => sum + item.kuantitasDikirim, 0)
  const totalDiterima = suratJalan.detailPenerimaan.reduce((sum, item) => sum + item.kuantitasDiterima, 0)
  const selisih = totalDikirim - totalDiterima

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Detail Surat Jalan</h2>
          <p className="text-muted-foreground">Penerimaan Barang dari Supplier</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          Tutup
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Header Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-muted-foreground" />
                <div>
                  <CardTitle className="text-xl">{suratJalan.nomor}</CardTitle>
                  <CardDescription>
                    {getStatusBadge(suratJalan.status)}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Ref. SOPB</p>
                <p className="font-medium">{suratJalan.pembelian.nomor}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Shipping Information */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informasi Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pengirim:</span>
                <span className="font-medium">{suratJalan.pengirim}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Penerima:</span>
                <span className="font-medium">{suratJalan.penerima || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal Kirim:</span>
                <span className="font-medium">{new Date(suratJalan.tanggal).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal Terima:</span>
                <span className="font-medium">
                  {suratJalan.tanggalTerima ? new Date(suratJalan.tanggalTerima).toLocaleDateString('id-ID') : '-'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Informasi Supplier
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kode:</span>
                <span className="font-medium">{suratJalan.pembelian.supplier.kode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nama:</span>
                <span className="font-medium">{suratJalan.pembelian.supplier.nama}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Ringkasan Penerimaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Total Dikirim</p>
                <p className="text-2xl font-bold text-blue-700">{totalDikirim}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-1">Total Diterima</p>
                <p className="text-2xl font-bold text-green-700">{totalDiterima}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600 mb-1">Selisih</p>
                <p className="text-2xl font-bold text-red-700">{selisih}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detail Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Detail Barang Diterima
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Kode</th>
                    <th className="text-left py-2">Nama Barang</th>
                    <th className="text-center py-2">Qty Dikirim</th>
                    <th className="text-center py-2">Qty Diterima</th>
                    <th className="text-center py-2">Selisih</th>
                    <th className="text-left py-2">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {suratJalan.detailPenerimaan.map((detail) => {
                    const selisih = detail.kuantitasDikirim - detail.kuantitasDiterima
                    return (
                      <tr key={detail.id} className="border-b">
                        <td className="py-3">{detail.barang.kode}</td>
                        <td className="py-3">{detail.barang.nama}</td>
                        <td className="text-center py-3">{detail.kuantitasDikirim} {detail.barang.satuan}</td>
                        <td className="text-center py-3">{detail.kuantitasDiterima} {detail.barang.satuan}</td>
                        <td className="text-center py-3">
                          <span className={selisih > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                            {selisih > 0 ? '-' : ''}{selisih}
                          </span>
                        </td>
                        <td className="py-3">{detail.keterangan || '-'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {suratJalan.catatan && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Catatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground bg-muted p-3 rounded">{suratJalan.catatan}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-3">
              {suratJalan.status === 'RECEIVED' && (
                <Button 
                  variant="default" 
                  onClick={() => onVerify?.(suratJalan.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verifikasi Penerimaan
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}