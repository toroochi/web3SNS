"use client";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../src/hook/firebase";

export default function SNS() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ id: string; account: string; text: string }>
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchMessages = async () => {
    console.log("aaa");
    try {
      const db = getFirestore(app);
      const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        account: doc.data().account,
        text: doc.data().message,
      }));

      setMessages(fetchedMessages);
      console.log("Fetched messages:", fetchedMessages); // メッセージをコンソールに出力
    } catch (error) {
      console.error("Error fetching messages:", error);
      setErrorMessage("Failed to fetch messages");
    }
  };

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
        setErrorMessage(""); // 以前のエラーメッセージをクリア
        fetchMessages(); // メッセージを再取得して更新
      } else {
        setErrorMessage(result.message || "Failed to post message");
      }
    } catch (error) {
      console.error("Error posting message:", error);
      setErrorMessage("Failed to post message");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to ChainChat</h1>
      <div className="w-full max-w-2xl mt-4 border border-gray-300 rounded">
        <textarea
          className="w-full p-2 outline-none"
          style={{ resize: "none", height: "200px" }}
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded mt-2"
          onClick={handlePost}>
          Post
        </button>
      </div>
      {errorMessage && (
        <div className="mt-4 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      <div className="w-full max-w-2xl mt-6 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="border-b border-gray-300 py-4">
            <div className="flex items-center mb-2">
              <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                {msg.account && msg.account.slice(0, 2)}
              </div>
              <div className="ml-2 font-bold">{msg.account}</div>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
