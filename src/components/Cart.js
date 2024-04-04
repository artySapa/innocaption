import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCart from "./ProductCart";


const Cart = ({ contents, setCartContents, setExpanded, updateCart, deleteFromCart, total, setTotal, quantity, setQuantity }) => {
    // const [display, setDisplay] = useState([]);

    // const getContents = () => {
    //     console.log("==============", contents);
    // }
    // useEffect(()=>{getContents();},[]);
    const handleClick = () => {
        setExpanded(false);
    }
    
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-80 backdrop-blur-sm flex flex-column justify-center items-center z-50 text-black">
        <div className="bg-tertiary rounded shadow-lg  w-[90%] p-[50px] max-h-[80vh] overflow-y-auto">
        <div>
        <button onClick={handleClick} type="button" className="mr-8 float-right px-5 py-2 bg-red-500 text-white text-lg font-bold tracking-wide rounded-full focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" ariaHidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <h2 className="m-20 mb-0 font-bold text-white text-3xl">Cart</h2>
        <h2 className="flex m-20 mt-1 text-white text-small">Total:<h2 className="ml-2 font-bold text-white text-xl">${total}</h2></h2>
        {contents.length === 0 && 
            <h2 className="m-20 font-bold text-white text-lg">The cart is empty</h2>}
        {contents.length !== 0 && 
            <div className="flex flex-row">
            <div>
            {contents.map((content, index) => {
            // Convert timestamp to localized date and time string
            //Add a component that would be cards for products
            return (
                <div key={index}>
                <div>
                    <ProductCart product={content} deleteFromCart={deleteFromCart} quantity={quantity}
                  setQuantity={setQuantity}/>
                </div>
                </div>
            );
            })}
            </div>
            <div>
                <h2 className="mb-2 text-white text-2xl">Order Summary:</h2>
                <h3 className="ml-2 mb-2 text-white text-xl">Subtotal: ${total}</h3>
                <h3 className="ml-2 mb-2 text-white text-xl">Taxes: not yet calculated</h3>
                <h2 className="text-white text-xl">Total({contents.length} items): ${total}</h2>
            </div>
            </div>
        }
        </div>
    </div>
  );
};

export default Cart;
