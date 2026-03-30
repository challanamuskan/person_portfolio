import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onShowHome: () => void;
    onShowProjects: () => void;
    onShowAchievements: () => void;
    onShowExperience: () => void;
    onShowSkills: () => void;
    onShowResume: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowHome, onShowProjects, onShowAchievements, onShowExperience, onShowSkills, onShowResume }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 md:px-12 lg:px-16 py-4 flex justify-between items-center">
                <h1 
                    className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-wider cursor-pointer"
                    onClick={onShowHome}
                    role="button"
                    tabIndex={0}
                    aria-label="Go to homepage"
                >
                    MyFlix
                </h1>
                <nav className="hidden md:flex items-center space-x-6 text-sm">
                    <button aria-label="Navigate to home section" onClick={onShowHome} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer min-h-[44px] px-2">
                        Home
                    </button>
                    <button aria-label="Navigate to projects section" onClick={onShowProjects} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer min-h-[44px] px-2">
                        Projects
                    </button>
                    <button aria-label="Navigate to achievements section" onClick={onShowAchievements} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer min-h-[44px] px-2">
                        Achievements
                    </button>
                    <button aria-label="Navigate to experience section" onClick={onShowExperience} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer min-h-[44px] px-2">
                        Experience
                    </button>
                    <button aria-label="Navigate to skills section" onClick={onShowSkills} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer min-h-[44px] px-2">
                        Skills
                    </button>
                    <button aria-label="Navigate to resume page" onClick={onShowResume} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded transition-colors border-none cursor-pointer min-h-[44px]">
                        Resume
                    </button>
                    <a aria-label="Navigate to contact section" href="#contact" onClick={handleContactScroll} className="hover:text-gray-300 transition-colors inline-flex items-center min-h-[44px] px-2">Contact</a>
                </nav>
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center" aria-label="Profile badge" title="Muskan Challana">
                        <span className="text-xs font-semibold text-zinc-200">MC</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;