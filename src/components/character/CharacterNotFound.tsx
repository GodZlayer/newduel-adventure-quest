
import React from "react";
import { Button } from "@/components/ui/button";

const CharacterNotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Character not found</h1>
      <p>The character you're looking for doesn't exist or has been deleted.</p>
      <Button className="mt-4" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default CharacterNotFound;
