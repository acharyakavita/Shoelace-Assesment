import React from "react";
import Classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  //nav list
  return (
    <ul className={Classes.NavigationItems}>
      <NavigationItem link="/">Users</NavigationItem>
      <NavigationItem link="/addNew">Add New</NavigationItem>
    </ul>
  );
};

export default navigationItems;
