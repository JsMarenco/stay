// Third-party dependencies
import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// Current project dependencies

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ message, isOpen, onClose }: ModalProps) {
  const modalRoot = document.getElementById("modals");

  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <div className="relative w-11/12 max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 rounded-full p-2 text-gray-500 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FaTimes size={18} />
              </button>

              <div className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                {message}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot,
  );
}
