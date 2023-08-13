import { useState } from 'react'
import api from '../utils/network/axios';
import { getCookie } from 'cookies-next'
import Layout from '@/components/layout/Layout';
import Input from '@/components/inputs/Input';
import Dropdown from '@/components/dropdown/Dropdown';
import Button from '@/components/button/Button';
import Uploader from '@/components/uploader/Uploader';
import {
    AUCHAN,
    CONTINENTE,
    PINGO_DOCE,
    EL_CORTE_INGLES
} from '@/constants/supermarkets';

export default function AddProduct({ }) {
    const [url, setUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [selectedOption, setSelectedOption] = useState(CONTINENTE);
    const [result, setResult] = useState('' as any);

    const supermarkets = [
        { label: "Continente", value: CONTINENTE },
        { label: "Auchan", value: AUCHAN },
        { label: "Pingo Doce", value: PINGO_DOCE },
        { label: "El Corte Ingles", value: EL_CORTE_INGLES }
    ];

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }

    const handleAliasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlias(event.target.value);
    }

    const handleSupermarketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    }

    const handleFileInformation = async (processedFile: any) => {
        const authCookie = getCookie('authCookie');
        const response = await api({
            method: 'POST',
            url: '/products/add_bulk_products',
            headers: {
                Authorization: authCookie
            },
            data: { products: processedFile }
        })
        setResult(response);
    }

    const handleSubmit = async () => {
        const authCookie = getCookie('authCookie');
        const { data } = await api({
            method: 'POST',
            url: '/products',
            headers: {
                Authorization: authCookie
            },
            data: { url, alias, supermarket: selectedOption }
        })
        setResult(data);
    }

    return (
        <Layout>
            <div className="max-w-md mx-auto p-4">
                <h1 className="text-center font-bold mb-4">Add a new Product</h1>
                <h1 className="text-center font-bold mb-4">By File Upload</h1>
                <div className="mb-4">
                    <Uploader getFileInformation={handleFileInformation} />
                </div>
                <h1 className="text-center font-bold mb-4">By Manually</h1>
                <div className="mb-4">
                    <Input onChange={handleAliasChange} placeholder="Insert Product Alias" />
                    <Input onChange={handleUrlChange} placeholder="Product URL" />
                    <Dropdown
                        onChange={handleSupermarketChange}
                        selectedOption={selectedOption}
                        options={supermarkets}
                    />
                    <Button text="Add Product" onClick={handleSubmit} />
                </div>
                <div className="mt-4">{result && `${result.name} added successfully`}</div>
            </div>
        </Layout>

    )
}

export const getServerSideProps = async () => {
    return {
        props: {}
    }
}