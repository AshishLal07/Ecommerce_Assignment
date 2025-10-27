import React from "react";

const TransactionModal = ({ isOpen, onClose, status, message }) => {
  if (!isOpen) return null;

  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-6 text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Icon Circle */}
        <div
          className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
            isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <span
            className={`text-4xl ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "✔" : "✖"}
          </span>
        </div>

        {/* Message */}
        <h2
          className={`text-xl font-semibold mb-2 ${
            isSuccess ? "text-green-700" : "text-red-700"
          }`}
        >
          {isSuccess ? "Payment Successful! " : "Payment Failed"}
          Transaction Order Id {message}
        </h2>
        <p className="text-gray-600 mb-6">
          {isSuccess
            ? "Your transaction was completed successfully."
            : "There was a problem processing your payment. Please try again."}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`w-full py-2 rounded-lg font-medium ${
            isSuccess
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
