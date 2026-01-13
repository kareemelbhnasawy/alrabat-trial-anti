import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; caption?: string }[] | string[];
  startIndex?: number;
}

export const Lightbox = ({
  isOpen,
  onClose,
  images,
  startIndex = 0,
}: LightboxProps) => {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  // Sync internal index with start index when it opens
  useEffect(() => {
    if (isOpen) setIndex(startIndex);
  }, [isOpen, startIndex]);

  // Normalize images to object format
  const normalizedImages = images.map((img) =>
    typeof img === "string" ? { url: img, caption: "" } : img
  );

  const currentImage = normalizedImages[index];

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = normalizedImages.length - 1;
        if (next >= normalizedImages.length) next = 0;
        return next;
      });
    },
    [normalizedImages.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, paginate]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-[110]"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons (Desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              paginate(-1);
            }}
            className="absolute left-4 z-[110] hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              paginate(1);
            }}
            className="absolute right-4 z-[110] hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.img
                key={index}
                src={currentImage?.url}
                alt={currentImage?.caption || ""}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -10000) {
                    paginate(1);
                  } else if (swipe > 10000) {
                    paginate(-1);
                  }
                }}
                className="max-h-full max-w-full object-contain rounded shadow-2xl"
              />
            </AnimatePresence>

            {/* Caption Overlay */}
            {currentImage?.caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-0 right-0 text-center pointer-events-none"
              >
                <div className="inline-block bg-black/60 px-6 py-3 rounded-full backdrop-blur-md">
                  <p className="text-white text-sm font-medium">
                    {currentImage.caption}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/50 text-sm font-medium z-[100]">
              {index + 1} / {normalizedImages.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper for swipe detection
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
