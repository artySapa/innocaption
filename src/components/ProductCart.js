import React from "react";
import { useState, useEffect } from "react";

const ProductCart = ({
  product,
  deleteFromCart,
  quantity,
  setQuantity,
  updateCart,
}) => {
  const name = product.title;
  const images = product.images;
  const price = product.price;
  const ID = product.id;

  const [displayQ, setDisplayQ] = useState(quantity[ID]);

  const handleDelete = () => {
    let tempQuantity = quantity;
    tempQuantity[ID] -= 1;
    setQuantity(tempQuantity);
    deleteFromCart(ID, product);
    if (quantity !== 0) {
      setDisplayQ(tempQuantity[ID]);
    }
  };

  const handleAdd = () => {
    let tempQuantity = quantity;
    tempQuantity[ID] += 1;
    setQuantity(tempQuantity);
    updateCart(ID, product);
    setDisplayQ(tempQuantity[ID]);
  };

  return (
    <div>
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
              <h3 className="m-5 font-bold text-white text-lg text-right">
                ${price}
              </h3>
            </div>
          </div>
          <div className="flex cursor-pointer text-right ml-[30%] absolute bottom-0">
            <div
              className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700"
              data-hs-input-number=""
            >
              <div className="flex items-center gap-x-1.5">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                  data-hs-input-number-decrement=""
                >
                  <svg
                    className="flex-shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <input
                  className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                  type="text"
                  value={displayQ}
                  data-hs-input-number-input=""
                />
                <button
                  type="button"
                  onClick={handleAdd}
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                  data-hs-input-number-increment=""
                >
                  <svg
                    className="flex-shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
