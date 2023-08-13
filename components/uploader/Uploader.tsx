import * as XLSX from 'xlsx';
import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

interface PropTypes {
    getFileInformation: (file: any) => void;
}

const Uploader = ({ getFileInformation }: PropTypes) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
    };

    const processFile = (file: File) => {
        setIsProcessing(true);
        const reader = new FileReader();
        reader.onload = async (e: any) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonFile = XLSX.utils.sheet_to_json(worksheet);
            await getFileInformation(jsonFile);
            setIsProcessing(false);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
                <FaFileExcel className="text-5xl text-green-600" />
            </div>
            <label
                htmlFor="file-input"
                className="block w-full px-4 py-2 text-lg text-center text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
            >
                {isProcessing ? 'Processing...' : 'Choose Excel File'}
            </label>
            <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleFileInputChange}
                disabled={isProcessing}
            />
        </div>
    );
};

export default Uploader;