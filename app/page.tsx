'use client'
import GradientButton from '@/components/Buttons/GradientButton'
import OutlinedButton from '@/components/Buttons/OutlinedButton'
import Faq from '@/components/FAQ/Faq'
import Link from 'next/link'
import React, { Suspense, useEffect } from 'react'
import Text from '@/components/Text'
import { ShapeIcon } from '@/components/icons'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        //prefetch the generate token page  
        router.prefetch('/generate-token')
    }, [])
    return (
        <main className='container w-full px-3'>
            <div className='flex md:flex-row flex-col w-full'>
                <div className='max-w-[626px] pt-6 md:pt-0'>
                    <h1 className="text-white text-[36px] md:text-[64px] leading-[46px] md:leading-[72px] font-semibold mt-32 md:mt-10">Token Creating tool for Everyone!</h1>
                    <h2 className="text-base text-ghost-white font-medium mt-10">
                        Creating your own cryptocurrency tokens has never been easier!
                        <br />
                        <br />
                        We simplify the complex process of token creation, making it accessible to everyone, regardless of technical expertise.
                        <br />
                        <br />
                        Whether you're looking to kickstart your project, tokenize assets, or explore the web3, Token Factory provides all the tools you need.
                    </h2>
                    <div className='flex gap-8 my-10'>
                        <Link href={"/generate-token"}>
                            <GradientButton
                                className='w-[140px] lg:w-[374px] h-[41px] rounded-lg self-end px-8 group'
                            >
                                <Text size='base'>Launch App</Text>
                            </GradientButton>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className='max-w-[626px]'>
                <Suspense>
                    <Faq />
                </Suspense>
            </div> */}
            <ShapeIcon className="w-[700px] h-[700px] absolute top-32 right-0 animate-pulse" />
        </main>
    )
}

export default Page