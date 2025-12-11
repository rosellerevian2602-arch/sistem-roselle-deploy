'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'

interface Supplier {
  id: string
  kode: string
  nama: string
}

interface BarangFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  supplierList: Supplier[]
}

export function BarangForm({ onSubmit, onCancel, supplierList }: BarangFormProps) {
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    deskripsi: '',
    harga: '',
    stok: '',
    satuan: '',
    supplierId: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert "no-supplier" to null for supplierId
    const submitData = {
      ...formData,
      supplierId: formData.supplierId === "no-supplier" ? null : formData.supplierId
    }
    
    onSubmit(submitData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tambah Barang Baru</CardTitle>
        <CardDescription>
          Masukkan informasi barang baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kode">Kode Barang</Label>
              <Input
                id="kode"
                value={formData.kode}
                onChange={(e) => handleChange('kode', e.target.value)}
                placeholder="Contoh: BRG001"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Barang</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                placeholder="Nama lengkap barang"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => handleChange('deskripsi', e.target.value)}
              placeholder="Deskripsi barang"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="harga">Harga</Label>
              <Input
                id="harga"
                type="number"
                step="0.01"
                value={formData.harga}
                onChange={(e) => handleChange('harga', e.target.value)}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stok">Stok</Label>
              <Input
                id="stok"
                type="number"
                value={formData.stok}
                onChange={(e) => handleChange('stok', e.target.value)}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="satuan">Satuan</Label>
              <Input
                id="satuan"
                value={formData.satuan}
                onChange={(e) => handleChange('satuan', e.target.value)}
                placeholder="pcs, kg, liter"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select value={formData.supplierId} onValueChange={(value) => handleChange('supplierId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih supplier (opsional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-supplier">Tidak ada supplier</SelectItem>
                {supplierList.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.kode} - {supplier.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit">
              <PlusCircle className="w-4 h-4 mr-2" />
              Tambah Barang
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}