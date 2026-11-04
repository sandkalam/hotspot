import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

function ClockAnim() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="absolute"
      style={{
        bottom: "82.5%",
        left: "30%",
        height: "10%",
      }}
    >
      <Clock
        value={value}
        renderFace={false}
        size={null}
        locale="id-ID"
        className="absolute w-full h-full object-cover select-none pointer-events-none perspective-[1000px] transform-gpu rotate-y-45"
      />
    </div>
  );
}

export default ClockAnim;
