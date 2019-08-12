import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spacer from 'terra-spacer';
import Heading from 'terra-heading';
import FilterDropdown from './FilterDropdown';
import './LocationGroupFilter.scss';

const propTypes = {
  /**
   * The title of the filter
   */
  title: PropTypes.string.isRequired,
  
  /**
   * The filter options to display
   */
  filterOptions: PropTypes.arrayOf(PropTypes.string),
  
  /**
   * Callback function to update listed filter options
   */
  updateSelectedValues: PropTypes.func.isRequired,
  
  /**
   * Callback function to apply listed filter options
   */
  updateFilters: PropTypes.func.isRequired,
};

class LocationGroupFilter extends Component {
  state = {
    valuesChanged: false,
  }
  
  updateSelectedValues = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    this.setState({ valuesChanged: true });
    this.props.updateSelectedValues(values);
  }
  
  updateFilters = () => {
    if (this.state.valuesChanged) {
      this.setState({ valuesChanged: false });
      this.props.updateFilters();
    }
  }
  
  render() {
    const { title, filterOptions, selectedValues } = this.props;
    console.log("Index Props --> ", this.props);
    
    const options = filterOptions.map(option => ({
      label: option,
      value: option,
    }));
    
    const transformedSelectedValues = selectedValues.map(value => ({
      label: value,
      value,
    }));
    
    return (
      <Spacer marginBottom='large+3'>
        <Heading id='filter-label' level={3} size='mini'>
          {title}
        </Heading>
        <Spacer marginTop='large' marginBottom='large'>
          <FilterDropdown
            options={options}
            selectedValues={transformedSelectedValues}
            updateSelectedValues={this.updateSelectedValues}
            updateFilters={this.updateFilters}
          />
        </Spacer>
      </Spacer>
    );
  }
}

LocationGroupFilter.propTypes = propTypes;

export default LocationGroupFilter;
