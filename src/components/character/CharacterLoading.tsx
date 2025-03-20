
import React from "react";

const CharacterLoading: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded w-1/4"></div>
        <div className="h-72 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default CharacterLoading;
