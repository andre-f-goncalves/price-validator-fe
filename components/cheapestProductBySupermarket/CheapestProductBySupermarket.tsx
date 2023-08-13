import { ProductInterface } from '@/types/product.types';
import React from 'react';
import ResumeCard from '@/components/card/ResumeCard'

interface PropTypes {
    cheapestProducts: ProductInterface[]
}

const CheapestProductBySupermarket = ({ cheapestProducts }: PropTypes) => {

    const productsBySupermarket = cheapestProducts.reduce((acc, product) => {
        const { supermarket } = product;
        if (!acc[supermarket]) {
            acc[supermarket] = [];
        }
        acc[supermarket].push(product);
        return acc;
    }, {} as Record<string, ProductInterface[]>);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-center font-bold mb-4">Products by Supermarket</h1>
            {Object.entries(productsBySupermarket).map(([supermarket, products]) => (
                <div key={supermarket} className="mb-4">
                    <h2 className="text-lg font-bold mb-2">{supermarket}</h2>
                    <div className="grid gap-4">
                        {products.map((product) => (
                            <div key={`${product.alias}-${product.name}-${product.supermarket}`} className="border rounded p-4">
                                <ResumeCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheapestProductBySupermarket;