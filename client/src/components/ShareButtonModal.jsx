import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { toast } from "react-toastify";

const ShareModal = ({ isOpen, closeModal }) => {
  return (
    <Transition appear={true} show={isOpen} as={Fragment}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
        <div className="relative top-20 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-medium text-gray-900">
              Share with Friends
            </h2>
            <div className="px-7 py-3 text-center">
              <p className="text-sm text-gray-500">
                There are number of ways to share the Event with other people.
              </p>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <input
                type="text"
                className="w-full h-10 border border-gray-300 rounded-md px-2"
                value={window.location.href}
                readOnly
              />
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none hover:bg-opacity-90`}
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.href +
                      "?utm_source=share&utm_medium=link&utm_campaign=website-event-share"
                  );
                  toast.success("Link Copied to Clipboard");
                }}
              >
                Copy
              </button>
            </div>
            <div className="px-4 py-3">
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm focus:outline-none hover:bg-opacity-90"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default ShareModal;
