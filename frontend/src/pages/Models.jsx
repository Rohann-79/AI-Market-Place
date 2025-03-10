import React from 'react';
import { 
  CpuChipIcon, 
  StarIcon, 
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline';

const ModelCard = ({ name, description, price, rating, category }) => (
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl hover:transform hover:scale-105 transition-all duration-300 border border-white/10">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <CpuChipIcon className="h-8 w-8 text-blue-400" />
        <div>
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <span className="text-sm text-blue-300">{category}</span>
        </div>
      </div>
      <div className="flex items-center text-yellow-400">
        <StarIcon className="h-5 w-5" />
        <span className="ml-1 text-sm">{rating}</span>
      </div>
    </div>
    <p className="mt-4 text-gray-300">{description}</p>
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center text-green-400">
        <CurrencyDollarIcon className="h-6 w-6" />
        <span className="text-xl font-bold">{price}</span>
      </div>
      <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        <span>Buy Now</span>
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const Models = () => {
  const sampleModels = [
    {
      name: "GPT-4 Fine-tuned",
      description: "Advanced language model fine-tuned for specialized tasks with enhanced performance and accuracy.",
      price: "499",
      rating: "4.9",
      category: "Language Processing"
    },
    {
      name: "Vision Transformer Pro",
      description: "State-of-the-art computer vision model for image recognition and object detection.",
      price: "399",
      rating: "4.8",
      category: "Computer Vision"
    },
    {
      name: "Neural Audio Generator",
      description: "Advanced audio synthesis model capable of generating realistic sound effects and music.",
      price: "299",
      rating: "4.7",
      category: "Audio Processing"
    },
    {
      name: "Recommendation Engine",
      description: "Powerful recommendation system trained on large-scale user interaction data.",
      price: "599",
      rating: "4.9",
      category: "Recommendation Systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Available AI Models
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Discover cutting-edge AI models trained by experts and ready for deployment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleModels.map((model, index) => (
            <ModelCard key={index} {...model} />
          ))}
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Models;