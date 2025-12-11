'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'

interface SupplierFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function SupplierForm({ onSubmit, onCancel }: SupplierFormProps) {
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    alamat: '',
    telepon: '',
    email: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tambah Supplier Baru</CardTitle>
        <CardDescription>
          Masukkan informasi supplier baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kode">Kode Supplier</Label>
              <Input
                id="kode"
                value={formData.kode}
                onChange={(e) => handleChange('kode', e.target.value)}
                placeholder="Contoh: SUP001"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Supplier</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                placeholder="Nama lengkap supplier"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Input
              id="alamat"
              value={formData.alamat}
              onChange={(e) => handleChange('alamat', e.target.value)}
              placeholder="Alamat lengkap supplier"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telepon">Telepon</Label>
              <Input
                id="telepon"
                value={formData.telepon}
                onChange={(e) => handleChange('telepon', e.target.value)}
                placeholder="Nomor telepon"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Email supplier"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit">
              <PlusCircle className="w-4 h-4 mr-2" />
              Tambah Supplier
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}