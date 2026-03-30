import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const HangingMedal: React.FC<{ style: React.CSSProperties; medalColor: string; ribbonPatternId: string }> = ({ style, medalColor, ribbonPatternId }) => (
    <div style={{ ...style, position: 'absolute', transformOrigin: 'top center' }}>
        <svg viewBox="0 0 50 150" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Ribbon */}
            <rect x="15" y="0" width="20" height="70" fill={`url(#${ribbonPatternId})`} />
            
            {/* Medal */}
            <g>
                <circle cx="25" cy="100" r="25" fill={medalColor} />
                <circle cx="25" cy="100" r="22" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
                {/* Wreath/Laurel design - simplified */}
                <path d="M 10 90 A 20 20 0 0 1 25 80 A 20 20 0 0 1 40 90" fill="none" stroke={medalColor === '#D4AF37' ? '#B8860B' : medalColor === '#C0C0C0' ? '#A9A9A9' : '#8B4513'} strokeWidth="2" strokeOpacity="0.8" />
                <path d="M 10 110 A 20 20 0 0 0 25 120 A 20 20 0 0 0 40 110" fill="none" stroke={medalColor === '#D4AF37' ? '#B8860B' : medalColor === '#C0C0C0' ? '#A9A9A9' : '#8B4513'} strokeWidth="2" strokeOpacity="0.8" />
            </g>
        </svg>
    </div>
);


