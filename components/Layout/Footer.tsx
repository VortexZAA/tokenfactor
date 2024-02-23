import React from 'react'
import Text from "@/components/Text";
import Link from 'next/link';
import { Logo } from '../icons';

const Footer = () => {
    return (
        <footer className="bg-[#03101C] flex flex-col md:gap-x-48 md:gap-y-28 items-top flex-wrap px-6 md:px-20 md:-mx-20 md:pr-16 mt-40 pb-24 relative z-50">
            <div className="flex items-center gap-4 mt-10 md:mt-20">
                <Logo width="44" height='36' />
                <Text size="2xl" textColor="text-white">
                    Token Factory
                </Text>
            </div>
            <div className="grid md:grid-cols-4 gap-10 md:gap-40 md:mt-0 mt-10">
                <div className="flex flex-col content-start justify-start gap-4">
                    <Text size="sm" textColor="text-white" weight="font-semibold">
                        Product
                    </Text>
                    {/* <div>
                        <Link
                            href={"/?scroll=FAQ"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-105 transition-all gap-2 inline-block"
                        >
                            <Text size="sm" textColor="text-white" className="cursor-pointer">
                                FAQ
                            </Text>
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-105 transition-all gap-2 inline-flex"
                        >
                            <Text size="sm" textColor="text-white" className="cursor-pointer">
                                White paper
                            </Text>
                            <img
                                alt="external-link"
                                src="/images/external-link.svg"
                                className="w-2 h-2"
                            />
                        </Link>
                    </div> */}
                    <div>
                        <Link
                            href={""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-105 transition-all inline-flex gap-2"
                        >
                            <Text size="sm" textColor="text-white">
                                Brand Identity
                            </Text>
                            <img
                                alt="external-link"
                                src="/images/external-link.svg"
                                className="w-2 h-2"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col content-start justify-start gap-6 col-start-2">
                    <Text size="sm" weight="font-semibold">
                        Social
                    </Text>
                    <div className="flex flex-col content-start gap-4">
                        <div>
                            <Link
                                href={""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 transition-all inline-flex gap-2"
                            >
                                <Text size="sm" textColor="text-white">
                                    X
                                </Text>
                                <img
                                    alt="external-link"
                                    src="/images/external-link.svg"
                                    className="w-2 h-2"
                                />
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 transition-all inline-flex gap-2"
                            >
                                <Text size="sm" textColor="text-white">
                                    Discord
                                </Text>
                                <img
                                    alt="external-link"
                                    src="/images/external-link.svg"
                                    className="w-2 h-2"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer