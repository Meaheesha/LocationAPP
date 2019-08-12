import Axios from "axios";

export const receiveLocation = (country, state, city) => ({
  type: "RECEIVE_LOCATION",
  country,
  state,
  city
});

export const fetchLocation = () => {
  return dispatch => {
    return Axios.all([
      Axios.get("solution_groups.json"),
      Axios.get("solutions.json"),
      Axios.get("solution_details.json")
    ]).then(
      Axios.spread((countryResponse, stateResponse, cityResponse) => {
        dispatch(
          receiveLocation(
            countryResponse.data,
            stateResponse.data,
            cityResponse.data
          )
        );
      })
    );
  };
};
