'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ShoppingCart, 
  Calendar, 
  Users, 
  Package, 
  DollarSign, 
  Truck,
  CheckCircle,
  X,
  MessageSquare
} from 'lucide-react'

interface Pembelian {
  id: string
  nomor: string
  tanggal: string
  status: string
  totalHarga: number
  catatan?: string
  supplier: {
    kode: string
    nama: string
    alamat: string
  }
  detailPembelian: {
    id: string
    barang: {
      kode: string
      nama: string
      satuan: string
    }
    kuantitas: number
    hargaSatuan: number
    totalHarga: number
  }[]
}

interface SOPBDetailProps {
  sopb: Pembelian
  onClose: () => void
  onApprove?: (id: string) => void
  onSend?: (id: string) => void
}

export function SOPBDetail({ sopb, onClose, onApprove, onSend }: SOPBDetailProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="secondary">Draft</Badge>
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'SENT':
        return <Badge className="bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />Sent</Badge>
      case 'RECEIVED':
        return <Badge className="bg-purple-100 text-purple-800">Received</Badge>
      case 'COMPLETED':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Detail SOPB</h2>
          <p className="text-muted-foreground">Surat Order Pembelian Barang</p>
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
                <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                <div>
                  <CardTitle className="text-xl">{sopb.nomor}</CardTitle>
                  <CardDescription>
                    {getStatusBadge(sopb.status)}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Harga</p>
                <p className="text-2xl font-bold">Rp {sopb.totalHarga.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Supplier Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Informasi Supplier
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kode:</span>
                  <span className="font-medium">{sopb.supplier.kode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nama:</span>
                  <span className="font-medium">{sopb.supplier.nama}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal:</span>
                  <span className="font-medium">{new Date(sopb.tanggal).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Alamat:</span>
              <p className="text-sm mt-1 bg-muted p-2 rounded">{sopb.supplier.alamat}</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Detail Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Kode</th>
                    <th className="text-left py-2">Nama Barang</th>
                    <th className="text-center py-2">Qty</th>
                    <th className="text-right py-2">Harga Satuan</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sopb.detailPembelian.map((detail, index) => (
                    <tr key={detail.id} className="border-b">
                      <td className="py-3">{detail.barang.kode}</td>
                      <td className="py-3">{detail.barang.nama}</td>
                      <td className="text-center py-3">{detail.kuantitas} {detail.barang.satuan}</td>
                      <td className="text-right py-3">Rp {detail.hargaSatuan.toLocaleString('id-ID')}</td>
                      <td className="text-right py-3 font-medium">Rp {detail.totalHarga.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2">
                    <td colSpan={4} className="text-right py-3 font-bold">Total:</td>
                    <td className="text-right py-3 font-bold text-lg">Rp {sopb.totalHarga.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {sopb.catatan && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Catatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground bg-muted p-3 rounded">{sopb.catatan}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-3">
              {sopb.status === 'DRAFT' && (
                <>
                  <Button 
                    variant="default" 
                    onClick={() => onApprove?.(sopb.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Setujui
                  </Button>
                </>
              )}
              {sopb.status === 'APPROVED' && (
                <Button 
                  variant="default" 
                  onClick={() => onSend?.(sopb.id)}
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Kirim ke Supplier
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}