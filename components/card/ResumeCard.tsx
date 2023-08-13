import React, { useState } from "react";
import { ProductInterface } from "@/types/product.types";

interface PropTypes {
    product: ProductInterface;
}

const Card = ({ product }: PropTypes) => {

    return (
        <div className="card-container" style={{ width: '350px', minHeight: '550px' }}>
            <div style={{ height: '100%' }} className="box-border max-w-sm rounded overflow-hidden shadow-xl mb-4 pt-6">
                <img
                    className="object-cover mx-auto"
                    style={{ width: '250px', height: '250px' }}
                    src={product.image}
                    alt={product.name}
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 truncate">{product.name}</div>
                    <div className="flex items-baseline">
                        {product.isPromo ? (
                            <>
                                <span className="text-red-500 font-bold text-lg mr-2">
                                    {product.defaultPrice}
                                    {product.currency}
                                </span>
                                <span className="text-green-500 font-bold text-2xl">
                                    {product.currentPrice}
                                    {product.currency}
                                </span>
                                <span className="bg-green-500 text-white font-bold text-xs px-2 py-1 ml-2 rounded">
                                    {product.discount}% OFF
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-700 font-bold text-2xl">
                                {product.currentPrice}
                                {product.currency}
                            </span>
                        )}
                    </div>
                    <div className="text-gray-600 text-base mb-2">
                        {product.packageSize}
                        {product.packageUnits}
                    </div>
                    <div className="text-gray-600 text-base mb-2">
                        {product.wholePrice}
                        {product.wholeUnits}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
