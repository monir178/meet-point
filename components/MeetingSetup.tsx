"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import styles from "./ui/Checkbox.module.css";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex  h-16 items-center justify-center gap-3">
        <div className={styles["checkbox-wrapper-12"]}>
          <div className={styles.cbx}>
            <input
              type="checkbox"
              id="cbx-12"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            <label htmlFor="cbx-12"></label>
            <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
              <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
          </div>

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo-12">
                <feGaussianBlur
                  result="blur"
                  stdDeviation="4"
                  in="SourceGraphic"></feGaussianBlur>
                <feColorMatrix
                  result="goo-12"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                  mode="matrix"
                  in="blur"></feColorMatrix>
                <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
              </filter>
            </defs>
          </svg>
          <span>Join with mic and camera off</span>
        </div>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 hover:bg-green-700 px-4 py-2.5 shadow-lg shadow-green-500/50"
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}>
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
