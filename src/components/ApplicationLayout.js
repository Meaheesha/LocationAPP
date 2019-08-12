import SlidePanel from "terra-slide-panel";
import React, { Component } from "react";
//import LocationFilter from "././LocationFilter";
import TabContent from "./TabContent";
import App from "../components/App";
class ApplicationLayout extends Component {
  renderPanelContent = () => (
    <div>
      <App />
    </div>
  );
  renderMainContent = () => (
    <div>
      <TabContent />
    </div>
  );
  render() {
    return (
      <div>
        <h4>
          <center>Location Application</center>
        </h4>
        <hr />
        <SlidePanel
          className="panel"
          fill
          panelBehavior="squish"
          panelPosition="start"
          panelSize="small"
          isOpen="true"
          panelContent={this.renderPanelContent()}
          mainContent={this.renderMainContent()}
          size="huge"
        />
      </div>
    );
  }
}
export default ApplicationLayout;
