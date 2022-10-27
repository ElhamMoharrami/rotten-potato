export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const override = {
  display: "block",
  position: "absolute",
  top: "50%",
  right: "50%",
  margin: "5rem auto",
};


export const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
  }),

  control: (_, { selectProps: { width }}) => ({
    width: width
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}


export const professions = [
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

 export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};