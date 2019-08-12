import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { intersection, pick } from "lodash";
import queryString from "query-string";
import ContentContainer from "terra-content-container";
import Heading from "terra-heading";
import Spacer from "terra-spacer";
import Button from "terra-button";
import IconChevronLeft from "terra-icon/lib/icon/IconChevronLeft";
import LocationGroupFilter from "../components/LocationGroupFilter";
import "./App.css";
import "./LocationGroupFilterContainer.scss";
import { getIdsFrom, getSelectedFilterNames } from "../utils/LocationHelper";
import * as LocationAction from "../actions/LocationAction";
const propTypes = {};

class App extends Component {
  state = {
    selectedCountries: [],
    selectedStates: [],
    selectedCities: [],
    selectedCountryIds: [],
    selectedStateIds: [],
    selectedCityIds: [],
    countryFilters: [],
    stateFilters: [],
    cityFilters: []
  };

  componentDidUpdate(prevProps) {
    const { country, state, city } = this.props;

    if (
      prevProps.country.byId !== country.byId ||
      prevProps.state.byId !== state.byId ||
      prevProps.city.byId !== city.byId
    ) {
      this.reloadFilters();
    }
  }

  reloadFilters = () => {
    const { country, state, city } = this.props;
    console.log("Reload Filters --> ", this.props);

    for (let i = 0; i < country.allNames.length; i++) {
      this.setState(
        {
          selectedCountries: getSelectedFilterNames(
            country.byId,
            country.raw[i].country_id,
            "solution_group_name"
          ),
          selectedStates: getSelectedFilterNames(
            state.byId,
            state.raw[i].state_id,
            "solution_name"
          ),
          selectedCities: getSelectedFilterNames(
            city.byId,
            city.raw[i].city_id,
            "solution_detail_name"
          )
        },
        this.updateFilters
      );
    }
    console.log("Reload Filters State --> ", this.state);
  };

  getCountryFilters = () => {
    const { selectedStates, selectedCities, countryFilters } = this.state;
    if (
      countryFilters.length > 0 &&
      (selectedStates.length > 0 || selectedCities.length > 0)
    ) {
      return countryFilters;
    }
    return this.props.country.allNames;
  };

  getStateFilters = () => {
    const { selectedCountries, selectedCities, stateFilters } = this.state;
    if (
      stateFilters.length > 0 &&
      (selectedCountries.length > 0 || selectedCities.length > 0)
    ) {
      return stateFilters;
    }
    return this.props.state.allNames;
  };

  getCityFilters = () => {
    const { selectedCountries, selectedStates, cityFilters } = this.state;

    if (
      cityFilters.length > 0 &&
      (selectedCountries.length > 0 || selectedStates.length > 0)
    ) {
      return cityFilters;
    }
    return this.props.city.allNames;
  };

  updateSelectedCountry = selectedCountries => {
    console.log("Update Selected Country State --> ", selectedCountries);
    this.setState({ selectedCountries });
  };

  updateSelectedState = selectedStates => {
    this.setState({ selectedStates });
  };

  updateSelectedCity = selectedCities => {
    this.setState({ selectedCities });
  };

  updateFilters = () => {
    const { country, state, city } = this.props;
    const { selectedCountries, selectedStates, selectedCities } = this.state;

    console.log(
      "Update Filters State -> ",
      selectedCountries,
      selectedStates,
      selectedCities
    );
    let updatedCountryIds = [];
    let updatedStateIds = [];
    let updatedCityIds = [];
    console.log("Update Filters Props --> ", this.props);

    if (selectedCountries.length > 0) {
      const countryObjects = pick(country.byName, selectedCountries);
      const childStates = getIdsFrom(countryObjects, "solution_ids");
      const childCity = getIdsFrom(
        pick(state.byId, childStates),
        "solution_detail_ids"
      );

      updatedCountryIds = getIdsFrom(countryObjects, "solution_group_id");
      updatedStateIds =
        updatedStateIds.length > 0
          ? intersection(updatedStateIds, childStates)
          : childStates;
      updatedCityIds =
        updatedCityIds.length > 0
          ? intersection(updatedCityIds, childCity)
          : childCity;
    }

    if (selectedStates.length > 0) {
      const stateObjects = pick(state.byName, selectedStates);
      const parentCountry = getIdsFrom(stateObjects, "solution_group_id");
      const childCity = getIdsFrom(stateObjects, "solution_detail_ids");

      updatedStateIds = getIdsFrom(stateObjects, "solution_id");
      updatedCountryIds =
        updatedCountryIds.length > 0
          ? intersection(updatedCountryIds, parentCountry)
          : parentCountry;
      updatedCityIds =
        updatedCityIds.length > 0
          ? intersection(updatedCityIds, childCity)
          : childCity;

      // Update parent solution group if previously selected
      if (selectedCountries.length > 0) {
        const updatedCountry = getSelectedFilterNames(
          country.byId,
          updatedCountryIds,
          "solution_group_name"
        );
        console.log("Updated Country -->. ", updatedCountry);
        this.updateSelectedCountry(updatedCountry);
      }
    }

    if (selectedCities.length > 0) {
      const cityObjects = pick(city.byName, selectedCities);
      const parentCountry = getIdsFrom(cityObjects, "solution_group_id");
      const parentStates = getIdsFrom(cityObjects, "solution_id");

      updatedCountryIds =
        updatedCountryIds.length > 0
          ? intersection(updatedCountryIds, parentCountry)
          : parentCountry;
      updatedStateIds =
        updatedStateIds.length > 0
          ? intersection(updatedStateIds, parentStates)
          : parentStates;

      // Combine solution details from solution group and solution and currently selected
      const parentCountryObjects = pick(country.byId, updatedCountryIds);
      const citiesFromCountries = getIdsFrom(
        pick(state.byId, getIdsFrom(parentCountryObjects, "solution_ids")),
        "solution_detail_ids"
      );
      const citiesFromStates = getIdsFrom(
        pick(state.byId, updatedStateIds),
        "solution_detail_ids"
      );
      const citiesFromSelected = getIdsFrom(cityObjects, "solution_detail_id");
      updatedCityIds = intersection(
        citiesFromCountries,
        citiesFromStates,
        citiesFromSelected
      );

      // Update parent solution group if previously selected
      if (selectedCountries.length > 0) {
        const updatedCountry = getSelectedFilterNames(
          country.byId,
          updatedCountryIds,
          "solution_group_name"
        );
        this.updateSelectedCountry(updatedCountry);

        const updatedCities = getSelectedFilterNames(
          city.byId,
          updatedCityIds,
          "solution_detail_name"
        );
        this.updateSelectedCity(updatedCities);
      }

      // Update parent solution if previously selected
      if (selectedStates.length > 0) {
        const updatedStates = getSelectedFilterNames(
          state.byId,
          updatedStateIds,
          "solution_name"
        );
        this.updateSelectedState(updatedStates);

        const updatedCities = getSelectedFilterNames(
          city.byId,
          updatedCityIds,
          "solution_detail_name"
        );
        this.updateSelectedCity(updatedCities);
      }
    }

    this.setState({
      countryFilters: getSelectedFilterNames(
        country.byId,
        updatedCountryIds,
        "solution_group_name"
      ),
      stateFilters: getSelectedFilterNames(
        state.byId,
        updatedStateIds,
        "solution_name"
      ),
      cityFilters: getSelectedFilterNames(
        city.byId,
        updatedCityIds,
        "solution_detail_name"
      ),
      selectedCountryIds: updatedCountryIds,
      selectedStateIds: updatedStateIds,
      selectedCityIds: updatedCityIds
    });

    console.log("Update Filters State --> ", this.state);
  };

