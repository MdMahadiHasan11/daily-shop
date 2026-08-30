"use client";

import React, { useState } from "react";

export interface FloatingInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix"
> {
  label?: React.ReactNode;
  required?: boolean;
  isPassword?: boolean;
  suffixIcon?: React.ReactNode;
  prefix?: React.ReactNode;
}

export interface FloatingTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  required?: boolean;
  text?: React.ReactNode;
}

export interface FloatingInputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  required?: boolean;
  suffixIcon?: React.ReactNode;
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function FloatingInput({
  prefix,
  required = false,
  label = "Select",
  placeholder = " ",
  isPassword = false,
  suffixIcon,
  className = "",
  type,
  id,
  autoComplete,
  ...rest
}: FloatingInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const currentType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type || "text";

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        {prefix && (
          <div className="absolute left-3 flex items-center pointer-events-none text-gray-400 z-10">
            {prefix}
          </div>
        )}

        {/* Input */}
        <input
          {...rest}
          id={id}
          type={currentType}
          placeholder={placeholder || " "}
          autoComplete={autoComplete ?? (isPassword ? "new-password" : "off")}
          className={`
            peer w-full h-11 min-h-7.5 rounded-[3px] border border-gray-300 bg-white text-sm font-medium text-gray-900 
            placeholder-transparent focus:placeholder-gray-400
            transition-colors focus:border-blue-500 outline-none focus:outline-none focus:ring-0
            ${prefix ? "pl-10" : "pl-3"}
            ${suffixIcon || isPassword ? "pr-10" : "pr-3"}
            ${className}
          `}
        />

        {/* Floating Label with peer-autofill support */}
        <label
          htmlFor={id}
          className={`
            absolute z-10 pointer-events-none transition-all duration-200 bg-white px-1
            
            /* Floating state (default when filled) */
            top-0 left-3 -translate-y-1/2 text-[12px] font-semibold text-black

            /* Inside state (when empty and not focused) */
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400
            ${prefix ? "peer-placeholder-shown:left-9" : "peer-placeholder-shown:left-3"}

            /* Focus state */
            peer-focus:top-0 peer-focus:left-3 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[12px] peer-focus:font-semibold peer-focus:text-black

            /* Browser Autofill state (forces label up when Chrome autofills) */
            peer-autofill:top-0 peer-autofill:left-3 peer-autofill:-translate-y-1/2 peer-autofill:bg-white peer-autofill:text-[12px] peer-autofill:font-semibold peer-autofill:text-black
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {(suffixIcon || isPassword) && (
          <div className="absolute right-3 flex items-center z-10">
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="p-1 focus:outline-none text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <EyeIcon visible={showPassword} />
              </button>
            ) : (
              suffixIcon
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TextArea({
  text,
  label = "Note",
  required = false,
  placeholder = " ",
  className = "",
  id,
  ...rest
}: FloatingTextAreaProps) {
  return (
    <div className="relative w-full">
      <div className="relative inline-block w-full">
        <textarea
          {...rest}
          id={id}
          placeholder={placeholder || " "}
          className={`
            peer w-full min-h-20 p-3 pb-6 rounded-[3px] border border-gray-300 bg-white text-sm font-medium text-gray-900 
            placeholder-transparent focus:placeholder-gray-400
            transition-colors focus:border-blue-500 outline-none focus:outline-none focus:ring-0
            ${className}
          `}
        />

        <label
          htmlFor={id}
          className="
            absolute left-3 z-10 pointer-events-none transition-all duration-200 bg-white px-1
            top-0 -translate-y-1/2 text-[12px] font-semibold text-black
            peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400
            peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[12px] peer-focus:font-semibold peer-focus:text-black
            peer-autofill:top-0 peer-autofill:-translate-y-1/2 peer-autofill:bg-white peer-autofill:text-[12px] peer-autofill:font-semibold peer-autofill:text-black
          "
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {text && (
          <span className="absolute bottom-1 right-3 text-[12px] text-[#8C8D96] pointer-events-none">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}

function NumberInput({
  label = "Number",
  required = false,
  placeholder = " ",
  suffixIcon,
  className = "",
  id,
  ...rest
}: FloatingInputNumberProps) {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        <input
          {...rest}
          id={id}
          type="number"
          placeholder={placeholder || " "}
          className={`
            peer w-full h-11 min-h-7.5 pl-3 rounded-[3px] border border-gray-300 bg-white text-sm font-medium text-gray-900 
            placeholder-transparent focus:placeholder-gray-400
            transition-colors focus:border-blue-500 outline-none focus:outline-none focus:ring-0
            ${suffixIcon ? "pr-10" : "pr-3"}
            ${className}
          `}
        />

        <label
          htmlFor={id}
          className="
            absolute left-3 z-10 pointer-events-none transition-all duration-200 bg-white px-1
            top-0 -translate-y-1/2 text-[12px] font-semibold text-black
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400
            peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[12px] peer-focus:font-semibold peer-focus:text-black
            peer-autofill:top-0 peer-autofill:-translate-y-1/2 peer-autofill:bg-white peer-autofill:text-[12px] peer-autofill:font-semibold peer-autofill:text-black
          "
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {suffixIcon && (
          <div className="absolute right-3 flex items-center pointer-events-none z-10">
            {suffixIcon}
          </div>
        )}
      </div>
    </div>
  );
}

FloatingInput.TextArea = TextArea;
FloatingInput.Number = NumberInput;

export default FloatingInput;
