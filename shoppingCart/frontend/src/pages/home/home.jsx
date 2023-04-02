import React from 'react'
import {PRODUCTS} from '../../products'
import {Product} from './product'
import './home.css'
export const Home = () => {
  return (
    <div className='Home'>Featured Products
        <div className='xxxx'>
            {PRODUCTS.map((product) => (
                <Product data={product} />
            ))}
        </div>
    </div>
  )
}
