// src/app/components/Loader.js

import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  );
}
