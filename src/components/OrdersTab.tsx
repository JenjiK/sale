import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Phone, MessageCircle } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  products: {
    name: string;
    quantity: number;
    unit: string;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  address: string;
  notes?: string;
}

const sampleOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'คุณสมหญิง',
    customerPhone: '081-234-5678',
    products: [
      { name: 'มะเขือเทศสด', quantity: 5, unit: 'กก.', price: 45 }
    ],
    totalAmount: 225,
    status: 'pending',
    orderDate: '2024-01-15 10:30',
    address: '123 หมู่ 5 ตำบลสามพราน อำเภอสามพราน จังหวัดนครปฐม 73110',
    notes: 'ขอมะเขือเทศสดใหม่ ไม่แก่จนเกินไป'
  },
  {
    id: 'ORD002',
    customerName: 'ร้านผักสด ABC',
    customerPhone: '082-345-6789',
    products: [
      { name: 'แตงกวาญี่ปุ่น', quantity: 20, unit: 'กก.', price: 35 },
      { name: 'ข้าวโพดหวาน', quantity: 10, unit: 'กก.', price: 25 }
    ],
    totalAmount: 950,
    status: 'confirmed',
    orderDate: '2024-01-15 09:15',
    deliveryDate: '2024-01-16 08:00',
    address: 'ตลาดสดเทศบาล ถนนเพชรเกษม กม.32 นครปฐม'
  },
  {
    id: 'ORD003',
    customerName: 'คุณมานี',
    customerPhone: '083-456-7890',
    products: [
      { name: 'มะม่วงน้ำดอกไม้', quantity: 3, unit: 'กก.', price: 80 }
    ],
    totalAmount: 240,
    status: 'delivered',
    orderDate: '2024-01-14 14:20',
    deliveryDate: '2024-01-15 10:00',
    address: '456 ซอยลาดพร้าว 15 เขตจตุจักร กรุงเทพฯ 10900'
  },
  {
    id: 'ORD004',
    customerName: 'ตลาดสดใหม่',
    customerPhone: '084-567-8901',
    products: [
      { name: 'ผักกาดหอม', quantity: 15, unit: 'กก.', price: 35 }
    ],
    totalAmount: 525,
    status: 'shipped',
    orderDate: '2024-01-14 16:45',
    deliveryDate: '2024-01-15 14:00',
    address: 'ตลาดสดเมืองใหม่ ถนนพหลโยธิน กม.45 ปทุมธานี'
  }
];

const statusConfig = {
  pending: { label: 'รอยืนยัน', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'ยืนยันแล้ว', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  preparing: { label: 'กำลังเตรียม', color: 'bg-purple-100 text-purple-800', icon: Package },
  shipped: { label: 'จัดส่งแล้ว', color: 'bg-indigo-100 text-indigo-800', icon: Package },
  delivered: { label: 'ส่งแล้ว', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'ยกเลิก', color: 'bg-red-100 text-red-800', icon: XCircle }
};

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered'>('all');

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, deliveryDate: newStatus === 'confirmed' ? new Date().toISOString().slice(0, 16).replace('T', ' ') : order.deliveryDate }
        : order
    ));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#4CAF50] mb-2">ออเดอร์</h2>
        <p className="text-gray-600 text-lg">จัดการคำสั่งซื้อจากลูกค้า</p>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
              filter === status 
                ? 'bg-[#4CAF50] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'ทั้งหมด' : 
             status === 'pending' ? 'รอยืนยัน' :
             status === 'confirmed' ? 'ยืนยันแล้ว' :
             status === 'shipped' ? 'จัดส่งแล้ว' :
             'ส่งแล้ว'} ({count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const statusInfo = statusConfig[order.status];
            const StatusIcon = statusInfo.icon;
            
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">#{order.id}</h3>
                    <p className="text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {statusInfo.label}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{order.orderDate}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{product.name} x{product.quantity} {product.unit}</span>
                      <span className="font-medium">฿{(product.price * product.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xl font-bold text-[#4CAF50]">
                    รวม ฿{order.totalAmount.toLocaleString()}
                  </span>
                  <button className="text-[#4CAF50] hover:text-green-600 font-medium flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">ไม่มีออเดอร์ในสถานะนี้</div>
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="lg:sticky lg:top-6">
          {selectedOrder ? (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">รายละเอียดออเดอร์</h3>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100 rounded-full">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100 rounded-full">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">ข้อมูลลูกค้า</h4>
                  <p className="text-gray-700">{selectedOrder.customerName}</p>
                  <p className="text-gray-600 text-sm">{selectedOrder.customerPhone}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">ที่อยู่จัดส่ง</h4>
                  <p className="text-gray-700 text-sm">{selectedOrder.address}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">รายการสินค้า</h4>
                  <div className="space-y-3">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.quantity} {product.unit} × ฿{product.price}</p>
                        </div>
                        <span className="font-bold text-[#4CAF50]">
                          ฿{(product.price * product.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">หมายเหตุ</h4>
                    <p className="text-gray-700 text-sm bg-yellow-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-800">ยอดรวม</span>
                    <span className="text-2xl font-bold text-[#4CAF50]">
                      ฿{selectedOrder.totalAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {selectedOrder.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}
                          className="flex-1 bg-[#4CAF50] text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors duration-200 font-medium"
                        >
                          ยืนยันออเดอร์
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                          className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors duration-200 font-medium"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    )}
                    
                    {selectedOrder.status === 'confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 font-medium"
                      >
                        จัดส่งสินค้า
                      </button>
                    )}
                    
                    {selectedOrder.status === 'shipped' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                        className="w-full bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors duration-200 font-medium"
                      >
                        ยืนยันการส่งมอบ
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-gray-400 text-lg mb-2">เลือกออเดอร์</div>
              <p className="text-gray-600">คลิกที่ออเดอร์เพื่อดูรายละเอียด</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}