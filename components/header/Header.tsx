import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-blue-500 py-4">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-white text-2xl font-bold">Grocery Planner</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link className="text-white hover:underline" href="/add-product">
                                Add Product
                            </Link>
                        </li>
                        <li>
                            <Link className="text-white hover:underline" href="/list-products">
                                List Products
                            </Link>
                        </li>
                        <li>
                            <Link className="text-white hover:underline" href="/shopping-lists">
                                Shopping Lists
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}