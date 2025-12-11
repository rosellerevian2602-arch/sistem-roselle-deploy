'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'

interface Pembelian {
  id: string
  nomor: string
  totalHarga: number
  supplier: {
    kode: string
    nama: string
  }
}

interface FakturFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  pembelianList: Pembelian[]
}

export function FakturForm({ onSubmit, onCancel, pembelianList }: FakturFormProps) {
  const [formData, setFormData] = useState({
    pembelianId: '',
    jumlahTagihan: '',
    tanggalJatuhTempo: '',
    catatan: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-fill jumlah tagihan when pembelian is selected
    if (field === 'pembelianId') {
      const pembelian = pembelianList.find(p => p.id === value)
      if (pembelian) {
        setFormData(prev => ({
          ...prev,
          pembelianId: value,
          jumlahTagihan: pembelian.totalHarga.toString()
        }))
      }
    }
  }

  // Set default jatuh tempo to 30 days from now
  const getDefaultJatuhTempo = () => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date.toISOString().split('T')[0]
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Buat Faktur Baru</CardTitle>
        <CardDescription>
          Faktur Pembayaran
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pembelian">Nomor SOPB</Label>
            <Select value={formData.pembelianId} onValueChange={(value) => handleChange('pembelianId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih SOPB" />
              </SelectTrigger>
              <SelectContent>
                {pembelianList.map((pembelian) => (
                  <SelectItem key={pembelian.id} value={pembelian.id}>
                    {pembelian.nomor} - {pembelian.supplier.nama} (Rp {pembelian.totalHarga.toLocaleString('id-ID')})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jumlahTagihan">Jumlah Tagihan</Label>
              <Input
                id="jumlahTagihan"
                type="number"
                step="0.01"
                value={formData.jumlahTagihan}
                onChange={(e) => handleChange('jumlahTagihan', e.target.value)}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tanggalJatuhTempo">Tanggal Jatuh Tempo</Label>
              <Input
                id="tanggalJatuhTempo"
                type="date"
                value={formData.tanggalJatuhTempo || getDefaultJatuhTempo()}
                onChange={(e) => handleChange('tanggalJatuhTempo', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan (opsional)</Label>
            <Textarea
              id="catatan"
              value={formData.catatan}
              onChange={(e) => handleChange('catatan', e.target.value)}
              placeholder="Catatan pembayaran"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit">
              <PlusCircle className="w-4 h-4 mr-2" />
              Buat Faktur
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}