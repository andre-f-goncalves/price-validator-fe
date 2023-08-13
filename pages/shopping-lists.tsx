import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout'
import { GetServerSideProps } from 'next';
import api from '../utils/network/axios'
import { getCookie } from 'cookies-next';
import { ShoppingListType, ShoppingListEntry, ProductInterface } from '@/types/product.types';
import Input from '@/components/inputs/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import PricesBySupermarket from '@/components/pricesBySupermarket/PricesBySupermarket';
import CheapestProductBySupermarket from '@/components/cheapestProductBySupermarket/CheapestProductBySupermarket';

type Props = {
    shoppingLists: ShoppingListType
}

export default function ShoppingLists({ shoppingLists }: Props) {
    const [selectedList, setSelectedList] = useState<ShoppingListEntry | null>(null);
    const [newListName, setNewListName] = useState<string>('');
    const [myLists, setMyLists] = useState<ShoppingListType>(shoppingLists)
    const [totalBySupermarket, setTotalBySupermarket] = useState<Record<string, number>>()
    const [cheapestProducts, setCheapestProducts] = useState<ProductInterface[]>()

    useEffect(() => {
        if (!selectedList) return;
        setSelectedList(myLists.find(ele => ele.listName === selectedList.listName) as ShoppingListEntry)
    }, [myLists])

    const handleListSelect = (listName: string) => {
        const list = myLists.find(ele => ele.listName === listName);
        setSelectedList(list as ShoppingListEntry);
    }

    const handleListDelete = async (listName: string) => {
        const authCookie = getCookie('authCookie');
        const response = await api({
            method: 'DELETE',
            url: '/shopping_list',
            headers: {
                Authorization: authCookie
            },
            data: {
                name: listName
            }
        })
        if (listName === selectedList?.listName) setSelectedList(null);
        setMyLists(response.data.user.shoppingLists);
    }

    const handleItemDelete = async (itemAlias: string) => {
        const authCookie = getCookie('authCookie')
        const response = await api({
            method: 'PUT',
            url: '/shopping_list/remove_product',
            headers: {
                Authorization: authCookie
            },
            data: {
                name: 'first_list',
                alias: itemAlias
            }
        })
        setMyLists(response.data.user.shoppingLists);
    }

    const handleListAdd = async () => {
        const authCookie = getCookie('authCookie');
        const response = await api({
            method: 'POST',
            url: '/shopping_list',
            headers: {
                Authorization: authCookie
            },
            data: {
                name: newListName
            }
        })
        setNewListName('');
        setMyLists(response.data.user.shoppingLists);
    }

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewListName(event.target.value);
    }

    const calculateBestBuy = async () => {
        const authCookie = getCookie('authCookie');
        const response = await api({
            method: 'POST',
            url: '/shopping_list/calculate_best_buy',
            headers: {
                Authorization: authCookie
            },
            data: {
                listName: selectedList?.listName
            }
        })
        setCheapestProducts(response.data.list.cheapestProducts);
        setTotalBySupermarket(response.data.list.pricesBySupermarket);

        console.log(totalBySupermarket);

    }

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-4 lg:space-y-0">
                <div className="bg-white rounded-lg shadow-lg w-full lg:w-1/3 px-4 py-6 lg:py-8">
                    <h2 className="text-2xl font-bold mb-12">Shopping Lists</h2>
                    <ul className="space-y-4">
                        {myLists?.map((list) => (
                            <li key={`${list.listName}-${new Date().getTime()}`} className="flex items-center justify-between">
                                <button className="text-blue-500 hover:text-blue-700 focus:outline-none font-bold" onClick={() => handleListSelect(list.listName)}>
                                    {list.listName}
                                </button>
                                <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => handleListDelete(list.listName)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                        <div className="flex flex-row gap-4">
                            <Input value={newListName} onChange={handleListNameChange} placeholder="Insert list name" />
                            <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => handleListAdd()}>
                                <FontAwesomeIcon className="fa-xl mb-2" icon={faPlusCircle} />
                            </button>
                        </div>

                    </ul>
                </div>
                <div className="bg-white rounded-lg shadow-lg w-full lg:w-2/3 px-4 py-6 lg:py-8">
                    {selectedList && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">{selectedList.listName}</h2>
                                <button className="text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer" onClick={() => calculateBestBuy()}>
                                    Calculate best Buy
                                </button>
                            </div>
                            <ul className="space-y-4">
                                {selectedList.listProducts.map((product) => (
                                    <li key={product.alias} className="flex items-center justify-between">
                                        <span>{product.alias}</span>
                                        <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => handleItemDelete(product.alias)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {!selectedList && <p>Please select a list from the left to see its items</p>}
                </div>
                {totalBySupermarket &&
                    <div className="bg-white rounded-lg shadow-lg w-full lg:w-2/3 px-4 py-6 lg:py-8">
                        <div>
                            <PricesBySupermarket pricesBySupermarket={totalBySupermarket as Record<string, number>} />
                        </div>
                    </div>
                }
            </div>
            <div className="bg-white rounded-lg shadow-lg">
                {cheapestProducts &&
                    <CheapestProductBySupermarket cheapestProducts={cheapestProducts} />
                }
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
    const authCookie = getCookie('authCookie', { req, res });
    const { data } = await api({
        method: 'GET',
        url: '/shopping_list',
        headers: {
            Authorization: authCookie
        }
    })
    return { props: { shoppingLists: data.lists } }
}