import React, { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Navbar from '@/components/ui/navbar';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
  thumbnail: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <Fragment>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img src={product.thumbnail} alt={product.title} className="w-full h-auto rounded-lg" />
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-lg text-gray-500 mb-4">Category: {product.category}</p>
            <p className="text-lg text-gray-500 mb-4">Brand: {product.brand}</p>
            <p className="text-lg text-gray-500 mb-4">In Stock: {product.stock}</p>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  console.log(context.query.id)

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: { product },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};
