import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  subject: string;
  level: string;
  date: Date;
  startTime: string;
  endTime: string;
  price: string;
  subjects: Subject[];
  timeSlots: string[];
  validationErrors: {[key: string]: string};
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSubjectChange: (subject: string) => void;
  setLevel: (level: string) => void;
  setDate: (date: Date) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setPrice: (price: string) => void;
}

interface Subject {
  name: string;
  level: string;
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  subject,
  level,
  date,
  startTime,
  endTime,
  price,
  subjects,
  timeSlots,
  validationErrors,
  onSubmit,
  handleSubjectChange,
  setLevel,
  setDate,
  setStartTime,
  setEndTime,
  setPrice,
}) => {
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Tutoring Slot' : 'Add New Tutoring Slot'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject *</label>
              <select
                value={subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className={`w-full rounded-md border p-2 bg-white ${
                  validationErrors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select subject</option>
                {Array.isArray(subjects) && subjects.map((sub) => (
                  <option key={sub.name} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {validationErrors.subject && (
                <p className="text-red-500 text-sm">{validationErrors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level *</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={`w-full rounded-md border p-2 bg-white ${
                  validationErrors.level ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select level</option>
                {Array.isArray(subjects) && subjects.map((sub) => (
                  <option key={sub.name} value={sub.level}>
                    {sub.level}
                  </option>
                ))}
              </select>
              {validationErrors.level && (
                <p className="text-red-500 text-sm">{validationErrors.level}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date *</label>
            <Input
              type="date"
              value={date instanceof Date && !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : ''}
              onChange={(e) => setDate(new Date(e.target.value))}
              min={getMinDate()}
              className={`w-full ${validationErrors.date ? 'border-red-500' : ''}`}
              required
            />
            {validationErrors.date && (
              <p className="text-red-500 text-sm">{validationErrors.date}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time *</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`w-full rounded-md border p-2 bg-white ${
                  validationErrors.startTime ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select start time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {validationErrors.startTime && (
                <p className="text-red-500 text-sm">{validationErrors.startTime}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Time *</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`w-full rounded-md border p-2 bg-white ${
                  validationErrors.endTime ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select end time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {validationErrors.endTime && (
                <p className="text-red-500 text-sm">{validationErrors.endTime}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Price (₹INR) *</label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              className={`w-full ${validationErrors.price ? 'border-red-500' : ''}`}
              required
            />
            {validationErrors.price && (
              <p className="text-red-500 text-sm">{validationErrors.price}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isEditMode ? 'Save Changes' : 'Add Slot'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditModal;