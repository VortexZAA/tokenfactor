'use client';

import React from 'react'
import InfoSide from '../generate-token/_components/InfoSide';
import ShapeSide from '../generate-token/_components/ShapeSide';
import Steps from '../generate-token/_components/Steps/StepSelector';
import { stepList } from '../generate-token/_components/StepSide';
import Link from 'next/link';

function CreatedTokensLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex gap-4 flex-col md:flex-row md:gap-24 z-10 relative md:min-h-[879px] justify-between">
            <InfoSide />
            <div className='max-w-[820px]'>
                <Link href={'/generate-token'}>
                    <Steps steps={stepList} selectedStep={-1} />
                </Link>
                <div className='mt-6'>
                    {children}
                </div>
                <ShapeSide />
            </div>
        </div>
    )
}

export default CreatedTokensLayout;