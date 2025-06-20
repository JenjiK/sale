import React from 'react';
import { Star, TrendingUp, Gift, Coins } from 'lucide-react';

export default function PointsTab() {
  const currentPoints = 1247;
  const totalEarned = 2156;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#4CAF50] mb-2">แต้มสะสม</h2>
        <p className="text-gray-600 text-lg">สะสมแต้มจากการขายผลผลิต</p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-[#4CAF50] to-green-600 text-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-lg font-medium">แต้มปัจจุบัน</p>
              <p className="text-4xl font-bold">{currentPoints.toLocaleString()}</p>
              <p className="text-green-100 text-sm mt-2">มูลค่า ฿{(currentPoints * 0.1).toFixed(0)}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <Coins className="h-10 w-10" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-lg font-medium">แต้มที่ได้รับทั้งหมด</p>
              <p className="text-3xl font-bold text-gray-800">{totalEarned.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-2">จากการขายผลผลิต</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <TrendingUp className="h-8 w-8 text-[#4CAF50]" />
            </div>
          </div>
        </div>
      </div>

      {/* How to earn points */}
      <div className="bg-[#F5F5DC] rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">วิธีการได้รับแต้ม</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#4CAF50] text-white p-2 rounded-full">
              <Star className="h-5 w-5" />
            </div>
            <span className="text-gray-700">ขายผลผลิต 10 บาท = 1 แต้ม</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#4CAF50] text-white p-2 rounded-full">
              <Star className="h-5 w-5" />
            </div>
            <span className="text-gray-700">ผลผลิตออร์แกนิค = แต้มพิเศษ 2x</span>
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">แลกสิทธิประโยชน์</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#4CAF50] transition-colors duration-200">
            <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
              <Gift className="h-6 w-6 text-[#4CAF50]" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">ส่วนลดค่าขนส่ง 10%</h4>
            <p className="text-gray-600 mb-4">ลดค่าขนส่งผลผลิตไปยังลูกค้า</p>
            <div className="flex items-center justify-between">
              <span className="text-[#4CAF50] font-bold text-lg">50 แต้ม</span>
              <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium">
                แลก
              </button>
            </div>
          </div>
          
          <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#4CAF50] transition-colors duration-200">
            <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
              <Gift className="h-6 w-6 text-[#4CAF50]" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">ลดค่าคอมมิชชั่น 50%</h4>
            <p className="text-gray-600 mb-4">ลดค่าบริการแพลตฟอร์ม 1 เดือน</p>
            <div className="flex items-center justify-between">
              <span className="text-[#4CAF50] font-bold text-lg">150 แต้ม</span>
              <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium">
                แลก
              </button>
            </div>
          </div>
          
          <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#4CAF50] transition-colors duration-200">
            <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
              <Gift className="h-6 w-6 text-[#4CAF50]" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">โปรโมทผลผลิตฟรี</h4>
            <p className="text-gray-600 mb-4">โปรโมทผลผลิต 1 รายการ 7 วัน</p>
            <div className="flex items-center justify-between">
              <span className="text-[#4CAF50] font-bold text-lg">200 แต้ม</span>
              <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium">
                แลก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}