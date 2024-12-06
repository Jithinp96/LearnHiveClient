import React, { useEffect, useState, useRef } from 'react';
import { Award, Download } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Loader from '../ui/Loader';
import { fetchCertificateAPI } from '@/api/assessmentAPI/assessmentAPI';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';


interface CertificateData {
  studentId: {
    name: string;
  };
  assessmentId: {
    courseId: {
      title: string;
    };
    tutorId: {
      name: string;
    };
  };
  score: number;
  responses: any[];
  createdAt: string;
}

const Certificate: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        const response = await fetchCertificateAPI(assessmentId ?? '');
        setCertificateData(response);
      } catch (error) {
        toast.error("Error fetching the details. Please try again!")
        console.error('Error fetching certificate data:', error);
      }
    };

    fetchCertificateData();
  }, [assessmentId]);

  // const handlePrint = () => {
  //   window.print();
  // };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      // Use html2canvas to capture the certificate
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Increases resolution
        useCORS: true, // Handles cross-origin images
        logging: false // Disables logging
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      // Add the image to PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
      
      // Save the PDF
      pdf.save(`Certificate_${certificateData?.studentId.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  if (!certificateData) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Certificate Print Buttons */}
      <div className="mb-4 print:hidden">
        {/* <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="mr-4"
        >
          <Printer className="mr-2" /> Print Certificate
        </Button> */}
        <Button 
          onClick={handleDownloadPDF}
          variant="default"
        >
          <Download className="mr-2" /> Download PDF
        </Button>
      </div>
      {/* Certificate Container */}
      <div 
        ref={certificateRef}
        className="flex justify-center items-center w-full max-w-4xl"
      >
      <div className="relative bg-white shadow-2xl rounded-xl w-full max-w-4xl p-4">
        <div className="border-4 border-gray-700 rounded-lg relative">
          {/* Decorative Corner Flourishes */}
          <div className="absolute top-2 left-2 w-24 h-24 border-l-8 border-t-8 border-gray-500 rounded-tl-xl"></div>
          <div className="absolute top-2 right-2 w-24 h-24 border-r-8 border-t-8 border-gray-500 rounded-tr-xl"></div>
          <div className="absolute bottom-2 left-2 w-24 h-24 border-l-8 border-b-8 border-gray-500 rounded-bl-xl"></div>
          <div className="absolute bottom-2 right-2 w-24 h-24 border-r-8 border-b-8 border-gray-500 rounded-br-xl"></div>

          {/* Decorative Diagonal Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-stripe-pattern"></div>
            </div>
          </div>

          <div className="p-10 relative z-10">
            {/* Header Section */}
            <div className="flex justify-center items-center mb-4">
              <Award className="h-12 w-12 mr-4 text-blue-600" />
              <h1 className="text-5xl font-extrabold mb-4 text-center text-gray-800">
                Certificate of Completion
              </h1>
            </div>

            {/* Decorative Horizontal Line */}
            <div className="w-full h-1 bg-blue-500 mb-6 opacity-50"></div>

            <div className="flex justify-center items-center m-4">
              <p className="text-2xl font-semibold text-gray-700">
                This is to certify that
              </p>
            </div>

            {/* Name Section */}
            <h2 className="text-5xl font-bold mb-4 text-center text-blue-800 italic">
              {certificateData.studentId.name}
            </h2>

            <p className="text-2xl mb-4 text-center text-gray-600">
              Has successfully completed the course
            </p>

            {/* Course Section */}
            <h3 className="text-3xl font-bold mb-4 text-center text-gray-900">
              {certificateData.assessmentId.courseId.title}
            </h3>

            <p className="text-2xl text-center text-gray-600">
              With {Math.floor(((certificateData.score) / (certificateData.responses.length)) * 100)}% score in final assessment
            </p>

            {/* Footer Section */}
            <div className="flex justify-between items-center mt-10">
              <div className="flex flex-col items-center">
                <div className="w-48 h-1 bg-gray-300 mb-2"></div>
                <p className="text-xl text-gray-700">
                  Instructor: {certificateData.assessmentId.tutorId.name}
                </p>
              </div>

              <img
                src="/LogoLightBg.svg"
                alt="Company Logo"
                className="h-24 w-48 object-contain"
              />

              <div className="flex flex-col items-center">
                <div className="w-48 h-1 bg-gray-300 mb-2"></div>
                <p className="text-xl text-gray-700">
                  Date: {format(new Date(certificateData.createdAt), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Certificate;