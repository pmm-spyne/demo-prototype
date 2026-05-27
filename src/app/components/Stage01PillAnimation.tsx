import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "motion/react";
import imgCar from "../../imports/Frame2147240604/5dc495ae052ef514c9683fd2a095ba455d93a330.png";

type Phase = "frame1" | "frame2" | "frame3";

const FRAME1_MS = 1000;
const FRAME2_MS = 1500;
const FRAME3_MS = 1500;

function useLoopPhase(): { phase: Phase; cycle: number } {
  const [phase, setPhase] = useState<Phase>("frame1");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const sequence: { p: Phase; ms: number }[] = [
      { p: "frame1", ms: FRAME1_MS },
      { p: "frame2", ms: FRAME2_MS },
      { p: "frame3", ms: FRAME3_MS },
    ];
    let cancelled = false;
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const advance = (i: number) => {
      if (cancelled) return;
      setPhase(sequence[i].p);
      timeout = setTimeout(() => {
        const next = (i + 1) % sequence.length;
        if (next === 0) setCycle((c) => c + 1);
        advance(next);
      }, sequence[i].ms);
    };

    advance(0);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return { phase, cycle };
}

function HoldingCostCounter({
  phase,
  holdingCost,
}: {
  phase: Phase;
  holdingCost: number;
}) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = motionVal.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [motionVal]);

  useEffect(() => {
    if (phase === "frame1") {
      motionVal.set(0);
      const ctrl = animate(motionVal, [0, holdingCost, holdingCost * 2], {
        duration: 0.9,
        ease: "easeOut",
        times: [0, 0.55, 1],
      });
      return () => ctrl.stop();
    }
    if (phase === "frame2") {
      motionVal.set(holdingCost * 2);
      return;
    }
    if (phase === "frame3") {
      const ctrl = animate(motionVal, holdingCost * 2, 0, {
        duration: 0.35,
        ease: "easeIn",
        delay: 0.55,
      });
      return () => ctrl.stop();
    }
  }, [phase, holdingCost, motionVal]);

  return (
    <motion.div
      className="absolute top-0 right-0 z-20 rounded-[4px] bg-[#0F0E1A]/90 px-[5px] py-[2px]"
      initial={false}
      animate={{ opacity: phase === "frame2" ? 0.35 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-[8px] font-bold text-[#EF4444] font-['Inter:Bold',sans-serif] tabular-nums">
        ${display}/day
      </span>
    </motion.div>
  );
}

function ListingCard({
  flipped,
  glow,
}: {
  flipped: boolean;
  glow: boolean;
}) {
  const badge = flipped ? "Day 0" : "No Photos";
  const badgeTone = flipped ? "green" : "red";

  return (
    <motion.div
      className="relative w-[44px] h-[54px] rounded-[5px] border border-black/10 bg-white overflow-hidden"
      animate={
        glow
          ? {
              boxShadow: [
                "0 0 0 rgba(16,185,129,0)",
                "0 0 10px rgba(16,185,129,0.65)",
                "0 0 0 rgba(16,185,129,0)",
              ],
            }
          : { boxShadow: "0 0 0 rgba(16,185,129,0)" }
      }
      transition={{ duration: 0.7, times: [0, 0.45, 1] }}
      style={{ transformStyle: "preserve-3d", perspective: 400 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex-1 bg-[#E5E7EB] m-[3px] rounded-[3px]" />
          <div className="h-[10px] mx-[3px] mb-[3px] bg-[#F3F4F6] rounded-[2px]" />
        </div>
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img
            src={imgCar}
            alt=""
            className="absolute inset-[3px] w-[calc(100%-6px)] h-[calc(100%-6px)] object-cover rounded-[3px]"
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.span
          key={badge}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-[3px] left-[3px] z-10 rounded-[2px] px-[3px] py-[1px] text-[5px] font-bold uppercase font-['Inter:Bold',sans-serif] leading-none
            ${badgeTone === "red" ? "bg-[#FEE2E2] text-[#EF4444]" : "bg-[#D1FAE5] text-[#059669]"}`}
        >
          {badge}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

function GhostGrid({ showLine }: { showLine: boolean }) {
  const cells = Array.from({ length: 6 }, (_, i) => i);
  const parentIdx = 1;
  const targetIdx = 5;

  return (
    <div className="relative w-[108px] h-[62px]">
      <svg
        className="absolute inset-0 pointer-events-none z-10 overflow-visible"
        viewBox="0 0 108 62"
        aria-hidden
      >
        <motion.line
          x1={22}
          y1={14}
          x2={94}
          y2={50}
          stroke="#10B981"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: showLine ? 1 : 0,
            opacity: showLine ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
        />
      </svg>

      <div className="grid grid-cols-3 gap-[4px] h-full">
        {cells.map((i) => {
          const isParent = i === parentIdx;
          const isTarget = i === targetIdx;
          return (
            <div
              key={i}
              className={`relative rounded-[3px] border overflow-hidden
                ${isParent ? "border-[#10B981] bg-[#ECFDF5]" : "border-black/8 bg-white/80"}
                ${isTarget ? "border-[#7C3AED]/40 bg-[#F5F3FF]" : ""}`}
            >
              <div className={`h-[70%] m-[2px] rounded-[2px] ${isTarget ? "bg-[#E5E7EB]" : "bg-[#F3F4F6]"}`} />
              <div className="h-[4px] mx-[2px] mb-[2px] bg-[#E5E7EB] rounded-[1px]" />
              {isParent && (
                <motion.span
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.25 }}
                  className="absolute bottom-[1px] left-[1px] right-[1px] text-center rounded-[2px] bg-[#10B981] text-white text-[4px] font-bold uppercase py-[1px] font-['Inter:Bold',sans-serif] leading-none"
                >
                  Parent found
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Frame3Card() {
  const [flipped, setFlipped] = useState(false);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    setFlipped(false);
    setGlow(false);
    const flipTimer = setTimeout(() => setFlipped(true), 400);
    const glowTimer = setTimeout(() => setGlow(true), 850);
    return () => {
      clearTimeout(flipTimer);
      clearTimeout(glowTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ListingCard flipped={flipped} glow={glow} />
    </motion.div>
  );
}

export function Stage01PillAnimation({ holdingCost = 46 }: { holdingCost?: number }) {
  const { phase, cycle } = useLoopPhase();

  return (
    <div
      className="relative w-[160px] h-[100px] shrink-0 overflow-hidden rounded-[6px] bg-[#FAFAFB]"
      aria-hidden
    >
      <HoldingCostCounter phase={phase} holdingCost={holdingCost} />

      <AnimatePresence mode="wait">
        {phase === "frame1" && (
          <motion.div
            key="frame1"
            className="absolute inset-0 flex items-center pl-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ x: -36, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <ListingCard flipped={false} glow={false} />
            </motion.div>
          </motion.div>
        )}

        {phase === "frame2" && (
          <motion.div
            key="frame2"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GhostGrid showLine />

            <motion.div
              className="absolute top-[4px] bottom-[4px] w-[14px] pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(124,58,237,0.15), rgba(124,58,237,0.85), rgba(124,58,237,0.15), transparent)",
              }}
              initial={{ left: "-8%" }}
              animate={{ left: "108%" }}
              transition={{ duration: 1.2, ease: "linear", delay: 0.15 }}
            />
          </motion.div>
        )}

        {phase === "frame3" && (
          <motion.div
            key="frame3"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Frame3Card key={cycle} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
