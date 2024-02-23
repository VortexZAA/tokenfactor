import React, { PropsWithChildren } from 'react'

type Props = {
    className?: string,
    containerClassName?: string,
    borderGradient?:string,
    backgroundColor?:string,
    style?: React.CSSProperties,
}

const BorderedContainer = React.forwardRef<any, PropsWithChildren<Props>>(({ children, className = '', backgroundColor="bg-maasblue",borderGradient="main-gradient",containerClassName = '', style }, ref) => {
    return (
        <div ref={ref} className={`${containerClassName} ${borderGradient} rounded-md relative p-[2px]`}>
            <div className={`${className} ${backgroundColor} w-full h-full rounded-[4px] relative `} style={style}>
                {children}
            </div>
        </div>
    )
})

BorderedContainer.displayName = "BorderedContainer";

export default BorderedContainer