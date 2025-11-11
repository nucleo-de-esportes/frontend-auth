import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary font-semibold text-lg">Carregando...</p>
      </div>
    </div>
  );
};

export default Loading;
