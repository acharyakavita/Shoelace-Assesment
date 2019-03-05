import React from "react";
import Classes from "./NavigationItems.css";
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  return (
    <ul className={Classes.NavigationItems}>
      <NavigationItem link="/">Users</NavigationItem>
      <NavigationItem link="/addNew">Add User</NavigationItem>
    </ul>
  );
};

export default navigationItems;
