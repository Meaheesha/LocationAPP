import {
  normalizeByName,
  normalizeById,
  getNames
} from "../utils/LocationHelper";

const defaultState = {
  isFetching: false,

  country: {
    byName: {},
    byId: {},
    allNames: [],
    raw: []
  },
  state: {
    byName: {},
    byId: {},
    allNames: [],
    raw: []
  },
  city: {
    byName: {},
    byId: {},
    allNames: [],
    raw: []
  }
};

const locationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "RECEIVE_LOCATION": {
      state = {
        ...state,
        isFetching: false,
        country: {
          byName: normalizeByName(action.country, "solution_group_name"),
          byId: normalizeById(action.country, "solution_group_id"),
          allNames: getNames(action.country, "solution_group_name"),
          raw: action.country
        },
        state: {
          byName: normalizeByName(action.state, "solution_name"),
          byId: normalizeById(action.state, "solution_id"),
          allNames: getNames(action.state, "solution_name"),
          raw: action.state
        },
        city: {
          byName: normalizeByName(action.city, "solution_detail_name"),
          byId: normalizeById(action.city, "solution_detail_id"),
          allNames: getNames(action.city, "solution_detail_name"),
          raw: action.city
        }
      };
      return state;
    }

    default:
      return state;
  }
};

export default locationReducer;
