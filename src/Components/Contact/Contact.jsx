import React from 'react';
import { useState } from 'react';

export default function Contact() {
    const [focusedField, setFocusedField] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="relative min-h-screen bg-white py-24">
            {/* Floating Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3E2723] rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F5F1ED] rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Modern Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-6 px-8 py-3 bg-[#3E2723]">
                        <span className="text-sm tracking-[0.3em] text-[#F5F1ED] font-light uppercase">Get in Touch</span>
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-extralight text-[#3E2723] mb-6 tracking-tight">
                        Contact <span className="font-light text-[#6D4C41]">meen</span>
                    </h1>
                    <div className="w-24 h-[1px] bg-[#3E2723] mx-auto" />
                </div>

                <div className="overflow-hidden rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                        {/* Modern Contact Info */}
                        <div className="p-12 lg:p-16 bg-gradient-to-br from-[#3E2723] to-[#6D4C41] text-[#F5F1ED]">
                            <h2 className="text-4xl font-extralight text-[#F5F1ED] tracking-tight mb-3">
                                Let's Connect
                            </h2>
                            <div className="w-16 h-[1px] bg-[#F5F1ED] mb-8" />
                            <p className="text-base font-light text-[#F5F1ED]/80 mb-12 leading-relaxed">
                                We're here to assist you with personalized consultations and inquiries
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start group">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 flex items-center justify-center bg-[#F5F1ED]/10 rounded-full group-hover:bg-[#F5F1ED]/20 transition-all duration-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 text-[#F5F1ED]"
                                            >
                                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-sm font-light text-[#F5F1ED] uppercase tracking-wider mb-2">Atelier Location</h3>
                                        <p className="text-base font-light text-[#F5F1ED]/90 leading-relaxed">
                                            Rue de la Paix 47<br/>Paris, France
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 flex items-center justify-center bg-[#F5F1ED]/10 rounded-full group-hover:bg-[#F5F1ED]/20 transition-all duration-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 text-[#F5F1ED]"
                                            >
                                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-sm font-light text-[#F5F1ED] uppercase tracking-wider mb-2">Phone</h3>
                                        <p className="text-base font-light text-[#F5F1ED]/90">+33 1 4567 8900</p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 flex items-center justify-center bg-[#F5F1ED]/10 rounded-full group-hover:bg-[#F5F1ED]/20 transition-all duration-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 text-[#F5F1ED]"
                                            >
                                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h3 className="text-sm font-light text-[#F5F1ED] uppercase tracking-wider mb-2">Email</h3>
                                        <p className="text-base font-light text-[#F5F1ED]/90">contact@meen-parfum.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-8 border-t border-[#F5F1ED]/20">
                                <p className="text-sm font-light text-[#F5F1ED]/70 uppercase tracking-wider mb-4">Business Hours</p>
                                <p className="text-base font-light text-[#F5F1ED]/90 leading-relaxed">
                                    Monday - Saturday: 10:00 - 19:00<br/>
                                    Sunday: By Appointment
                                </p>
                            </div>
                        </div>

                        {/* Modern Contact Form */}
                        <form onSubmit={handleSubmit} className="p-12 lg:p-16 flex flex-col justify-center bg-[#F5F1ED]">
                            <div className="space-y-8">
                                <div className="relative group">
                                    <label htmlFor="name" className="block text-sm font-light text-[#3E2723] uppercase tracking-wider mb-3">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-all duration-500 text-[#3E2723] text-base font-light placeholder:text-[#3E2723]/30"
                                        placeholder="Enter your name"
                                        required
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#3E2723] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'name' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <div className="relative group">
                                    <label htmlFor="email" className="block text-sm font-light text-[#3E2723] uppercase tracking-wider mb-3">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-all duration-500 text-[#3E2723] text-base font-light placeholder:text-[#3E2723]/30"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#3E2723] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'email' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <div className="relative group">
                                    <label htmlFor="phone" className="block text-sm font-light text-[#3E2723] uppercase tracking-wider mb-3">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-all duration-500 text-[#3E2723] text-base font-light placeholder:text-[#3E2723]/30"
                                        placeholder="Enter your phone"
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#3E2723] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'phone' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <div className="relative group">
                                    <label htmlFor="message" className="block text-sm font-light text-[#3E2723] uppercase tracking-wider mb-3">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-0 py-4 bg-transparent border-b border-[#3E2723]/30 focus:border-[#3E2723] focus:outline-none transition-all duration-500 text-[#3E2723] text-base font-light placeholder:text-[#3E2723]/30 resize-none"
                                        placeholder="How can we assist you?"
                                        required
                                    />
                                    <div className={`absolute bottom-0 left-0 h-[1px] bg-[#3E2723] transform origin-left transition-transform duration-500 ${
                                        focusedField === 'message' ? 'scale-x-100' : 'scale-x-0'
                                    }`} style={{ width: '100%' }} />
                                </div>

                                <button
                                    type="submit"
                                    className="group relative w-full px-10 py-5 font-light text-[#F5F1ED] bg-[#3E2723] overflow-hidden mt-8 rounded-full hover:shadow-xl transition-all duration-500"
                                >
                                    <span className="absolute inset-0 bg-[#6D4C41] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full" />
                                    <span className="relative flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-sm">
                                        Send Message
                                        <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>

                                <p className="text-xs font-light text-[#3E2723]/60 text-center leading-relaxed">
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