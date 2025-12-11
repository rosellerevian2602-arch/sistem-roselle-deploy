'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, X, Calculator } from 'lucide-react'

interface Supplier {
  id: string
  kode: string
  nama: string
}

interface Barang {
  id: string
  kode: string
  nama: string
  satuan: string
  harga: number
}

interface SOPBFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  supplierList: Supplier[]
  barangList: Barang[]
}

interface OrderItem {
  barangId: string
  kuantitas: string
  hargaSatuan: string
}

export function SOPBForm({ onSubmit, onCancel, supplierList, barangList }: SOPBFormProps) {
  const [formData, setFormData] = useState({
    supplierId: '',
    catatan: ''
  })
  
  const [items, setItems] = useState<OrderItem[]>([
    { barangId: '', kuantitas: '', hargaSatuan: '' }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validItems = items.filter(item => 
      item.barangId && item.kuantitas && item.hargaSatuan
    ).map(item => ({
      barangId: item.barangId,
      kuantitas: parseInt(item.kuantitas),
      hargaSatuan: parseFloat(item.hargaSatuan)
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
  }

  const addItem = () => {
    setItems([...items, { barangId: '', kuantitas: '', hargaSatuan: '' }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: keyof OrderItem, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    
    // Auto-fill harga when barang is selected
    if (field === 'barangId') {
      const selectedBarang = barangList.find(b => b.id === value)
      if (selectedBarang) {
        newItems[index].hargaSatuan = selectedBarang.harga.toString()
      }
    }
    
    setItems(newItems)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const qty = parseFloat(item.kuantitas) || 0
      const price = parseFloat(item.hargaSatuan) || 0
      return total + (qty * price)
    }, 0)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Buat SOPB Baru</CardTitle>
        <CardDescription>
          Surat Order Pembelian Barang
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select value={formData.supplierId} onValueChange={(value) => handleChange('supplierId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih supplier" />
                </SelectTrigger>
                <SelectContent>
                  {supplierList.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.kode} - {supplier.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Detail Barang</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Tambah Item
              </Button>
            </div>

            {items.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <Label>Barang</Label>
                    <Select 
                      value={item.barangId} 
                      onValueChange={(value) => updateItem(index, 'barangId', value)}
                    >
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
                    <Label>Kuantitas</Label>
                    <Input
                      type="number"
                      value={item.kuantitas}
                      onChange={(e) => updateItem(index, 'kuantitas', e.target.value)}
                      placeholder="Qty"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Harga Satuan</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.hargaSatuan}
                      onChange={(e) => updateItem(index, 'hargaSatuan', e.target.value)}
                      placeholder="Harga"
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan (opsional)</Label>
            <Textarea
              id="catatan"
              value={formData.catatan}
              onChange={(e) => handleChange('catatan', e.target.value)}
              placeholder="Catatan tambahan untuk supplier"
            />
          </div>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total Harga:</span>
                <span className="text-xl font-bold">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit">
              <PlusCircle className="w-4 h-4 mr-2" />
              Buat SOPB
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}