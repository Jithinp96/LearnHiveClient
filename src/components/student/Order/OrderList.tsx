import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Wallet } from 'lucide-react';
import { getCourseOrderDetailsAPI, getSlotOrderDetailsAPI } from '@/api/studentAPI/studentAPI';

interface Order {
    orderId: string;
    title: string;
    address: string;
    purchaseDate: string;
    amount: number;
    paymentStatus: string
    image: string;
}

const OrderList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'course' | 'slot'>('course');
    const [courseOrders, setCourseOrders] = useState<Order[]>([]);
    const [slotOrders, setSlotOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (activeTab === 'course') {
                    const response   = await getCourseOrderDetailsAPI();
                    console.log("course response: ", response);
                    setCourseOrders(response);
                } else {
                    const response = await getSlotOrderDetailsAPI();
                    console.log("slot response: ", response);
                    setSlotOrders(response);
                }
            } catch (error) {
                console.error('Failed to fetch orders', error);
            }
        };
    
        fetchOrders();
    }, [activeTab]);
    
    const activeOrders = activeTab === 'course' ? courseOrders : slotOrders;

    const stats = {
        course: {
            customers: 145,
            transactions: 645,
            collected: 720
        },
            slot: {
            customers: 98,
            transactions: 432,
            collected: 560
        }
    };

  const activeStats = activeTab === 'course' ? stats.course : stats.slot;

  return (
    <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold">Your Orders</h1>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
            <button
                onClick={() => setActiveTab('course')}
                className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'course'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                >
                Course Orders
            </button>
            <button
                onClick={() => setActiveTab('slot')}
                className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'slot'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                >
                Slot Orders
            </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                        <p className="text-gray-500">Total Customers</p>
                        <p className="text-2xl font-bold">{activeStats.customers}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                        <p className="text-gray-500">Total Transactions</p>
                        <p className="text-2xl font-bold">{activeStats.transactions}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <Wallet className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                        <p className="text-gray-500">Amount Collected</p>
                        <p className="text-2xl font-bold">{activeStats.collected}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Order Table */}
        <div className="bg-white rounded-xl shadow-sm">
            <div className="grid grid-cols-12 p-4 border-b text-gray-500 font-medium">
                <div className="col-span-6">{activeTab === 'course' ? 'Course' : 'Slot'}</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Payment Status</div>
            </div>

            {activeOrders.map((order) => (
                <div key={order.orderId} className="grid grid-cols-12 p-4 border-b items-center hover:bg-gray-50">
                    <div className="col-span-6">
                        <div className="flex items-center gap-3">
                            <img src={order.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <p className="font-medium">{order.title}</p>
                                <p className="text-sm text-gray-500">{order.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 text-gray-500">{order.purchaseDate}</div>
                    <div className="col-span-2 font-medium">₹{order.amount}</div>
                    <div className="col-span-2 flex items-center justify-between">
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${
                            order.paymentStatus === 'Success'
                                ? 'bg-green-50 text-green-600'
                                : 'bg-red-50 text-red-600'
                            }`}
                        >
                            {order.paymentStatus}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default OrderList;