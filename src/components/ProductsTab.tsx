import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Upload, Save } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
  status: 'active' | 'inactive';
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'มะเขือเทศสด',
    price: 45,
    unit: 'กก.',
    stock: 50,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'active'
  },
  {
    id: '2',
    name: 'แตงกวาญี่ปุ่น',
    price: 35,
    unit: 'กก.',
    stock: 30,
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'active'
  },
  {
    id: '3',
    name: 'ข้าวโพดหวาน',
    price: 25,
    unit: 'กก.',
    stock: 0,
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=300',
    status: 'inactive'
  }
];

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: 'กก.',
    stock: '',
    image: ''
  });

  const toggleProductStatus = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบผลผลิตนี้?')) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: parseInt(newProduct.stock),
      image: newProduct.image || 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active'
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({ name: '', price: '', unit: 'กก.', stock: '', image: '' });
    setShowAddForm(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      unit: product.unit,
      stock: product.stock.toString(),
      image: product.image
    });
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: parseInt(newProduct.stock),
      image: newProduct.image || editingProduct.image
    };

    setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', unit: 'กก.', stock: '', image: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', unit: 'กก.', stock: '', image: '' });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-[#4CAF50] mb-2">ผลผลิตของฉัน</h2>
            <p className="text-gray-600 text-lg">จัดการผลผลิตเกษตรของคุณ</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-[#4CAF50] text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 text-lg font-medium"
          >
            <Plus className="h-5 w-5" />
            เพิ่มผลผลิตใหม่
          </button>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddForm || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4CAF50]">
                {editingProduct ? 'แก้ไขผลผลิต' : 'เพิ่มผลผลิตใหม่'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">ชื่อผลผลิต</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-lg"
                  placeholder="เช่น มะเขือเทศสด"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">ราคา (บาท)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-lg"
                    placeholder="45"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">หน่วย</label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-lg"
                  >
                    <option value="กก.">กิโลกรัม</option>
                    <option value="ลูก">ลูก</option>
                    <option value="ผล">ผล</option>
                    <option value="กิ่ง">กิ่ง</option>
                    <option value="ถุง">ถุง</option>
                    <option value="แผง">แผง</option>
                    <option value="มัด">มัด</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">จำนวนคงเหลือ</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-lg"
                  placeholder="50"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">รูปภาพผลผลิต</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#4CAF50] transition-colors duration-200">
                  {newProduct.image ? (
                    <div className="space-y-4">
                      <img
                        src={newProduct.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => setNewProduct(prev => ({ ...prev, image: '' }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        ลบรูปภาพ
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">คลิกเพื่อเลือกรูปภาพ</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 cursor-pointer inline-block"
                      >
                        เลือกรูปภาพ
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-xl hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#4CAF50] text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                >
                  {editingProduct ? (
                    <>
                      <Save className="h-4 w-4" />
                      บันทึกการแก้ไข
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      เพิ่มผลผลิต
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'active' ? 'เปิดขาย' : 'ปิดขาย'}
                </span>
              </div>
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">สินค้าหมด</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{product.name}</h3>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-[#4CAF50]">
                  ฿{product.price}/{product.unit}
                </span>
                <span className={`text-lg font-medium ${product.stock > 0 ? 'text-gray-500' : 'text-red-500'}`}>
                  คงเหลือ: {product.stock} {product.unit}
                </span>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  <Edit className="h-4 w-4" />
                  แก้ไข
                </button>
                <button
                  onClick={() => toggleProductStatus(product.id)}
                  className={`flex-1 py-3 px-4 rounded-xl transition-colors duration-200 font-medium ${
                    product.status === 'active'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {product.status === 'active' ? 'ปิดขาย' : 'เปิดขาย'}
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">ยังไม่มีผลผลิต</div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-[#4CAF50] text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 text-lg font-medium mx-auto"
          >
            <Plus className="h-5 w-5" />
            เพิ่มผลผลิตแรก
          </button>
        </div>
      )}
    </div>
  );
}