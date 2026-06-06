import { motion } from "framer-motion";
import { Database, Layers, Server, Shield } from "lucide-react";

interface RamjetLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
  className?: string;
}

const RamjetLogo: React.FC<RamjetLogoProps> = ({
  size = "md",
  animated = true,
  showText = true,
  className = "",
}) => {
  const sizeMap = {
    sm: { container: 32, icon: 16, text: "text-sm", gap: 2 },
    md: { container: 48, icon: 22, text: "text-xl", gap: 3 },
    lg: { container: 64, icon: 30, text: "text-3xl", gap: 4 },
    xl: { container: 96, icon: 44, text: "text-5xl", gap: 5 },
  };

  const s = sizeMap[size];

  // Main server pulse
  const pulseVariants = {
    initial: { scale: 1, opacity: 0.9 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Cache ring rotation
  const ringVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Data flow dash
  const dashVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: [0, 1],
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.08 * i,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const text = "RAMJET";

  return (
    <motion.div
      className={`flex items-center select-none ${className}`}
      style={{ gap: s.gap * 4 }}
      variants={containerVariants}
      initial={animated ? "initial" : false}
      animate="animate"
    >
      {/* Single Logo Mark - Server Cache System */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: s.container, height: s.container }}
      >
        {/* Outer rotating ring - cache sync */}
        <motion.svg
          width={s.container}
          height={s.container}
          viewBox="0 0 48 48"
          className="absolute text-gray-300"
          variants={animated ? ringVariants : undefined}
          initial="initial"
          animate="animate"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </motion.svg>

        {/* Middle ring - cache layers */}
        <svg
          width={s.container * 0.75}
          height={s.container * 0.75}
          viewBox="0 0 48 48"
          className="absolute text-orange-400"
        >
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            opacity="0.6"
          />
        </svg>

        {/* Animated data dash */}
        {animated && (
          <motion.svg
            width={s.container * 0.75}
            height={s.container * 0.75}
            viewBox="0 0 48 48"
            className="absolute text-green-500"
            variants={dashVariants}
            initial="initial"
            animate="animate"
          >
            <circle
              cx="24"
              cy="24"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 30"
              strokeLinecap="round"
            />
          </motion.svg>
        )}

        {/* Center icon - Server/Database hybrid */}
        <motion.div
          className="relative z-10 flex items-center justify-center text-gray-800 bg-white rounded-full"
          style={{
            width: s.container * 0.55,
            height: s.container * 0.55,
          }}
          variants={animated ? pulseVariants : undefined}
          initial="initial"
          animate="animate"
        >
          <Server size={s.icon * 0.7} strokeWidth={2} />
        </motion.div>

        {/* Cache hit indicator */}
        <motion.div
          className="absolute z-20 rounded-full bg-green-500 border-2 border-white"
          style={{
            width: s.container * 0.18,
            height: s.container * 0.18,
            bottom: s.container * 0.12,
            right: s.container * 0.12,
          }}
          animate={
            animated
              ? {
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }
              : undefined
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Wordmark */}
      {showText && (
        <div className={`flex font-bold tracking-wider ${s.text}`}>
          {text.split("").map((letter, i) => (
            <motion.span
              key={i}
              className={`inline-block ${
                i < 3 ? "text-orange-700" : "text-gray-800"
              }`}
              variants={animated ? letterVariants : undefined}
              initial="initial"
              animate="animate"
              custom={i}
              whileHover={
                animated
                  ? {
                      scale: 1.15,
                      color: i < 3 ? "#9A3412" : "#1F2937",
                      transition: { duration: 0.15 },
                    }
                  : undefined
              }
            >
              {letter}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RamjetLogo;