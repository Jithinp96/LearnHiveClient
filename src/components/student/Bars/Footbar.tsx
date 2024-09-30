import React from "react";

const Footer: React.FC = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="items-center flex">
                <img
                    src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/logo/LogoDark.png"
                    alt="LearnHive Logo"
                    width={200}
                />
            </div>
            <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li><a href="#" className="hover:text-gray-300">Courses</a></li>
                    <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
                    <li><a href="#" className="hover:text-gray-300">Support Community</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Policies</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-gray-300">Terms and Conditions</a></li>
                    <li><a href="#" className="hover:text-gray-300">Payment Policy</a></li>
                </ul>
            </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 LearnHive</p>
        </div>
      </div>
    </footer>
);

export default Footer;