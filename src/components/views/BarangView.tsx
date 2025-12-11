'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, DollarSign, Box, X, Users } from 'lucide-react'

interface Barang {
  id: string
  kode: string
  nama: string
  deskripsi?: string
  harga: number
  stok: number
  satuan: string
  supplier?: {
    kode: string
    nama: string
  }
  createdAt: string
}

interface BarangViewProps {
  barang: Barang[]
  onClose: () => void
}

export function BarangView({ barang, onClose }: BarangViewProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Katalog Barang</h2>
          <p className="text-muted-foreground">Total {barang.length} barang tersedia</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          Tutup
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {barang.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <Badge variant="secondary">{item.kode}</Badge>
                </div>
                <Badge 
                  variant={item.stok > 10 ? "default" : item.stok > 0 ? "secondary" : "destructive"}
                >
                  Stok: {item.stok}
                </Badge>
              </div>
              <CardTitle className="text-lg">{item.nama}</CardTitle>
              {item.deskripsi && (
                <CardDescription className="line-clamp-2">{item.deskripsi}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">Rp {item.harga.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Box className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">/{item.satuan}</span>
                </div>
              </div>
              
              {item.supplier && (
                <div className="flex items-center space-x-2 pt-2 border-t">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{item.supplier.kode} - {item.supplier.nama}</span>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Ditambahkan: {new Date(item.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {barang.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Belum ada barang</h3>
          <p className="text-muted-foreground">Tambahkan barang pertama untuk memulai</p>
        </div>
      )}
    </div>
  )
}