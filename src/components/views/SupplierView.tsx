'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Phone, Mail, MapPin, X } from 'lucide-react'

interface Supplier {
  id: string
  kode: string
  nama: string
  alamat: string
  telepon?: string
  email?: string
  createdAt: string
}

interface SupplierViewProps {
  suppliers: Supplier[]
  onClose: () => void
}

export function SupplierView({ suppliers, onClose }: SupplierViewProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Daftar Supplier</h2>
          <p className="text-muted-foreground">Total {suppliers.length} supplier terdaftar</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          Tutup
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <Badge variant="secondary">{supplier.kode}</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">{supplier.nama}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{supplier.alamat}</span>
              </div>
              
              {supplier.telepon && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{supplier.telepon}</span>
                </div>
              )}
              
              {supplier.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{supplier.email}</span>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Ditambahkan: {new Date(supplier.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Belum ada supplier</h3>
          <p className="text-muted-foreground">Tambahkan supplier pertama untuk memulai</p>
        </div>
      )}
    </div>
  )
}