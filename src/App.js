import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const [res, setRes] = useState({});
  const [products, setProducts] = useState([]);
  const [cartID, setCartID] = useState(null);
  const [total, setTotal] = useState(0);
  const [cartContents, setCartContents] = useState([]); // because the API is not really updating the server
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [quantity, setQuantity] = useState({}); // [item: quantity]
  const [searchValue, setSearchValue] = useState("");
  const [expanded, setExpanded] = useState(false);

  const colors = [
    "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  ];
  /* get a list of all products using axios */
  const getAllProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setRes(response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  // to get all the product of a category
  const handleCategoryFilter = async (category) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const createCart = async (ID) => {
    try {
      const response = await axios
        .post(
          "https://dummyjson.com/carts/add",
          {
            userId: 1,
            products: [
              {
                id: ID,
                quantity: 1,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setCartID(response.data.id);
        })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error(error);
    }
  };
  // to get all of the categories to further filter
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromCart = async (ID, product) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${ID}`, {
        method: "DELETE",
      })
        .then((res) => {
          res.json();
          const updatedCart = cartContents;

          const index = cartContents.indexOf(product);
          if (index !== -1) {
            updatedCart.splice(index, 1);
          }

          // Update the cart contents state
          setCartContents(updatedCart);
          setTotal((prev) => prev - product.price);
        })
        .then(console.log);
    } catch (error) {
      console.error(error);
    }
  };
  const updateCart = async (ID, product) => {
    product = product || { price: 0 };
    try {
      const response = await fetch(
        `https://dummyjson.com/carts/${cartID - 1}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merge: true,
            products: [
              {
                id: ID,
                quantity: 1,
              },
            ],
          }),
        }
      )
        .then((res) => {
          res.json();
          setCart(res.data);
          setCartContents((prevState) => [...prevState, product]);
          // Update the cart contents state
          //setCartContents(updatedCart);
          setTotal((prev) => prev + product.price);
        })
        .then(console.log);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCarts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/carts")
        .then((res) => res.json())
        .then(console.log);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (searchValue === "") {
        getAllProducts();
        return;
      }
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${searchValue}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getAllProducts();
    getAllCarts();
    getAllCategories();
  }, []);
  /* got the list of all the products */
  return (
    <>
      <div className="w-full bg-primary">
        <button
          onClick={handleClick}
          className="mr-8 float-right px-5 py-2 bg-red-500 text-white text-lg font-bold tracking-wide rounded-full focus:outline-none"
        >
          View Cart
        </button>
      </div>
      <h1 className="max-w-md mx-auto mb-10 mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        Shop items
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-2">
        <label
          for="default-search"
          className="text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative mb-5">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={handleChange}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Product by Name..."
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-wrap justify-center ml-[9%] mb-7 w-[80%]">
        {categories.map((category, index) => {
          const colorIndex = index % colors.length;
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                handleCategoryFilter(category);
              }}
              className={`${colors[colorIndex]} m-2`}
            >
              {category}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            getAllProducts();
          }}
          className={`${colors[0]} m-2`}
        >
          ALL
        </button>
      </div>

      <div className="inline-grid gap-6 ml-[4%] place-items-center grid-cols-4 w-[90%] mb-[5%]">
        {products.map((product, index) => {
          // Convert timestamp to localized date and time string
          // Add a component that would be cards for products
          return (
            <div key={index}>
              
                <ProductCard
                  product={product}
                  cartID={cartID}
                  createCart={createCart}
                  updateCart={updateCart}
                  setCartContents={setCartContents}
                  setTotal={setTotal}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              
            </div>
          );
        })}
        </div>
        <div className="fixed bottom-0 w-full">
          <button className="bottom-0 my-8 float-right px-5 py-2 bg-red-500 text-white text-lg font-bold tracking-wide rounded-full focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="file: h-10 w-10"
              onClick={handleClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
        {expanded && (
          <Cart
            contents={cartContents}
            setExpanded={setExpanded}
            setCartContents={setCartContents}
            products={products}
            deleteFromCart={deleteFromCart}
            updateCart={updateCart}
            setTotal={setTotal}
            total={total}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        )}
      
    </>
  );
}

export default App;
