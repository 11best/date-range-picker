import { DateTime } from "luxon";
import DurationDatePicker from "./components/composite/DurationDatePicker";

function App() {
  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-3xl m-4">Duration Date Picker</h1>
      <div className="bg-amber-100 py-8 px-32 rounded-lg">
        <DurationDatePicker
          onDurationSelect={(date: Array<DateTime>) => {
            console.log("duration change: ", date);
          }}
        />
      </div>
    </div>
  );
}

export default App;
