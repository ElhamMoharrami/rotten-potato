import React, { useEffect } from "react";
import { useState } from "react";
import { Menu, MenuItem, FocusableItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { fetchSearchedProfession } from "../../../store/api-call";
import { useDispatch, useSelector } from "react-redux";

const SearchByProfession = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const professions = [
    "actor",
    "actress",
    "animation_department",
    "art_department",
    " art_director",
    "assistant",
    " assistant_director",
    "camera_department",
    "casting_department",
    "casting_director",
    " cinematographer",
    " composer",
    "costume_department",
    " costume_designer",
    " director",
    " editor",
    " editorial_department",
    " executive",
    "legal",
    " location_management",
    "make_up_department",
    " manager",
    "miscellaneous",
    " music_department",
    "producer",
    " production_designer",
    "production_manager",
    " programmer",
    " publicist",
    " script_department",
    "set_decorator",
    "sound_department",
    "soundtrack",
    " special_effects",
    "stunts",
    "talent_agent",
    " transportation_department",
    "visual_effects",
    "writer",
  ];
  const currentPage = useSelector((state) => state.crews.data.currentPage);
  const itemsPerPage = useSelector((state) => state.crews.data.itemsPerPage);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      dispatch(fetchSearchedProfession(filter, currentPage, itemsPerPage));
    }
  };

  return (
    <Menu
      menuButton={<MenuButton>Choose Profession</MenuButton>}
      onMenuChange={(e) => e.open && setFilter("")}
    >
      <FocusableItem>
        {({ ref }) => (
          <input
            ref={ref}
            type="text"
            placeholder="Type to filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyDown={keyDownHandler}
          />
        )}
      </FocusableItem>
      {professions
        .filter((profession) =>
          profession.toUpperCase().includes(filter.trim().toUpperCase())
        )
        .map((profession) => (
          <MenuItem key={profession}>{profession}</MenuItem>
        ))}
    </Menu>
  );
};

export default SearchByProfession;
