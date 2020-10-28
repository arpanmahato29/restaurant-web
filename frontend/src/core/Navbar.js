import React from 'react';
import {Link,withRouter} from 'react-router-dom';

const currentTab = (history,path) => {
  if(history.location.pathname === path){
    return {color:"#272525"}
  } else {
    return {color:"#fd7e14"}
  }
};

function Navbar({history}) {
  return (
    <div>
      
    </div>
  )
}

export default Navbar
