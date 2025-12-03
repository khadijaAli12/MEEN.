import React from 'react';
import { useState } from 'react';

export default function Contact() {
    const [focusedField, setFocusedField] = useState(null);

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#F5F1ED] py-24">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #6B4423 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #6B4423 0px, transparent 1px, transparent 60px)'
                }} />
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-6 px-8 py-3 border border-[#8B6F47]/30">
                        <span className="text-sm tracking-[0.3em] text-[#8B6F47] font-light uppercase">Get in Touch</span>
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-light text-[#4A2C1A] mb-6 tracking-tight">
                        Contact <span className="italic font-extralight text-[#6B4423]">meen</span>
                    </h1>
                    <div className="w-24 h-[1px] bg-[#8B6F47] mx-auto" />
                </div>

                <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {/* Contact Info */}
                        <div className="p-12 lg:p-16 bg-gradient-to-br from-[#F5E6D3]/50 to-[#F5F1ED] border border-[#E5D5C3]">
                            <h2 className="text-4xl font-light text-[#4A2C1A] tracking-tight mb-3">
                                Let's Connect
                            </h2>
                            <div className="w-16 h-[1px] bg-[#8B6F47] mb-8" />
                            <p className="text-base font-light text-[#6B4423]/70 mb-12 leading-relaxed">
                                We're here to assist you with personalized consultations and inquiries
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start group">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 flex items-center justify-center border border-[#8B6F47]/30 group-hover:bg-[#8B6F47]/10 transition-all duration-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 text-[#6B4423]"
                                            >
                                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-sm font-light text-[#4A2C1A] uppercase tracking-wider mb-2">Atelier Location</h3>
                                        <p className="text-base font-light text-[#6B4423]/80 leading-relaxed">
                                            Rue de la Paix 47<br/>Paris, France
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 flex items-center justify-center border border-[#8B6F47]/30 group-hover:bg-[#8B6F47]/10 transition-all duration-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 text-[#6B4423]"
                                            >
                                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-sm font-light text-[#4A2C1A] uppercase tracking-wider mb-2">Phone</h3>
                                        <p className="text-base font-light text-[#6B4423]/80">+33 1 4567 8900</p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 flex items-center justify-center border border-[#8B6F47]/30 group-hover:bg-[#8B6F47]/10 transition-all duration-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 text-[#6B4423]"
                                            >
                                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-sm font-light text-[#4A2C1A] uppercase tracking-wider mb-2">Email</h3>
                                        <p className="text-base font-light text-[#6B4423]/80">contact@meen-parfum.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-8 border-t border-[#8B6F47]/20">
                                <p className="text-sm font-light text-[#6B4423]/60 uppercase tracking-wider mb-4">Business Hours</p>
                                <p className="text-base font-light text-[#6B4423]/80 leading-relaxed">
                                    Monday - Saturday: 10:00 - 19:00<br/>
                                    Sunday: By Appointment
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form className="p-12 lg:p-16 flex flex-col justify-center bg-[#F5F1ED] border border-[#E5D5C3]">
                            <div className="space-y-8">
                                <div className="relative group">
                                    <label htmlFor="name" className="block text-sm font-light text-[#6B4423]/60 uppercase tracking-wider mb-3">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#E5D5C3] focus:border-[#8B6F47] focus:outline-none transition-all duration-500 text-[#4A2C1A] text-base font-light placeholder:text-[#6B4423]/30"
                                        placeholder="Enter your name"
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#6B4423] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'name' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <div className="relative group">
                                    <label htmlFor="email" className="block text-sm font-light text-[#6B4423]/60 uppercase tracking-wider mb-3">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#E5D5C3] focus:border-[#8B6F47] focus:outline-none transition-all duration-500 text-[#4A2C1A] text-base font-light placeholder:text-[#6B4423]/30"
                                        placeholder="Enter your email"
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#6B4423] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'email' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <div className="relative group">
                                    <label htmlFor="phone" className="block text-sm font-light text-[#6B4423]/60 uppercase tracking-wider mb-3">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#E5D5C3] focus:border-[#8B6F47] focus:outline-none transition-all duration-500 text-[#4A2C1A] text-base font-light placeholder:text-[#6B4423]/30"
                                        placeholder="Enter your phone"
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#6B4423] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'phone' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <div className="relative group">
                                    <label htmlFor="message" className="block text-sm font-light text-[#6B4423]/60 uppercase tracking-wider mb-3">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows="4"
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#E5D5C3] focus:border-[#8B6F47] focus:outline-none transition-all duration-500 text-[#4A2C1A] text-base font-light placeholder:text-[#6B4423]/30 resize-none"
                                        placeholder="How can we assist you?"
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#6B4423] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'message' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <button
                                    type="submit"
                                    className="group relative w-full px-10 py-5 font-light text-[#F5F1ED] bg-[#6B4423] overflow-hidden mt-8"
                                >
                                    <span className="absolute inset-0 bg-[#4A2C1A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                    <span className="relative flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-sm">
                                        Send Message
                                        <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>

                                <p className="text-xs font-light text-[#6B4423]/60 text-center leading-relaxed">
                                    We typically respond within 24 hours
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
