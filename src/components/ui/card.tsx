import Router from 'next/router';
import React, { Fragment } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  
  const handleClick = () => {
    Router.push(`/products/${product.id}`);
  };
  
  return (
    <Fragment>
      <div className="relative h-[400px] w-[300px] rounded-md">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">{product.title}</h1>
          <p className="mt-2 text-sm text-gray-300">${product.price}</p>
          <button 
            className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white" 
            onClick={handleClick}
          >
            View Product →
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
