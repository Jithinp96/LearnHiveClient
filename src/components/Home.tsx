import React from "react"
import { Book, Users, Star } from 'lucide-react';

const HeroSection: React.FC = () => (
    <section className="bg-blue-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome!</h1>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">To the Hive of Smart Learning</h1>
          <p className="text-xl mb-6">World-class education for anyone, anywhere.</p>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/Images/Banner.png" alt="Students learning" className=""/>
        </div>
      </div>
    </section>
);

const JoinUs: React.FC = () => (
    <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Join Us As</h2>
            {/* Tutor */}
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            
                {/* Left side with images */}
                <div className="md:w-1/2 relative mb-8 md:mb-0">
                    <img
                        src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/Images/Teacher.png"
                        alt="Teacher Image"
                        width={450}
                    />
                </div>

                {/* Right side with text content */}
                <div className="md:w-1/2 md:pl-12">
                <h2 className="uppercase text-gray-500 font-semibold mb-4">TUTOR</h2>
                <blockquote className="text-3xl font-bold mb-6">
                    "I'm finally able to truly differentiate my classroom. This has been priceless for my students' engagement."
                </blockquote>
                
                <p className="mb-6">
                    We empower teachers to support their entire classroom. 90% of US teachers who have used Khan Academy have found us effective.
                </p>
                <a href="/tutor/auth">
                  <button className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300">
                    Tutors, Start Here
                  </button>
                </a>
                </div>
            </div>

            
            {/* Student */}
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                
                {/* Left side with text content */}
                <div className="md:w-1/2 md:pl-12">
                    <h2 className="uppercase text-gray-500 font-semibold mb-4">STUDENT</h2>
                    <blockquote className="text-3xl font-bold mb-6">
                        "You can learn anything."
                    </blockquote>
                    
                    <p className="mb-6">
                        Build a deep, solid understanding in math, science, grammar, history, and more.
                    </p>
                    <a href="/auth">
                      <button className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300">
                        Students, Start Here
                      </button>
                    </a>
                </div>
                {/* Right side with images */}
                <div className="md:w-1/2 relative mb-8 md:mb-0">
                    <img
                        src="https://learnhive.s3.ap-south-1.amazonaws.com/assets/Images/Student.png"
                        alt="Student Image"
                    />
                </div>
            </div>
        </div>
    </section>
);
  
const BenefitItem: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
);
  
const BenefitsSection: React.FC = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why LearnHive works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <BenefitItem
            icon="🎯"
            title="Personalized learning"
            description="Students practice at their own pace, first filling in gaps in their understanding and then accelerating their learning."
          />
          <BenefitItem
            icon="📚"
            title="Trusted content"
            description="Created by experts, LearnHive's library of trusted, standards-aligned practice and lessons covers math K-12 through early college, grammar, science, history, SAT®, and more. It's all free for learners and teachers."
          />
          <BenefitItem
            icon="📊"
            title="Tools to empower teachers"
            description="With LearnHive, teachers can identify gaps in their students' understanding, tailor instruction, and meet the needs of every student."
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-100 p-6 rounded-lg shadow-sm">
              <Book className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Diverse Course Catalog</h3>
              <p className="text-purple-600">Explore a wide range of subjects taught by industry experts</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-sm">
              <Users className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Interactive Learning</h3>
              <p className="text-yellow-600">Engage with instructors and peers in our vibrant community</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-sm">
              <Star className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Self-Paced Learning</h3>
              <p className="text-green-600">Learn at your own pace with flexible course schedules</p>
            </div>
          </div>
        </div>
    </section>
    
);
  
const CourseSection: React.FC = () => (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What LearnHive offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Math', 'Science', 'Computing', 'Arts & humanities', 'Economics', 'Test prep'].map((subject) => (
            <div key={subject} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{subject}</h3>
              <p className="text-gray-600 mb-4">Explore our world-class {subject.toLowerCase()} content</p>
              {/* <Button variant="outline" className="text-blue-600 hover:bg-blue-50">Start learning</Button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
);
  
const TestimonialSection: React.FC = () => (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Join millions of learners worldwide</h2>
        <p className="text-xl mb-8">"I studied through LearnHive and got a 1450 on the SAT. I'm going to college!"</p>
        <p className="font-semibold">- Samantha, Student</p>
      </div>
    </section>
);
  

  
const Home: React.FC = () => {
    return (
      <div className="min-h-screen flex flex-col">
          <HeroSection />
          <JoinUs />
          <BenefitsSection />
          <CourseSection />
          <TestimonialSection />
      </div>
    );
};

export default Home