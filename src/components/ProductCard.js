import React from "react";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
  const name = product.title;
  const images = product.images;
  const price = product.price;
  const category = product.category;
  //useEffect(()=>{console.log(product)}, []);
  return (
    <div className="w-[300px] h-[550px] flex flex-col justify-between rounded-md overflow-scroll shadow-sm relative text-center">
      <div className="bg-slate-800 p-4 justify-between items-center">
        <h3 className="font-bold text-white text-lg">{price}$</h3>
      </div>
      <img
        src={images[0]}
        alt="product"
        className="w-[100%] h-[100%] object-cover"
      ></img>
      <div className="bg-slate-800 p-5">
        <p className="mb-2 text-white">{category}</p>
        <h3 className="font-bold text-white text-lg">{name}</h3>
        <div className="relative py-1 cursor-pointer">
          <div className="t-0 absolute right-3">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500 p-3 text-xs text-white">
              +
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="file: ml-[82%] mt-4 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
