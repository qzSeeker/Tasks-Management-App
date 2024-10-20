export default function LoadingSkeleton() {
    return (
        <div className="w-full h-full">
        <div className="flex justify-center items-center">
        <div className="w-[80%] h-full grid grid-cols-2 gap-6 mt-20">
            {[1, 2, 3, 4].map((i) => (
            <div
                key={i}
                className="bg-white/10 p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse"
            >
                <div className="flex justify-between items-start">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="flex mt-3 gap-4 justify-start">
                    <div className="h-8 bg-gray-200 rounded w-14"></div>
                    <div className="h-8 bg-gray-200 rounded w-14"></div>
                </div>
            </div>
            ))}
        </div>
        </div>
        </div>
    );
}