import React, { useState } from "react";
import { ProductInterface } from "@/types/product.types";

interface PropTypes {
    product: ProductInterface
}

const Card = ({ product }: PropTypes) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleDescriptionToggle = () => {
        setShowDescription(!showDescription);
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-64 object-cover" src={product.image} alt={product.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <div className="text-gray-600 text-base mb-2">{product.brand}</div>
                <div className="text-gray-600 text-base mb-2">{product.supermarket}</div>
                <div className="flex items-baseline">
                    {product.isPromo ? (
                        <>
                            <span className="text-red-500 font-bold text-lg mr-2">{product.defaultPrice}{product.currency}</span>
                            <span className="text-green-500 font-bold text-2xl">{product.currentPrice}{product.currency}</span>
                            <span className="bg-green-500 text-white font-bold text-xs px-2 py-1 ml-2 rounded">{product.discount}% OFF</span>
                        </>
                    ) : (
                        <span className="text-gray-700 font-bold text-2xl">{product.currentPrice}{product.currency}</span>
                    )}
                </div>
                <div className="text-gray-600 text-base mb-2">{product.packageSize}{product.packageUnits}</div>
                <div className="text-gray-600 text-base mb-2">{product.wholePrice}{product.wholeUnits}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={handleDescriptionToggle}
                >
                    {showDescription ? "Hide Description" : "Show Description"}
                </button>
                {showDescription && (
                    <div className="mt-4">
                        <p className="text-gray-700 text-base">{product.productDescription}</p>
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
    );
};

export default Card;