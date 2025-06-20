import React from 'react';
import { User, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-[#4CAF50] shadow-sm border-b border-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-white hover:text-green-100 hover:bg-green-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center ml-2 md:ml-0">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src="/ChatGPT_Image_17_.._2568_10_27_08 copy.png" 
                  alt="Farm2Hand Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="ml-3 text-2xl font-bold text-white">Farm2Hand</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white hover:text-green-100 hover:bg-green-600 rounded-full">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-[#4CAF50]" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-white">เกษตรกรสมชาย</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}