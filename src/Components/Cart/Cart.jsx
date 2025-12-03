import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Oud Royale",
            price: 285,
            quantity: 1,
            size: "50ml",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Tobacco Noir",
            price: 245,
            quantity: 2,
            size: "50ml",
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Velvet Rose",
            price: 220,
            quantity: 1,
            size: "50ml",
            image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=200&auto=format&fit=crop"
        }
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#3E2723] via-[#4E342E] to-[#3E2723] py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-sm tracking-[0.3em] text-[#A1887F] font-light uppercase">Shopping</span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-[#EFEBE9] mt-6 mb-6">Your Cart</h1>
                    <div className="w-24 h-[1px] bg-[#A1887F] mx-auto" />
                </div>

                {cartItems.length === 0 ? (
                    // Empty Cart
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-[#3E2723]/50 border-2 border-[#6D4C41]/50 rounded-full mx-auto mb-8 flex items-center justify-center">
                            <svg className="w-12 h-12 text-[#8D6E63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-light text-[#EFEBE9] mb-4">Your cart is empty</h2>
                        <p className="text-[#BCAAA4] font-light mb-8">Add some fragrances to get started</p>
                        <Link
                            to="/collections"
                            className="inline-block px-10 py-4 bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-[#EFEBE9] font-light tracking-[0.3em] uppercase text-sm hover:from-[#6D4C41] hover:to-[#5D4037] transition-all duration-500"
                        >
                            Browse Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-6 flex gap-6 hover:border-[#A1887F]/50 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-[#4E342E] border border-[#6D4C41]/30">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-light text-[#EFEBE9] mb-1">{item.name}</h3>
                                            <p className="text-sm text-[#8D6E63] font-light">{item.size}</p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-[#3E2723]/50 border border-[#6D4C41]/30 px-4 py-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="text-[#BCAAA4] hover:text-[#EFEBE9] transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="text-[#EFEBE9] font-light min-w-[2rem] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="text-[#BCAAA4] hover:text-[#EFEBE9] transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-sm text-[#8D6E63] hover:text-[#D7CCC8] font-light uppercase tracking-wider transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <p className="text-xl font-light text-[#A1887F]">${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Continue Shopping */}
                            <Link
                                to="/collections"
                                className="inline-flex items-center gap-2 text-[#D7CCC8] hover:text-[#EFEBE9] text-sm font-light uppercase tracking-wider transition-colors mt-6"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#3E2723]/40 border border-[#6D4C41]/30 p-8 sticky top-24">
                                <h2 className="text-2xl font-light text-[#EFEBE9] mb-6 pb-4 border-b border-[#6D4C41]/30">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-[#BCAAA4] font-light">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[#BCAAA4] font-light">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[#BCAAA4] font-light">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#6D4C41]/30 mb-6">
                                    <div className="flex justify-between text-xl text-[#EFEBE9] font-light">
                                        <span>Total</span>
                                        <span className="text-[#A1887F]">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-[#EFEBE9] font-light tracking-[0.3em] uppercase text-sm hover:from-[#6D4C41] hover:to-[#5D4037] transition-all duration-500 mb-4">
                                    Proceed to Checkout
                                </button>

                                <button className="w-full py-4 border border-[#6D4C41]/50 text-[#D7CCC8] font-light tracking-[0.3em] uppercase text-sm hover:bg-[#8D6E63]/20 hover:border-[#A1887F]/50 transition-all duration-500">
                                    Apply Promo Code
                                </button>

                                {/* Benefits */}
                                <div className="mt-8 pt-8 border-t border-[#6D4C41]/30 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-[#BCAAA4] font-light">
                                        <svg className="w-5 h-5 text-[#8D6E63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Free shipping on orders over $200
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-[#BCAAA4] font-light">
                                        <svg className="w-5 h-5 text-[#8D6E63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        30-day return guarantee
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-[#BCAAA4] font-light">
                                        <svg className="w-5 h-5 text-[#8D6E63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Secure payment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* You May Also Like */}
                {cartItems.length > 0 && (
                    <div className="mt-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-light text-[#EFEBE9] mb-4">You May Also Like</h2>
                            <div className="w-20 h-[1px] bg-[#A1887F] mx-auto" />
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "Jasmine Absolute", price: "$265", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300&auto=format&fit=crop" },
                                { name: "Sandalwood Dreams", price: "$230", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&auto=format&fit=crop" },
                                { name: "Amber Essence", price: "$210", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop" },
                                { name: "Leather Intense", price: "$255", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&auto=format&fit=crop" }
                            ].map((product, index) => (
                                <div key={index} className="group bg-[#3E2723]/30 border border-[#6D4C41]/30 hover:border-[#A1887F]/50 transition-all duration-500">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-light text-[#EFEBE9] mb-2">{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#A1887F] font-light">{product.price}</span>
                                            <button className="text-sm text-[#D7CCC8] hover:text-[#EFEBE9] uppercase tracking-wider font-light transition-colors">
                                                <Link to="/cart">Add</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
