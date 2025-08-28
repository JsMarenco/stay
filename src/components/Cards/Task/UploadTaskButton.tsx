// Third-party dependencies
import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaRedo } from "react-icons/fa";

// Current project dependencies
import type { Task, TaskCompletedDto } from "../../../schemas/task";
import Modal from "../../Common/Modal";
import useUpload from "../../../hooks/useUpload";

interface Props {
  task: Task;
}

const colorClasses: Record<string, string> = {
  purple:
    "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
  blue: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  orange:
    "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600",
  yellow:
    "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600",
  sky: "bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600",
  pink: "bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600",
  rose: "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600",
};

export default function UploadTaskButton({ task }: Props) {
  const { handleSelectFile, handleUploadFile, src } = useUpload();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const classColor = useMemo(() => {
    const keys = Object.keys(colorClasses);
    const randomIndex = Math.floor(Math.random() * keys.length);

    return colorClasses[keys[randomIndex]];
  }, []);

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);

    await handleUploadFile();

    const taskCompletedDto: TaskCompletedDto = {
      name: task.name,
      description: task.description,
      points: task.points,
      imageSrc: src || "",
    };

    try {
      const { data } = await axios.post(
        "/api/tasks/completed",
        taskCompletedDto,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccessMessage(data.message);
      setIsModalOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error uploading task:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="flex w-full items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleSelectFile(e.target.files[0])
          }
          className="hidden"
        />

        {!file && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-3 items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-bold text-white shadow-md transition-transform duration-200 hover:scale-105 ${classColor}`}
          >
            Seleccionar foto
          </button>
        )}

        {file && (
          <>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            >
              <FaPaperPlane size={20} />
              Enviar
            </button>

            <button
              onClick={handleReset}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-4 text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
            >
              <FaRedo size={20} />
              Reset
            </button>
          </>
        )}
      </div>

      <Modal
        message={successMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
