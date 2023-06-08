import React from "react";
import "./Switch.scss";

const Switch = ({ checked, setChecked }) => {
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="btn-container">
      {/* <i className="fa fa-sun-o" aria-hidden="true"></i> */}
      <label className="switch btn-switch-mode-switch">
        <input type="checkbox" name="switch_mode" id="switch_mode" value="1" checked={checked} onChange={handleChange} />
        <label htmlFor="switch_mode" data-on="Sum" data-off="Full" className="btn-switch-mode-switch-inner"></label>
      </label>
      {/* <i className="fa fa-moon-o" aria-hidden="true"></i> */}
    </div>
  );
};

export default Switch;
