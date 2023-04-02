import React, {useContext} from 'react'
import {HomeContext} from "../../context/home-context"
export const Product = (props) => {
    const {id, name, price, image} = props.data
    const {addToCart, cartItems} = useContext(HomeContext)

    const cartItemCount = cartItems[id];
  return (
    <div className='product'>
        <img src={image} />
        <div className='description'>
            <p>
                <b>{name}</b>
            </p>
            <p>${price}</p>
        </div>
        <button className='cartbtn' onClick={()=> addToCart(id)}>
          Add to Cart {cartItemCount > 0 && <>{(cartItemCount)}</>}
          </button>
    </div>
  )
}
