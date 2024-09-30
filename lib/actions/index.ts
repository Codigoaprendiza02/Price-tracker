"use server"
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { scrapedAmazonProduct } from "../scraper";
import { connectToDB } from "../scraper/mongoose";

import { url } from "inspector";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../scraper/utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
export async function scrapeAndStoreProduct(productURL:string) {
    if(!productURL){
        return;
    }
    try {
        connectToDB();
        const scrapedProduct = await scrapedAmazonProduct(productURL);
        if(!scrapedProduct) return;
        let product = scrapedProduct;
        const existingProduct = await Product.findOne({url : scrapedProduct.url});
        if(existingProduct){
            const updatePriceHistory:any = [
                ...existingProduct.priceHistory,
                { price : scrapedProduct.currentPrice}
            ]

            product = {
                ...scrapedProduct,
                priceHistory : updatePriceHistory,
                lowestPrice : getLowestPrice(updatePriceHistory),
                highestPrice : getHighestPrice(updatePriceHistory),
                // averagePrice : getAveragePrice(updatePriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate({url : scrapedProduct.url}, product, {upsert:true, new: true});
        revalidatePath(`/products/${newProduct._id}`)
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}

export async function getProductById(productId: string){
    try {
        connectToDB();
        const product = await Product.findOne({_id : productId});
        if(!product){
            return null;
        }
        return product;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllProducts(){
    try {
        connectToDB();
        const products = await Product.find();
        return products;
    } catch (error) {
        console.log(error);
    }
}

export async function getSimilarProducts(productId :string){
    try {
        connectToDB();
        const currProduct = await Product.findById(productId);
        if(!currProduct){
            return null;
        }
        const similarProducts = await Product.find({
            _id:{$ne : productId},
        }).limit(3)
        return similarProducts;
    } catch (error) {
        console.log(error);
    }
}

export async function addUserEmailToProduct(productId:string, userEmail:string){
    try {
        const product = await Product.findById(productId);
        if(!product){
            return;
        }
        const userExists = product.users.some((user:User) => user.email === userEmail)
        if(!userExists){
            product.users.push({email : userEmail});
            await product.save();
            const emailContent = await generateEmailBody(product, 'WELCOME');
            await sendEmail(await emailContent, [userEmail]);
        }
    } catch (error) {
        console.log(error);
    }
}

