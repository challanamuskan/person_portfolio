import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const AnimatedSkillsBackground: React.FC = () => {
    return (
        <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-black">
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="skill-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#e50914" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#skill-grid)"/>
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,9,20,0.3),rgba(255,255,255,0))] animate-pulse-slow"></div>
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};


const SkillsPage: React.FC = () => {
    const skillsCategory = PORTFOLIO_DATA.find(cat => cat.title === "Skills");
    const skills = skillsCategory ? skillsCategory.items : [];

    return (
        <div className="min-h-screen font-sans animate-fade-in pt-24 md:pt-28">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            <AnimatedSkillsBackground />
            <div className="container mx-auto px-4 md:px-12 lg:px-16 mb-8 relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-wider">
                    Skills
                </h1>
            </div>
            <main className="container mx-auto px-4 md:px-12 lg:px-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map(item => (
                        <div key={item.id} className="bg-zinc-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-zinc-800 transition-all hover:scale-105 hover:border-red-600/50 duration-300 flex flex-col md:flex-row">
                            <img src={item.imageUrl} alt={item.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover"/>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{item.longDescription ?? item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SkillsPage;