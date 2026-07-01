import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { MdChat, MdDarkMode } from "react-icons/md"
import { Link } from "react-router-dom"
import { BsLungsFill } from "react-icons/bs";
import Breathe from "./Breathe";
import { FaHome } from "react-icons/fa";

export default function Tools({style , auth = false} : {style : string , auth? : boolean} ) {
    const [open, setOpen] = useState(false)
    const [dark, setDark] = useState(false)
    const [breatheOpen, setBreatheOpen] = useState(false)
    function toggleOpen() {
        setOpen((prev) => !prev)
    }
    function toggleBreatheOpen() {
        setBreatheOpen((prev) => !prev)
    }
    function toggleDark() {
        setDark((prev) => !prev)
    }
    return (
        <>
            <div className={`${style} fixed right-0 bottom-0 z-50`}>
                <div className={`rounded-full w-12 h-12 shadow-xl bg-white/50 backdrop-blur-3xl flex justify-center items-center transition-all active:scale-90 cursor-pointer`} onClick={toggleOpen} title="tools">
                    <FaPlus className={`text-2xl transition-all duration-500 ${open ? "rotate-45" : ""}`} />
                </div>

                <ul className={`absolute right-0 bottom-14 flex flex-col-reverse gap-2 ${open ? "" : "pointer-events-none"}`}>
                    {auth && <li className={`hover:bg-gray-200 rounded-2xl bg-white/30 backdrop-blur-md border border-white/60 shadow-2xl whitespace-nowrap transition-all duration-300 delay-150 ${open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                        }`}>
                        <Link to={"/"} className="flex gap-1.5 items-center py-2 px-4">
                            <FaHome />
                            <span className="text-sm font-semibold">Home</span>
                        </Link>
                    </li>
                    }
                    <li className={`rounded-2xl bg-white/30 backdrop-blur-md border border-white/60 shadow-2xl py-2 px-4 whitespace-nowrap transition-all duration-300 delay-75 ${open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                        }`}>
                        <div className="flex items-center justify-center gap-5">
                            <div className="flex items-center gap-1.5">
                                <MdDarkMode className="text-gray-800" />
                                <span className="text-sm font-semibold">Dark Mode</span>
                            </div>
                            <div className="w-8 h-4 bg-gray-300/30 backdrop-blur-md rounded-2xl cursor-pointer overflow-hidden relative" onClick={toggleDark}>
                                <div className={`w-full h-full bg-gray-900 absolute  overflow-hidden rounded-2xl transition-all ${dark ? "left-0" : "-left-4"}`}>
                                    <div className="bg-white size-4 absolute right-0 flex items-center justify-center rounded-full">
                                        <MdDarkMode />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className={`hover:bg-gray-200 rounded-2xl bg-white/30 backdrop-blur-md border border-white/60 shadow-2xl whitespace-nowrap transition-all duration-300 delay-150 ${open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                        }`}>
                        <Link to={"/dashboard/chat"} className="flex gap-1.5 items-center py-2 px-4">
                            <MdChat />
                            <span className="text-sm font-semibold">Chat with AI</span>
                        </Link>
                    </li>
                    <li className={`rounded-2xl bg-white/30 backdrop-blur-md border border-white/60 shadow-2xl whitespace-nowrap transition-all duration-300 delay-225 overflow-hidden ${open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                        }`}>
                        <button className="flex items-center gap-1.5 py-2 px-4 hover:bg-gray-200 transition-all w-full cursor-pointer" onClick={toggleBreatheOpen}>
                            <BsLungsFill className="text-gray-800" />
                            <span className="text-sm font-semibold">Breathe</span>
                        </button>
                    </li>
                </ul>
            </div>
            <Breathe open={breatheOpen} onClose={toggleBreatheOpen} />
        </>
    )
}




