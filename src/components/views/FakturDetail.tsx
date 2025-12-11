'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Receipt, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock,
  AlertCircle,
  X,
  MessageSquare
} from 'lucide-react'

interface Faktur {
  id: string
  nomor: string
  tanggal: string
  jumlahTagihan: number
  tanggalJatuhTempo: string
  status: string
  catatan?: string
  pembelian: {
    nomor: string
    totalHarga: number
    supplier: {
      kode: string
      nama: string
      alamat: string
    }
  }
}

interface FakturDetailProps {
  faktur: Faktur
  onClose: () => void
  onPay?: (id: string) => void
}

export function FakturDetail({ faktur, onClose, onPay }: FakturDetailProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNPAID':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Unpaid</Badge>
      case 'PAID':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>
      case 'OVERDUE':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const isOverdue = new Date(faktur.tanggalJatuhTempo) < new Date() && faktur.status === 'UNPAID'
  const daysUntilDue = Math.ceil((new Date(faktur.tanggalJatuhTempo).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Detail Faktur</h2>
          <p className="text-muted-foreground">Faktur Pembayaran</p>
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
                <Receipt className="w-6 h-6 text-muted-foreground" />
                <div>
                  <CardTitle className="text-xl">{faktur.nomor}</CardTitle>
                  <CardDescription>
                    {getStatusBadge(faktur.status)}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Jumlah Tagihan</p>
                <p className="text-2xl font-bold">Rp {faktur.jumlahTagihan.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Invoice Information */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Informasi Faktur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal Faktur:</span>
                <span className="font-medium">{new Date(faktur.tanggal).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jatuh Tempo:</span>
                <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                  {new Date(faktur.tanggalJatuhTempo).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span>{getStatusBadge(faktur.status)}</span>
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
                <span className="font-medium">{faktur.pembelian.supplier.kode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nama:</span>
                <span className="font-medium">{faktur.pembelian.supplier.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ref. SOPB:</span>
                <span className="font-medium">{faktur.pembelian.nomor}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Status Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Total Tagihan</p>
                <p className="text-2xl font-bold text-blue-700">Rp {faktur.jumlahTagihan.toLocaleString('id-ID')}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-600 mb-1">Jatuh Tempo</p>
                <p className="text-lg font-bold text-yellow-700">
                  {faktur.status === 'PAID' ? 'Lunas' : 
                   isOverdue ? 'Terlambat' : 
                   daysUntilDue + ' hari'}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-1">Status</p>
                <p className="text-lg font-bold text-green-700">
                  {faktur.status === 'PAID' ? 'Dibayar' : 'Menunggu'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alamat Supplier</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground bg-muted p-3 rounded">{faktur.pembelian.supplier.alamat}</p>
          </CardContent>
        </Card>

        {/* Notes */}
        {faktur.catatan && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Catatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground bg-muted p-3 rounded">{faktur.catatan}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-3">
              {faktur.status === 'UNPAID' && (
                <Button 
                  variant="default" 
                  onClick={() => onPay?.(faktur.id)}
                  className={isOverdue ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  {isOverdue ? 'Bayar (Terlambat)' : 'Bayar Sekarang'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}