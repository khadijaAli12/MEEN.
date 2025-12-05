import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeScent, setActiveScent] = useState(0);
    const [logoVisible, setLogoVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const interval = setInterval(() => {
            setActiveScent((prev) => (prev + 1) % 3);
        }, 4000);
        
        // Trigger logo animation after initial load
        const logoTimer = setTimeout(() => {
            setLogoVisible(true);
        }, 500);
        
        return () => {
            clearInterval(interval);
            clearTimeout(logoTimer);
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
        <div className="w-full min-h-screen bg-white">
            {/* Modern Asymmetric Layout */}
            <div className="relative w-full min-h-screen overflow-hidden">
                {/* Floating Color Blocks - Modern Geometric Design */}
                <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-[#3E2723] rounded-br-[200px]"></div>
                <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-[#3E2723] rounded-tl-[150px]"></div>
                <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#3E2723] rounded-full opacity-10"></div>
                <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-[#F5F1ED] rounded-full opacity-20"></div>
                
                {/* Main Content Grid - Modern Layout */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                    {/* Hero Section - Modern Card Layout */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
                        <div className="space-y-8">
                            <div className="overflow-hidden rounded-2xl">
                                <div className="bg-[#3E2723] p-1">
                                    <div className="bg-[#F5F1ED] p-8">
                                        <span className="text-xs tracking-[0.4em] text-[#3E2723] font-light uppercase">Luxury Parfumerie</span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="w-32 h-[1px] bg-[#3E2723]"></div> */}

                            <div className="flex flex-wrap gap-6 pt-8">
                                <Link
                                    to="/collections"
                                    className="px-10 py-5 bg-[#3E2723] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#5D4037] transition-all duration-300"
                                >
                                    Discover
                                </Link>
                                
                                <Link
                                    to="/about"
                                    className="px-10 py-5 border border-[#3E2723] text-[#3E2723] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#3E2723] hover:text-[#F5F1ED] transition-all duration-300"
                                >
                                    Our Story
                                </Link>
                            </div>
                        </div>
                        
                        <div className="relative hidden lg:block">
                            <div className="relative w-full h-96 bg-[#F5F1ED] rounded-3xl overflow-hidden border border-[#3E2723]/20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Entire Box with Brown Background and Modern Animations */}
                                    <div 
                                        className={`bg-[#3E2723] w-64 h-64 rounded-2xl flex items-center justify-center transition-all duration-700 ease-out transform ${
                                            logoVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'
                                        } ${hovered ? 'shadow-2xl shadow-[#3E2723]/50' : ''}`}
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                    >
                                        <h1 className={`text-6xl font-extralight text-[#F5F1ED] tracking-[0.3em] transition-all duration-500 ${
                                            hovered ? 'scale-110' : 'scale-100'
                                        }`}>
                                            meen
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Carousel Section */}
            <div className="relative py-32 bg-gradient-to-b from-white to-[#F5F1ED]/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block px-6 py-3 bg-[#3E2723] mb-6">
                            <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Signature Collection</span>
                        </div>
                        <h2 className="text-6xl lg:text-7xl font-light text-[#3E2723] mt-6 mb-8">Featured Scents</h2>
                        <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
                    </div>

                    <div className="relative h-[700px]">
                        {signatureScents.map((scent, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-1000 ${
                                    activeScent === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                            >
                                <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
                                    <div className="relative">
                                        <div className="bg-[#3E2723] p-1 rounded-3xl">
                                            <div className="bg-[#F5F1ED] rounded-3xl overflow-hidden">
                                                <img
                                                    src={scent.image}
                                                    alt={scent.name}
                                                    className="w-full h-96 object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-8">
                                        <div className="flex items-end gap-4">
                                            <span className="text-8xl font-extralight text-[#3E2723]/20">0{index + 1}</span>
                                            <div className="w-16 h-[1px] bg-[#3E2723]"></div>
                                        </div>
                                        <h3 className="text-5xl font-light text-[#3E2723]">{scent.name}</h3>
                                        <div className="w-24 h-[1px] bg-[#3E2723]" />
                                        <p className="text-xl text-[#4E342E] font-light max-w-lg">{scent.description}</p>
                                        <div className="flex flex-wrap items-center gap-3 pt-4">
                                            <span className="text-sm text-[#8D6E63] uppercase tracking-wider font-light">Notes:</span>
                                            <span className="text-[#3E2723] font-light">{scent.notes}</span>
                                        </div>
                                        <Link
                                            to="/collections"
                                            className="inline-block mt-8 px-10 py-4 bg-[#3E2723] text-[#F5F1ED] text-sm tracking-wider uppercase font-light hover:bg-[#5D4037] transition-all duration-300"
                                        >
                                            Explore Collection
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modern Carousel Indicators */}
                    <div className="flex justify-center gap-4 mt-16">
                        {signatureScents.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveScent(index)}
                                className={`h-3 w-3 rounded-full transition-all duration-500 ${
                                    activeScent === index ? 'bg-[#3E2723] w-12' : 'bg-[#8D6E63]'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modern Stats Section - Asymmetric Grid */}
            <div className="relative py-32 bg-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3E2723] rounded-bl-[200px]"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F5F1ED] rounded-tr-[150px]"></div>
                
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <span className="text-sm tracking-[0.3em] text-[#3E2723] font-light uppercase">Craftsmanship</span>
                                <h2 className="text-5xl lg:text-6xl font-light text-[#3E2723]">The Art of Perfumery</h2>
                                <div className="w-24 h-[1px] bg-[#3E2723]" />
                            </div>
                            
                            <div className="space-y-6">
                                <p className="text-xl text-[#4E342E] font-light leading-relaxed">
                                    Each meen fragrance is meticulously crafted by master perfumers using time-honored techniques and the finest raw materials sourced from around the globe.
                                </p>
                                <p className="text-lg text-[#6D4C41] font-light leading-relaxed">
                                    From the delicate extraction of essential oils to the precise blending of notes, every step is performed with unwavering dedication to perfection.
                                </p>
                            </div>
                            
                            <Link
                                to="/about"
                                className="inline-block px-10 py-4 border border-[#3E2723] text-[#3E2723] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#3E2723] hover:text-[#F5F1ED] transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-[#3E2723] p-8 text-[#F5F1ED] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                {/* Entire Box with Brown Background and Modern Animation */}
                                <div className="bg-[#3E2723] w-full h-24 rounded-lg mb-4 flex items-center justify-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
                                    <div className="text-3xl font-extralight text-[#F5F1ED] tracking-[0.3em]">MEEN</div>
                                </div>
                                <div className="text-sm font-light uppercase tracking-wider">Years Heritage</div>
                            </div>
                            <div className="bg-[#F5F1ED] border border-[#3E2723] p-8 text-[#3E2723] transform -rotate-3 hover:rotate-0 transition-transform duration-500 mt-12">
                                <div className="text-5xl font-light mb-4">50+</div>
                                <div className="text-sm font-light uppercase tracking-wider">Unique Scents</div>
                            </div>
                            <div className="bg-[#F5F1ED] border border-[#3E2723] p-8 text-[#3E2723] transform rotate-2 hover:rotate-0 transition-transform duration-500 -mt-6">
                                <div className="text-5xl font-light mb-4">100%</div>
                                <div className="text-sm font-light uppercase tracking-wider">Handcrafted</div>
                            </div>
                            <div className="bg-[#3E2723] p-8 text-[#F5F1ED] transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="text-5xl font-light mb-4">25+</div>
                                <div className="text-sm font-light uppercase tracking-wider">Awards Won</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Testimonials Section */}
            <div className="relative py-32 bg-gradient-to-t from-[#F5F1ED]/30 to-white">
                <div className="absolute top-0 left-0 w-40 h-40 bg-[#3E2723] rounded-br-[200px]"></div>
                
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block px-6 py-3 bg-[#F5F1ED] border border-[#3E2723] mb-6">
                            <span className="text-sm tracking-[0.3em] text-[#3E2723] font-light uppercase">Testimonials</span>
                        </div>
                        <h2 className="text-6xl lg:text-7xl font-light text-[#3E2723] mt-6 mb-8">What They Say</h2>
                        <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Isabella Chen', role: 'Fashion Designer', text: 'Absolutely exquisite. The scent lasts all day and receives countless compliments.' },
                            { name: 'Marcus Laurent', role: 'CEO', text: 'meen has become my signature. The quality and sophistication are unmatched.' },
                            { name: 'Sophie Anderson', role: 'Style Curator', text: 'A masterpiece of perfumery. Every note is perfectly balanced and luxurious.' }
                        ].map((testimonial, index) => (
                            <div 
                                key={index}
                                className="bg-white border border-[#3E2723]/20 p-8 hover:border-[#3E2723] transition-all duration-500 transform hover:-translate-y-2"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-[#8D6E63]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-[#4E342E] font-light mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                                <div className="border-t border-[#3E2723]/10 pt-6">
                                    <h4 className="text-[#3E2723] font-light mb-1">{testimonial.name}</h4>
                                    <p className="text-sm text-[#8D6E63] font-light">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modern Final Section */}
            <div className="relative py-32 bg-[#3E2723]">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F5F1ED] rounded-tl-[200px] opacity-10"></div>
                
                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <span className="text-sm tracking-[0.3em] text-[#F5F1ED]/80 font-light uppercase">Since 1947</span>
                    <h2 className="text-6xl lg:text-7xl font-light text-[#F5F1ED] mt-6 mb-8">A Legacy of Excellence</h2>
                    <div className="w-24 h-[1px] bg-[#F5F1ED] mx-auto mb-12" />
                    <p className="text-2xl text-[#F5F1ED]/90 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                        For over seven decades, meen has been synonymous with uncompromising quality and timeless elegance. 
                        Our master perfumers blend tradition with innovation to create fragrances that transcend time.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link
                            to="/about"
                            className="px-12 py-5 border border-[#F5F1ED] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#F5F1ED] hover:text-[#3E2723] transition-all duration-300"
                        >
                            Discover Our Story
                        </Link>
                        
                        <Link
                            to="/collections"
                            className="px-12 py-5 bg-[#F5F1ED] text-[#3E2723] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#F5F1ED]/90 transition-all duration-300"
                        >
                            Shop Collection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}