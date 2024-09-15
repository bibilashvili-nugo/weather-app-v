import { MdSearch } from "react-icons/md";

import SwitcherFtoT from "./SwitcherFtoT";
import LanguageSelector from "../language_selector/Language_selector";
import { useState } from "react";

const Header = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");
  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };
  return (
    <header className="flex justify-between items-center p-7">
      <div className=" pr-7 relative w-full">
        <div className="relative flex justify-between items-center">
          <MdSearch
            onClick={handleSearchClick}
            className="absolute left-4 text-black text-xl"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text"
            placeholder="მოძებნე ქალაქი"
            className="w-[393px] h-[60px] pl-12 pr-4 rounded-full bg-[#FF9500] text-white placeholder-black focus:outline-none focus:ring-0"
          />
          <div className="flex gap-[10px]">
            <LanguageSelector />
            <SwitcherFtoT />
            <img src="/language.svg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
