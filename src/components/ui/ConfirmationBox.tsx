import React, { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

interface ConfirmActionDialogProps {
  onConfirm: () => void;
  triggerElement: {
    type: 'button' | 'icon' | 'text';
    content: string;
    iconName?: IconName;
  };
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  onConfirm,
  triggerElement,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default'
}) => {
  const getTriggerElement = (): ReactNode => {
    if (triggerElement.type === 'button') {
      return (
        <Button variant={variant}>{triggerElement.content}</Button>
      );
    } else if (triggerElement.type === 'icon' && triggerElement.iconName) {
      const IconComponent = LucideIcons[triggerElement.iconName] as React.ComponentType<{ className?: string }>;
      return <IconComponent className="h-5 w-5 cursor-pointer" />;
    }
    return null;
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {getTriggerElement()}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmActionDialog;