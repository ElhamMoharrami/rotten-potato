import React, { useEffect, useState } from "react";
import Button from "../UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { saveCrew, updateCrew } from "../../store/api-call";
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
      dispatch(saveCrew(crewData));
    }

    if (!isAddMode) {
      dispatch(updateCrew(id, crewData));

      dispatch(fetchData("crews", itemsPerPage, currentPage, artistActions,'name'));
    }

    navigate(-1);
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
          <div className={classes["data-form-input"]}>
            <label>artist name</label>
            <input
              type="text"
              {...register("name")}
              onChange={onchangeHandler}
              value={crewData.name || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>birth</label>
            <input
              type="text"
              {...register("birth")}
              onChange={onchangeHandler}
              value={crewData.birth || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>death</label>
            <input
              type="text"
              {...register("death")}
              onChange={onchangeHandler}
              value={crewData.death || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>profession</label>
            <input
              type="text"
              {...register("profession")}
              onChange={onchangeHandler}
              value={crewData.profession || ""}
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
        </Card>
      </form>
    </div>
  );
};

export default CrewForm;
