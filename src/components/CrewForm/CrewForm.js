import React, { useEffect, useState } from "react";
import Button from "../UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { saveData, updateData } from "../../store/api-call";
import { fetchDetail } from "../../store/api-call";
import { artistActions } from "../../store/data-slice";
import { useParams } from "react-router-dom";
import Card from "../UI/Card/Card";
import { useForm } from "react-hook-form";
import classes from "./CrewForm.module.css";
import { fetchData } from "../../store/api-call";
import { useNavigate } from "react-router-dom";

const CrewForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { register, reset, formState } = useForm();
  const isAddMode = !id;

  const crew = useSelector((state) => state.crews.selectedItem);
  const currentPage = useSelector((state) => state.crews.data.currentPage);
  const itemsPerPage = useSelector((state) => state.crews.data.itemsPerPage);

  const [crewData, setCreweData] = useState({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(artistActions.setDetail({ selectedItem: {} }));
    if (!isAddMode) {
      dispatch(fetchDetail(id, "crews", artistActions));
    }
  }, [isAddMode, dispatch, id]);

  useEffect(() => {
    if (!isAddMode) {
      setCreweData(crew);
    }
  }, [crew, isAddMode]);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCreweData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isAddMode) {
      dispatch(
        saveData(crewData, "crews", itemsPerPage, currentPage, artistActions)
      );
    } else {
      dispatch(
        updateData(
          "crews",
          id,
          crewData,
          itemsPerPage,
          currentPage,
          artistActions
        )
      );
    }
    navigate("/artists");
  };

  const cancelHandler = () => {
    navigate("/artists");
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: "",
        birth: "",
        death: "",
        profession: "",
        poster: "",
      });
    }
  }, [formState, crewData, reset]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Card className={classes["wrapper"]}>
          <div className={classes["title"]}>
            {" "}
            {isAddMode ? <p>add</p> : <p>edit</p>}{" "}
          </div>
          <div className={classes["data-form-input"]}>
            <label>artist name</label>
            <input
              type="text"
              {...register("name")}
              onChange={onchangeHandler}
              value={crewData.name || ""}
              
              required
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>birth</label>
            <input
              type="number"
              {...register("birth")}
              onChange={onchangeHandler}
              value={crewData.birth || ""}
              min="1900"
              required
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>death</label>
            <input
              type="number"
              {...register("death")}
              onChange={onchangeHandler}
              value={crewData.death || ""}
              max={currentYear}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>profession</label>
            <input
              type="text"
              {...register("profession")}
              onChange={onchangeHandler}
              value={crewData.profession || ""}
              required
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>poster</label>
            <input
              type="text"
              {...register("poster")}
              onChange={onchangeHandler}
              value={crewData.poster || ""}
            />
          </div>

          <Button type="submit">Submit</Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </Card>
      </form>
    </div>
  );
};

export default CrewForm;
