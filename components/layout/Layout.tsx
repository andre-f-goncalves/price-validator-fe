import Header from '../header/Header';

export default function Layout(props: any) {
    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>

        </>
    )
}

