import React from 'react';
import { 
  Package, 
  Star, 
  BarChart3,
  X,
  MessageCircle,
  ClipboardList
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'products', label: 'ผลผลิตของฉัน', icon: Package },
  { id: 'orders', label: 'ออเดอร์', icon: ClipboardList },
  { id: 'chat', label: 'พูดคุย', icon: MessageCircle },
  { id: 'points', label: 'แต้มสะสม', icon: Star },
  { id: 'reports', label: 'ยอดขาย', icon: BarChart3 },
];

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#F5F5DC] shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <span className="text-lg font-semibold text-gray-800">เมนู</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-4 md:mt-8">
          <div className="px-4 space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center px-6 py-4 text-left rounded-xl transition-all duration-200 text-lg font-medium
                    ${activeTab === item.id 
                      ? 'bg-[#4CAF50] text-white shadow-lg transform scale-105' 
                      : 'text-gray-700 hover:bg-white hover:text-[#4CAF50] hover:shadow-md'
                    }
                  `}
                >
                  <Icon className="h-6 w-6 mr-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}