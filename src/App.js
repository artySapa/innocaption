import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

function App() {
// const [products, setProducts] = useState({});
// fetch('https://dummyjson.com/products')
//   .then(res => res.json())
//   .then(console.log);
  const [products, setProducts] = useState({});
  const [test,setTest] = useState(0);
  const getAllProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data);
        console.log(products);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <button onClick={() => {setTest(test + 1)}}>{test}</button>
    </div>
  );
}

export default App;
