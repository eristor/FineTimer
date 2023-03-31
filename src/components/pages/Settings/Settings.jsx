import React, { useContext } from "react";
import ReactSlider from "react-slider";
import BackButton from "../../buttons/BackButton/BackButton";
import SettingsContext from "./SettingsContext/SettingsContext";
import "./Slider.css";

function Settings() {
  const settingInfo = useContext(SettingsContext);
  return (
    <div style={{ width: "30vw", textAlign: "left" }}>
      <label>Work minutes: {settingInfo.workMinutes}</label>
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingInfo.workMinutes}
        min={1}
        max={120}
        onChange={(value) => {
          settingInfo.setWorkMinutes(value);
        }}
      />
      <label>Rest minutes: {settingInfo.breakMinutes}</label>
      <ReactSlider
        className="slider green"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingInfo.breakMinutes}
        min={1}
        max={120}
        onChange={(value) => {
          settingInfo.setBreakMinutes(value);
        }}
      />
      <div style={{'display': 'flex', 'justifyContent': 'center', 'paddingTop': '40px'}}>
        <BackButton onClick ={() => settingInfo.setShow(false)}/>
      </div>
    </div>
  );
}

export default Settings;
