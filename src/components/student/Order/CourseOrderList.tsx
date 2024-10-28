import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { getCourseOrderDetailsAPI } from '@/api/studentAPI/studentAPI';

interface Course {
    title: string,
    thumbnailUrl: string
}

interface Order {
    orderId: string;
    courseId: Course;
    address: string;
    purchaseDate: string;
    amount: number;
    paymentStatus: string;
    image: string;
}

const CourseOrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getCourseOrderDetailsAPI();
                setOrders(response);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            }
        };
    
        fetchOrders();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Your Course Orders</h1>
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
                            <p className="text-gray-500">Total Orders</p>
                            <p className="text-2xl font-bold">{orders.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Table */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="grid grid-cols-12 p-4 border-b text-gray-500 font-medium">
                    <div className="col-span-6">Course</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Payment Status</div>
                </div>

                {orders.map((order) => {
                    const uniqueKey = `${order.orderId}-${order.courseId.title}`;
                    
                    return (
                        <div key={uniqueKey} className="grid grid-cols-12 p-4 border-b items-center hover:bg-gray-50">
                            <div className="col-span-6">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={order.courseId.thumbnailUrl} 
                                        alt={`${order.courseId.title} thumbnail`} 
                                        className="w-20 h-12 rounded-lg object-cover" 
                                    />
                                    <div>
                                        <p className="font-medium">{order.courseId.title}</p>
                                        <p className="text-sm text-gray-500">{order.address}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 text-gray-500">{order.purchaseDate}</div>
                            <div className="col-span-2 font-medium">₹{order.amount}</div>
                            <div className="col-span-2 flex items-center justify-between">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                    order.paymentStatus === 'Completed'
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

export default CourseOrderList;