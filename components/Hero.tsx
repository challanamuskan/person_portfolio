import React from 'react';
import { PERSONAL_INFO } from '../constants';

interface HeroProps {
    onViewResume?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewResume }) => {
    return (
        <div className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-black animate-gradient-shift" />
                <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-yellow-300/80 rounded-full mix-blend-hard-light filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute top-1/2 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-400/80 rounded-full mix-blend-hard-light filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 md:w-96 md:h-96 bg-blue-300/80 rounded-full mix-blend-hard-light filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
                
                {Array.from({ length: 20 }).map((_, i) => {
                    const size = Math.random() * 2 + 1; // 1px to 3px
                    const style: React.CSSProperties = {
                        left: `${Math.random() * 100}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDuration: `${Math.random() * 15 + 10}s`,
                        animationDelay: `${Math.random() * 15}s`,
                    };
                    return <div key={i} className="particle" style={style}></div>;
                })}
                
                <style>{`
                    .particle {
                        position: absolute;
                        bottom: -20px;
                        background-color: rgba(255, 255, 255, 0.7);
                        border-radius: 50%;
                        animation-name: drift;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                    }

                    @keyframes drift {
                        from { transform: translateY(0px); opacity: 1; }
                        to { transform: translateY(-100vh); opacity: 0; }
                    }

                    @keyframes gradient-shift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                    .animate-gradient-shift {
                        background-size: 200% 200%;
                    }

                    @keyframes blob {
                        0% { transform: translate(0px, 0px) scale(1); }
                        33% { transform: translate(30px, -50px) scale(1.1); }
                        66% { transform: translate(-20px, 20px) scale(0.9); }
                        100% { transform: translate(0px, 0px) scale(1); }
                    }
                    .animate-blob {
                        animation: blob 10s infinite;
                    }
                    .animation-delay-2000 { animation-delay: -2s; }
                    .animation-delay-4000 { animation-delay: -4s; }
                `}</style>
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            
            {/* Content */}
            <div 
                className="relative z-10 flex flex-col justify-center h-full px-4 md:px-12 lg:px-16 text-white"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-2xl text-shadow-lg">
                    {PERSONAL_INFO.name}
                </h1>
                <h2 className="text-lg md:text-2xl font-semibold text-red-500 mt-2 mb-4">
                    {PERSONAL_INFO.title}
                </h2>
                <p className="max-w-xl text-sm md:text-base leading-relaxed">
                    {PERSONAL_INFO.bio}
                </p>
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: '20px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.7)',
                        marginTop: '12px',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }}
                >
                    <span
                        style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: '#4ade80',
                            display: 'inline-block',
                            boxShadow: '0 0 6px #4ade80',
                        }}
                    ></span>
                    Building AI infrastructure for Indian SMEs
                </div>
                                <div style={{ display: 'flex', gap: '32px', marginTop: '24px', flexWrap: 'wrap' }}>
                                    {[
                                        { number: '1', label: 'LIVE SME CLIENT' },
                                        { number: '4', label: 'DEPLOYED PROJECTS' },
                                        { number: '6', label: 'IIT / IIM FESTS' },
                                        { number: '2', label: 'COUNTRIES' },
                                    ].map((stat) => (
                                        <div key={stat.label} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e50914', lineHeight: 1 }}>
                                                {stat.number}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                <div className="mt-8 flex space-x-4">
                    <a href="https://www.linkedin.com/in/muskan-challana-408234163/" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-transform hover:scale-105 flex items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm5 1a1 1 0 00-1 1v1a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                                                View LinkedIn Profile
                    </a>
                    <a href={PERSONAL_INFO.contactEmail} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded transition-transform hover:scale-105 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Contact Me
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero;