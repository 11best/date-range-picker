import clsx from "clsx";

  
export default function TimeDropdown(props: {
    id: string;
    amount: number;
    defaultValue: number;
    isStart: boolean;
    isHour: boolean;
    onChange: (isStart: boolean, isHour: boolean, selectTime: number) => void;
  }) {
    return (
      <select
        id={props.id}
        defaultValue={props.defaultValue}
        onChange={(e) =>
          props.onChange(props.isStart, props.isHour, parseInt(e.target.value))
        }
        className={clsx("border border-gray-600", "rounded-md py-2 px-4 mx-1")}
      >
        {[...Array(props.amount)].map((e, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    );
  }