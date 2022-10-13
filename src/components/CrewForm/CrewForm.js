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
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";

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

  const [nameisValid, setNameIsValid] = useState(true);
  const [birthIsValid, setBirthIsValid] = useState(true);
  const [deathIsValid, setDeathIsValid] = useState(true);
  const [professionIsValid, setProfessionIsValid] = useState(true);
  const [urlIsValid, setUrlIsValid] = useState(true);

  const nameValidation = (name) => {
    if (name.length > 100) {
      setNameIsValid(false);
    }
  };

  const birthValidation = (birth) => {
    if (birth.length > 4) {
      setBirthIsValid(false);
    }
  };

  const deathValidation = (death) => {
    if (death.length > 4) {
      setDeathIsValid(false);
    }
  };

  const professionValidation = (profession) => {
    if (profession.length > 200) {
      setProfessionIsValid(false);
    }
  };

  const urlPatternValidation = (url) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    const result = regex.test(url);
    if (!result) {
      setUrlIsValid(false);
    }
  };

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

    if (name === "name") {
      nameValidation(value);
    }

    if (name === "birth") {
      birthValidation(value);
    }

    if (name === "death") {
      deathValidation(value);
    }

    if (name === "profession") {
      professionValidation(value);
    }

    if (name === "poster") {
      urlPatternValidation(value);
    }
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

  const formIsValid =
    nameisValid &&
    birthIsValid &&
    deathIsValid &&
    professionIsValid &&
    urlIsValid;

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Card className={classes["wrapper"]}>
          <div className={classes["title"]}>
            {" "}
            {isAddMode ? <p>add</p> : <p>edit</p>}{" "}
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="name-input"> *Artist Name</InputLabel>
              <Input
                error={nameisValid ? false : true}
                {...register("name")}
                onChange={onchangeHandler}
                value={crewData.name || ""}
                id="name-input"
                aria-describedby="name-input"
                required
              />
              {!nameisValid && (
                <FormHelperText>
                  should not be longer than 100 characters
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="birth-input"> *Artist Birth</InputLabel>
              <Input
                error={birthIsValid ? false : true}
                {...register("birth")}
                onChange={onchangeHandler}
                value={crewData.birth || ""}
                id="birth-input"
                aria-describedby="birth-input"
                required
              />
              {!birthIsValid && (
                <FormHelperText>
                  should not be longer than 4 digits.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="death-input"> Artist Death</InputLabel>
              <Input
                error={deathIsValid ? false : true}
                {...register("death")}
                onChange={onchangeHandler}
                value={crewData.death || ""}
                id="death-input"
                aria-describedby="death-input"
              />
              {!deathIsValid && (
                <FormHelperText>
                  should not be longer than 4 digits.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="death-input"> *Artist Profession</InputLabel>
              <Input
                error={professionIsValid ? false : true}
                {...register("profession")}
                onChange={onchangeHandler}
                value={crewData.profession || ""}
                id="profession-input"
                aria-describedby="profession-input"
                required
              />
              {!professionIsValid && (
                <FormHelperText>
                  should not be longer than 200 characters.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="poster-input">Poster Url</InputLabel>
              <Input
                type="text"
                {...register("poster")}
                onChange={onchangeHandler}
                value={crewData.poster || ""}
                id="poster-input"
                aria-describedby="poster-input"
              />
              {!urlIsValid && <FormHelperText>invalid url.</FormHelperText>}
            </FormControl>
          </div>

          <Button disabled={formIsValid ? false : true} type="submit">
            Submit
          </Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </Card>
      </form>
    </div>
  );
};

export default CrewForm;
