import React, { useState } from "react";
import { ProductInterface } from "@/types/product.types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

interface PropTypes {
    product: ProductInterface;
    addCallback: (product: ProductInterface) => void;
}

const Card = ({ product, addCallback }: PropTypes) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleDescriptionToggle = () => {
        setShowDescription(!showDescription);
    };

    return (
        <div className="card-container" style={{ width: '350px', minHeight: '550px' }}>
            <div style={{ height: '100%' }} className="box-border max-w-sm rounded overflow-hidden shadow-xl mb-4 pt-6">
                <img
                    className="mx-auto"
                    style={{ width: '140px', height: '75px' }}
                    src={`/images/${product.supermarket}.svg`}
                    alt={product.name}
                />
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
                    <div className="flex gap-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={handleDescriptionToggle}
                        >
                            {showDescription ? "Hide" : "Show more"}
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => addCallback(product)}
                        >
                            Add To List <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                    </div>

                    {showDescription && (
                        <div className="mt-4">
                            <div className="text-gray-600 text-base mb-2">{product.brand}</div>
                            <p className="text-gray-700 text-base">
                                {product.productDescription}
                            </p>
                            <div className="flex flex-wrap mt-2">
                                {product.productCategories?.map((category, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
