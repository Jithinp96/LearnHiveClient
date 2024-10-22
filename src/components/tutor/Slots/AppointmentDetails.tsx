import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, GraduationCap, IndianRupee } from 'lucide-react';
import { fetchSubjectsAPI, createSlotAPI, editSlotAPI, fetchSlotsAPI } from '@/api/tutorAPI/tutorAxios';

interface TutorSlot {
  _id: string;
  subject: string;
  level: string;
  date: Date;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
}

interface Subject {
  name: string;
  level: string;
}

const TutorAppointmentDetails: React.FC = () => {
  const [slots, setSlots] = useState<TutorSlot[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingSlot, setEditingSlot] = useState<TutorSlot | null>(null);


  const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetchSubjectsAPI();
        const subjectsData = response.data.subjects;
        if (Array.isArray(subjectsData)) {
          setSubjects(subjectsData);
        } else {
          console.error("Invalid data structure:", subjectsData);
        }
        const slotsResponse = await fetchSlotsAPI();
        setSlots(slotsResponse.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);
  

  const handleSubjectChange = (selectedSubject: string) => {
    setSubject(selectedSubject);
    const subjectDetails = subjects.find(sub => sub.name === selectedSubject);
    if (subjectDetails) {
      setLevel(subjectDetails.level);
    }
  };

  const resetForm = (): void => {
    setSubject("");
    setLevel("");
    setDate(new Date());
    setStartTime("");
    setEndTime("");
    setPrice("");
    setEditingSlot(null);
    setIsEditMode(false);
  };

  const handleOpenEdit = (slot: TutorSlot) => {
    setEditingSlot(slot);
    setIsEditMode(true);
    setSubject(slot.subject);
    setLevel(slot.level);
    setDate(slot.date);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setPrice(slot.price.toString());
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const slotData = {
      subject,
      level,
      date,
      startTime,
      endTime,
      price: parseFloat(price),
      isBooked: false,
    };

    try {
      if (isEditMode && editingSlot) {
        await editSlotAPI(editingSlot._id, slotData);
        setSlots(prevSlots =>
          prevSlots.map(slot => (slot._id === editingSlot._id ? { ...slot, ...slotData } : slot))
        );
      } else {
        const newSlotResponse = await createSlotAPI(slotData);
        setSlots(prevSlots => [...prevSlots, newSlotResponse.data]);
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving slot:', error);
    }
  };

  const formatDate = (date: any): string => {
    const validDate = new Date(date);
  
    if (isNaN(validDate.getTime())) {
      throw new Error('Invalid date');
    }
  
    return validDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tutor Slots</h1>
        <Dialog open={isModalOpen} onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add New Slot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" aria-labelledby="dialog-title" aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? 'Edit Tutoring Slot' : 'Add New Tutoring Slot'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 bg-white"
                    required
                  >
                    <option value="">Select subject</option>
                    {Array.isArray(subjects) && subjects.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 bg-white"
                    required
                  >
                    <option value="">Select level</option>
                    {Array.isArray(subjects) && subjects.map((sub) => (
                      <option key={sub.name} value={sub.level}>
                        {sub.level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Input
                  type="date"
                  value={date instanceof Date && !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : ''}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className="w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price (₹INR)</label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {isEditMode ? 'Save Changes' : 'Add Slot'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slots.map((slot: TutorSlot) => (
          <Card
            key={slot._id}
            className={`transform transition-all duration-200 hover:scale-105 ${
              slot.isBooked ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'
            }`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{slot.subject}</span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    slot.isBooked
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {slot.isBooked ? 'Booked' : 'Available'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap size={18} />
                <span>{slot.level}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span>{formatDate(slot.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>{slot.startTime} - {slot.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <IndianRupee size={18} />
                <span>{slot.price}</span>
              </div>
              <Button
                className={`w-full ${
                  slot.isBooked
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                disabled={slot.isBooked}
                onClick={() => handleOpenEdit(slot)}
              >
                {slot.isBooked ? 'Booked' : 'Edit Slot'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TutorAppointmentDetails;