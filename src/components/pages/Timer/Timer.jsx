import React, { useContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "../../buttons/PlayButton/PlayButton";
import SettingButton from "../../buttons/SettingButton/SettingButton";
import StopButton from "../../buttons/StopButton/StopButton";
import SettingsContext from "../Settings/SettingsContext/SettingsContext";
import "./Timer.css";

function Timer() {
  const settingInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("break");

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function initTimer() {
    setSecondsLeft(settingInfo.workMinutes * 60);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work"
        ? settingInfo.workMinutes
        : settingInfo.breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingInfo]);

  const totalSecond =
    mode === "work"
      ? settingInfo.workMinutes * 60
      : settingInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSecond) * 100);

  const minutes = Math.floor(secondsLeft / 60);

  let seconds = secondsLeft % 60;

  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="Timer">
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          pathTransitionDuration: 0.5,
          pathColor:
            mode === "work" ? `rgba(62, 152, 199, .9)` : "rgb(17,165,127)",
          textColor: isPaused === true ? "#a4a4a4" : "#fff",
          trailColor: "#fff",
          backgroundColor: "#fff",
        })}
      />
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(!isPaused);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <StopButton
            onClick={() => {
              setIsPaused(!isPaused);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <SettingButton onClick={() => settingInfo.setShow(true)} />
      </div>
    </div>
  );
}

export default Timer;
