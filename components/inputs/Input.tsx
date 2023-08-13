interface propTypes {
    placeholder: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, onChange, value }: propTypes) => {
    return (
        <input
            className="w-full p-2 border border-gray-300 mb-2 rounded-lg"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input;