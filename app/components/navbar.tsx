import Link from "next/link";

export default function NavBar() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
        {/* Navbar */}
        <nav className="flex w-[80%] justify-between items-center bg-white/10 px-6 py-5 mt-8 rounded">
            <Link href={"/"}>
            <h1 className="text-4xl font-bold">TMA</h1>
            </Link>
            <Link href={"/addtask"}>
            <span className="bg-[#171717] text-white px-3 py-2 border-solid border-white border-b-4 border-r-4 shadow-2xl rounded">
                Add New Task
            </span>
            </Link>
        </nav>
        </div>
    );
}
