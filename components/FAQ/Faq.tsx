'use client';

import { useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import FaqItem from "./FaqItem";

const Faq = () => {
  const faqData = [
    {
      question: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
    },
    {
      question: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
    },
    {
      question: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
    }, {
      question: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
      answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quos!`,
    }
  ];

  const searchParams = useSearchParams()

  const scroll = searchParams.get('scroll')

  useEffect(() => {
    if (scroll && scroll === 'FAQ') {
      const faqElement = document.getElementById('faq-section');

      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth', inline: "center" });
      }
    }
  }, [scroll]);

  return (
    <div id="faq-section" className="w-full mt-12">
      <h2 className="text-4xl font-semibold text-white mb-4">FAQ</h2>
      <div className="divide divide-white/10">
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faq;