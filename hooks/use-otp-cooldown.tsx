import { useState, useEffect } from "react";

const useOtpCooldown = () => {
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const updateCooldown = () => {
    const storedEndTime = sessionStorage.getItem("otpResendCooldownEnd");
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingSeconds = Math.max(0, endTime - currentTime);
      setResendCooldown(remainingSeconds);
      if (remainingSeconds <= 0) {
        sessionStorage.removeItem("otpResendCooldownEnd");
      }
    } else {
      setResendCooldown(0);
    }
  };

  useEffect(() => {
    updateCooldown();
    const interval = setInterval(updateCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCooldownTime = (seconds: number): string => {
    const secs = seconds <= 0 ? 0 : seconds;
    return `${secs} second${secs !== 1 ? "s" : ""}`;
  };

  return { resendCooldown, setResendCooldown, formatCooldownTime };
};

export default useOtpCooldown;
