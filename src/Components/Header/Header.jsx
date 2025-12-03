import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`w-full z-50 transition-all duration-700 ease-in-out ${
            scrolled 
                ? 'bg-[#3E2723]/95 backdrop-blur-md shadow-xl shadow-[#5D4037]/30' 
                : 'bg-gradient-to-b from-[#4E342E]/90 to-[#5D4037]/70 backdrop-blur-sm shadow-lg shadow-[#3E2723]/20'
        }`}>
            <nav className="px-6 lg:px-12 py-4">
                <div className="flex justify-between items-center mx-auto max-w-7xl">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center group relative"
                    >
                        <div className="relative overflow-hidden">
                            <h1 className="text-3xl lg:text-4xl font-light tracking-[0.3em] text-[#D7CCC8] transition-all duration-500 group-hover:tracking-[0.4em] group-hover:text-[#EFEBE9]">
                                meen
                            </h1>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A1887F] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8D6E63]/20 to-[#6D4C41]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="ml-3 text-[8px] tracking-[0.4em] text-[#BCAAA4]/80 font-light uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                            Parfum
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <ul className="flex items-center space-x-1">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/about', label: 'About' },
                                { to: '/collections', label: 'Collections' },
                                { to: '/contact', label: 'Contact' }
                            ].map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `relative px-5 py-2.5 text-sm font-light tracking-[0.15em] uppercase transition-all duration-500 group ${
                                                isActive ? 'text-[#D7CCC8]' : 'text-[#BCAAA4] hover:text-[#D7CCC8]'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className="relative z-10 inline-block transform group-hover:-translate-y-0.5 transition-transform duration-300">{item.label}</span>
                                                <span className={`absolute inset-0 bg-[#6D4C41]/30 rounded-sm transform transition-all duration-500 ${
                                                    isActive 
                                                        ? 'scale-100 opacity-100' 
                                                        : 'scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                                                }`} />
                                                {isActive && (
                                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-[2px] bg-gradient-to-r from-[#8D6E63] to-[#A1887F] animate-expand" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            to="/cart"
                            className="relative p-2.5 text-[#D7CCC8] hover:text-[#EFEBE9] transition-all duration-500 group"
                            aria-label="Shopping cart"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-[#A1887F] rounded-full"></span>
                            <span className="absolute inset-0 bg-[#6D4C41]/30 rounded-sm transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                        </Link>
                        <Link
                            to="/login"
                            className="relative px-6 py-2.5 text-sm font-light tracking-[0.2em] uppercase text-[#D7CCC8] transition-all duration-500 hover:text-[#EFEBE9] group overflow-hidden"
                        >
                            <span className="relative z-10">Account</span>
                            <span className="absolute inset-0 bg-[#6D4C41]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#A1887F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </Link>
                        <Link
                            to="/"
                            className="relative px-7 py-3 text-sm font-light tracking-[0.25em] uppercase text-[#EFEBE9] bg-gradient-to-r from-[#6D4C41] to-[#5D4037] overflow-hidden group border border-[#8D6E63] transition-all duration-500 hover:shadow-lg hover:shadow-[#5D4037]/40"
                        >
                            <span className="relative z-10 flex items-center gap-2.5">
                                Shop Now
                                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-[#4E342E] to-[#3E2723] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2.5 text-[#D7CCC8] hover:text-[#EFEBE9] transition-all duration-500 relative group"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" className="animate-fadeIn" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                        <span className="absolute inset-0 bg-[#6D4C41]/30 rounded-sm transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
                    mobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                }`}>
                    <div className="bg-[#4E342E]/95 backdrop-blur-xl rounded-sm shadow-2xl shadow-[#3E2723]/40 p-8 space-y-3 border border-[#6D4C41]/40">
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/about', label: 'About' },
                            { to: '/collections', label: 'Collections' },
                            { to: '/contact', label: 'Contact' }
                        ].map((item, index) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-5 py-4 text-sm font-light tracking-[0.15em] uppercase rounded-sm transition-all duration-500 ${
                                        isActive 
                                            ? 'text-[#D7CCC8] bg-[#6D4C41]/40 border-l-2 border-[#A1887F]' 
                                            : 'text-[#BCAAA4] hover:text-[#D7CCC8] hover:bg-[#6D4C41]/30 hover:border-l-2 hover:border-[#8D6E63]'
                                    }`
                                }
                                style={{ 
                                    animationDelay: `${index * 50}ms`,
                                    animation: mobileMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                                }}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <div className="pt-6 space-y-3 border-t border-[#6D4C41]/40">
                            <Link
                                to="/cart"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-5 py-4 text-sm font-light tracking-[0.2em] uppercase text-[#D7CCC8] hover:text-[#EFEBE9] hover:bg-[#6D4C41]/30 rounded-sm transition-all duration-500 flex items-center gap-3"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Cart
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-5 py-4 text-sm font-light tracking-[0.2em] uppercase text-[#D7CCC8] hover:text-[#EFEBE9] hover:bg-[#6D4C41]/30 rounded-sm transition-all duration-500"
                            >
                                Account
                            </Link>
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-5 py-4 text-sm font-light tracking-[0.25em] uppercase text-center text-[#EFEBE9] bg-gradient-to-r from-[#6D4C41] to-[#5D4037] hover:from-[#4E342E] hover:to-[#3E2723] rounded-sm shadow-lg shadow-[#3E2723]/30 hover:shadow-xl hover:shadow-[#3E2723]/50 transition-all duration-500"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes expand {
                    from {
                        width: 0;
                    }
                    to {
                        width: 2.5rem;
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </header>
    );
}