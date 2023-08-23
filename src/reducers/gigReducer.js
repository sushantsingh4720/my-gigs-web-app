export const INITIAL_STATE = {
  title: "",
  desc: "",
  price: 0,
  cat: "",
  cover: "",
  shortDesc: "",
  shortTitle: "",
  revisionNumber: 0,
  deliveryTime: 0,
  images: [],
  features: [],
};
export const gigReducer = (state, action) => {
  switch (action.type) {
    case "ADD_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: [...state.images, ...action.payload.images],
      };
    case "ADD_FEATURES":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURES":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
