import React, { Component } from "react";
import TabList from "./TabList";

export default class TabContent extends Component {
  render() {
    return (
      <div className="container up">
        <TabList>
          <div label="SSL Labs" className="tab-content">
            SSL Labs is a collection of tools and standards focused on SSL. This
            scanner determines the security of your web sites based on its SSL
            configurations. The tool will scans endpoints secured via SSL. The
            Security Scorecard displays an A+ through F grade based on the
            results of SSL Labs online scanning tool. It has special grades, T
            and M, if the site certificate is not trusted or the site name does
            not match the certificate, respectively. Click the grade link
            associated with your URL for a detailed report.
          </div>
          <div label="Brakeman" className="tab-content">
            Brakeman is a static analysis tool which checks Ruby on Rails
            applications for security vulnerabilities. Unlike many web security
            scanners, Brakeman looks at the source code of your application.The
            Security Scorecard displays an A through F grade based on the
            results of Brakeman scans.
          </div>
          <div label="Bundler Audit" className="tab-content">
            Bundler Audit is a small utility which can check your Gemfile's
            contents against the Ruby Advisory Database and provides patch-level
            verification for Bundled apps. The Security Scorecard displays an A
            through F grade based on the results of Bundler Audit scans
          </div>
        </TabList>
      </div>
    );
  }
}
