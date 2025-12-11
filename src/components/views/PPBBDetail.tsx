'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Calendar, 
  User, 
  Building, 
  Package, 
  CheckCircle, 
  Clock, 
  X,
  MessageSquare
} from 'lucide-react'

interface PermintaanPembelian {
  id: string
  nomor: string
  tanggal: string
  departemen: string
  pemohon: string
  kuantitas: number
  kebutuhan: string
  status: string
  catatan?: string
  approvedBy?: string
  approvedAt?: string
  barang: {
    kode: string
    nama: string
    satuan: string
  }
}

interface PPBBDetailProps {
  ppbb: PermintaanPembelian
  onClose: () => void
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

export function PPBBDetail({ ppbb, onClose, onApprove, onReject }: PPBBDetailProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'REJECTED':
        return <Badge className="bg-red-100 text-red-800"><X className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Detail PPBB</h2>
          <p className="text-muted-foreground">Permintaan Pembelian Bahan Baku</p>
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
                <FileText className="w-6 h-6 text-muted-foreground" />
                <div>
                  <CardTitle className="text-xl">{ppbb.nomor}</CardTitle>
                  <CardDescription>
                    {getStatusBadge(ppbb.status)}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Request Information */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informasi Pemohon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pemohon:</span>
                <span className="font-medium">{ppbb.pemohon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Departemen:</span>
                <span className="font-medium">{ppbb.departemen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal:</span>
                <span className="font-medium">{new Date(ppbb.tanggal).toLocaleDateString('id-ID')}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Informasi Barang
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kode:</span>
                <span className="font-medium">{ppbb.barang.kode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nama:</span>
                <span className="font-medium">{ppbb.barang.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kuantitas:</span>
                <span className="font-medium">{ppbb.kuantitas} {ppbb.barang.satuan}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Detail Permintaan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Kebutuhan:</h4>
              <p className="text-muted-foreground bg-muted p-3 rounded">{ppbb.kebutuhan}</p>
            </div>
            
            {ppbb.catatan && (
              <div>
                <h4 className="font-medium mb-2">Catatan:</h4>
                <p className="text-muted-foreground bg-muted p-3 rounded">{ppbb.catatan}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approval Information */}
        {ppbb.status !== 'PENDING' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Informasi Persetujuan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Disetujui oleh:</span>
                <span className="font-medium">{ppbb.approvedBy || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tanggal Persetujuan:</span>
                <span className="font-medium">
                  {ppbb.approvedAt ? new Date(ppbb.approvedAt).toLocaleDateString('id-ID') : '-'}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {ppbb.status === 'PENDING' && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="destructive" 
                  onClick={() => onReject?.(ppbb.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Tolak
                </Button>
                <Button 
                  onClick={() => onApprove?.(ppbb.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Setujui
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}