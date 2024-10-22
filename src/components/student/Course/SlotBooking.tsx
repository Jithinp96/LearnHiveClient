import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, IndianRupee, BookOpen } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createPaymentIntentAPI,
  getTutorSlotsAPI,
} from "@/api/studentAPI/studentAPI";

interface TimeSlot {
  _id: string;
  tutorId: string;
  subject: string;
  level: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  price: number;
}

interface SlotBookingProps {
  // Add any required props here
}

const SlotBooking: React.FC<SlotBookingProps> = () => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const { tutorId } = useParams();

  useEffect(() => {
    const fetchSlots = async () => {
      if (!tutorId) return;
      try {
        const response = await getTutorSlotsAPI(tutorId);
        setAvailableSlots(response?.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    if (tutorId) {
      fetchSlots();
    }
  }, [tutorId]);

  const handleBookNow = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handlePayNow = async () => {
    if (!selectedSlot) return;
    try {
      const stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripe = await loadStripe(stripe_key);
      const session = await createPaymentIntentAPI(selectedSlot);

      const result = stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      
      setIsModalOpen(false);
      // Refresh slots
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Group slots by date
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    const date = new Date(slot.date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as { [key: string]: TimeSlot[] });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Available Slots
          </h1>
          <p className="mt-2 text-gray-600">
            Select a time slot that works best for you
          </p>
        </div>

        {Object.entries(slotsByDate).map(([date, slots]) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{formatDate(date)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <Card
                  key={slot._id}
                  className={slot.isBooked ? "opacity-60" : ""}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-4 w-4" />
                      <span>
                        {slot.subject} - {slot.level}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span>
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(slot.date)}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-700">
                        <IndianRupee className="h-4 w-4" />
                        <span className="font-semibold">
                          {slot.price || 500}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleBookNow(slot)}
                        disabled={slot.isBooked}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {slot.isBooked ? "Booked" : "Book Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                Please review the slot details before proceeding with payment
              </DialogDescription>
            </DialogHeader>

            {selectedSlot && (
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span>
                      {selectedSlot.subject} - {selectedSlot.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {selectedSlot.startTime} - {selectedSlot.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{formatDate(selectedSlot.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    <span>{selectedSlot.price || 500}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Total Amount:</span>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      <span className="font-bold">
                        {selectedSlot.price || 500}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handlePayNow}
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SlotBooking;
