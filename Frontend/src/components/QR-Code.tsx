import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';

const QrCodeGenerator: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [qrIsVisible, setQrIsVisible] = useState<boolean>(false);
    const qrCodeRef = useRef<HTMLDivElement | null>(null);

    const handleQrCodeGenerator = () => {
        if (!url) {
            return;
        }
        setQrIsVisible(true);
    };

    const downloadQRCode = () => {
        if (!qrCodeRef.current) return;
        htmlToImage
            .toPng(qrCodeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'qr-code.png';
                link.click();
            })
            .catch(function (error) {
                console.error('Error generating QR code:', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-xl font-semibold mb-4">Generateur de QR Code</h1>
            <div className="flex gap-2 items-center justify-center w-full">
                <div className="flex flex-col items-center w-1/3 mt-5">
                    <input
                        type="text"
                        placeholder="Enter a URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full p-2 text-sm outline-none resize-none border border-gray-300 rounded-md mb-4"
                    />
                    <button
                        onClick={handleQrCodeGenerator}
                        className="inline-block py-2 px-4 text-white bg-indigo-600 border-none rounded-md text-sm font-medium transition-all duration-200 hover:bg-indigo-700"
                    >
                        Genérer le QR Code
                    </button>
                </div>
                {qrIsVisible && (
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex justify-center items-center p-10 bg-slate-200" ref={qrCodeRef}>
                            <QRCode value={url} size={300} />
                        </div>
                        <button
                            onClick={downloadQRCode}
                            className="mt-4 py-2 px-4 text-white bg-indigo-600 rounded-md text-sm font-medium transition-all duration-200 hover:bg-indigo-700"
                        >
                            Télécharger le QR Code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QrCodeGenerator;
