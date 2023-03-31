import Timer from "./components/pages/Timer/Timer";
import "./App.css";
import Settings from "./components/pages/Settings/Settings";
import { useState } from "react";
import SettingsContext from "./components/pages/Settings/SettingsContext/SettingsContext";

function App() {
  const [show, setShow] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(45)
  const [breakMinutes, setBreakMinutes] = useState(15)
  return (
    <div className="App">
      <SettingsContext.Provider value={{
        workMinutes,
        breakMinutes,
        setBreakMinutes,
        setWorkMinutes,
        setShow
      }}>
        {show ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
