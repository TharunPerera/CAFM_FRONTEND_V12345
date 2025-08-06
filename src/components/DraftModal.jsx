"use client";

import { BookmarkIcon } from "lucide-react";

const DraftModal = ({ isOpen, onClose, onLoad, draftData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
              <BookmarkIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Draft Found
              </h3>
              <p className="text-sm text-gray-500">
                {draftData?.timestamp
                  ? new Date(draftData.timestamp).toLocaleString()
                  : "Recently saved"}
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            We found a saved draft of your asset form. Would you like to
            continue from where you left off?
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onLoad}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
            >
              Load Draft
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Start Fresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftModal;
