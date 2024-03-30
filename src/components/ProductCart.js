import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductCart = ({product}) => {
    const name = product.title;
    const images = product.images;
    const price = product.price;
    const category = product.category;
    const ID = product.id;
    return (<div className="w-[200px] h-[350px] flex flex-col justify-between rounded-md overflow-hidden shadow-sm relative text-center">
        <img
        src={images[0]}
        alt="product"
        className="w-[100%] h-[100%] max-h-[340px] object-fit"
      ></img>
    </div>);
}

export default ProductCart;