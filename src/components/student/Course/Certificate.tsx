import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const Certificate: React.FC = () => {
  const name = 'Harumi Kobayashi';
  const program = 'LearnHive';
  const dates = 'July-Sept 2024';

  return (
    <Card className="w-full max-w-4xl shadow-2xl border-2 border-blue-100">
      <CardContent className="p-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="flex flex-col items-center text-center">
          <GraduationCap size={80} className="text-blue-700 mb-6 opacity-80" />
          
          <h1 className="text-5xl font-extrabold mb-4 text-blue-800 tracking-wider">
            CERTIFICATE OF COMPLETION
          </h1>
          
          <div className="border-b-4 border-blue-600 w-1/2 mb-6"></div>
          
          <p className="text-xl mb-4 text-gray-700">
            This certificate is hereby awarded to
          </p>
          
          <h2 className="text-6xl font-bold mb-6 text-blue-900 italic">
            {name}
          </h2>
          
          <p className="text-xl mb-4 text-gray-700">
            In recognition of successfully completing the program at
          </p>
          
          <h3 className="text-4xl font-semibold mb-6 text-blue-800">
            {program}
          </h3>
          
          <p className="text-xl mb-8 text-gray-700">
            on {dates}
          </p>
          
          {/*  */}
        </div>
      </CardContent>
    </Card>
  );
};

export default Certificate;