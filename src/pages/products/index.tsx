import React, { Fragment } from 'react';
import Head from 'next/head';
import Navbar from '@/components/ui/navbar';
import ProductView from '@/views/Products';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <Fragment>
      <Head>
        <title>Next.js Project | Products</title>
      </Head>
      <Navbar />
      <ProductView products={products} />
    </Fragment>
  );
};

export default Products;

export const getServerSideProps = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    // Ensure data.products is an array
    const products: Product[] = Array.isArray(data.products) ? data.products : [];

    return { props: { products } };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } }; // Return an empty array in case of error
  }
};
