import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: ContainerProps) => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-100 flex">
        <div className="max-w-4xl mx-auto bg-white shadow-sm flex flex-grow items-center justify-center p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainContainer;
