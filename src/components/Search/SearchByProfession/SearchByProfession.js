import React from "react";
import { useState, useEffect } from "react";
import { Menu, MenuItem, FocusableItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { fetchSearchedProfession } from "../../../store/api-call";
import { useDispatch } from "react-redux";
import "./SearchByProfession.css";
import { artistActions } from "../../../store/data-slice";

const SearchByProfession = (props) => {
  const { isSearching, currentPage, itemsPerPage } = props;
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const professions = [
    "actor",
    "actress",
    "animation_department",
    "art_department",
    "art_director",
    "assistant",
    "assistant_director",
    "camera_department",
    "casting_department",
    "casting_director",
    "cinematographer",
    "composer",
    "costume_department",
    "costume_designer",
    "director",
    "editor",
    "editorial_department",
    "executive",
    "legal",
    "location_management",
    "make_up_department",
    "manager",
    "miscellaneous",
    "music_department",
    "producer",
    "production_designer",
    "production_manager",
    "programmer",
    "publicist",
    "script_department",
    "set_decorator",
    "sound_department",
    "soundtrack",
    "special_effects",
    "stunts",
    "talent_agent",
    "transportation_department",
    "visual_effects",
    "writer",
  ];


  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      dispatch(artistActions.setIsSearching({ isSearching: "profession" }));
      dispatch(fetchSearchedProfession(filter, currentPage, itemsPerPage));
    }
  };

  const onClickHandler = (e) => {
    dispatch(artistActions.setIsSearching({ isSearching: "profession" }));
    setFilter(e.value);
  };

  useEffect(() => {
    if (isSearching === "profession" && filter!=='') {
      dispatch(fetchSearchedProfession(filter, currentPage, itemsPerPage));
    }
  }, [currentPage, itemsPerPage, isSearching,filter]);

  return (
    <Menu
      menuButton={<MenuButton>{filter!==''?filter:'choose profession'}</MenuButton>}
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
          <MenuItem
            onClick={onClickHandler}
            value={profession}
            key={profession}
          >
            { profession[0].toUpperCase() + profession.substring(1).replace(/_/g, " ")}
          </MenuItem>
        ))}
    </Menu>
  );
};

export default SearchByProfession;
