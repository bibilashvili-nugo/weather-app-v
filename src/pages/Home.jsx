import LeftSide from "../pageLeftSide/LeftSide";
import RightSide from "../pageRightSide/RightSide";

const Home = ({ weather, setQuery }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full p-4 gap-4">
      <LeftSide weather={weather} setQuery={setQuery} />
      <RightSide setQuery={setQuery} />
    </div>
  );
};

export default Home;