  /**
   * Applies all filters
   */
  applyFilters = () => {
    const {
      selectedCountries,
      selectedStates,
      selectedCities,
      selectedCountryIds,
      selectedStateIds,
      selectedCityIds
    } = this.state;
    this.props.receiveLocation(
      selectedCountries,
      selectedStates,
      selectedCities
    );
    // const filterParams = {
    //   country_id: selectedCountries.length > 0 ? selectedCountryIds : [],
    //   state_id: selectedStates.length > 0 ? selectedStateIds : [],
    //   city_id: selectedCities.length > 0 ? selectedCityIds : []
    // };
  };

  resetAllFilters = () => {
    this.setState({
      selectedCountries: [],
      selectedStates: [],
      selectedCities: [],
      selectedCountryIds: [],
      selectedStateIds: [],
      selectedCityIds: []
    });
  };

  render() {
    const { isFetching } = this.props;
    let content;
    if (isFetching) {
      content = (
        <Spacer padding="medium">
          <h4>Loading..</h4>
        </Spacer>
      );
    } else {
      content = (
        <Spacer padding="large">
          <LocationGroupFilter
            title="Countries"
            filterOptions={this.getCountryFilters()}
            updateSelectedValues={this.updateSelectedCountry}
            updateFilters={this.updateFilters}
            selectedValues={this.state.selectedCountries}
          />
          <LocationGroupFilter
            title="States"
            filterOptions={this.getStateFilters()}
            updateSelectedValues={this.updateSelectedState}
            updateFilters={this.updateFilters}
            selectedValues={this.state.selectedStates}
          />
          <LocationGroupFilter
            title="Cities"
            filterOptions={this.getCityFilters()}
            updateSelectedValues={this.updateSelectedCity}
            updateFilters={this.updateFilters}
            selectedValues={this.state.selectedCities}
          />
        </Spacer>
      );
    }

    return (
      <div className="App">
        <ContentContainer fill className="analysis-results-filter-container">
          <Spacer
            className="analysis-results-filter-heading"
            padding="large"
            marginBottom="large"
          >
            <Heading level={2} size="small">
              <p>Filters</p>
            </Heading>
            <Button isIconOnly icon={<IconChevronLeft />} text="Toggle" />
          </Spacer>
          {content}
          <Spacer paddingRight="medium" style={{ textAlign: "right" }}>
            <Spacer isInlineBlock marginRight="small">
              <Button
                className="analysis-results-filter-reset-button"
                text="Reset"
                onClick={this.resetAllFilters}
              />
              <Button
                className="analysis-results-filter-apply-button"
                variant="emphasis"
                text="Apply"
                onClick={this.applyFilters}
              />
            </Spacer>
          </Spacer>

          <ul>
            <li>{this.state.selectedCountries}</li>
            <li>{this.state.selectedStates}</li>
            <li>{this.state.selectedCities}</li>
          </ul>
        </ContentContainer>
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  isFetching: state.reducer.isFetching,
  country: state.reducer.country,
  state: state.reducer.state,
  city: state.reducer.city
});

const mapDispacthToProps = dispatch => {
  return {
    receiveLocation: (country, state, city) =>
      dispatch(LocationAction.receiveLocation(country, state, city))
  };
};
// const mapDispacthToProps = state => {
//   return {
//     receiveLocation: (country, state, city) => {
//       dispatchEvent(LocationAction.receiveLocation(country, state, city))
//   }
// };

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(App);
