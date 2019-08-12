import React from 'react';

function Content(props) {
  return (
      <div className="row">
        <div className="col-md-10">
          <label>{this.props.country}</label><br/>
          <label>{this.props.state}</label><br/>
          <label>{this.props.city}</label>
        </div>
      </div>
    );
}
