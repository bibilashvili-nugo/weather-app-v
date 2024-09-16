import { useState } from "react";
import LeftSide from "../pageLeftSide/LeftSide";
import RightSide from "../pageRightSide/RightSide";

const Home = ({ weather, setQuery }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row w-full p-4 gap-4">
      <LeftSide weather={weather} setQuery={setQuery} />
      <RightSide />
    </div>
  );
};

export default Home;
