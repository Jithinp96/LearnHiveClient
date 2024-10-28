import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { getSlotOrderDetailsAPI } from '@/api/studentAPI/studentAPI';
import toast from 'react-hot-toast';

interface Slot {
    subject: string,
    level: string,
    date: string,
    startTime: string,
    endTime: string,
}

interface Order {
    _id: string;
    slotId: Slot;
    address: string;
    createdAt: string;
    amount: number;
    paymentStatus: string;
}

const SlotOrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getSlotOrderDetailsAPI();
                setOrders(response);
            } catch (error) {
                toast.error("Failed to fetch slot order. Please try again!")
            }
        };
    
        fetchOrders();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Your Slot Orders</h1>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm" key="transactions-card">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Slot Orders</p>
                            <p className="text-2xl font-bold">{orders.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Table */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="grid grid-cols-12 p-4 border-b text-gray-500 font-medium">
                    <div className="col-span-3">Details</div>
                    <div className="col-span-3">Slot Date</div>
                    <div className="col-span-3">Purchase Date</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-1">Payment Status</div>
                </div>

                {orders.map((order) => {
                    const uniqueKey = `${order._id}-${order.slotId.subject}`;
                    
                    return (
                        <div key={uniqueKey} className="grid grid-cols-12 p-4 border-b items-center hover:bg-gray-50">
                            <div className="col-span-3">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-medium">{order.slotId.subject}</p>
                                        <p className="text-sm text-gray-500">{order.slotId.level}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-medium">{order.slotId.date}</p>
                                        <p className="text-sm text-gray-500">{order.slotId.startTime} - {order.slotId.endTime}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 text-gray-500">{order.createdAt}</div>
                            <div className="col-span-2 font-medium">₹{order.amount}</div>
                            <div className="col-span-1 flex items-center justify-between">
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
                    );
                })}
            </div>
        </div>
    );
};

export default SlotOrderList;