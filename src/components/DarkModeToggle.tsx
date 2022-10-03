import React, { useEffect, useState } from "react";
import wave from "../../public/wave.svg";
import moon from "../../public/moon.svg";
import sun from "../../public/sun.svg";
import Image from "next/image";

const DarkModeToggle = () => {
  const currentTheme = (): boolean => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cseGigsTheme") === "dark") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const [darkMode, setDarkMode] = useState(currentTheme());

  useEffect(() => {
    const resp = currentTheme();
    setDarkMode(resp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  return (
    <div className="flex justify-end w-full">
      {darkMode ? (
        <div className="mx-4 lg-mx-0">
          <Image
            className="sun cursor-pointer"
            height="40px"
            width="40px"
            alt="sun"
            src={sun}
            onClick={() => {
              localStorage.setItem("cseGigsTheme", "light");
              document.documentElement.classList.remove("dark");
              setDarkMode(false);
            }}
          />
        </div>
      ) : (
        <div className="mx-4 lg-mx-0">
          <Image
            className="moon cursor-pointer px-4"
            alt="moon"
            src={moon}
            color="white"
            height="40px"
            width="40px"
            onClick={(e) => {
              localStorage.setItem("cseGigsTheme", "dark");
              document.documentElement.classList.add("dark");
              setDarkMode(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle;
