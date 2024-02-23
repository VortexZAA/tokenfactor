import React, { FC, useEffect, useRef, useState } from 'react'
import { NumericFormat, OnValueChange } from 'react-number-format'
import Text from "@/components/Text";
import { AnimatePresence, motion } from 'framer-motion';
import { useInput } from '@/contexts/BorderedInputProvider';
import Tooltip from '../Tooltip/Tooltip';
import { InfoIcon } from '../icons';

export const BG_VARIANTS = {
    "standard": "bg-english-violet",
    "transparent": "bg-transparent",
    "blue": "bg-[#0D2842]"
}

type ExtraProps = {
    containerClassName?: string
    onValueChange?: OnValueChange
    value: string | number | null | undefined
    bgVariant?: keyof typeof BG_VARIANTS;
    isNumeric?: boolean,
    isRequired?: boolean,
    isTextArea?: boolean,
    isRequiredMsg?: string,
    tooltipDesc?: string
}

const BorderedInput: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & ExtraProps> = ({
    containerClassName,
    className,
    value,
    onValueChange,
    bgVariant = "standard",
    isNumeric = false,
    isTextArea,
    isRequired = false,
    isRequiredMsg,
    tooltipDesc,
    ...rest
}) => {
    const inputRef = useRef<any>(null);

    const { showWarning } = useInput();
    const [isShowWarning, setIsShowWarning] = useState(false);

    const handleClick = () => {
        inputRef?.current?.focus();
    }

    useEffect(() => {
        if (showWarning) {
            handleBlur();
        }

    }, [showWarning]);

    const handleBlur = () => {
        if (!isRequired) return;

        if (!value) {
            setIsShowWarning(true);
        } else {
            setIsShowWarning(false);
        }
    }

    const renderInput = () => {
        if (isNumeric) {
            return <NumericFormat
                style={{ textAlign: 'left' }}
                getInputRef={inputRef}
                value={value === 0 ? '' : value}
                allowNegative={false}
                onValueChange={onValueChange}
                allowLeadingZeros={false}
                allowedDecimalSeparators={['.', ',']}
                thousandSeparator=","
                thousandsGroupStyle="thousand"
                fixedDecimalScale
                placeholder={value === 0 ? "0.00" : rest.placeholder}
                disabled={rest.disabled}
                className={`${className} bg-transparent w-full h-12 focus:outline-none rounded-lg p-2 focus:ring-1 ring-celticBlue`}
                onBlur={handleBlur}
            />
        }

        if (isTextArea) {
            return <textarea
                placeholder={rest.placeholder}
                className='bg-[#0D2842] rounded-lg min-h-12 pt-3 -mb-2 px-4 focus:outline-none w-full focus:ring-1 ring-celticBlue'
                value={value}
                rows={3}
                onChange={rest.onChange as any}
            />
        }

        return <input
            ref={inputRef}
            placeholder={rest.placeholder}
            className='bg-[#0D2842] rounded-lg h-12 pl-4 focus:outline-none w-full focus:ring-1 ring-celticBlue'
            onBlur={handleBlur}
            value={value}
            {...rest}
        />
    }

    return (
        <motion.div layout onClick={handleClick} className="w-full bg-[#0c0c2766] relative border backdrop-blur-[37px] border-[#004E99] rounded-xl md:rounded-2xl px-3 pt-4 pb-3 md:px-6 md:py-8 flex flex-col gap-4 mt-6">
            <div className="flex items-center w-full justify-between">
                <div className='relative'>
                    {tooltipDesc ?
                        <Tooltip title={tooltipDesc} placement='bottom' containerClassName='flex cursor-pointer mr-4 gap-1'>
                            <Text size="lg" weight="font-medium" className='flex-1 text-center'>{rest.title}</Text>
                            <InfoIcon />
                        </Tooltip>
                        :
                        <Text size="lg" weight="font-medium" className='flex-1 text-center mr-4'>{rest.title}</Text>
                    }

                </div>
                <div className={`${containerClassName} w-[455px] relative bg-[#0D2842] text-white rounded-lg cursor-text`} >
                    {renderInput()}
                </div>
            </div>
            <AnimatePresence key={rest.title}>
                {isShowWarning && (
                    <motion.div
                        key={rest.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="text-red-500 text-sm mt-1 absolute bg-gradient-to-r from-celticBlue via-celticBlue to-celticBlue  backdrop-brightness-75 rounded-sm py-2 px-4 right-[30%] top-20"
                    >
                        {isRequiredMsg || <span>Please enter a valid {rest.title}.</span>}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default BorderedInput