"use client";
import React, { useState } from "react";

export type ButtonProps = {
  context?: string;
  type?: "default" | "alert" | "none";
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  context,
  type = "default",
}) => {
  const [hovered, setHoverd] = useState(false);
  const typeClass = {
    default: "bg-sns-pink text-sns-white",
    alert: "bg-sns-error text-sns-white",
    none: "",
  };

  return (
    <div
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}>
      <button
        className={`${typeClass[type]} px-10 py-3 rounded-xl border leading-none font-bold text-4xl transform transition-transform duration-300 ${
          hovered ? "scale-110" : ""
        }`}>
        {context}
      </button>
    </div>
  );
};
