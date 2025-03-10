import React, { useState } from 'react';
import { 
  CubeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  TagIcon,
  PhotoIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

const FormField = ({ icon: Icon, label, type = "text", placeholder, value, onChange }) => (
  <div className="mb-6">
    <label className="flex items-center space-x-2 text-blue-200 mb-2">
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </label>
    {type === "textarea" ? (
      <textarea
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

const SellModel = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-2 rounded-full bg-white/10 backdrop-blur-lg mb-4">
            <CubeIcon className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Sell Your AI Model
          </h1>
          <p className="text-xl text-blue-200">
            Share your innovation with the world
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/10">
          <FormField
            icon={CubeIcon}
            label="Model Name"
            placeholder="Enter your model name"
            value={formData.name}
            onChange={handleChange('name')}
          />

          <FormField
            icon={DocumentTextIcon}
            label="Description"
            type="textarea"
            placeholder="Describe your model's capabilities and use cases"
            value={formData.description}
            onChange={handleChange('description')}
          />

          <FormField
            icon={CurrencyDollarIcon}
            label="Price"
            type="number"
            placeholder="Set your price"
            value={formData.price}
            onChange={handleChange('price')}
          />

          <FormField
            icon={TagIcon}
            label="Category"
            placeholder="e.g., Language Processing, Computer Vision"
            value={formData.category}
            onChange={handleChange('category')}
          />

          <div className="mb-8">
            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white/5 border-2 border-white/10 border-dashed rounded-xl appearance-none cursor-pointer hover:border-blue-400/60 focus:outline-none">
              <span className="flex items-center space-x-2">
                <CloudArrowUpIcon className="w-6 h-6 text-blue-400" />
                <span className="text-blue-200">Upload model files or drop them here</span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              List Your Model
            </button>
          </div>
        </form>
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

export default SellModel;