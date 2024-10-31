import React, { useState, useEffect } from 'react';
import { Calendar, CalendarPlus, Clock, GraduationCap, IndianRupee } from 'lucide-react';

import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { fetchSubjectsAPI, createSlotAPI, editSlotAPI, fetchSlotsAPI, generateSlotsAPI, generateSlotsPreferenceAPI } from '@/api/tutorAPI/tutorAxios';

import AddEditModal from './AddEditModal';
import AutoGenerateModal from './AutoGenerateModal';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

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
  const [isAutoGenModalOpen, setIsAutoGenModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingSlot, setEditingSlot] = useState<TutorSlot | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [selectedSlot, setSelectedSlot] = useState<TutorSlot | null>(null);

  const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [requiresDailySlotCreation, setRequiresDailySlotCreation] = useState<boolean>(false);

  const { tutorInfo } = useSelector((state: RootState) => state.tutor);

  if(!tutorInfo) {
    console.error("Please login. Info missing");
    return
  }
  const tutorId = tutorInfo._id;

  const generateTimeSlots = () => {
    const slots = [];
    const current = new Date();
    const startHour = current.getHours();
    const startMinute = current.getMinutes();
    
    let baseMinutes = Math.ceil((startHour * 60 + startMinute) / 30) * 30 + 120;
    
    for (let minutes = baseMinutes; minutes < 24 * 60; minutes += 30) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
    
    return slots;
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!subject) errors.subject = "Subject is required";
    if (!level) errors.level = "Level is required";
    if (!date) errors.date = "Date is required";
    if (!startTime) errors.startTime = "Start time is required";
    if (!endTime) errors.endTime = "End time is required";
    if (!price) errors.price = "Price is required";
    
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      
      if (end <= start) {
        errors.endTime = "End time must be after start time";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
        console.log("slotsResponse.data: ", slotsResponse.data);
        
        setSlots(slotsResponse.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubjectChange = (selectedSubject: string) => {
    setSubject(selectedSubject);
    setValidationErrors(prev => ({ ...prev, subject: "" }));
    const subjectDetails = subjects.find(sub => sub.name === selectedSubject);
    if (subjectDetails) {
      setLevel(subjectDetails.level);
      setValidationErrors(prev => ({ ...prev, level: "" }));
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
    setValidationErrors({});
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
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        console.log("newSlotResponse after one slot: ", newSlotResponse.data);
        
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

  const timeSlots = generateTimeSlots();

  const handleAddClick = () => {
    setIsEditMode(false);
    resetForm();
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (slot: TutorSlot) => {
    handleOpenEdit(slot);
    setSelectedSlot(slot);
  };

  const handleAutoGenSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const slotGeneratePreferenceData = {
      tutorId,
      subject,
      level,
      date,
      startTime,
      endTime,
      price: parseFloat(price),
      requiresDailySlotCreation,
    };

    const slotGenerateData = {
      tutorId,
      subject,
      level,
      date,
      startTime,
      endTime,
      price: parseFloat(price),
    };

    try {
      if(slotGeneratePreferenceData.requiresDailySlotCreation === false) {
        const response = await generateSlotsAPI(slotGenerateData)
        if(response.status === 200) {
          setSlots(prevSlots => [...prevSlots, ...response.data.newSlots]);
          toast.success("Slots created successfully!")
        } else {
          toast.error("Failed to create slots. Please try again!")
        }
        
      } else {
        const response = await generateSlotsPreferenceAPI(slotGeneratePreferenceData)
        if(response.status === 200) {
          toast.success("Slots Preference Saved Successfully!")
        } else {
          toast.error("Failed to save slot preference. Please try again!")
        }
      }
      setIsAutoGenModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error generating slots:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tutor Slots</h1>
        <div className="flex gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            onClick={() => setIsAutoGenModalOpen(true)}
          >
            <CalendarPlus size={18} />
            Auto Generate Slots
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleAddClick}
          >
            Add New Slot
          </Button>
        </div>
      </div>


      <Dialog open={isModalOpen} onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) {
          resetForm();
          setSelectedSlot(null);
        }
      }}>
        <AddEditModal
          isOpen={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) resetForm();
          }}
          isEditMode={isEditMode}
          subject={subject}
          level={level}
          date={date}
          startTime={startTime}
          endTime={endTime}
          price={price}
          subjects={subjects}
          timeSlots={timeSlots}
          validationErrors={validationErrors}
          onSubmit={handleSubmit}
          handleSubjectChange={handleSubjectChange}
          setLevel={setLevel}
          setDate={setDate}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setPrice={setPrice}
        />
      </Dialog>

      {/* New Auto Generation Modal */}
      <AutoGenerateModal
        isOpen={isAutoGenModalOpen}
        onOpenChange={setIsAutoGenModalOpen}
        subject={subject}
        level={level}
        endDate={date}
        startTime={startTime}
        endTime={endTime}
        price={price}
        requiresDailySlotCreation={requiresDailySlotCreation}
        subjects={subjects}
        timeSlots={timeSlots}
        validationErrors={validationErrors}
        onSubmit={handleAutoGenSubmit}
        handleSubjectChange={handleSubjectChange}
        setLevel={setLevel}
        setEndDate={setDate}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setPrice={setPrice}
        setRequiresDailySlotCreation={setRequiresDailySlotCreation}
      />

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
                onClick={() => handleEditClick(slot)}
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