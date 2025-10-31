import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";

interface CarouselCardProps {
  children: React.ReactNode[];
  labels: string[];
}

const CarouselCardComponent = ({ children, labels }: CarouselCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + children.length) % children.length;
    setDirection(newDirection);
    setCurrentIndex(newIndex);
  };

  return (
    <Card className="relative bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none" />
      <div className="absolute inset-0 border border-cyan-400/10 rounded-lg pointer-events-none" style={{ 
        boxShadow: '0 0 20px rgba(34, 211, 238, 0.1) inset' 
      }} />
      
      <div className="relative p-6">
        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-3 mb-5">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="group flex flex-col items-center gap-1.5"
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-10 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50"
                    : "w-5 bg-cyan-700/40 group-hover:bg-cyan-600/60"
                }`}
              />
              <span className={`text-[11px] tracking-wide transition-colors ${
                index === currentIndex ? "text-cyan-300" : "text-cyan-600/70 group-hover:text-cyan-500"
              }`}>
                {labels[index]}
              </span>
            </button>
          ))}
        </div>

        {/* Carousel Content */}
        <div className="relative overflow-hidden min-h-[340px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              {children[currentIndex]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
            <button
              aria-label="Previous"
              onClick={() => paginate(-1)}
              className="pointer-events-auto inline-flex items-center justify-center h-8 w-8 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/15 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next"
              onClick={() => paginate(1)}
              className="pointer-events-auto inline-flex items-center justify-center h-8 w-8 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/15 hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Memoize to prevent unnecessary re-renders
export const CarouselCard = memo(CarouselCardComponent);
