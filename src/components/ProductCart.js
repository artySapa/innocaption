import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductCart = ({product, deleteFromCart, quantity, setQuantity}) => {
    const name = product.title;
    const images = product.images;
    const price = product.price;
    const category = product.category;
    const ID = product.id;

    const handleDelete = async () => {
        let tempQuantity = quantity;
        tempQuantity[ID] -= 1;
        setQuantity(tempQuantity);
        deleteFromCart(ID, product);
    }

    return (
        <div  >
        <div className="w-[750px] mt-5 flex ml-20 rounded-md overflow-hidden shadow-sm relative text-center">
        <img
          src={images[0]}
          alt="product"
          className="w-[250px] h-[100%] max-h-[300px] object-fit"
        ></img>
        <div className="flex">
        <div className="flex flex-col">
        <div className="ml-10 p-5 w-[300px]">
          <h3 className="font-bold text-white text-lg text-left">{name}</h3>
          <h3 className="mt-5 ml-4 font-bold text-white text-lg text-right">${price}</h3>
          </div>
        </div>
        <div className="flex cursor-pointer text-right ml-[30%] absolute bottom-0" onClick={handleDelete}>
            <svg className="h-7 w-7 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
            <p className="text-white ml-2 text-right">remove</p>
        </div>
        </div>
        </div>
     </div>);
}

export default ProductCart;