import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'มะเขือเทศสด',
    price: 45,
    unit: 'กก.',
    stock: 50,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'แตงกวาญี่ปุ่น',
    price: 35,
    unit: 'กก.',
    stock: 30,
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'ข้าวโพดหวาน',
    price: 25,
    unit: 'กก.',
    stock: 40,
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'มะม่วงน้ำดอกไม้',
    price: 80,
    unit: 'กก.',
    stock: 20,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export default function SalesTab() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [todaySales, setTodaySales] = useState(2450);
  const [todayPoints, setTodayPoints] = useState(245);
  const [todayItems, setTodayItems] = useState(12);

  const sellProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) return;

    const points = Math.floor(product.price / 10);

    if (confirm(`ขาย ${product.name} 1 ${product.unit}\nราคา: ฿${product.price}\nได้รับแต้ม: ${points} แต้ม\n\nยืนยันการขาย?`)) {
      // Update product stock
      setProducts(prev => prev.map(p => 
        p.id === productId 
          ? { ...p, stock: p.stock - 1 }
          : p
      ));

      // Update today's stats
      setTodaySales(prev => prev + product.price);
      setTodayPoints(prev => prev + points);
      setTodayItems(prev => prev + 1);

      alert(`ขายสำเร็จ! ได้รับ ${points} แต้ม`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#4CAF50] mb-2">ขายผลผลิต</h2>
        <p className="text-gray-600 text-lg">กดปุ่มขายเพื่อขายทีละ 1 หน่วย</p>
      </div>

      {/* Today's Sales Summary */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-green-600 text-white p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">ยอดขายวันนี้</h3>
            <p className="text-3xl font-bold">฿{todaySales.toLocaleString()}</p>
            <p className="text-green-100 mt-1">ได้รับแต้ม: {todayPoints} แต้ม</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <ShoppingCart className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {products.map(product => {
          const points = Math.floor(product.price / 10);
          
          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-between">
                {/* Product Info */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded-full font-medium">
                        สดใหม่
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-[#4CAF50]">
                        ฿{product.price}/{product.unit}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        คงเหลือ: {product.stock} {product.unit}
                      </span>
                    </div>
                    <div className="text-sm text-[#4CAF50] font-medium mt-1">
                      ได้แต้ม: {points} แต้ม
                    </div>
                  </div>
                </div>

                {/* Sell Button */}
                <div className="text-right">
                  <button
                    onClick={() => sellProduct(product.id)}
                    disabled={product.stock <= 0}
                    className="bg-[#4CAF50] text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-3 font-medium text-lg"
                  >
                    <Check className="h-6 w-6" />
                    ขาย 1 {product.unit}
                  </button>
                  {product.stock <= 0 && (
                    <p className="text-red-500 text-sm mt-2 font-medium">สินค้าหมด</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-[#F5F5DC] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">สถิติการขายวันนี้</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4CAF50]">{todayItems}</div>
            <div className="text-gray-600">รายการขาย</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4CAF50]">{todayPoints}</div>
            <div className="text-gray-600">แต้มที่ได้</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#4CAF50]">฿{todaySales.toLocaleString()}</div>
            <div className="text-gray-600">ยอดขาย</div>
          </div>
        </div>
      </div>
    </div>
  );
}