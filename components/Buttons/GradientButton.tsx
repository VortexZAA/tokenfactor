import React, { PropsWithChildren } from 'react'
import Text from '@/components/Text';
import Loading from '../Loading/Loading';
import { isNil } from 'lodash';

type Props = {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    rounded?: string;
    loading?: boolean
    disabledText?: string;
} & React.ButtonHTMLAttributes<Element>

const GradientButton: React.FC<PropsWithChildren<Props>> = ({
    className = '',
    rounded = 'rounded-3xl',
    startIcon,
    endIcon,
    loading = false,
    children,
    disabledText,
    ...rest
}
) => {

    return (
        <button
            disabled={loading}
            className={`py-5 ${className} main-gradient flex justify-between gap-2 items-center ${rounded} active:scale-[0.99] transition-all disabled:opacity-60 disabled:active:scale-100 disabled:cursor-not-allowed hover:opacity-80`}
            {...rest}
        >
            {startIcon}
            <div className='flex-1 text-ghost-white'>
                {loading ?
                    <Loading width={28} height={28} />
                    : children
                }
            </div>
            {endIcon}
        </button>
    )
}

export default GradientButton