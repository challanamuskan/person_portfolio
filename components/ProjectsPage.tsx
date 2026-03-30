import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const AnimatedProjectsBackground: React.FC = () => {
    const columns = Array.from({ length: 50 }).map((_, i) => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const stream = Array.from({ length: Math.floor(Math.random() * 20) + 10 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
        const style: React.CSSProperties = {
            left: `${i * 2}%`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `-${Math.random() * 15}s`,
            writingMode: 'vertical-rl'
        };
        return (
            <div key={i} style={style} className="absolute top-0 text-red-500/30 font-mono text-xs md:text-sm animate-matrix-rain">
                {stream}
            </div>
        );
    });

    return (
        <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-black">
            {columns}
            <style>{`
                @keyframes matrix-rain {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100vh); }
                }
                .animate-matrix-rain {
                    animation-name: matrix-rain;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
};

const ProjectsPage: React.FC = () => {
    const projectsCategory = PORTFOLIO_DATA.find(cat => cat.title === "Projects");
    const projects = projectsCategory ? projectsCategory.items : [];

    return (
        <div className="min-h-screen font-sans animate-fade-in pt-24 md:pt-28">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            <AnimatedProjectsBackground />
            <div className="container mx-auto px-4 md:px-12 lg:px-16 mb-8 relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-wider">
                    Projects
                </h1>
            </div>
            <main className="container mx-auto px-4 md:px-12 lg:px-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(item => (
                        <div key={item.id} className="bg-zinc-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-zinc-800 transition-all hover:scale-105 hover:border-red-600/50 duration-300 flex flex-col">
                            {item.link ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-48">
                                    <div
                                        style={{
                                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'monospace' }}>
                                            {item.title || 'Project'}
                                        </span>
                                    </div>
                                </a>
                            ) : (
                                <div
                                    className="w-full h-48"
                                    style={{
                                        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'monospace' }}>
                                        {item.title || 'Project'}
                                    </span>
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{item.longDescription ?? item.description ?? ''}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="bg-zinc-700 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                {item.link && (
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex self-start items-center mt-auto bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
                                    >
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                        </svg>
                                        View Project
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProjectsPage;