import React, { FC, PropsWithChildren, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useIsMobile from '@/hooks/useIsMobile'

export const PLACEMENT_CLASSES = {
    "bottom": "top-1/2 left-1/2 -translate-x-1/4 translate-y-4",
    "bottom-center": "top-full left-1/2 translate-x-[20%] translate-y-4",
    "top": "bottom-full left-1/2 -translate-x-1/2 -translate-y-4",
    "left": "top-1/2 right-full -translate-x-4 -translate-y-1/2",
    "right": "top-1/2 left-full translate-x-4 -translate-y-1/2",
    "special": "top-full left-full translate-x-4 translate-4",
    "right-top": "top-0 left-full translate-x-4",
    "right-bottom": "bottom-0 left-full translate-x-4",
    "left-top": "top-0 right-full -translate-x-4",
    "left-bottom": "bottom-0 right-full -translate-x-4",
    "left-bottom-corner": "top-0 left-full translate-y-1/2 -translate-x-[100%]"
}

type Props = {
    title?: React.ReactNode
    active?: boolean
    placement?: keyof typeof PLACEMENT_CLASSES,
    onHover?: () => void
    onLeave?: () => void
    forceOpen?: boolean
    titleContainerClassName?: string
    titleRootClassName?: string,
    containerClassName?: string,
    width?: string
    height?: string
    rounded?: string
}

const Tooltip: FC<PropsWithChildren<Props>> = ({
    title,
    active = true,
    forceOpen = false,
    placement = "bottom",
    titleContainerClassName = '',
    titleRootClassName = '',
    containerClassName = '',
    onHover,
    onLeave,
    children,
    width = 'w-[300px]',
    rounded = 'rounded-lg'
}) => {
    const isMobile = useIsMobile();
    const [hovered, setHovered] = useState(false)

    const parentRef = useRef<HTMLDivElement>(null);
    const position = parentRef.current?.getBoundingClientRect();

    const showTooltip = () => {
        setHovered(true)
        onHover?.()
    }

    const closeTooltip = () => {
        setHovered(false)
        onLeave?.()
    }

    const tooltipContent = (
        <AnimatePresence>
            <div style={{ top: (position?.top! + 20), left: position?.left, right: position?.right }} className='absolute z-[100]'>
                {
                    active && (hovered || forceOpen) ?
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`backdrop-blur-[2px] ${isMobile ? `absolute bottom-10 left-10 right-10` : `absolute ${PLACEMENT_CLASSES[placement]}`} ${titleRootClassName}`}
                        >
                            <div className={`${isMobile ? `w-full` : `${width}`} ${rounded}  ${titleContainerClassName} border border-white/40 bg-white/[0.09]  p-2`}>
                                {title}
                            </div>
                        </motion.div>
                        :
                        null
                }
            </div>
        </AnimatePresence>
    )

    return (
        <div ref={parentRef} className={`${isMobile ? "" : "relative z-[999]"} ${containerClassName}`} onMouseEnter={showTooltip} onMouseLeave={closeTooltip}>
            {children}
            {createPortal(tooltipContent, document.body)}
        </div>
    )
}

export default Tooltip