const AnimatedMedalRackBackground: React.FC = () => {
    const MEDAL_COLORS = ['#D4AF37', '#C0C0C0', '#CD7F32', '#D4AF37', '#CD7F32']; // Gold, Silver, Bronze, Gold, Bronze

    const ribbonPatterns = [
        { id: 'ribbon1', pattern: <pattern id="ribbon1" patternUnits="userSpaceOnUse" width="10" height="10"><rect width="10" height="10" fill="#B22234"/></pattern> },
        { id: 'ribbon2', pattern: <pattern id="ribbon2" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)"><rect width="6" height="12" fill="#3C3B6E"/><rect x="6" width="6" height="12" fill="#FFFFFF"/></pattern> },
        { id: 'ribbon3', pattern: <pattern id="ribbon3" patternUnits="userSpaceOnUse" width="10" height="10"><rect width="10" height="10" fill="#0033A0"/><path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#FFD700" strokeWidth="2"/></pattern> },
        { id: 'ribbon4', pattern: <pattern id="ribbon4" patternUnits="userSpaceOnUse" width="8" height="8"><rect width="8" height="8" fill="#4A7729"/><rect width="8" height="4" fill="#F4A460"/></pattern> },
        { id: 'ribbon5', pattern: <pattern id="ribbon5" patternUnits="userSpaceOnUse" width="12" height="12"><rect width="12" height="12" fill="#FFD700"/><rect x="0" y="0" width="6" height="6" fill="#000"/><rect x="6" y="6" width="6" height="6" fill="#000"/></pattern> },
    ];

    const medalsData = [
        { left: '10%', size: '3.5rem', medal: 0, ribbon: 0 },
        { left: '18%', size: '4rem', medal: 1, ribbon: 1 },
        { left: '26%', size: '3.5rem', medal: 2, ribbon: 2 },
        { left: '34%', size: '4rem', medal: 3, ribbon: 3 },
        { left: '42%', size: '3.5rem', medal: 0, ribbon: 4 },
        { left: '50%', size: '4rem', medal: 1, ribbon: 0 },
        { left: '58%', size: '3.5rem', medal: 2, ribbon: 1 },
        { left: '66%', size: '4rem', medal: 3, ribbon: 2 },
        { left: '74%', size: '3.5rem', medal: 4, ribbon: 3 },
        { left: '82%', size: '4rem', medal: 0, ribbon: 4 },
    ];

    const medals = medalsData.map((data, i) => {
        const style: React.CSSProperties = {
            top: `75px`,
            left: data.left,
            width: data.size,
            height: `calc(${data.size} * 3)`,
            animation: `subtle-sway ${Math.random() * 4 + 6}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 4}s`,
        };
        return <HangingMedal key={i} style={style} medalColor={MEDAL_COLORS[data.medal]} ribbonPatternId={ribbonPatterns[data.ribbon].id} />;
    });

    // Skater silhouettes paths
    const skaters = [
        <path key="s1" transform="translate(60, 20) scale(0.6)" d="M48.2,7.3c-2.8-1.5-6-1.9-9.1-0.9c-2.3,0.7-4.4,2.3-5.9,4.4l-1.3,1.8c-0.2,0.3-0.5,0.5-0.8,0.7c-2.3,1-4.7,2-7,3.1L23,21.5c-0.6,0.3-1.1,0.8-1.5,1.3L15,31.4c-0.5,0.6-1.2,1-1.9,1.1c-1.3,0.1-2.6-0.3-3.6-1.2c-0.5-0.4-1-0.9-1.5-1.4l-2.4-2.4c-1.4-1.4-3.6-1.4-5.1,0c-1.4,1.4-1.4,3.6,0,5.1l2.4,2.4c1.1,1.1,2.5,1.8,4,2.1c2.1,0.4,4.2-0.2,5.8-1.5l6.5-5.3c0.4-0.3,0.8-0.7,1.1-1.1l2.8-3.4c0.2-0.2,0.3-0.4,0.5-0.6l1.2-1.7c1.1-1.5,2.4-2.8,4-3.8c2.8-1.7,6-2.5,9.2-2.1c3.5,0.4,6.7,2.2,8.9,4.9l0.1,0.1c0.8,1,1.8,1.8,3,2.4c3.3,1.5,7,1.4,10.2-0.4c3.1-1.7,5.5-4.5,6.7-7.8c1.3-3.6,1-7.5-0.8-10.9c-1.8-3.4-5-5.9-8.8-6.7c-3.9-0.8-7.9,0.2-11.1,2.6C52.4,5.4,50.2,6.3,48.2,7.3z"/>,
        <path key="s2" transform="translate(200, 15) scale(0.6)" d="M80.2,28.3c-1.5-3.3-4.1-5.9-7.3-7.2c-3.5-1.4-7.4-1.1-10.7,0.8c-1.8,1-3.4,2.4-4.7,4.1l-1,1.3c-0.3,0.4-0.6,0.8-1,1.1l-4.1,3.4c-1.8,1.5-3.8,2.8-6,3.8l-5.6,2.5c-1.4,0.6-2.7,1.4-3.9,2.4L32.2,45c-2.1,1.8-4.8,2.9-7.6,3.2c-3.1,0.3-6.1-0.5-8.7-2.2l-3.3-2.2c-2.4-1.6-5.6-1.4-7.8,0.5c-2.2,1.9-2.7,5.1-1.1,7.6l0,0c0.8,1.2,1.9,2.2,3.2,2.9c3.1,1.5,6.6,1.2,9.6-0.8l3.3-2.2c1-0.7,2.1-1.1,3.2-1.3c1-0.2,2-0.1,3,0.2c1.2,0.4,2.3,1,3.2,1.9l3.7,3.7c1.3,1.3,2.8,2.3,4.5,3c2.7,1.1,5.6,1.1,8.3,0.2c2.9-1,5.4-2.9,7.2-5.5c1.8-2.6,2.7-5.7,2.5-8.8c-0.2-3.1-1.5-6-3.7-8.2l-0.8-0.8c-0.9-0.9-1.7-1.9-2.2-3c-0.9-1.8-1.2-3.8-0.9-5.8c0.4-2.1,1.4-4,3-5.5l0.1-0.1c1.1-1.1,2.4-2,3.8-2.6c3.8-1.6,8-1,11.5,1.6c3.5,2.6,5.6,6.7,5.6,11.1c0,2.9-0.9,5.7-2.6,8.1L80.2,28.3z"/>,
        <path key="s3" transform="translate(350, 18) scale(0.6)" d="M26.2,8.1c-2.6-2.5-6-4-9.6-4c-3.9,0-7.7,1.7-10.4,4.7c-2.7,3-4.1,6.9-3.9,10.8c0.2,3.9,2.1,7.6,5.1,10.1l2.3,1.9c1.6,1.3,3.5,2.3,5.5,2.8c2.8,0.7,5.7,0.4,8.4-0.9c2.8-1.3,5.2-3.6,6.6-6.4c1.5-2.8,2-6,1.4-9.1c-0.6-3.1-2.3-5.9-4.8-7.9l-1.4-1.1c-1.1-0.9-2.1-1.9-2.9-3.1c-1.4-2-2.1-4.4-1.8-6.8c0.3-2.4,1.5-4.6,3.4-6.3l0.1-0.1c1.3-1.2,2.9-2.1,4.6-2.6c4.5-1.4,9.2,0.1,12.5,3.6c3.4,3.5,4.9,8.4,4,13.1c-0.9,4.7-4.1,8.8-8.5,11.1c-4.4,2.3-9.5,2.6-14.2,0.8c-2.3-0.9-4.4-2.2-6.2-3.9l-2.4-2.3c-1.1-1-2.4-1.8-3.8-2.3c-1.9-0.6-3.9-0.7-5.8-0.2c-2.1,0.5-4.1,1.7-5.5,3.4l-2.1,2.5c-1.3,1.5-3,2.7-4.9,3.4c-2.5,0.9-5.2,1-7.7,0.1c-2.8-1-5.1-2.9-6.6-5.5c-1.5-2.6-2-5.6-1.5-8.5c0.6-2.9,2.2-5.5,4.5-7.3l2.3-1.8c1.7-1.4,3.7-2.4,5.8-3c2.1-0.6,4.3-0.6,6.4,0.1c2.1,0.7,4.1,1.9,5.6,3.6L26.2,8.1z"/>,
        <path key="s4" transform="translate(500, 22) scale(0.6)" d="M54.5,7.5c-2.9-1.2-6.1-1.2-9.1,0.1c-2.3,1-4.3,2.8-5.6,5.1l-0.9,1.6c-0.3,0.5-0.7,1-1.1,1.4L33,21c-2.3,2.1-5,3.7-7.9,4.6c-3.1,0.9-6.4,1-9.5,0.1c-3.3-0.9-6.2-2.8-8.4-5.4L5.1,17.9C4.4,17.1,3.5,16.5,2.5,16.2c-1.8-0.6-3.8-0.4-5.4,0.5c-1.6,0.9-2.8,2.6-3.2,4.5c-0.4,1.9,0,3.9,1.1,5.5l0,0c1.2,1.8,3.2,3,5.3,3.2c2.1,0.2,4.2-0.5,5.8-1.9l2.1-1.8c1.3-1.1,2.9-1.9,4.5-2.3c1.9-0.4,3.8-0.3,5.6,0.4c1.8,0.7,3.5,1.9,4.7,3.5l2,2.6c1.6,2.1,3.7,3.7,6.1,4.7c3,1.2,6.3,1.5,9.5,0.7c3.2-0.8,6.1-2.6,8.2-5.1c2.1-2.5,3.3-5.6,3.3-8.8c0-3.2-1.2-6.3-3.3-8.8l-0.8-1c-0.8-1-1.8-1.9-2.8-2.7c-2-1.5-4.4-2.3-6.9-2.3c-2.5,0-4.9,0.8-6.9,2.3c-1.1,0.8-2.1,1.7-2.8,2.7L54.5,7.5z"/>,
        <path key="s5" transform="translate(650, 15) scale(0.6)" d="M26.2,28.3c-1.5-3.3-4.1-5.9-7.3-7.2c-3.5-1.4-7.4-1.1-10.7,0.8c-1.8,1-3.4,2.4-4.7,4.1l-1,1.3c-0.3,0.4-0.6,0.8-1,1.1l-4.1,3.4c-1.8,1.5-3.8,2.8-6,3.8l-5.6,2.5c-1.4,0.6-2.7,1.4-3.9,2.4l-3.7,3.7c-2.1,1.8-4.8,2.9-7.6,3.2c-3.1,0.3-6.1-0.5-8.7-2.2l-3.3-2.2c-2.4-1.6-5.6-1.4-7.8,0.5c-2.2,1.9-2.7,5.1-1.1,7.6l0,0c0.8,1.2,1.9,2.2,3.2,2.9c3.1,1.5,6.6,1.2,9.6-0.8l3.3-2.2c1-0.7,2.1-1.1,3.2-1.3c1-0.2,2-0.1,3,0.2c1.2,0.4,2.3,1,3.2,1.9l3.7,3.7c1.3,1.3,2.8,2.3,4.5,3c2.7,1.1,5.6,1.1,8.3,0.2c2.9-1,5.4-2.9,7.2-5.5c1.8-2.6,2.7-5.7,2.5-8.8c-0.2-3.1-1.5-6-3.7-8.2l-0.8-0.8c-0.9-0.9-1.7-1.9-2.2-3c-0.9-1.8-1.2-3.8-0.9-5.8c0.4-2.1,1.4-4,3-5.5l0.1-0.1c1.1-1.1,2.4-2,3.8-2.6c3.8-1.6,8-1,11.5,1.6c3.5,2.6,5.6,6.7,5.6,11.1c0,2.9-0.9,5.7-2.6,8.1L26.2,28.3z"/>,
    ];

    return (
        <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-black">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-60"></div>
            {/* Medal Rack */}
            <div className="absolute top-0 left-0 w-full h-48 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 800 100" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {ribbonPatterns.map(p => p.pattern)}
                    </defs>
                    <g fill="black">
                        {skaters}
                        {/* Rack Bars */}
                        <rect x="10" y="60" width="780" height="8" rx="4" />
                        <rect x="10" y="75" width="780" height="8" rx="4" />
                        <rect x="10" y="90" width="780" height="8" rx="4" />
                        {/* Vertical supports */}
                        <rect x="100" y="60" width="8" height="38" />
                        <rect x="300" y="60" width="8" height="38" />
                        <rect x="500" y="60" width="8" height="38" />
                        <rect x="700" y="60" width="8" height="38" />
                    </g>
                </svg>
            </div>
            
            {/* Medals Container */}
            <div className="relative w-full h-full opacity-30">
                {medals}
            </div>
            
             <style>{`
                @keyframes subtle-sway {
                    from { transform: rotate(3deg); }
                    to { transform: rotate(-3deg); }
                }
            `}</style>
        </div>
    );
}

const AchievementsPage: React.FC = () => {
    const achievementsCategory = PORTFOLIO_DATA.find(cat => cat.title === 'Achievements');
    const achievements = achievementsCategory ? achievementsCategory.items : [];

    return (
        <div className="min-h-screen font-sans animate-fade-in pt-24 md:pt-28">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            <AnimatedMedalRackBackground />
            <div className="container mx-auto px-4 md:px-12 lg:px-16 mb-8 relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-wider">
                    Key Achievements
                </h1>
            </div>
            <main className="container mx-auto px-4 md:px-12 lg:px-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map(item => (
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

export default AchievementsPage;