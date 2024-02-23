import { motion } from 'framer-motion';
import React, { FC } from 'react';
import BorderedContainer from './BorderedContainer';
import { CheckIcon } from './icons';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, className }) => {

  const variants = {
    checked: {
      scale: 1,
    },
    unchecked: {
      scale: 0.7,
    },
  };

  return (
    <button onClick={onChange} className={`active:scale-95 ${className}`}>
      <BorderedContainer containerClassName='w-8 h-8 ' className='flex items-center justify-center'>
        <motion.div
          variants={variants}
          initial={checked ? 'checked' : 'unchecked'}
          animate={checked ? 'checked' : 'unchecked'}
          transition={{ ease: "easeOut" }}
        >
          {checked && <CheckIcon />}
        </motion.div>
      </BorderedContainer>
    </button>
  );
};

export default Checkbox;

