import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

export default function Navigation(props: {
  onPreviousMonthClick: () => void;
  onNextMonthClick: () => void;
  onPreviousYearClick: () => void;
  onNextYearClick: () => void;
}) {
  return (
    <>
      <div className="absolute top-0 left-0 m-4">
        <div
          className="cursor-pointer hover:text-pink-600 mb-1"
          onClick={props.onPreviousMonthClick}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </div>
        <div
          className="cursor-pointer hover:text-pink-600"
          onClick={props.onPreviousYearClick}
        >
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="absolute top-0 right-0 m-4">
        <div
          className="cursor-pointer hover:text-pink-600 mb-1"
          onClick={props.onNextMonthClick}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </div>
        <div
          className="cursor-pointer hover:text-pink-600"
          onClick={props.onNextYearClick}
        >
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </div>
      </div>
    </>
  );
}
