import React from 'react';
import type { PortfolioItem } from '../types';

interface ContentCardProps {
    item: PortfolioItem;
    onClick: () => void;
    onMouseEnter: () => void;
    isHovered: boolean;
    isDimmed: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onClick, onMouseEnter, isHovered, isDimmed }) => {
    const handleActionClick = (e: React.MouseEvent, action?: () => void) => {
        e.stopPropagation(); // Prevent card's onClick from firing
        if (action) {
            action();
        }
    };

    return (
        // This outer div acts as a spacer and captures the mouse enter event.
        <div 
            className="relative flex-shrink-0 w-60 md:w-72 h-32 md:h-40"
            onMouseEnter={onMouseEnter}
        >
            <div
                // This inner, absolutely positioned div is the animating card. 
                // Its animation is now controlled by props from the parent row.
                className={`absolute inset-0 bg-zinc-800 rounded-lg overflow-hidden cursor-pointer 
                           transform-gpu transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                           ${isHovered ? 'scale-150 z-20 shadow-2xl shadow-black' : ''}
                           ${isDimmed ? 'opacity-50 scale-95' : ''}
                           `}
                onClick={onClick}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.title}`}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
            >
                {/* Gradient placeholder keeps cards consistent and avoids broken/irrelevant stock images */}
                {item.link ? (
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${item.title} live link`}
                        className="w-full h-full flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                        }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'monospace' }}>
                            {item.title || 'Project'}
                        </span>
                    </a>
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                        }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'monospace' }}>
                            {item.title || 'Project'}
                        </span>
                    </div>
                )}

                {/* The Netflix-style info panel that fades in on hover */}
                <div className={`absolute top-0 left-0 w-full h-full
                             transition-opacity duration-300 delay-150 ${isHovered ? 'opacity-100' : 'opacity-0'}
                             flex flex-col justify-end
                             bg-gradient-to-t from-black via-black/80 to-transparent`}>
                    
                    <div className="p-3 md:p-4">
                        <h3 className="text-zinc-300 text-xs md:text-sm truncate">{item.title}</h3>
                        <p className="text-white font-bold text-sm md:text-base mt-1 truncate">{item.subtitle ?? item.title}</p>
                        {item.description && (
                            <p className="text-zinc-200 text-xs mt-2 line-clamp-2">{item.description}</p>
                        )}
                        <div className="flex justify-end items-center mt-2">
                            {/* "More Info" button (triggers modal) */}
                            <button onClick={(e) => handleActionClick(e, onClick)} aria-label="More information" className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-800/80 border-2 border-gray-400 text-white hover:border-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs font-semibold">
                             {item.tags.slice(0, 3).map((tag, index) => (
                                <React.Fragment key={tag}>
                                    <span className="text-gray-200">{tag}</span>
                                    {index < Math.min(2, item.tags.length - 1) && <span className="text-gray-500 text-xs font-bold mx-1">&bull;</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;
