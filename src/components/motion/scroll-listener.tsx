'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

type RenderProps = {
  progress: number;
};

type ScrollListenerProps = {
  children: (props: RenderProps) => React.ReactNode;
  id?: string;
  className?: string;
  offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset'];
};

/**
 * Simple component that exposes the scroll position as a CSS variable which can be used to animate other elements.
 */
export function ScrollListener({
  children,
  id,
  className,
  offset,
}: ScrollListenerProps) {
  const ref = useRef(null);

  const [progress, setProgress] = useState(0);

  const scrollYProgress = useScroll({
    target: ref,
    offset: offset ?? ['start end', 'end end'],
  }).scrollYProgress;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });

  return (
    <motion.div ref={ref} id={id} className={className}>
      {children({ progress: progress })}
    </motion.div>
  );
}
