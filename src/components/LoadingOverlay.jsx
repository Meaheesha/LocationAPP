import React from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'terra-overlay/lib/LoadingOverlay';
import OverlayContainer from 'terra-overlay/lib/OverlayContainer';

const propTypes = {
  /**
   * Indicates if the overlay is open
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Indicates if the overlay is relative to the triggering container
   */
  isRelativeToContainer: PropTypes.bool,

  /**
   * The visual theme to be applied to the overlay background
   */
  backgroundStyle: PropTypes.oneOf([
    'light',
    'dark',
    'clear',
  ]),

  /**
   * The message to be displayed within the overlay
   */
  message: PropTypes.string,
};

const LoadingWrapper = props => (
  <OverlayContainer style={{ height: '200px', width: '100%' }}>
    <LoadingOverlay
      isAnimated
      zIndex='6000'
      isOpen={props.isOpen}
      isRelativeToContainer={props.isRelativeToContainer}
      backgroundStyle={props.backgroundStyle}
      message={props.message}
    />
  </OverlayContainer>
);

LoadingWrapper.defaultProps = {
  isRelativeToContainer: true,
  backgroundStyle: 'light',
  message: null,
};

LoadingWrapper.propTypes = propTypes;

export default LoadingWrapper;
