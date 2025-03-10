import React from 'react';
import { auth } from '../firebase';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ShoppingBagIcon 
} from '@heroicons/react/24/outline';

const ProfileSection = ({ icon: Icon, title, value }) => (
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/10">
    <div className="flex items-center space-x-4">
      <Icon className="h-6 w-6 text-blue-400" />
      <div>
        <h3 className="text-sm font-medium text-blue-200">{title}</h3>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const user = auth.currentUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-2 rounded-full bg-white/10 backdrop-blur-lg mb-4">
            <UserCircleIcon className="h-24 w-24 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Your Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProfileSection
            icon={EnvelopeIcon}
            title="Email"
            value={user ? user.email : 'Not logged in'}
          />
          <ProfileSection
            icon={ClockIcon}
            title="Member Since"
            value={user ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
          />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <ShoppingBagIcon className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Your Purchases</h2>
          </div>
          <div className="space-y-4">
            {/* Placeholder for purchases - you can map through actual purchases here */}
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white">No purchases yet</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Edit Profile
          </button>
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

export default Profile;