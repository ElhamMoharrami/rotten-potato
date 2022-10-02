import React from "react";
import classes from "./CrewSearch.module.scss";
import Card from "../../UI/Card/Card";
import SearchByName from "./SearchByName/SearchByName";
import SearchByProfession from "./SearchByProfession/SearchByProfession";
import CrewSort from "./SortCrew/CrewSort";

const CrewSearch = (props) => {
  const { itemsPerPage, currentPage, action, isSearching } = props;
  return (
    <Card className={classes["crew-wrapper"]}>
      <div className={classes["crew-search-wrapper"]}>
        <div>
          <SearchByName
            action={action}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            isSearching={isSearching}
          />
        </div>
        <div>
          <SearchByProfession
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            isSearching={isSearching}
          />
        </div>
      </div>
      <div className={classes["crew-sort-wrapper"]}>
        <CrewSort />
      </div>
    </Card>
  );
};

export default CrewSearch;
