import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AutoSizer, List} from 'react-virtualized';
import Select, {components} from 'react-select';
import {MAX_DROPDOWN_HEIGHT, MAX_ITEM_COUNT, OVERSCAN_ROW_COUNT, ROW_HEIGHT,} from './LocationGroupFilterConstants';
import './FilterDropdown.scss';

const propTypes = {
  /**
   * Array of options to display in dropdown
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The value of the dropdown option
     */
    value: PropTypes.string.isRequired,
    
    /**
     * The display label of the dropdown option
     */
    label: PropTypes.string.isRequired,
  })).isRequired,
  
  /**
   * Array of selected values
   */
  selectedValues: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The value of the dropdown option
     */
    value: PropTypes.string.isRequired,
    
    /**
     * The display label of the dropdown option
     */
    label: PropTypes.string.isRequired,
  })).isRequired,
  
  /**
   * Callback function to update selected option
   */
  updateSelectedValues: PropTypes.func.isRequired,
  
  /**
   * Callback function to apply selected option
   */
  updateFilters: PropTypes.func.isRequired,
};

class FilterDropdown extends Component {
  
  rowRenderer = (children, row) => (
    <div key={row.key} className='dropdown-item' style={row.style}>
      {children[row.index]}
    </div>
  );
  
  noRowsRenderer = () => (
    <div className='dropdown-item-empty'>
      <p>No results</p>
    </div>
  );
  
  computeHeight = (numChildren) => {
    if (numChildren === 0) {
      return ROW_HEIGHT;
    } else if (numChildren < MAX_ITEM_COUNT) {
      return (numChildren * ROW_HEIGHT);
    }
    
    return MAX_DROPDOWN_HEIGHT;
  };
  
  renderMenuList = ({children}) => {
    const rowCount = children.length ? children.length : 0;
    
    return (
      <AutoSizer disableHeight>
        {({width}) => (
          <List
            height={this.computeHeight(rowCount)}
            width={width}
            rowHeight={ROW_HEIGHT}
            rowCount={rowCount}
            rowRenderer={row => this.rowRenderer(children, row)}
            noRowsRenderer={this.noRowsRenderer}
            overscanRowCount={OVERSCAN_ROW_COUNT}/>
        )}
      </AutoSizer>
    );
  };
  
  renderOption = (optionProps) => {
    const isSelected = optionProps.isSelected ? 'is-selected' : '';
    
    return (
      <components.Option className='dropdown-option' {...optionProps}>
        <span className={`dropdown-option-checkbox ${isSelected}`}/>
        <span className='dropdown-option-display'>{optionProps.label}</span>
      </components.Option>
    );
  };
  
  render() {
    const {
      options,
      updateSelectedValues,
      updateFilters,
      selectedValues,
    } = this.props;
    
    console.log("Filter Dropdown Component Props --> ", this.props);
  
  
    // Increase contrast of placeholder color for accessibility purposes
    const placeholder = provided => ({
      ...provided,
      color: '#000',
    });
  
    // Modify background color to be transparent when selected to
    // reflect Terra styles
    const option = (provided, { theme, isSelected, isFocused }) => {
      let backgroundColor = isFocused ? theme.colors.primary25 : 'transparent';
      backgroundColor = isSelected ? backgroundColor : provided.backgroundColor;
    
      return {
        ...provided,
        backgroundColor,
      };
    };
    
    return (
      <Select
        isMulti
        isSearchable
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        aria-labelledby='filter-label'
        placeholder="All"
        options={options}
        value={selectedValues}
        onChange={updateSelectedValues}
        onBlur={updateFilters}
        components={{
          MenuList: menuProps => this.renderMenuList(menuProps),
          Option: optionProps => this.renderOption(optionProps),
        }}
        styles={{ placeholder, option }}
      />
    );
  }
}

FilterDropdown.propTypes = propTypes;
export default FilterDropdown;
