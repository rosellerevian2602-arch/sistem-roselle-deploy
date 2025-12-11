'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, X } from 'lucide-react'

interface Barang {
  id: string
  kode: string
  nama: string
  satuan: string
}

interface PPBBFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  barangList: Barang[]
}

export function PPBBForm({ onSubmit, onCancel, barangList }: PPBBFormProps) {
  const [formData, setFormData] = useState({
    departemen: '',
    pemohon: '',
    barangId: '',
    kuantitas: '',
    kebutuhan: '',
    catatan: ''
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
        <CardTitle>Buat PPBB Baru</CardTitle>
        <CardDescription>
          Permintaan Pembelian Bahan Baku
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departemen">Departemen</Label>
              <Select value={formData.departemen} onValueChange={(value) => handleChange('departemen', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih departemen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUKSI">Produksi</SelectItem>
                  <SelectItem value="GUDANG">Gudang</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  <SelectItem value="LAINNYA">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pemohon">Pemohon</Label>
              <Input
                id="pemohon"
                value={formData.pemohon}
                onChange={(e) => handleChange('pemohon', e.target.value)}
                placeholder="Nama pemohon"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="barang">Barang</Label>
              <Select value={formData.barangId} onValueChange={(value) => handleChange('barangId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih barang" />
                </SelectTrigger>
                <SelectContent>
                  {barangList.map((barang) => (
                    <SelectItem key={barang.id} value={barang.id}>
                      {barang.kode} - {barang.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="kuantitas">Kuantitas</Label>
              <Input
                id="kuantitas"
                type="number"
                value={formData.kuantitas}
                onChange={(e) => handleChange('kuantitas', e.target.value)}
                placeholder="Jumlah yang dibutuhkan"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kebutuhan">Kebutuhan</Label>
            <Textarea
              id="kebutuhan"
              value={formData.kebutuhan}
              onChange={(e) => handleChange('kebutuhan', e.target.value)}
              placeholder="Jelaskan kebutuhan barang ini"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan (opsional)</Label>
            <Textarea
              id="catatan"
              value={formData.catatan}
              onChange={(e) => handleChange('catatan', e.target.value)}
              placeholder="Catatan tambahan"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit">
              <PlusCircle className="w-4 h-4 mr-2" />
              Buat PPBB
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}