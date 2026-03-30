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
                    <button onClick={onShowHome} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer">Home</button>
                    <button onClick={onShowProjects} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer">
                        Projects
                    </button>
                    <button onClick={onShowAchievements} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer">
                        Achievements
                    </button>
                    <button onClick={onShowExperience} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer">
                        Experience
                    </button>
                    <button onClick={onShowSkills} className="hover:text-gray-300 transition-colors bg-transparent border-none text-white cursor-pointer">
                        Skills
                    </button>
                    <button onClick={onShowResume} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-3 rounded transition-colors border-none cursor-pointer">
                        Resume
                    </button>
                    <a href="#contact" onClick={handleContactScroll} className="hover:text-gray-300 transition-colors">Contact</a>
                </nav>
                 <div className="flex items-center space-x-4">
                    <img
                        src="https://picsum.photos/seed/avatar/40/40"
                        alt="Profile"
                        className="w-8 h-8 rounded"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;