import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PointsTab from './components/PointsTab';
import ProductsTab from './components/ProductsTab';
import ChatTab from './components/ChatTab';
import OrdersTab from './components/OrdersTab';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTab />;
      case 'orders':
        return <OrdersTab />;
      case 'chat':
        return <ChatTab />;
      case 'points':
        return <PointsTab />;
      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#4CAF50] mb-4">
                {activeTab === 'reports' && 'ยอดขาย'}
              </h2>
              <p className="text-gray-600 text-lg">ฟีเจอร์นี้กำลังพัฒนา</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 overflow-auto">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}

export default App;