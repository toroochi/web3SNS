"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SNS() {
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePost = async () => {
    try {
      const response = await fetch("/api/postMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("Failed to post message");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to ChainChat</h1>
      <textarea
        className="mt-4 p-2 border border-gray-300 rounded"
        placeholder="What's on your mind?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handlePost}>
        Post
      </button>
      {errorMessage && (
        <div className="mt-4 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
}
