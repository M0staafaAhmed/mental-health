import { Link, NavLink, Outlet } from 'react-router-dom'
import Tools from '../Addons/Tools'
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export default function HomeNavbar() {
    const token = useSelector((state: RootState) => state.userInfo.token);
    return (
        <>
            {/* TopNavBar (Shared Component) */}
            <header className="h-16 w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
                <div className="container mx-auto px-3 md:px-0 flex justify-between items-center h-full">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-primary">Safe Space</h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                `font-label-md text-label-md pb-1 transition-colors ${isActive
                                    ? "text-primary font-bold border-b-2 border-primary"
                                    : "text-on-surface-variant hover:text-primary"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/tests"
                            className={({ isActive }) =>
                                `font-label-md text-label-md pb-1 transition-colors ${isActive
                                    ? "text-primary font-bold border-b-2 border-primary"
                                    : "text-on-surface-variant hover:text-primary"
                                }`
                            }
                        >
                            Tests
                        </NavLink>

                        <NavLink
                            to="/doctors"
                            className={({ isActive }) =>
                                `font-label-md text-label-md pb-1 transition-colors ${isActive
                                    ? "text-primary font-bold border-b-2 border-primary"
                                    : "text-on-surface-variant hover:text-primary"
                                }`
                            }
                        >
                            Doctors
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `font-label-md text-label-md pb-1 transition-colors ${isActive
                                    ? "text-primary font-bold border-b-2 border-primary"
                                    : "text-on-surface-variant hover:text-primary"
                                }`
                            }
                        >
                            About
                        </NavLink>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-on-surface-variant">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        {token ? (
                            <Link to="/dashboard" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-outline-variant">
                                <img
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWddl1TLgQK2OsbQTKb3WdkFg_Ya0S1wXhkfLOCvlGmPjnxcijMr93DcQOR6zl3_HcJmV_eIN9IAt-k-ABY3LHNbc_ddLdf_fWbSbZaxCdRThvuneNv1JpqBwlFIKF9AcWJOIe27DF6kELm2ysnK5pzkO2GWZXvZZzXu4584vUSs1UUwP6P3_0eh4Ok-z1lw_wZSJH5gySSNgJdly2GOjcJn5h0v7b5A2PJbLLT9T3WQIxw26GKxRk3E9ye44eqPLrNNp1KB58v4l2"
                                />
                            </Link>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/login" className="px-5 py-2 rounded-full border border-primary text-primary font-label-md hover:bg-primary/5 transition-all">Sign In</Link>
                                <Link to="/register" className="px-5 py-2 rounded-full bg-primary text-white font-label-md hover:opacity-90 transition-all shadow-md">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <Outlet />
            {/* Footer (Shared Component) */}
            <footer className="bg-[#ededf9] border-t border-outline-variant w-full py-8">
                <div className="container px-3 md:px-0 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="font-semibold text-gray-900">Safe Space</span>
                        <p className="text-gray-700">Promoting mental well-being for everyone.</p>
                    </div>
                    <nav className="flex gap-8">
                        <Link className="text-sm font-semibold leading-4 text-gray-700 hover:text-primary transition-colors" to="/about">About</Link>
                        <Link className="text-sm font-semibold leading-4 text-gray-700 hover:text-primary transition-colors" to="/privacy">Privacy</Link>
                        <Link className="text-sm font-semibold leading-4 text-gray-700 hover:text-primary transition-colors" to="/terms">Terms</Link>
                        <Link className="text-sm font-semibold leading-4 text-gray-700 hover:text-primary transition-colors" to="/help">Help</Link>
                    </nav>
                    <div className="text-gray-700 text-xs font-semibold leading-4">
                        © 2026 Safe Space. All rights reserved.
                    </div>
                </div>
            </footer>
            <Tools style='m-5 md:m-10'/>
        </>
    )
}
