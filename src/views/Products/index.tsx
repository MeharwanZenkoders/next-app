import React, { Fragment, useState } from 'react';
import Card from '@/components/ui/card';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductViewProps {
  products: Product[];
}

const ProductView = ({ products }: ProductViewProps) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const showMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, visibleCount).map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      {visibleCount < products.length && (
        <div className="text-center mt-4">
          <button
            onClick={showMoreProducts}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Show More
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default ProductView;
