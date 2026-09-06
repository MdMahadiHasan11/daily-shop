"use client";

import React, { useEffect, useRef, useState } from "react";

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

export interface Option {
  label: string;
  value: string | number;
}

export interface FloatingSelectProps {
  label?: string;
  required?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number | undefined) => void;
  placeholder?: string;
  options?: Option[];
  disabled?: boolean;
  className?: string;
  name?: string;
  allowClear?: boolean;
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

export function FloatingInput({
  prefix,
  required = false,
  label = "Field",
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

        <label
          htmlFor={id}
          className={`
            absolute z-10 pointer-events-none transition-all duration-200 bg-white px-1
            top-0 left-3 -translate-y-1/2 text-[12px] font-semibold text-black
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400
            ${prefix ? "peer-placeholder-shown:left-9" : "peer-placeholder-shown:left-3"}
            peer-focus:top-0 peer-focus:left-3 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[12px] peer-focus:font-semibold peer-focus:text-black
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

export function FloatingSelect({
  label = "Select",
  required = false,
  value,
  defaultValue,
  onChange,
  placeholder = "Select",
  options = [],
  disabled = false,
  className = "",
  name,
  allowClear = false,
}: FloatingSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isActive =
    isOpen || (selectedValue !== undefined && selectedValue !== "");

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (optValue: string | number) => {
    if (value === undefined) {
      setInternalValue(optValue);
    }
    onChange?.(optValue);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value === undefined) {
      setInternalValue(undefined);
    }
    onChange?.(undefined);
    setIsOpen(false);
  };

  const showClearButton =
    allowClear && selectedValue !== undefined && selectedValue !== "";

  return (
    <div
      className={`relative w-full group/select ${className}`}
      ref={containerRef}
    >
      {name && <input type="hidden" name={name} value={selectedValue ?? ""} />}

      <label
        className={`
          absolute left-3 z-10 pointer-events-none transition-all duration-200 bg-white px-1
          ${
            isActive
              ? "top-0 font-semibold -translate-y-1/2 text-[12px] text-black"
              : "top-1/2 -translate-y-1/2 text-base font-medium text-gray-400 bg-transparent"
          }
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full h-11 px-3 flex items-center justify-between bg-white border rounded-[3px] 
          cursor-pointer text-sm font-medium transition-colors duration-200
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "hover:border-blue-500"}
          ${isOpen ? "border-blue-500 ring-0 outline-none" : "border-gray-300"}
        `}
      >
        <span
          className={`truncate ${!selectedOption && !isActive ? "text-transparent" : "text-gray-900"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <div className="flex items-center gap-1.5">
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title="Clear selection"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 z-20 mt-1 origin-top transition-all duration-200 ease-out ${
          isOpen && !disabled
            ? "transform opacity-100 scale-100 pointer-events-auto"
            : "transform opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-gray-200 rounded-[3px] shadow-lg max-h-60 overflow-y-auto p-1.5 font-semibold">
          {options.length > 0 ? (
            options.map((opt) => {
              const isSelected = opt.value === selectedValue;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`
                    px-3 py-2 text-sm rounded-xs cursor-pointer transition-colors duration-150
                    ${isSelected ? "bg-gray-100 text-black font-bold" : "text-gray-700 hover:bg-gray-50"}
                  `}
                >
                  {opt.label}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400 text-center">
              No options available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

FloatingInput.TextArea = TextArea;
FloatingInput.Number = NumberInput;
FloatingInput.Select = FloatingSelect;

export default FloatingInput;
