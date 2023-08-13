import React from 'react';
import { CURRENCY } from '@/constants/generics';

interface PropTypes {
    pricesBySupermarket: Record<string, number>
}

const PricesBySupermarket = ({ pricesBySupermarket }: PropTypes) => {
    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-center font-bold mb-4">Prices by Supermarket</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Supermarket</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(pricesBySupermarket).map(([supermarket, price]) => (
                        <tr key={supermarket}>
                            <td className="border px-4 py-2">{supermarket}</td>
                            <td className="border px-4 py-2">{price} {CURRENCY}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PricesBySupermarket;