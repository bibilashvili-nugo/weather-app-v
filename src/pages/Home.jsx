import React, { useState } from "react";
import LeftSide from "../pageLeftSide/LeftSide";
import RightSide from "../pageRightSide/RightSide";

const Home = ({ weather }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="flex w-full p-4 gap-4 ">
      <LeftSide weather={weather} />
      <RightSide />
    </div>
  );
};

export default Home;
