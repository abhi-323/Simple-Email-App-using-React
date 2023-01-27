import React from "react";
import { useRecoilState } from "recoil";
import { selectedFilterAtom } from "./recoil/recoil";

function NavBar() {
  const [selectedFilter, setSelectedFilter] =
    useRecoilState(selectedFilterAtom);

  const selectedButtonColor = " bg-[#CFD2DC] rounded-full ";
  return (
    <nav className="bg-[#F4F5F9] border-gray-200 px-2 sm:px-4 py-2.5 ">
      <div className="pl-14 pt-4 container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <span className=" pl-4 pr-4 self-center text-xl font-semibold whitespace-nowrap">
            Filter By:
          </span>
          <button
            onClick={() =>
              selectedFilter === "Unread"
                ? setSelectedFilter(null)
                : setSelectedFilter("Unread")
            }
            className={`pl-4 pr-4 ${
              selectedFilter === "Unread" && selectedButtonColor
            } hover:rounded-full hover:bg-[#CFD2DC] text-justify text-xl `}
          >
            Unread
          </button>
          <button
            onClick={() =>
              selectedFilter === "Read"
                ? setSelectedFilter(null)
                : setSelectedFilter("Read")
            }
            className={`pl-4 pr-4 ${
              selectedFilter === "Read" && selectedButtonColor
            } hover:rounded-full hover:bg-[#CFD2DC] self-center text-xl whitespace-nowrap`}
          >
            Read
          </button>
          <button
            onClick={() =>
              selectedFilter === "Favourite"
                ? setSelectedFilter(null)
                : setSelectedFilter("Favourite")
            }
            className={`pl-4 pr-4 ${
              selectedFilter === "Favourite" && selectedButtonColor
            } hover:rounded-full hover:bg-[#CFD2DC] self-center text-xl whitespace-nowrap`}
          >
            Favourites
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
