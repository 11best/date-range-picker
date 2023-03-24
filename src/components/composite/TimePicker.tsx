import TimeDropdown from "../base/TimeDropdown";

export default function TimePicker(props: {
    onTimeChange: (isStart: boolean, isHour: boolean, selectTime: number) => void;
  }) {
    return (
      <div className="border-t border-gray-200">
        <div className="mt-2 flex justify-center">
          <div className="text-sm">
            <span>Start</span>
            <TimeDropdown
              id="start-hour"
              isStart={true}
              isHour={true}
              amount={24}
              defaultValue={0}
              onChange={props.onTimeChange}
            />
            <span>:</span>
            <TimeDropdown
              id="start-minute"
              isStart={true}
              isHour={false}
              amount={60}
              defaultValue={0}
              onChange={props.onTimeChange}
            />
          </div>
          <div className="text-sm ml-4">
            <span>End</span>
            <TimeDropdown
              id="end-hour"
              isStart={false}
              isHour={true}
              amount={24}
              defaultValue={23}
              onChange={props.onTimeChange}
            />
            <span>:</span>
            <TimeDropdown
              id="end-minute"
              isStart={false}
              isHour={false}
              amount={60}
              defaultValue={59}
              onChange={props.onTimeChange}
            />
          </div>
        </div>
      </div>
    );
  }