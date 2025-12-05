import React from 'react';
import { useState, useEffect } from 'react';

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        setIsVisible(true);
        
        // Set up hover effects for the values section
        const timer = setTimeout(() => {
            setActiveIndex(0);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white py-24">
            {/* Hero Section - Modern Layout */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 mb-32">
                <div className="text-center mb-20"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    <div className="inline-block mb-6 px-8 py-3 bg-[#3E2723]">
                        <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Our Story</span>
                    </div>
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight text-[#3E2723] mb-6 tracking-tight">
                        The Essence of<br/>
                        <span className="font-light text-[#6D4C41]">meen</span>
                    </h1>
                    <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
                </div>

                <div className="space-y-6 md:space-y-0 md:flex md:gap-12 lg:items-center lg:gap-16">
                    <div className="md:w-5/12 lg:w-5/12 group relative"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                        }}
                    >
                        <div className="relative overflow-hidden rounded-3xl">
                            <div className="absolute inset-0 bg-[#3E2723] rounded-3xl transform scale-95 group-hover:scale-100 transition-all duration-700 z-10"></div>
                            <div className="relative z-20 overflow-hidden rounded-3xl">
                                <img
                                    src="https://images.unsplash.com/photo-1759691397755-9f761d9615ec?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="meen Fragrance"
                                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-1000"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-7/12 lg:w-6/12"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
                        }}
                    >
                        <h2 className="text-4xl text-[#3E2723] font-extralight md:text-5xl mb-8 tracking-tight">
                            Crafting Memories Through Scent
                        </h2>
                        <div className="w-20 h-[1px] bg-[#3E2723] mb-8" />
                        <p className="text-lg text-[#4E342E] leading-relaxed mb-6 font-light">
                            Founded on the principles of artisanal excellence, meen represents the convergence of time-honored perfumery traditions and contemporary sophistication. Each fragrance is a carefully orchestrated symphony of rare essences, meticulously sourced from the world's finest regions.
                        </p>
                        <p className="text-lg text-[#4E342E] leading-relaxed font-light">
                            Our master perfumers dedicate years to perfecting each composition, ensuring that every bottle carries within it not just a scent, but an experience—a journey through memory, emotion, and refined taste.
                        </p>
                        
                        <div className="mt-12 grid grid-cols-2 gap-8">
                            <div className="space-y-3 group">
                                <div className="relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#3E2723] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <div className="relative text-5xl font-extralight text-[#3E2723] group-hover:text-[#F5F1ED] transition-colors duration-500">1947</div>
                                </div>
                                <div className="h-[1px] w-12 bg-[#3E2723]" />
                                <p className="text-sm font-light text-[#6D4C41] uppercase tracking-wider">Established</p>
                            </div>
                            <div className="space-y-3 group">
                                <div className="relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[#3E2723] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <div className="relative text-5xl font-extralight text-[#3E2723] group-hover:text-[#F5F1ED] transition-colors duration-500">75+</div>
                                </div>
                                <div className="h-[1px] w-12 bg-[#3E2723]" />
                                <p className="text-sm font-light text-[#6D4C41] uppercase tracking-wider">Years Heritage</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section - Modern Card Layout */}
            <div className="bg-gradient-to-b from-[#F5F1ED]/30 to-white py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl sm:text-6xl font-extralight text-[#3E2723] mb-6 tracking-tight">
                            Our Philosophy
                        </h2>
                        <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Artistry',
                                description: 'Every fragrance is a masterpiece, crafted with passion and precision by our master perfumers.'
                            },
                            {
                                title: 'Heritage',
                                description: 'Rooted in centuries of perfumery tradition, we honor the past while embracing innovation.'
                            },
                            {
                                title: 'Excellence',
                                description: 'Only the rarest ingredients and most exquisite formulations bear the meen name.'
                            }
                        ].map((value, index) => (
                            <div 
                                key={index}
                                className="group relative bg-white border border-[#3E2723]/20 rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#3E2723]/10"
                                style={{
                                    animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s both`,
                                    transform: activeIndex === index ? 'translateY(-10px)' : 'translateY(0)',
                                    transition: 'transform 0.5s ease'
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#3E2723] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 rounded-full bg-[#3E2723] flex items-center justify-center mr-4 group-hover:bg-[#6D4C41] transition-colors duration-500">
                                            <span className="text-[#F5F1ED] font-extralight text-xl">{index + 1}</span>
                                        </div>
                                        <h3 className="text-2xl font-extralight text-[#3E2723] tracking-tight group-hover:text-[#6D4C41] transition-colors duration-500">{value.title}</h3>
                                    </div>
                                    <div className="h-[1px] w-16 bg-[#3E2723] mb-6 transform origin-left group-hover:w-24 transition-all duration-500" />
                                    <p className="text-base text-[#4E342E] leading-relaxed font-light">{value.description}</p>
                                </div>
                                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#3E2723]/5 rounded-tl-full group-hover:scale-150 transition-transform duration-700 origin-bottom-right"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modern Closing Section */}
            <div className="bg-[#3E2723] py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F5F1ED] rounded-full opacity-5 blur-3xl"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#6D4C41] rounded-full opacity-5 blur-3xl"></div>
                </div>
                
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl sm:text-6xl font-extralight text-[#F5F1ED] mb-8 tracking-tight">
                        Timeless Elegance
                    </h2>
                    <div className="w-24 h-[1px] bg-[#F5F1ED] mx-auto mb-12" />
                    <p className="text-2xl text-[#F5F1ED]/90 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                        At meen, we believe that true luxury lies in the details—the careful selection of each note, 
                        the meticulous craftsmanship of each bottle, and the unforgettable experience of each spray.
                    </p>
                    <div className="inline-block px-8 py-4 border border-[#F5F1ED] text-[#F5F1ED] font-light tracking-[0.2em] uppercase text-sm hover:bg-[#F5F1ED] hover:text-[#3E2723] transition-all duration-500 cursor-pointer">
                        Discover Our Collection
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
            `}</style>
        </div>
    );
}