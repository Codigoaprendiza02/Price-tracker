import React from 'react'
import Image from 'next/image'
import Searchbar from '@/components/Searchbar'
import HeroCaraousel from '@/components/HeroCaraousel'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const Home = async () => {
  const allProduct = await getAllProducts();
  return (
    <>
      <section className='px-6 md:px-20 py-24'>
        <div className='flex max-xl:flex-col'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              Smart Shopping starts here:
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className='head-text'>
              Unleash the power of 
              <span className="text-primary"> PriceTracker</span>
            </h1>
            <p className='nt-6'>
              Powerful, self-serve product and growth analytics to help you convert, engage and retain more
            </p>
            <Searchbar />
          </div>
          
          <HeroCaraousel />
        </div>

        
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProduct?.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </>
    
  )
}

export default Home
