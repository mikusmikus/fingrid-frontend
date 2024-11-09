'use client';
import { motion, MotionProps } from 'framer-motion';

type WithAnimateInViewProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

export const WithInViewAnimation = ({
  children,
  className,
  ...props
}: WithAnimateInViewProps) => {
  const framerOptions: MotionProps = {
    initial: { opacity: 0 },
    transition: { duration: 0.5 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '0%' },
  };

  return (
    <motion.div {...framerOptions} {...props} className={className}>
      {children}
    </motion.div>
  );
};
