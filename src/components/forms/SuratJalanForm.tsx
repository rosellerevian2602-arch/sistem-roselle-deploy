'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, X } from 'lucide-react'

interface Pembelian {
  id: string
  nomor: string
  supplier: {
    kode: string
    nama: string
  }
  detailPembelian: {
    barang: {
      id: string
      kode: string
      nama: string
      satuan: string
    }
    kuantitas: number
  }[]
}

interface SuratJalanFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  pembelianList: Pembelian[]
}

interface PenerimaanItem {
  barangId: string
  kuantitasDikirim: string
  kuantitasDiterima: string
  keterangan: string
}

export function SuratJalanForm({ onSubmit, onCancel, pembelianList }: SuratJalanFormProps) {
  const [formData, setFormData] = useState({
    pembelianId: '',
    pengirim: ''
  })
  
  const [items, setItems] = useState<PenerimaanItem[]>([])
  const [selectedPembelian, setSelectedPembelian] = useState<Pembelian | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validItems = items.filter(item => 
      item.barangId && item.kuantitasDikirim && item.kuantitasDiterima
    ).map(item => ({
      barangId: item.barangId,
      kuantitasDikirim: parseInt(item.kuantitasDikirim),
      kuantitasDiterima: parseInt(item.kuantitasDiterima),
      keterangan: item.keterangan
    }))

    if (validItems.length === 0) {
      alert('Mohon tambahkan minimal 1 item yang valid')
      return
    }

    onSubmit({
      ...formData,
      items: validItems
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field === 'pembelianId') {
      const pembelian = pembelianList.find(p => p.id === value)
      setSelectedPembelian(pembelian || null)
      
      // Initialize items with pembelian details
      if (pembelian) {
        const initialItems = pembelian.detailPembelian.map(detail => ({
          barangId: detail.barang.id,
          kuantitasDikirim: detail.kuantitas.toString(),
          kuantitasDiterima: detail.kuantitas.toString(),
          keterangan: ''
        }))
        setItems(initialItems)
      } else {
        setItems([])
      }
    }
  }

  const updateItem = (index: number, field: keyof PenerimaanItem, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Buat Surat Jalan Baru</CardTitle>
        <CardDescription>
          Penerimaan Barang dari Supplier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pembelian">Nomor SOPB</Label>
              <Select value={formData.pembelianId} onValueChange={(value) => handleChange('pembelianId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih SOPB" />
                </SelectTrigger>
                <SelectContent>
                  {pembelianList.map((pembelian) => (
                    <SelectItem key={pembelian.id} value={pembelian.id}>
                      {pembelian.nomor} - {pembelian.supplier.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pengirim">Pengirim</Label>
              <Input
                id="pengirim"
                value={formData.pengirim}
                onChange={(e) => handleChange('pengirim', e.target.value)}
                placeholder="Nama pengirim (supplier)"
                required
              />
            </div>
          </div>

          {selectedPembelian && (
            <div className="space-y-4">
              <Label>Detail Penerimaan Barang</Label>
              {items.map((item, index) => {
                const barang = selectedPembelian.detailPembelian.find(d => d.barang.id === item.barangId)?.barang
                return (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-4 gap-4 items-end">
                      <div className="space-y-2">
                        <Label>Barang</Label>
                        <div className="text-sm font-medium">
                          {barang?.kode} - {barang?.nama}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Qty Dikirim</Label>
                        <Input
                          type="number"
                          value={item.kuantitasDikirim}
                          onChange={(e) => updateItem(index, 'kuantitasDikirim', e.target.value)}
                          placeholder="Qty"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Qty Diterima</Label>
                        <Input
                          type="number"
                          value={item.kuantitasDiterima}
                          onChange={(e) => updateItem(index, 'kuantitasDiterima', e.target.value)}
                          placeholder="Qty diterima"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Keterangan</Label>
                        <Input
                          value={item.keterangan}
                          onChange={(e) => updateItem(index, 'keterangan', e.target.value)}
                          placeholder="Keterangan"
                        />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit" disabled={!selectedPembelian || items.length === 0}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Buat Surat Jalan
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}