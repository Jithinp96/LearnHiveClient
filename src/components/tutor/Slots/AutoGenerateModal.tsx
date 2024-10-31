import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AutoGenerateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subject: string;
  level: string;
  endDate: Date;
  startTime: string;
  endTime: string;
  price: string;
  requiresDailySlotCreation: boolean;
  subjects: Subject[];
  timeSlots: string[];
  validationErrors: {[key: string]: string};
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSubjectChange: (subject: string) => void;
  setLevel: (level: string) => void;
  setEndDate: (date: Date) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setPrice: (price: string) => void;
  setRequiresDailySlotCreation: (value: boolean) => void;
}

interface Subject {
  name: string;
  level: string;
}

const AutoGenerateModal: React.FC<AutoGenerateModalProps> = ({
  isOpen,
  onOpenChange,
  subject,
  level,
  endDate,
  startTime,
  endTime,
  price,
  requiresDailySlotCreation,
  subjects,
  timeSlots,
  validationErrors,
  onSubmit,
  handleSubjectChange,
  setLevel,
  setEndDate,
  setStartTime,
  setEndTime,
  setPrice,
  setRequiresDailySlotCreation,
}) => {
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Set Auto Slot Generation Preferences
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject *</label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className={`w-full rounded-md border p-2 bg-white ${
                  validationErrors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select subject</option>
                {subjects.map((sub) => (
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
              <label htmlFor="level" className="text-sm font-medium">Level *</label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={`w-full rounded-md border p-2 bg-white ${
                  validationErrors.level ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select level</option>
                {subjects.map((sub) => (
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
            <label htmlFor="endDate" className="text-sm font-medium">End Date *</label>
            <Input
              id="endDate"
              type="date"
              value={endDate instanceof Date && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              min={getMinDate()}
              className={`w-full ${validationErrors.endDate ? 'border-red-500' : ''}`}
              required
            />
            {validationErrors.endDate && (
              <p className="text-red-500 text-sm">{validationErrors.endDate}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="startTime" className="text-sm font-medium">Start Time *</label>
              <select
                id="startTime"
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
              <label htmlFor="endTime" className="text-sm font-medium">End Time *</label>
              <select
                id="endTime"
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
            <label htmlFor="price" className="text-sm font-medium">Price (₹INR) *</label>
            <Input
              id="price"
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="dailySlotCreation"
              checked={requiresDailySlotCreation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequiresDailySlotCreation(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="dailySlotCreation" className="text-sm">
              Create slots daily (If unchecked, slots will be created immediately for the entire period)
            </label>
          </div>

          <Button type="submit" className="w-full">
            Save Preferences
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AutoGenerateModal;