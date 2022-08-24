import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDetail, dataActions } from "../../store/data-slice";
import { ARTISTSURL } from "../../assets/apis/config";

const ArtistDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const artist = useSelector((state) => state.data.selectedItem);

  useEffect(() => {
    dispatch(fetchDetail(`${ARTISTSURL}/${id}`));
    dispatch(dataActions.clearDetail());
  }, [dispatch, id]);

  return (
    <>
      <p>{artist.name}</p>
      <p>{artist.birth}</p>
      <p>{artist.profession}</p>
      <img src={artist.poster} alt={artist.name} />
    </>
  );
};

export default ArtistDetail;
