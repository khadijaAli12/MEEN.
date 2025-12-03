import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="bg-[#F5F1ED] border-t border-[#E5D5C3]">
            <div className="mx-auto w-full max-w-screen-xl p-8 py-12 lg:py-16">
                <div className="md:flex md:justify-between md:gap-16">
                    <div className="mb-8 md:mb-0 md:w-1/3">
                        <Link to="/" className="flex items-center group mb-8">
                            <h2 className="text-4xl font-light tracking-[0.3em] text-[#6B4423] transition-all duration-500 group-hover:tracking-[0.4em]">
                                meen
                            </h2>
                        </Link>
                        <p className="text-sm font-light text-[#6B4423]/70 leading-relaxed max-w-sm mb-6">
                            Crafting exceptional fragrances since 1947. Where artistry meets tradition in every bottle.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                                { label: 'Facebook', icon: 'M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z' }
                            ].map((social, index) => (
                                <Link 
                                    key={index}
                                    to="#" 
                                    className="group w-10 h-10 flex items-center justify-center border border-[#8B6F47]/30 hover:bg-[#6B4423] transition-all duration-500"
                                >
                                    <svg className="w-4 h-4 text-[#6B4423] group-hover:text-[#F5F1ED] transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">{social.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-light text-[#4A2C1A] uppercase tracking-[0.2em]">Discover</h2>
                            <ul className="text-[#6B4423]/70 font-light space-y-4">
                                <li>
                                    <Link to="/" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-light text-[#4A2C1A] uppercase tracking-[0.2em]">Collections</h2>
                            <ul className="text-[#6B4423]/70 font-light space-y-4">
                                <li>
                                    <Link to="#" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        Signature
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        Reserve
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        Limited Edition
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-light text-[#4A2C1A] uppercase tracking-[0.2em]">Legal</h2>
                            <ul className="text-[#6B4423]/70 font-light space-y-4">
                                <li>
                                    <Link to="#" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#4A2C1A] transition-colors duration-300 text-sm">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] bg-[#8B6F47]/20 my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-[#6B4423]/60 font-light sm:text-center">
                        © 2024 <span className="tracking-wider">meen</span>. All Rights Reserved.
                    </span>
                    <p className="text-xs text-[#6B4423]/50 font-light mt-4 sm:mt-0">
                        Crafted with excellence
                    </p>
                </div>
            </div>
        </footer>
    );
}
