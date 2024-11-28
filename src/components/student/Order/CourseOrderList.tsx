import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { getCourseOrderDetailsAPI } from '@/api/studentAPI/studentAPI';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

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
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalOrders: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const fetchOrders = async (page = 1) => {
        try {
            setIsLoading(true);
            const response = await getCourseOrderDetailsAPI(page);
            console.log("response from courseOrderDetails: ", response);
            
            setOrders(response.courseOrders);
            setPagination({
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                totalOrders: response.totalOrders
            });
        } catch (error) {
            toast.error("Failed to fetch slot orders. Please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            fetchOrders(newPage);
        }
    };

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
                            <p className="text-2xl font-bold">{pagination.totalOrders}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Table */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="grid grid-cols-12 p-4 border-b text-gray-500 font-medium">
                    <div className="col-span-6">Course</div>
                    <div className="col-span-3">Date</div>
                    <div className="col-span-1">Price</div>
                    <div className="col-span-2">Payment Status</div>
                </div>

                {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No course orders found</div>
                ) : (
                    orders.map((order) => {
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
                                <div className="col-span-3 text-gray-500">{formatDate(order.purchaseDate)}</div>
                                <div className="col-span-1 font-medium">₹{order.amount}</div>
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
                    })
                )}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={pagination.currentPage === 1}
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-500">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={pagination.currentPage === pagination.totalPages}
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CourseOrderList;