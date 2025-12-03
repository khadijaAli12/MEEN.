import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Collections() {
    const [hoveredCollection, setHoveredCollection] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const collections = [
        {
            name: "Signature Collection",
            description: "Our timeless classics that define the meen essence",
            scents: ["Oud Mystique", "Amber Essence", "Velvet Rose", "Sandalwood Dreams"],
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop",
            price: "From $180",
            category: "signature"
        },
        {
            name: "Reserve Collection",
            description: "Rare and exclusive fragrances for the connoisseur",
            scents: ["Black Oud", "Royal Amber", "Imperial Iris", "Mystic Incense"],
            image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop",
            price: "From $350",
            category: "reserve"
        },
        {
            name: "Leather & Spice",
            description: "Bold compositions for the modern individual",
            scents: ["Tobacco Noir", "Leather Intense", "Cardamom Fire", "Pepper Wood"],
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop",
            price: "From $220",
            category: "bold"
        },
        {
            name: "Limited Editions",
            description: "Exclusive seasonal releases in limited quantities",
            scents: ["Autumn Harvest", "Winter Solstice", "Spring Bloom", "Summer Nights"],
            image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&auto=format&fit=crop",
            price: "From $450",
            category: "limited"
        },
        {
            name: "Floral Symphony",
            description: "Delicate and sophisticated floral compositions",
            scents: ["Jasmine Absolute", "Tuberose Night", "Lily Valley", "Magnolia Bliss"],
            image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop",
            price: "From $195",
            category: "signature"
        },
        {
            name: "Oriental Nights",
            description: "Rich, opulent fragrances inspired by the East",
            scents: ["Arabian Oud", "Persian Rose", "Kashmir Saffron", "Silk Road"],
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop",
            price: "From $280",
            category: "bold"
        }
    ];

    const individualPerfumes = [
        {
            name: "Oud Royale",
            description: "A magnificent blend of rare agarwood and precious resins",
            notes: { top: "Bergamot, Pink Pepper", heart: "Oud, Rose", base: "Amber, Musk" },
            price: "$285",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop",
            bestseller: true
        },
        {
            name: "Velvet Rose",
            description: "Delicate Damascus rose wrapped in soft suede and musk",
            notes: { top: "Lemon, Geranium", heart: "Turkish Rose, Violet", base: "Suede, White Musk" },
            price: "$220",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500&auto=format&fit=crop",
            bestseller: false
        },
        {
            name: "Tobacco Noir",
            description: "Dark and intoxicating tobacco leaf with cognac warmth",
            notes: { top: "Spices, Cognac", heart: "Tobacco, Tonka", base: "Vanilla, Cedarwood" },
            price: "$245",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop",
            bestseller: true
        },
        {
            name: "Amber Essence",
            description: "Warm and sensual amber with golden honey undertones",
            notes: { top: "Citrus, Saffron", heart: "Amber, Jasmine", base: "Vanilla, Patchouli" },
            price: "$210",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop",
            bestseller: false
        },
        {
            name: "Jasmine Absolute",
            description: "Pure jasmine extracted from night-blooming flowers",
            notes: { top: "Green Notes, Mandarin", heart: "Jasmine, Ylang-Ylang", base: "Sandalwood, Benzoin" },
            price: "$265",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&auto=format&fit=crop",
            bestseller: false
        },
        {
            name: "Leather Intense",
            description: "Bold leather accord with smoky birch tar complexity",
            notes: { top: "Black Pepper, Cardamom", heart: "Leather, Iris", base: "Birch Tar, Vetiver" },
            price: "$255",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop",
            bestseller: true
        },
        {
            name: "Sandalwood Dreams",
            description: "Creamy Australian sandalwood with exotic spices",
            notes: { top: "Cardamom, Bergamot", heart: "Sandalwood, Cedar", base: "Amber, Musk" },
            price: "$230",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop",
            bestseller: false
        },
        {
            name: "Black Oud Reserve",
            description: "Ultra-rare black oud from aged aquilaria trees",
            notes: { top: "Saffron, Nutmeg", heart: "Black Oud, Rose", base: "Amber, Leather" },
            price: "$450",
            size: "50ml",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop",
            bestseller: true
        }
    ];

    const categories = [
        { id: 'all', label: 'All Collections' },
        { id: 'signature', label: 'Signature' },
        { id: 'reserve', label: 'Reserve' },
        { id: 'bold', label: 'Bold & Spicy' },
        { id: 'limited', label: 'Limited Edition' }
    ];

    const filteredCollections = selectedCategory === 'all' 
        ? collections 
        : collections.filter(c => c.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#3E2723] via-[#4E342E] to-[#3E2723] py-20">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="text-center">
                    <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Our Fragrances</span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#EFEBE9] mt-6 mb-6">Collections</h1>
                    <div className="w-24 h-[1px] bg-[#A1887F] mx-auto mb-8" />
                    <p className="text-lg text-[#BCAAA4] max-w-2xl mx-auto font-light">
                        Discover our curated collections of luxury fragrances
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 text-sm font-light tracking-wider uppercase transition-all duration-500 ${
                                selectedCategory === category.id
                                    ? 'bg-[#8D6E63] text-[#EFEBE9] border border-[#8D6E63]'
                                    : 'bg-transparent text-[#BCAAA4] border border-[#6D4C41]/50 hover:border-[#A1887F] hover:text-[#D7CCC8]'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Collections Grid - Compact Layout */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCollections.map((collection, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#3E2723]/40 border border-[#6D4C41]/30 hover:border-[#A1887F]/50 transition-all duration-500 overflow-hidden"
                            onMouseEnter={() => setHoveredCollection(index)}
                            onMouseLeave={() => setHoveredCollection(null)}
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-light text-[#EFEBE9] mb-2">{collection.name}</h3>
                                <p className="text-sm text-[#8D6E63] font-light mb-4">{collection.description}</p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-[#6D4C41]/30">
                                    <span className="text-[#A1887F] font-light">{collection.price}</span>
                                    <Link
                                        to="#"
                                        className="text-sm text-[#D7CCC8] hover:text-[#EFEBE9] uppercase tracking-wider font-light transition-colors flex items-center gap-2 group/link"
                                    >
                                        View
                                        <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products Section - Horizontal Scroll */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="text-center mb-12">
                    <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Bestsellers</span>
                    <h2 className="text-4xl sm:text-5xl font-light text-[#EFEBE9] mt-4 mb-6">Featured Fragrances</h2>
                    <div className="w-20 h-[1px] bg-[#A1887F] mx-auto" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {individualPerfumes.filter(p => p.bestseller).map((perfume, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#3E2723]/30 border border-[#6D4C41]/30 hover:border-[#A1887F]/50 transition-all duration-500"
                            onMouseEnter={() => setHoveredProduct(index)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {perfume.bestseller && (
                                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#8D6E63] text-[#EFEBE9] text-xs tracking-wider uppercase">
                                    Bestseller
                                </div>
                            )}

                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={perfume.image}
                                    alt={perfume.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-light text-[#EFEBE9] mb-2">{perfume.name}</h3>
                                <p className="text-xs text-[#8D6E63] font-light mb-3 line-clamp-2">{perfume.description}</p>
                                
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-[#BCAAA4] font-light">{perfume.size}</span>
                                    <span className="text-lg text-[#A1887F] font-light">{perfume.price}</span>
                                </div>

                                <button className="w-full py-3 bg-transparent border border-[#6D4C41]/50 text-[#D7CCC8] text-sm tracking-wider uppercase font-light hover:bg-[#8D6E63] hover:border-[#8D6E63] hover:text-[#EFEBE9] transition-all duration-500">
                                    <Link to="/cart">Add to Cart</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fragrance Notes Guide */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-8 lg:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-light text-[#EFEBE9] mb-4">Understanding Fragrance</h2>
                        <div className="w-20 h-[1px] bg-[#A1887F] mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#8D6E63] to-[#6D4C41] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl text-[#EFEBE9] font-light">1</span>
                            </div>
                            <h3 className="text-xl font-light text-[#EFEBE9] mb-3">Top Notes</h3>
                            <p className="text-sm text-[#BCAAA4] font-light leading-relaxed">
                                The initial impression, lasting 15-30 minutes. Light and volatile scents like citrus and herbs.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#8D6E63] to-[#6D4C41] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl text-[#EFEBE9] font-light">2</span>
                            </div>
                            <h3 className="text-xl font-light text-[#EFEBE9] mb-3">Heart Notes</h3>
                            <p className="text-sm text-[#BCAAA4] font-light leading-relaxed">
                                The core character, emerging after 30 minutes. Florals, spices, and fruits form the body.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#8D6E63] to-[#6D4C41] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl text-[#EFEBE9] font-light">3</span>
                            </div>
                            <h3 className="text-xl font-light text-[#EFEBE9] mb-3">Base Notes</h3>
                            <p className="text-sm text-[#BCAAA4] font-light leading-relaxed">
                                The lasting foundation, enduring for hours. Rich woods, musks, and resins provide depth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-gradient-to-br from-[#6D4C41] to-[#5D4037] p-12 text-center">
                    <h2 className="text-3xl sm:text-4xl font-light text-[#EFEBE9] mb-4">Need Help Choosing?</h2>
                    <div className="w-20 h-[1px] bg-[#D7CCC8] mx-auto mb-6" />
                    <p className="text-[#D7CCC8]/90 mb-8 font-light max-w-xl mx-auto">
                        Book a personal consultation with our fragrance experts
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-10 py-4 bg-[#EFEBE9] text-[#3E2723] font-light tracking-[0.3em] uppercase text-sm hover:bg-[#D7CCC8] transition-all duration-500"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
