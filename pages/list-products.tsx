import Layout from '../components/layout/Layout'
import { ProductInterface } from '@/types/product.types'
import Card from '@/components/card/Card'
import { GetServerSideProps } from 'next'
import api from '../utils/network/axios'
import { getCookie } from 'cookies-next'

type Props = {
    products: ProductInterface[]
}

export default function ListProducts({ products }: Props) {

    const addProductToList = async (product: ProductInterface) => {
        const authCookie = getCookie('authCookie')
        await api({
            method: 'PUT',
            url: '/shopping_list/add_product',
            headers: {
                Authorization: authCookie
            },
            data: {
                name: 'first_list',
                alias: product.alias
            }
        })
    }

    return (
        <Layout>
            <div className="mx-auto p-4">
                <h1 className="text-center font-bold mb-4">Products</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                    {products.map((product: ProductInterface) => (
                        <div key={`${product.alias}--${product.name}`}>
                            <Card addCallback={addProductToList} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
    const authCookie = getCookie('authCookie', { req, res });
    const { data } = await api({
        method: 'GET',
        url: '/products',
        headers: {
            Authorization: authCookie
        }
    })
    return { props: { products: data.products } }
}