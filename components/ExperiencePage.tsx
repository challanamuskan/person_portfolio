import React from 'react';
import { PORTFOLIO_DATA } from '../constants';
import type { PortfolioItem } from '../types';

const AnimatedProfessionalBackground: React.FC = () => {
    return (
        <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:72px_72px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e00004d,transparent)] animate-pulse-slow"></div>
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

const ExperiencePage: React.FC = () => {
    const experienceCategory = PORTFOLIO_DATA.find(cat => cat.title === 'Experience');
    const experiences = experienceCategory ? experienceCategory.items : [];

    return (
        <div className="min-h-screen font-sans animate-fade-in pt-24 md:pt-28">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            <AnimatedProfessionalBackground />
            <div className="container mx-auto px-4 md:px-12 lg:px-16 mb-8 relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-wider">
                    Professional Experience
                </h1>
            </div>
            <main className="container mx-auto px-4 md:px-12 lg:px-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experiences.map(item => (
                        <div key={item.id} className="bg-zinc-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-zinc-800 transition-all hover:scale-105 hover:border-red-600/50 duration-300">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover"/>
                            <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{item.longDescription ?? item.description}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="bg-zinc-700 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ExperiencePage;