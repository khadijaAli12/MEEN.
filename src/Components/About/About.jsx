import React from 'react';
import { useState, useEffect } from 'react';

export default function About() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F1ED] py-24">
            {/* Hero Section */}
            <div className="container m-auto px-6 md:px-12 xl:px-6 mb-32">
                <div className="text-center mb-20"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    <div className="inline-block mb-6 px-8 py-3 border border-[#8B6F47]/30">
                        <span className="text-sm tracking-[0.3em] text-[#8B6F47] font-light uppercase">Our Story</span>
                    </div>
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-[#4A2C1A] mb-6 tracking-tight">
                        The Essence of<br/>
                        <span className="italic font-extralight text-[#6B4423]">meen</span>
                    </h1>
                    <div className="w-24 h-[1px] bg-[#8B6F47] mx-auto" />
                </div>

                <div className="space-y-6 md:space-y-0 md:flex md:gap-12 lg:items-center lg:gap-16">
                    <div className="md:w-5/12 lg:w-5/12 group"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                        }}
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1759691397755-9f761d9615ec?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="meen Fragrance"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#6B4423]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                    </div>
                    <div className="md:w-7/12 lg:w-6/12"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
                        }}
                    >
                        <h2 className="text-4xl text-[#4A2C1A] font-light md:text-5xl mb-8 tracking-tight">
                            Crafting Memories Through Scent
                        </h2>
                        <div className="w-20 h-[1px] bg-[#8B6F47] mb-8" />
                        <p className="text-lg text-[#6B4423]/80 leading-relaxed mb-6 font-light">
                            Founded on the principles of artisanal excellence, meen represents the convergence of time-honored perfumery traditions and contemporary sophistication. Each fragrance is a carefully orchestrated symphony of rare essences, meticulously sourced from the world's finest regions.
                        </p>
                        <p className="text-lg text-[#6B4423]/80 leading-relaxed font-light">
                            Our master perfumers dedicate years to perfecting each composition, ensuring that every bottle carries within it not just a scent, but an experience—a journey through memory, emotion, and refined taste.
                        </p>
                        
                        <div className="mt-12 grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <div className="text-5xl font-light text-[#4A2C1A]">1947</div>
                                <div className="h-[1px] w-12 bg-[#8B6F47]" />
                                <p className="text-sm font-light text-[#6B4423]/70 uppercase tracking-wider">Established</p>
                            </div>
                            <div className="space-y-3">
                                <div className="text-5xl font-light text-[#4A2C1A]">75+</div>
                                <div className="h-[1px] w-12 bg-[#8B6F47]" />
                                <p className="text-sm font-light text-[#6B4423]/70 uppercase tracking-wider">Years Heritage</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gradient-to-b from-[#F5E6D3]/20 to-transparent py-32">
                <div className="container m-auto px-6 md:px-12 xl:px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl sm:text-6xl font-light text-[#4A2C1A] mb-6 tracking-tight">
                            Our Philosophy
                        </h2>
                        <div className="w-24 h-[1px] bg-[#8B6F47] mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-1">
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
                                className="group relative bg-[#F5F1ED] p-12 overflow-hidden border-b border-[#E5D5C3] hover:bg-[#F5E6D3]/30 transition-all duration-700"
                                style={{
                                    animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s both`
                                }}
                            >
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#8B6F47] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                <h3 className="text-2xl font-light text-[#4A2C1A] mb-6 tracking-tight">{value.title}</h3>
                                <div className="h-[1px] w-16 bg-[#8B6F47] mb-6 transform origin-left group-hover:w-24 transition-all duration-500" />
                                <p className="text-base text-[#6B4423]/70 leading-relaxed font-light">{value.description}</p>
                            </div>
                        ))}
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
            `}</style>
        </div>
    );
}