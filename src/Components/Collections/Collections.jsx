import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/apiService';
import { cartAPI } from '../services/apiService';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

export default function Collections() {
    const [hoveredCollection, setHoveredCollection] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productAPI.getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        if (!user) {
            // Redirect to login if not authenticated
            navigate('/login');
            return;
        }

        try {
            await cartAPI.addToCart({
                productId: productId,
                quantity: 1
            });
            alert('Product added to cart successfully!');
        } catch (err) {
            alert('Error adding product to cart: ' + err.message);
        }
    };

    const categories = [
        { id: 'all', label: 'All Collections' },
        { id: 'signature', label: 'Signature' },
        { id: 'reserve', label: 'Reserve' },
        { id: 'bold', label: 'Bold & Spicy' },
        { id: 'limited', label: 'Limited Edition' }
    ];

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    // Trigger animations on mount
    React.useEffect(() => {
        setAnimationTrigger(true);
        
        // Reset animation trigger after a delay
        const timer = setTimeout(() => {
            setAnimationTrigger(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white py-20">
            {/* Floating Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3E2723] rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F5F1ED] rounded-full opacity-10 blur-3xl"></div>
            </div>
            
            {/* Hero Section - Modern Asymmetric Layout */}
            <div className="max-w-7xl mx-auto px-6 mb-24 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="overflow-hidden rounded-2xl">
                            <div className="bg-[#3E2723] p-1">
                                <div className="bg-[#F5F1ED] p-8">
                                    <span className="text-xs tracking-[0.4em] text-[#3E2723] font-light uppercase">Our Fragrances</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-extralight text-[#3E2723] tracking-tight">
                            Collections
                        </h1>

                        <div className="w-32 h-[1px] bg-[#3E2723]"></div>

                        <p className="text-2xl text-[#4E342E] font-light max-w-lg leading-relaxed">
                            Discover our curated collections of luxury fragrances, each telling a unique olfactory story.
                        </p>
                    </div>
                    
                    <div className="relative hidden lg:block">
                        <div className="relative w-full h-96 bg-[#F5F1ED] rounded-3xl overflow-hidden border border-[#3E2723]/20">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-8xl font-extralight text-[#3E2723] tracking-[0.3em] opacity-10">meen</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter - Modern Chip Design */}
            <div className="max-w-7xl mx-auto px-6 mb-20 relative">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-8 py-4 text-sm font-light tracking-wider uppercase transition-all duration-500 rounded-full transform ${
                                selectedCategory === category.id
                                    ? 'bg-[#3E2723] text-[#F5F1ED] shadow-lg scale-105'
                                    : 'bg-[#F5F1ED] text-[#3E2723] border border-[#3E2723]/20 hover:bg-[#3E2723] hover:text-[#F5F1ED] hover:scale-105'
                            } ${animationTrigger ? 'animate-fadeInUp' : ''}`}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Collections Grid - Modern Card Layout with Asymmetric Design */}
            <div className="max-w-7xl mx-auto px-6 mb-28 relative">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((collection, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white border border-[#3E2723]/20 rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#3E2723]/10 transform hover:-translate-y-2 ${
                                animationTrigger ? 'animate-fadeInUp' : ''
                            }`}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                            onMouseEnter={() => setHoveredCollection(index)}
                            onMouseLeave={() => setHoveredCollection(null)}
                        >
                            {/* Image Container with Modern Overlay */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/70 via-transparent to-transparent"></div>
                                
                                {/* Modern Price Tag */}
                                <div className="absolute top-4 right-4 bg-[#3E2723] text-[#F5F1ED] px-4 py-2 rounded-full text-sm font-light">
                                    ${collection.price}
                                </div>
                            </div>

                            {/* Content with Modern Layout */}
                            <div className="p-8">
                                <h3 className="text-2xl font-extralight text-[#3E2723] mb-3 group-hover:text-[#6D4C41] transition-colors duration-500">
                                    {collection.name}
                                </h3>
                                <p className="text-sm text-[#4E342E] font-light mb-6 leading-relaxed">
                                    {collection.description}
                                </p>
                                
                                {/* Modern CTA Button */}
                                <Link
                                    to={`/product/${collection._id}`}
                                    className="inline-flex items-center gap-3 text-[#3E2723] hover:text-[#6D4C41] uppercase tracking-wider font-light group/link transition-colors"
                                >
                                    <span>View Details</span>
                                    <svg className="w-5 h-5 transform group-hover/link:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products Section - Modern Carousel Style */}
            <div className="max-w-7xl mx-auto px-6 mb-28 relative">
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-3 bg-[#3E2723] mb-6">
                        <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Bestsellers</span>
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-extralight text-[#3E2723] mb-6">Featured Fragrances</h2>
                    <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.filter(p => p._id).map((perfume, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white border border-[#3E2723]/20 rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#3E2723]/10 transform hover:-translate-y-2 ${
                                animationTrigger ? 'animate-fadeInUp' : ''
                            }`}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                            onMouseEnter={() => setHoveredProduct(index)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {/* Bestseller Badge */}
                            {(perfume.bestseller || perfume.rating >= 4) && (
                                <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-[#3E2723] text-[#F5F1ED] text-xs tracking-wider uppercase rounded-full">
                                    Bestseller
                                </div>
                            )}

                            {/* Image with Modern Frame */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-[#3E2723] p-1 rounded-3xl">
                                    <div className="bg-white rounded-2xl overflow-hidden w-full h-full">
                                        <img
                                            src={perfume.image}
                                            alt={perfume.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-extralight text-[#3E2723] mb-2 group-hover:text-[#6D4C41] transition-colors duration-500">
                                    {perfume.name}
                                </h3>
                                <p className="text-xs text-[#4E342E] font-light mb-4 line-clamp-2">
                                    {perfume.description}
                                </p>
                                
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-sm text-[#6D4C41] font-light">50ml</span>
                                    <span className="text-xl font-extralight text-[#3E2723]">${typeof perfume.price === 'number' ? perfume.price.toFixed(2) : perfume.price}</span>
                                </div>

                                {/* Modern Add to Cart Button */}
                                <button 
                                    onClick={() => handleAddToCart(perfume._id)}
                                    className="w-full py-4 bg-[#3E2723] text-[#F5F1ED] text-sm tracking-wider uppercase font-light hover:bg-[#6D4C41] transition-all duration-500 rounded-xl transform hover:scale-[1.02]"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fragrance Notes Guide - Modern Card Layout */}
            <div className="max-w-7xl mx-auto px-6 mb-28 relative">
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-3 bg-[#F5F1ED] border border-[#3E2723] mb-6">
                        <span className="text-sm tracking-[0.3em] text-[#3E2723] font-light uppercase">Guide</span>
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-extralight text-[#3E2723] mb-6">Understanding Fragrance</h2>
                    <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            number: "1",
                            title: "Top Notes",
                            description: "The initial impression, lasting 15-30 minutes. Light and volatile scents like citrus and herbs."
                        },
                        {
                            number: "2",
                            title: "Heart Notes",
                            description: "The core character, emerging after 30 minutes. Florals, spices, and fruits form the body."
                        },
                        {
                            number: "3",
                            title: "Base Notes",
                            description: "The lasting foundation, enduring for hours. Rich woods, musks, and resins provide depth."
                        }
                    ].map((note, index) => (
                        <div 
                            key={index}
                            className={`group relative bg-white border border-[#3E2723]/20 p-8 rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-[#3E2723]/10 transform hover:-translate-y-2 ${
                                animationTrigger ? 'animate-fadeInUp' : ''
                            }`}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-[#3E2723] rounded-2xl flex items-center justify-center mr-4 group-hover:bg-[#6D4C41] transition-colors duration-500">
                                    <span className="text-2xl text-[#F5F1ED] font-extralight">{note.number}</span>
                                </div>
                                <h3 className="text-2xl font-extralight text-[#3E2723] group-hover:text-[#6D4C41] transition-colors duration-500">
                                    {note.title}
                                </h3>
                            </div>
                            <p className="text-base text-[#4E342E] font-light leading-relaxed">
                                {note.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modern CTA Section */}
            <div className="max-w-6xl mx-auto px-6 relative">
                <div className="relative bg-[#3E2723] rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723] to-[#6D4C41]"></div>
                    <div className="relative p-16 text-center">
                        <h2 className="text-4xl lg:text-5xl font-extralight text-[#F5F1ED] mb-6">Need Help Choosing?</h2>
                        <div className="w-24 h-[1px] bg-[#F5F1ED] mx-auto mb-8" />
                        <p className="text-xl text-[#F5F1ED]/90 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
                            Book a personal consultation with our fragrance experts to discover your perfect scent.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-12 py-5 bg-[#F5F1ED] text-[#3E2723] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#F5F1ED]/90 transition-all duration-500 rounded-full transform hover:scale-105"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
            `}</style>
        </div>
    );
}