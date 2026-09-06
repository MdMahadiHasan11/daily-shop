"use client";

import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface DateSelectProps {
  label?: string;
  required?: boolean;
  value?: Dayjs | null;
  defaultValue?: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  dob?: boolean;
  expiry?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  allowClear?: boolean;
}

type CalendarView = "days" | "months" | "years";

export function DateSelect({
  label = "Select Date",
  required = false,
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  dob = false,
  expiry = false,
  placeholder = "Select date",
  disabled = false,
  className = "",
  name,
  allowClear = false,
}: DateSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Dayjs | null>(
    defaultValue ?? null,
  );
  const [viewMode, setViewMode] = useState<CalendarView>("days");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value !== undefined ? value : internalValue;

  const today = dayjs().startOf("day");

  const effectiveMinDate = expiry
    ? minDate && minDate.isAfter(today)
      ? minDate
      : today
    : minDate;

  const effectiveMaxDate = dob
    ? maxDate && maxDate.isBefore(today)
      ? maxDate
      : today
    : maxDate;

  const [currentMonth, setCurrentMonth] = useState<Dayjs>(() => {
    return (selectedDate || effectiveMaxDate || dayjs()).startOf("month");
  });

  // Outside click handler
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setViewMode("days");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Prevent body scroll when open on mobile
  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive =
    isOpen || (selectedDate !== null && selectedDate !== undefined);

  const getDaysInMonth = (month: Dayjs) => {
    const start = month.startOf("month");
    const end = month.endOf("month");
    const days: Dayjs[] = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end, "day")) {
      days.push(current);
      current = current.add(1, "day");
    }
    return days;
  };

  const isDisabled = (date: Dayjs) => {
    if (effectiveMinDate && date.isBefore(effectiveMinDate, "day")) return true;
    if (effectiveMaxDate && date.isAfter(effectiveMaxDate, "day")) return true;
    return false;
  };

  const isMonthDisabled = (monthDate: Dayjs) => {
    if (
      effectiveMinDate &&
      monthDate.endOf("month").isBefore(effectiveMinDate, "day")
    )
      return true;
    if (
      effectiveMaxDate &&
      monthDate.startOf("month").isAfter(effectiveMinDate, "day")
    )
      return true;
    return false;
  };

  const isYearDisabled = (yearDate: Dayjs) => {
    if (
      effectiveMinDate &&
      yearDate.endOf("year").isBefore(effectiveMinDate, "day")
    )
      return true;
    if (
      effectiveMaxDate &&
      yearDate.startOf("year").isAfter(effectiveMinDate, "day")
    )
      return true;
    return false;
  };

  const handleDateClick = (day: Dayjs) => {
    if (isDisabled(day)) return;

    if (value === undefined) {
      setInternalValue(day);
    }
    setCurrentMonth(day.startOf("month"));
    onChange?.(day);
    setIsOpen(false);
    setViewMode("days");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value === undefined) {
      setInternalValue(null);
    }
    onChange?.(null);
    setIsOpen(false);
    setViewMode("days");
  };

  const showClearButton =
    allowClear && selectedDate !== null && selectedDate !== undefined;

  // --- Views Rendering ---
  const renderDaysView = () => {
    const days = getDaysInMonth(currentMonth);
    const startDayOfWeek = currentMonth.startOf("month").day();

    return (
      <div>
        <div className="grid grid-cols-7 text-xs text-foreground/70 mb-2 gap-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div
              key={d}
              className="text-center h-8 flex items-center justify-center font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {days.map((day) => {
            const isSelected = selectedDate?.isSame(day, "day");
            const disabled = isDisabled(day);

            return (
              <button
                key={day.toString()}
                type="button"
                disabled={disabled}
                onClick={() => handleDateClick(day)}
                className={`h-9 w-9 rounded-[3px] text-sm transition flex items-center justify-center font-medium mx-auto
                  ${isSelected ? "bg-primary text-white font-semibold" : ""}
                  ${
                    !disabled
                      ? "hover:bg-primary/10 hover:text-primary cursor-pointer"
                      : "text-foreground/30 cursor-not-allowed opacity-40"
                  }
                `}
              >
                {day.format("D")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthsView = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
      <div className="grid grid-cols-3 gap-2 py-2">
        {months.map((mIndex) => {
          const monthDate = currentMonth.month(mIndex);
          const isSelected = currentMonth.month() === mIndex;
          const disabled = isMonthDisabled(monthDate);

          return (
            <button
              key={mIndex}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                setCurrentMonth(currentMonth.month(mIndex));
                setViewMode("days");
              }}
              className={`h-12 rounded-[3px] text-sm transition flex items-center justify-center font-medium
                ${isSelected ? "bg-primary text-white font-semibold" : ""}
                ${
                  !disabled
                    ? "hover:bg-primary/10 hover:text-primary text-gray-800 cursor-pointer"
                    : "text-foreground/30 cursor-not-allowed opacity-40 bg-gray-50"
                }
              `}
            >
              {monthDate.format("MMM")}
            </button>
          );
        })}
      </div>
    );
  };

  const renderYearsView = () => {
    const currentYear = currentMonth.year();
    const startYear = currentYear - 6;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return (
      <div className="grid grid-cols-3 gap-2 py-2">
        {years.map((year) => {
          const yearDate = currentMonth.year(year);
          const isSelected = currentMonth.year() === year;
          const disabled = isYearDisabled(yearDate);

          return (
            <button
              key={year}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                setCurrentMonth(currentMonth.year(year));
                setViewMode("months");
              }}
              className={`h-12 rounded-[3px] text-sm transition flex items-center justify-center font-medium
                ${isSelected ? "bg-primary text-white font-semibold" : ""}
                ${
                  !disabled
                    ? "hover:bg-primary/10 hover:text-primary text-gray-800 cursor-pointer"
                    : "text-foreground/30 cursor-not-allowed opacity-40 bg-gray-50"
                }
              `}
            >
              {year}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}
        />
      )}

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

      {/* Main Trigger Box */}
      <div
        onClick={() => {
          if (disabled) return;
          if (!isOpen) {
            const activeM = (
              selectedDate ||
              effectiveMaxDate ||
              dayjs()
            ).startOf("month");
            setCurrentMonth(activeM);
            setViewMode("days");
          }
          setIsOpen(!isOpen);
        }}
        className={`
          w-full h-11 px-3 flex items-center justify-between bg-white border rounded-[3px] 
          cursor-pointer text-sm font-medium transition-colors duration-200
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "hover:border-blue-500"}
          ${isOpen ? "border-blue-500 ring-0 outline-none shadow-sm" : "border-gray-300"}
        `}
      >
        <span
          className={`truncate ${!selectedDate && !isActive ? "text-transparent" : "text-gray-900"}`}
        >
          {selectedDate ? selectedDate.format("DD MMM YYYY") : placeholder}
        </span>

        <div className="flex items-center gap-1.5">
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title="Clear date"
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

      {/* Mobile Backdrop */}
      {isOpen && !disabled && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-[1px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Calendar Dropdown Card / Mobile Modal */}
      <div
        className={`fixed md:absolute left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 top-1/2 md:top-full -translate-y-1/2 md:translate-y-0 z-50 mt-1 transition-all duration-200 ease-out w-[90%] max-w-[320px] md:w-80 bg-white border border-gray-200 rounded-[3px] shadow-xl p-4 ${
          isOpen && !disabled
            ? "transform opacity-100 scale-100 pointer-events-auto"
            : "transform opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Navigation Header */}
        <div className="flex justify-between mb-4 items-center">
          <button
            type="button"
            onClick={() => {
              if (viewMode === "days")
                setCurrentMonth(currentMonth.subtract(1, "month"));
              else if (viewMode === "months")
                setCurrentMonth(currentMonth.subtract(1, "year"));
              else if (viewMode === "years")
                setCurrentMonth(currentMonth.subtract(12, "year"));
            }}
            className="p-1 bg-gray-100 text-gray-700 rounded-[3px] transition cursor-pointer hover:bg-gray-200"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1 font-medium text-sm text-gray-900">
            <button
              type="button"
              onClick={() => setViewMode("days")}
              className={`transition font-semibold cursor-pointer px-1 py-0.5 rounded hover:bg-gray-100 ${
                viewMode === "days"
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary"
              }`}
            >
              {selectedDate
                ? selectedDate.format("DD")
                : currentMonth.format("01")}
            </button>

            <button
              type="button"
              onClick={() => setViewMode("months")}
              className={`transition font-semibold cursor-pointer px-1 py-0.5 rounded hover:bg-gray-100 ${
                viewMode === "months"
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary"
              }`}
            >
              {currentMonth.format("MMM")}
            </button>

            <button
              type="button"
              onClick={() => setViewMode("years")}
              className={`transition font-semibold cursor-pointer px-1 py-0.5 rounded hover:bg-gray-100 ${
                viewMode === "years"
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary"
              }`}
            >
              {currentMonth.format("YYYY")}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (viewMode === "days")
                setCurrentMonth(currentMonth.add(1, "month"));
              else if (viewMode === "months")
                setCurrentMonth(currentMonth.add(1, "year"));
              else if (viewMode === "years")
                setCurrentMonth(currentMonth.add(12, "year"));
            }}
            className="p-1 bg-gray-100 text-gray-700 rounded-[3px] transition cursor-pointer hover:bg-gray-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dynamic View Container */}
        <div className="min-h-55 flex flex-col justify-center">
          {viewMode === "days" && renderDaysView()}
          {viewMode === "months" && renderMonthsView()}
          {viewMode === "years" && renderYearsView()}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
          <button
            type="button"
            onClick={() => {
              const todayObj = dayjs();
              if (!isDisabled(todayObj)) {
                handleDateClick(todayObj);
              }
            }}
            disabled={isDisabled(dayjs())}
            className={`text-xs font-medium transition ${
              isDisabled(dayjs())
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary hover:underline cursor-pointer"
            }`}
          >
            Today
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setViewMode("days");
            }}
            className="cursor-pointer px-4 py-1.5 rounded-[3px] border border-gray-300 hover:bg-gray-50 transition text-sm text-gray-700 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateSelect;
