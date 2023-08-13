interface Option {
    label: string;
    value: string;
}

interface PropTypes {
    selectedOption: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[]
}



const Dropdown = ({ selectedOption, onChange, options }: PropTypes) => {
    return (
        <div className="relative mb-6">
            <select
                className="appearance-none w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 pr-8 font-bold"
                value={selectedOption}
                onChange={onChange}
            >
                {options.map((option: Option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 14l6-6H4z" />
                </svg>
            </div>
        </div>
    )
}

export default Dropdown;