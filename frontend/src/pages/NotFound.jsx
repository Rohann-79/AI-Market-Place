import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50">
      <h1 className="text-5xl font-bold text-blue-900 mb-4">404</h1>
      <p className="text-xl text-blue-700 mb-8">Page Not Found</p>
      <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;