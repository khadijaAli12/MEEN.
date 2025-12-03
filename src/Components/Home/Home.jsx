import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeScent, setActiveScent] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        const interval = setInterval(() => {
            setActiveScent((prev) => (prev + 1) % 3);
        }, 4000);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    const signatureScents = [
        {
            name: "Oud Royale",
            notes: "Oud, Amber, Vanilla",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop",
            description: "A regal composition of rare oud"
        },
        {
            name: "Noir Intense",
            notes: "Tobacco, Leather, Spice",
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop",
            description: "Bold and mysterious elegance"
        },
        {
            name: "Velvet Rose",
            notes: "Rose, Musk, Sandalwood",
            image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=600&auto=format&fit=crop",
            description: "Delicate yet captivating allure"
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#3E2723] via-[#4E342E] to-[#3E2723]">


            {/* Hero Section - Full Screen */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5D4037]/90 via-[#4E342E] to-[#3E2723]" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
                    <div 
                        className="space-y-8"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                            transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        {/* Brand name */}
                        <div className="inline-block px-8 py-3 border border-[#A1887F]/30 backdrop-blur-sm mb-8">
                            <span className="text-xs tracking-[0.4em] text-[#D7CCC8] font-light uppercase">Parfumerie</span>
                        </div>

                        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extralight text-[#EFEBE9] tracking-[0.2em] mb-8">
                            MEEN
                        </h1>

                        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#A1887F] to-transparent mx-auto mb-8" />

                        <p className="text-xl sm:text-2xl text-[#BCAAA4] font-light max-w-3xl mx-auto leading-relaxed">
                            Artisanal fragrances crafted from the world's rarest essences
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
                            <Link
                                to="/collections"
                                className="group relative px-12 py-5 bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-[#EFEBE9] font-light tracking-[0.3em] uppercase text-sm overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Discover
                                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#6D4C41] to-[#5D4037] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            </Link>
                            
                            <Link
                                to="/about"
                                className="group relative px-12 py-5 border border-[#A1887F] text-[#D7CCC8] font-light tracking-[0.3em] uppercase text-sm overflow-hidden"
                            >
                                <span className="relative z-10">Our Story</span>
                                <span className="absolute inset-0 bg-[#8D6E63] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Signature Scents Carousel */}
            <section className="relative py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Signature Collection</span>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#EFEBE9] mt-6 mb-8">Featured Scents</h2>
                        <div className="w-24 h-[1px] bg-[#A1887F] mx-auto" />
                    </div>

                    <div className="relative h-[600px]">
                        {signatureScents.map((scent, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-1000 ${
                                    activeScent === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                            >
                                <div className="grid md:grid-cols-2 gap-12 items-center h-full">
                                    <div className="relative group h-full">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-[#8D6E63]/30 to-[#6D4C41]/30 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
                                        <img
                                            src={scent.image}
                                            alt={scent.name}
                                            className="relative w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                    
                                    <div className="space-y-8">
                                        <div>
                                            <span className="text-6xl font-extralight text-[#8D6E63]/20">0{index + 1}</span>
                                        </div>
                                        <h3 className="text-4xl sm:text-5xl font-light text-[#EFEBE9]">{scent.name}</h3>
                                        <div className="w-20 h-[1px] bg-[#A1887F]" />
                                        <p className="text-lg text-[#BCAAA4] font-light">{scent.description}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-[#8D6E63] uppercase tracking-wider font-light">Notes:</span>
                                            <span className="text-[#D7CCC8] font-light">{scent.notes}</span>
                                        </div>
                                        <Link
                                            to="/collections"
                                            className="inline-flex items-center gap-3 text-[#D7CCC8] hover:text-[#EFEBE9] transition-colors duration-500 group"
                                        >
                                            <span className="text-sm tracking-wider uppercase font-light">Explore</span>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel dots */}
                    <div className="flex justify-center gap-3 mt-16">
                        {signatureScents.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveScent(index)}
                                className={`h-[2px] transition-all duration-500 ${
                                    activeScent === index ? 'bg-[#A1887F] w-16' : 'bg-[#6D4C41] w-8 hover:bg-[#8D6E63]'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* The Craft Section */}
            <section className="relative py-32 bg-gradient-to-b from-transparent via-[#4E342E]/50 to-transparent">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Our Process</span>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#EFEBE9]">The Art of Perfumery</h2>
                            <div className="w-20 h-[1px] bg-[#A1887F]" />
                            <p className="text-lg text-[#BCAAA4] font-light leading-relaxed">
                                Each meen fragrance is meticulously crafted by master perfumers using time-honored techniques and the finest raw materials sourced from around the globe.
                            </p>
                            <p className="text-base text-[#8D6E63] font-light leading-relaxed">
                                From the delicate extraction of essential oils to the precise blending of notes, every step is performed with unwavering dedication to perfection.
                            </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-3 text-[#D7CCC8] hover:text-[#EFEBE9] transition-colors duration-500 group pt-4"
                            >
                                <span className="text-sm tracking-wider uppercase font-light">Learn More</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="bg-[#3E2723]/50 p-8 border border-[#6D4C41]/30 backdrop-blur-sm">
                                    <div className="text-4xl font-light text-[#EFEBE9] mb-4">75+</div>
                                    <div className="text-sm text-[#BCAAA4] font-light uppercase tracking-wider">Years Heritage</div>
                                </div>
                                <div className="bg-[#3E2723]/50 p-8 border border-[#6D4C41]/30 backdrop-blur-sm">
                                    <div className="text-4xl font-light text-[#EFEBE9] mb-4">50+</div>
                                    <div className="text-sm text-[#BCAAA4] font-light uppercase tracking-wider">Unique Scents</div>
                                </div>
                            </div>
                            <div className="space-y-4 mt-8">
                                <div className="bg-[#3E2723]/50 p-8 border border-[#6D4C41]/30 backdrop-blur-sm">
                                    <div className="text-4xl font-light text-[#EFEBE9] mb-4">100%</div>
                                    <div className="text-sm text-[#BCAAA4] font-light uppercase tracking-wider">Handcrafted</div>
                                </div>
                                <div className="bg-[#3E2723]/50 p-8 border border-[#6D4C41]/30 backdrop-blur-sm">
                                    <div className="text-4xl font-light text-[#EFEBE9] mb-4">25+</div>
                                    <div className="text-sm text-[#BCAAA4] font-light uppercase tracking-wider">Awards Won</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative py-32">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Testimonials</span>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#EFEBE9] mt-6 mb-8">What They Say</h2>
                        <div className="w-24 h-[1px] bg-[#A1887F] mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Isabella Chen', role: 'Fashion Designer', text: 'Absolutely exquisite. The scent lasts all day and receives countless compliments.' },
                            { name: 'Marcus Laurent', role: 'CEO', text: 'meen has become my signature. The quality and sophistication are unmatched.' },
                            { name: 'Sophie Anderson', role: 'Style Curator', text: 'A masterpiece of perfumery. Every note is perfectly balanced and luxurious.' }
                        ].map((testimonial, index) => (
                            <div 
                                key={index}
                                className="bg-[#3E2723]/30 border border-[#6D4C41]/30 p-8 hover:border-[#A1887F]/50 transition-all duration-500"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-[#A1887F]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-[#BCAAA4] font-light mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                                <div className="border-t border-[#6D4C41]/30 pt-6">
                                    <h4 className="text-[#EFEBE9] font-light mb-1">{testimonial.name}</h4>
                                    <p className="text-sm text-[#8D6E63] font-light">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Story Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1400&auto=format&fit=crop"
                        alt="meen atelier"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3E2723] via-[#4E342E]/90 to-[#3E2723]/80" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Since 1947</span>
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#EFEBE9] mt-6 mb-8">A Legacy of Excellence</h2>
                    <div className="w-24 h-[1px] bg-[#A1887F] mx-auto mb-12" />
                    <p className="text-xl text-[#BCAAA4] font-light leading-relaxed mb-8">
                        For over seven decades, meen has been synonymous with uncompromising quality and timeless elegance. 
                        Our master perfumers blend tradition with innovation to create fragrances that transcend time.
                    </p>
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-3 px-12 py-5 border border-[#A1887F] text-[#D7CCC8] font-light tracking-[0.3em] uppercase text-sm hover:bg-[#8D6E63]/20 transition-all duration-500"
                    >
                        <span>Discover Our Story</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            <style jsx>{`
                /* No animations needed */
            `}</style>
        </div>
    );
}