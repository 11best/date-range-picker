import { DateTime } from "luxon";
import { useCallback, useEffect, useReducer } from "react";
import Calendar from "../base/Calendar";
import Navigation from "../base/Navigation";
import TimePicker from "./TimePicker";

type State = {
  leftCalendar: DateTime;
  rightCalendar: DateTime;
  selectedStartDate?: DateTime;
  selectedEndDate?: DateTime;
};

type Action =
  | { type: "previous_month_clicked" }
  | { type: "next_month_clicked" }
  | { type: "previous_year_clicked" }
  | { type: "next_year_clicked" }
  | { type: "selected_start_date"; selectedDate: DateTime }
  | { type: "selected_end_date"; selectedDate: DateTime }
  | { type: "clear_selected_date" };

const initialState: State = {
  leftCalendar: DateTime.now(),
  rightCalendar: DateTime.now().plus({ month: 1 }),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "previous_month_clicked":
      return {
        ...state,
        leftCalendar: state.leftCalendar.minus({ month: 1 }),
        rightCalendar: state.rightCalendar.minus({ month: 1 }),
      };

    case "next_month_clicked":
      return {
        ...state,
        leftCalendar: state.leftCalendar.plus({ month: 1 }),
        rightCalendar: state.rightCalendar.plus({ month: 1 }),
      };

    case "previous_year_clicked":
      return {
        ...state,
        leftCalendar: state.leftCalendar.minus({ year: 1 }),
        rightCalendar: state.rightCalendar.minus({ year: 1 }),
      };

    case "next_year_clicked":
      return {
        ...state,
        leftCalendar: state.leftCalendar.plus({ year: 1 }),
        rightCalendar: state.rightCalendar.plus({ year: 1 }),
      };

    case "selected_start_date":
      return {
        ...state,
        selectedStartDate: action.selectedDate,
      };

    case "selected_end_date":
      return {
        ...state,
        selectedEndDate: action.selectedDate,
      };

    case "clear_selected_date":
      return {
        ...state,
        selectedStartDate: undefined,
        selectedEndDate: undefined,
      };

    default:
      return state;
  }
}

export default function DurationDatePicker(props: {
  onlyDatePicker?: boolean;
  onDurationSelect: (data: any) => void;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    props.onDurationSelect([state.selectedStartDate, state.selectedEndDate]);
  }, [state.selectedStartDate, state.selectedEndDate]);

  const handleSelectDate = useCallback(
    (selectedDate: DateTime) => {
      if (
        !state.selectedStartDate?.isValid &&
        !state.selectedEndDate?.isValid
      ) {
        dispatch({ type: "selected_start_date", selectedDate });
      }
      if (state.selectedStartDate?.isValid) {
        if (state.selectedEndDate?.isValid) {
          dispatch({ type: "clear_selected_date" });
          dispatch({ type: "selected_start_date", selectedDate });
        } else if (selectedDate < state.selectedStartDate) {
          dispatch({ type: "selected_start_date", selectedDate });
          dispatch({
            type: "selected_end_date",
            selectedDate: state.selectedStartDate,
          });
        } else {
          dispatch({
            type: "selected_end_date",
            selectedDate: selectedDate.set({ hour: 23, minute: 59 }),
          });
        }
      }
      props.onDurationSelect([state.selectedStartDate, state.selectedEndDate]);
    },
    [state.selectedStartDate, state.selectedEndDate]
  );

  const handleSelectTime = useCallback(
    (isStart: boolean, isHour: boolean, selectedTime: number) => {
      if (isStart) {
        if (state.selectedStartDate?.isValid) {
          dispatch({
            type: "selected_start_date",
            selectedDate: state.selectedStartDate.set(
              isHour ? { hour: selectedTime } : { minute: selectedTime }
            ),
          });
        } else {
          dispatch({
            type: "selected_start_date",
            selectedDate: DateTime.now().set(
              isHour
                ? { hour: selectedTime, minute: 0 }
                : { hour: 0, minute: selectedTime }
            ),
          });
          dispatch({
            type: "selected_end_date",
            selectedDate: DateTime.now().set({ hour: 23, minute: 59 }),
          });
        }
      } else {
        if (state.selectedEndDate?.isValid) {
          dispatch({
            type: "selected_end_date",
            selectedDate: state.selectedEndDate.set(
              isHour ? { hour: selectedTime } : { minute: selectedTime }
            ),
          });
        } else {
          dispatch({
            type: "selected_end_date",
            selectedDate: DateTime.now().set(
              isHour
                ? { hour: selectedTime, minute: 59 }
                : { hour: 23, minute: selectedTime }
            ),
          });
          dispatch({
            type: "selected_start_date",
            selectedDate: DateTime.now().set({ hour: 0, minute: 0 }),
          });
        }
      }
    },
    [state.selectedStartDate, state.selectedEndDate]
  );

  return (
    <div className={"w-fit relative bg-white p-4 rounded-lg"}>
      <Navigation
        onPreviousMonthClick={() =>
          dispatch({ type: "previous_month_clicked" })
        }
        onPreviousYearClick={() => dispatch({ type: "previous_year_clicked" })}
        onNextMonthClick={() => dispatch({ type: "next_month_clicked" })}
        onNextYearClick={() => dispatch({ type: "next_year_clicked" })}
      />
      <div className="w-max flex gap-x-8 mb-2">
        <div id="left-container">
          <Calendar
            key={"left-calendar"}
            dateTime={state.leftCalendar}
            selectedStartDate={state.selectedStartDate}
            selectedEndDate={state.selectedEndDate}
            onSelectDate={handleSelectDate}
          />
        </div>
        <div id="right-container">
          <Calendar
            key={"right-calendar"}
            dateTime={state.rightCalendar}
            selectedStartDate={state.selectedStartDate}
            selectedEndDate={state.selectedEndDate}
            onSelectDate={handleSelectDate}
          />
        </div>
      </div>
      {!props.onlyDatePicker && <TimePicker onTimeChange={handleSelectTime} />}
    </div>
  );
}
