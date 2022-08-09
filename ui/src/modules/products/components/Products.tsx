import React from 'react';
import Product from './Product';

export default function Products() {
  return (
    <div className="row">
      {Array.from({ length: 30 }).map((_, index) => (
        <Product key={index} />
      ))}
    </div>
  );
}
