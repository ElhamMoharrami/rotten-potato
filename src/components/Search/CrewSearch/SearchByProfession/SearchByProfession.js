import React from "react";
import { useState, useEffect } from "react";
import { Menu, MenuItem, FocusableItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { fetchSearchedProfession } from "../../../../store/api-call";
import { useDispatch } from "react-redux";
import "./SearchByProfession.css";
import { artistActions } from "../../../../store/data-slice";

const SearchByProfession = (props) => {
  const { isSearching, currentPage, itemsPerPage } = props;
  const initialProfession = localStorage.getItem("profession");
  const [profession, setProfession] = useState(initialProfession || "");
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

  const showProfession = (profession) => {
    return (
      profession[0].toUpperCase() + profession.substring(1).replace(/_/g, " ")
    );
  };

  const onClickHandler = async (e) => {
    localStorage.clear();
    setProfession(e.value);
    dispatch(artistActions.setIsSearching({ isSearching: "profession" }));
    localStorage.setItem("profession", e.value);
  };

  useEffect(() => {
    if (isSearching === "profession" && profession !== "") {
      dispatch(fetchSearchedProfession(profession, currentPage, itemsPerPage));
    }
  }, [currentPage, itemsPerPage, isSearching, profession, dispatch]);

  return (
    <Menu
      menuButton={
        <MenuButton>
          {profession !== "" ? showProfession(profession) : "choose profession"}
        </MenuButton>
      }
      onMenuChange={(e) => e.open && setProfession("")}
    >
      <FocusableItem>
        {({ ref }) => (
          <input
            ref={ref}
            type="text"
            placeholder="Type to filter"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        )}
      </FocusableItem>
      {professions
        .filter((item) =>
          item.toUpperCase().includes(profession.trim().toUpperCase())
        )
        .map((item) => (
          <MenuItem onClick={onClickHandler} value={item} key={item}>
            {showProfession(item)}
          </MenuItem>
        ))}
    </Menu>
  );
};

export default SearchByProfession;
