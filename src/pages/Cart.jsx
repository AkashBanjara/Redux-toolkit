import React from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { remove } from '../store/cartSlice'
import { toast } from 'react-toastify'

const Cart = () => {

  const Products = useSelector((state)=> state.cart)
  const dispatch = useDispatch();

  const handleRemove=(product)=>{
    dispatch(remove(product));
    toast.success(`Removed from cart!`,{
      autoClose: 1000
    })
    
  }

  //handle grand total

  const grandTotal = Products.reduce((total,product)=>{
    return total + product.price;
  },0)

  

  return (
    <div className=''>
      <h3 className='text-xl font-bold'>Cart</h3>
      <div className='cartWrapper '>
        {
          Products.map((product)=> (
            <div className='cartCard border p-3 mx-2 my-4 flex w-full justify-between gap-2 items-center shadow-sm '>
              <img src={product.image} className='w-10 sm:w-12 md:w-16 lg:w-20' alt="" />
              <h5 className='text-sm sm:text-base md:text-xl'>{product.title}</h5>
              <h5 className='text-sm font-semibold sm:text-base'>${product.price}</h5>
              <button className='bg-gradient-to-r from-slate-500 to-slate-800 text-white px-1 rounded-md sm:px-2 sm:py-1' onClick={()=> handleRemove(product.id)} >Remove</button>
            </div>
          ))
        }

        <div className='flex justify-end mt-5 mx-5'>
          <h4 className='text-base font-semibold'>Grand Total: ${grandTotal}  </h4>
        </div>

      </div>
    </div>
  )
}

export default Cart