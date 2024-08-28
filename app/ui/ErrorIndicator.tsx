import React from "react";

export const ErrorIndicator: React.FC<{
  error: string;
  retryFunc: () => void;
}> = ({ error, retryFunc }) => {
  return (
    <div className="flex flex-col w-full h-full min-h-[300px] justify-center items-center">
      <div className="mb-4">
        <span className="w-20 h-auto text-gray-400">☹️</span>
      </div>
      <h1 className="mb-4 text-center text-5xl font-bold text-gray-800">
        Oops!
      </h1>
      <p className="mb-8 flex flex-col text-center text-gray-600 md:mx-auto md:max-w-lg">
        {" "}
        <strong>An error occured:</strong> {error}
      </p>
      <button
        className="bg-primary-500 hover:bg-primary-400 rounded-md px-5 py-2 text-sm text-white transition-colors"
        onClick={retryFunc}
      >
        Try again
      </button>
    </div>
  );
};
