import React, { useEffect, useState } from "react";
import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";
import SyncLoader from "react-spinners/SyncLoader";
import { FaRegSadTear } from "react-icons/fa";

const Products = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());

    // const fetchProducts = async () => {
    //   const response = await fetch("https://fakestoreapi.com/products");
    //   const data = await response.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // fetchProducts();
  }, []);
 

  const handleAdd = (product) => {
    dispatch(add(product));
    toast.success(`added to cart!`, {
      autoClose: 1000,
    });

  };
  
  if (status === STATUSES.LOADING) {
    return (
      <div className="flex justify-center items-center h-screen">
      <SyncLoader/>
    </div>
    );
  }
  if(status === STATUSES.ERROR){
   return (
    <div className="flex items-center justify-center">
    <h3 className="text-3xl">Something went wrong  </h3>
    <FaRegSadTear size={50} />
  </div>
   )
  }

  return (
    <div className="productsWrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product) => (
        <div
          className="card border border-gray-400 p-3 flex flex-col items-center justify-center "
          key={product.id}
        >
          <img className="h-44" src={product.image} alt={product.title} />
          <h4 className="text-base font-semibold">{product.title}</h4>
          <h3 className="">$ {product.price}</h3>
          <button
            onClick={() => handleAdd(product)}
            className="btn bg-gradient-to-r from-emerald-400 to-cyan-400  text-white px-1 text-sm rounded-md"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
