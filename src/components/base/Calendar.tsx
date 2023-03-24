import clsx from "clsx";
import { DateTime, Info } from "luxon";
import { useCallback } from "react";

export default function Calendar({
    dateTime,
    selectedStartDate,
    selectedEndDate,
    onSelectDate,
  }: {
    dateTime: DateTime;
    selectedStartDate?: DateTime;
    selectedEndDate?: DateTime;
    onSelectDate?: (selectedDate: DateTime) => void;
  }) {
    const getDaysOfMonth = useCallback(() => {
      let monthArr = [];
      for (let i = 1; i <= dateTime.daysInMonth; i++) {
        monthArr.push(DateTime.local(dateTime.year, dateTime.month, i));
      }
      return monthArr;
    }, [dateTime]);
  
    const dateSelectedClasses = useCallback(
      (date: DateTime, selectedDate: DateTime) => {
        return (
          date.toLocaleString() === selectedDate.toLocaleString() &&
          "bg-pink-600 text-white"
        );
      },
      []
    );
  
    const dateBetweenClasses = useCallback(
      (date: DateTime) => {
        return (
          selectedStartDate &&
          selectedEndDate &&
          date.startOf("day") > selectedStartDate.startOf("day") &&
          date.startOf("day") < selectedEndDate.startOf("day") &&
          "bg-gray-200"
        );
      },
      [selectedStartDate, selectedEndDate]
    );
  
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm font-bold">{dateTime.monthShort}</p>
        <p className="text-sm font-bold">{dateTime.year}</p>
        <div className="grid grid-cols-7 mt-4">
          {Info.weekdays("short").map((w, i) => (
            <p key={i} className="text-sm mb-1 text-center text-gray-400">
              {w}
            </p>
          ))}
          {[...Array(dateTime.startOf("month").weekday - 1)].map((e, i) => (
            <div key={i}></div>
          ))}
          {getDaysOfMonth().map((d, i) => (
            <div
              key={i}
              className={clsx(
                "text-xs w-9 h-9",
                "flex justify-center items-center cursor-pointer",
                "hover:bg-pink-600 hover:text-white",
                selectedStartDate && dateSelectedClasses(d, selectedStartDate),
                selectedEndDate && dateSelectedClasses(d, selectedEndDate),
                dateBetweenClasses(d)
              )}
              onClick={() => onSelectDate?.(d)}
            >
              <div>{d.day}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }