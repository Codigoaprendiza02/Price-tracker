"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImage = [
    {src:"/assets/images/hero-1.svg", alt:"smartWatch"},
    {src:"/assets/images/hero-2.svg", alt:"bag"},
    {src:"/assets/images/hero-3.svg", alt:"lamp"},
    {src:"/assets/images/hero-4.svg", alt:"air fryer"},
    {src:"/assets/images/hero-5.svg", alt:"chair"},
]
const HeroCaraousel = () => {
  return (
    <div className='hero-carousel'>
    <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
    >
        {heroImage.map((product)=>(
            <Image 
                key={product.alt}
                src={product.src}
                alt={product.alt}
                width={484}
                height={484}
                className='object-contain'
            />
        ))}
    </Carousel>
    <Image 
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className='max-xl:hidden absolute -left-[15%] bottom-0 z-0'
    />
    </div>
  )
}

export default HeroCaraousel