import React, { useState, useEffect } from "react";

function NavBar() {
  return (
    <nav class="bg-[#F4F5F9] border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
      <div class="pl-14 pt-4 container flex flex-wrap items-center justify-between mx-auto">
        <a href="" class="flex items-center">
          <span class=" pl-4 pr-4 self-center text-xl font-semibold whitespace-nowrap">
            Filter By:
          </span>
          <span class=" pl-4 pr-4 hover:rounded-full hover:bg-gray-400 text-justify text-xl ">
            Unread
          </span>
          <span class=" pl-4 pr-4 hover:rounded-full hover:bg-gray-400 self-center text-xl whitespace-nowrap">
            Read
          </span>
          <span class=" pl-4 pr-4 hover:rounded-full hover:bg-gray-400 self-center text-xl whitespace-nowrap">
            Favourites
          </span>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
