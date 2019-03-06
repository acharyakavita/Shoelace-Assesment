import React from "react";
import Classes from "./SideDrawer.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary";

//gets displayed for mobile view
const sideDrawer = props => {
  let attachedClasses = [Classes.SideDrawer, Classes.Close].join(" ");
  if (props.open) {
    attachedClasses = [Classes.SideDrawer, Classes.open].join(" ");
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.click} />
      <div className={attachedClasses} onClick={props.click}>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
