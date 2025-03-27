import React from "react";
import "../App.css";

const BanList = ({ inputs, setBanInputs }) => {
  const onClick = (e) => {
    setBanInputs((banned) => banned.filter(item => item.value !== e.target.getAttribute("id")));
/*     for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == e.target.getAttribute("id")) {
        const newInputs = inputs.splice(i, 1);
        console.log("newinputs", newInputs);
        
        // l => l.filter(item => item.name !== name));
        console.log("inputs after newinputs", inputs);
        break;
      }
    } */
  };
  return (
    <div className="banned">
      <h3>Banned Tags</h3>
      <div className="container-items">
        {inputs && inputs.length > 0 ?
          (inputs.map((obj) => (
            <button id={obj.value} onClick={onClick}>
              {obj.value}
            </button>
          ))) :
          (<div>
            <h5>You haven't banned any tags yet!</h5>
          </div>)}
      </div>
    </div>
  );
};

export default BanList;
