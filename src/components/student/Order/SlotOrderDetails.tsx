import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MessageSquare, Check, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cancelSlotOrderAPI, getSlotOrderDetailsAPI } from '@/api/studentAPI/studentAPI';
import ConfirmActionDialog from '@/components/ui/ConfirmationBox';

interface Slot {
    subject: string;
    level: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingLink?: string | null;
}

interface Order {
    _id: string;
    slotId: Slot;
    address: string;
    createdAt: string;
    amount: number;
    sessionStatus: string;
}

const SlotOrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isCanceling, setIsCanceling] = useState<{ [key: string]: boolean }>({});
    const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({});

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getSlotOrderDetailsAPI();
                setOrders(response);
            } catch (error) {
                toast.error("Failed to fetch slot orders. Please try again!");
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId: string) => {
        try {
            setIsCanceling(prev => ({ ...prev, [orderId]: true }));
            await cancelSlotOrderAPI(orderId);
            toast.success("Slot cancelled and refund initiated!");

            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } catch (error) {
            toast.error("Failed to cancel the slot. Please try again.");
        } finally {
            setIsCanceling(prev => ({ ...prev, [orderId]: false }));
        }
    };

    const handleCopyLink = async (orderId: string, meetingLink: string) => {
        try {
            await navigator.clipboard.writeText(meetingLink);
            setCopiedLinks(prev => ({ ...prev, [orderId]: true }));
            toast.success("Meeting link copied to clipboard!");

            setTimeout(() => {
                setCopiedLinks(prev => ({ ...prev, [orderId]: false }));
            }, 2000);
        } catch (error) {
            toast.error("Failed to copy link");
        }
    };

    const handleDelete = (id: string) => {
        console.log("Id got: ", id);
        handleCancelOrder(id);
    };

    const getStatusClasses = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-50 text-green-600';
            case 'Scheduled':
                return 'bg-blue-50 text-blue-600';
            case 'Cancelled':
                return 'bg-red-50 text-red-600';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

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
                    <div className="col-span-2">Purchase Date</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-1">Session Status</div>
                    <div className="col-span-1">Action</div>
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
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <p className="font-medium">{formatDate(order.slotId.date)}</p>
                                        <p className="text-sm text-gray-500">{order.slotId.startTime} - {order.slotId.endTime}</p>
                                    </div>
                                    {order.slotId.meetingLink && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1 h-7 w-fit"
                                            onClick={() => handleCopyLink(order._id, order.slotId.meetingLink!)}
                                        >
                                            {copiedLinks[order._id] ? (
                                                <>
                                                    <Check size={14} className="text-green-600" />
                                                    <span className="text-sm">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <LinkIcon size={14} />
                                                    <span className="text-sm">Copy Meeting Link</span>
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 text-gray-500">{formatDate(order.createdAt)}</div>
                            <div className="col-span-2 font-medium">₹{order.amount}</div>
                            <div className="col-span-1 flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusClasses(order.sessionStatus)}`}>
                                    {order.sessionStatus}
                                </span>
                            </div>
                            <div className="col-span-1">
                            <ConfirmActionDialog
                                title="Cancel Slot Order"
                                triggerElement={{
                                    type: 'button',
                                    content: isCanceling[order._id] ? 'Cancelling...' : 'Cancel',
                                }}
                                isDisabled={isCanceling[order._id]} // New prop to indicate if the action is disabled
                                description="Are you sure you want to cancel this slot? This action cannot be undone."
                                confirmText="Confirm Cancel"
                                cancelText="Close"
                                onConfirm={() => handleDelete(order._id)}
                                variant="destructive"
                            />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SlotOrderList;