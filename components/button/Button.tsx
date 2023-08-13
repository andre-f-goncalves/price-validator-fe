interface PropTypes {
    text: string;
    onClick: () => void;
}

const Button = ({ text, onClick }: PropTypes) => {
    return (
        <button
            className="block w-full py-2 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;