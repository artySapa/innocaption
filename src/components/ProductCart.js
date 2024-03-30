import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductCart = ({product}) => {
    const name = product.title;
    const images = product.images;
    const price = product.price;
    const category = product.category;
    const ID = product.id;
    return (
        <div className="w-[250px] h-[450px] mt-5 bg-secondary flex flex-col justify-between rounded-md overflow-hidden shadow-sm relative text-center">
        <div className="bg-slate-800 p-4 justify-between items-center">
          <h3 className="font-bold text-white text-lg">{price}$</h3>
        </div>
        <img
          src={images[0]}
          alt="product"
          className="w-[100%] h-[100%] max-h-[300px] object-fit"
        ></img>
        <div className="bg-slate-800 p-5">
          <p className="mb-2 text-white">{category}</p>
          <h3 className="font-bold text-white text-lg">{name}</h3>
        </div>
      </div>);
}

export default ProductCart;