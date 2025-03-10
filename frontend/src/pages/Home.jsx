import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CpuChipIcon,
  CubeIcon, 
  BoltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl hover:transform hover:scale-105 transition-all duration-300 border border-white/10">
    <Icon className="h-12 w-12 text-blue-400 mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-blue-200">{label}</div>
  </div>
);

const Home = () => {
  const features = [
    {
      icon: CpuChipIcon,
      title: "Advanced AI Models",
      description: "Access cutting-edge AI models trained on diverse datasets, ready for immediate deployment."
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Transactions",
      description: "Enterprise-grade security with encrypted transactions and verified model authenticity."
    },
    {
      icon: BoltIcon,
      title: "Instant Deployment",
      description: "Deploy models instantly with our streamlined API integration and documentation."
    },
    {
      icon: CubeIcon,
      title: "Model Variety",
      description: "From NLP to Computer Vision, find the perfect AI model for your specific needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
                NexusAI
              </span>
            </h1>
            <p className="text-3xl text-blue-200 mb-8 font-light">
              The Premier Marketplace for Advanced AI Models
            </p>
            <p className="text-xl text-blue-200/80 mb-12 max-w-3xl mx-auto">
              Connect with leading AI developers, discover cutting-edge models, and transform your projects with state-of-the-art artificial intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/models"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Models
              </Link>
              <Link
                to="/sell"
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white text-lg font-semibold hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-200 border border-white/20"
              >
                Become a Seller
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 max-w-4xl mx-auto">
            <StatCard number="500+" label="AI Models" />
            <StatCard number="50k+" label="Developers" />
            <StatCard number="1M+" label="Deployments" />
            <StatCard number="99.9%" label="Uptime" />
          </div>

          {/* Features Grid */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
              Why Choose NexusAI?
            </h2>
            <p className="text-xl text-blue-200/80 text-center mb-12 max-w-3xl mx-auto">
              Experience the future of AI deployment with our comprehensive marketplace
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-full p-6 w-24 h-24 mx-auto mb-6">
                  <SparklesIcon className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">1. Discover</h3>
                <p className="text-blue-200/80">Browse our curated collection of AI models from top developers</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-full p-6 w-24 h-24 mx-auto mb-6">
                  <RocketLaunchIcon className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">2. Deploy</h3>
                <p className="text-blue-200/80">Integrate models seamlessly with our simple API and SDKs</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-full p-6 w-24 h-24 mx-auto mb-6">
                  <CircleStackIcon className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">3. Scale</h3>
                <p className="text-blue-200/80">Scale your AI capabilities with our robust infrastructure</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Projects?
            </h2>
            <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and businesses already leveraging NexusAI's marketplace.
            </p>
            <Link
              to="/models"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
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
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s linear infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Home;