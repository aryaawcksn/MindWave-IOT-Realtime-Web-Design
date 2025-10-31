import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

function JackpotStat({
  finalValue,
  label,
  suffix = "",
}: {
  finalValue: number;
  label: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 0.6, ease: "easeInOut", repeat: 1 },
    });

    let current = 0;
    const duration = 3500; // total 1.5 detik biar gak terlalu cepat
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress); // gunakan easing
      const value = Math.floor(eased * finalValue);
      setDisplayValue(value);

      if (progress < 1) requestAnimationFrame(tick);
      else setDisplayValue(finalValue);
    };

    requestAnimationFrame(tick);
  }, [finalValue, controls]);

  return (
    <motion.div
      className="text-center select-none"
      animate={controls}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <p className="text-4xl font-bold text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        {displayValue}
        {suffix}
      </p>
      <p className="text-cyan-300 text-sm">{label}</p>
    </motion.div>
  );
}

export { JackpotStat };
