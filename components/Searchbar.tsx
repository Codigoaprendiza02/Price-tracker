"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent } from 'react'
import { useState } from 'react'

const isValidAmazonProduct=(url:string)=>{
  try {
    const parsedLink = new URL(url);
    const hostname = parsedLink.hostname;

    if(hostname.includes('amazon.com') || hostname.includes('amazon') || hostname.includes('amazon')){
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event : FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    const isValid=isValidAmazonProduct(searchPrompt);
    // alert(isValid ? "Valid" : "Invalid");
    if(isValid===false) {
      return alert("Please enter the valid link");
    }
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input type="text" 
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        placeholder='Enter product link' className='searchbar-input'/>
        <button type='submit' className='searchbar-btn' disabled={searchPrompt===''}>{isLoading ? "Searching..." : "Search"}</button>
    </form>
  )
}

export default Searchbar;