import React, { useRef, useState } from 'react';
import ContentCard from './ContentCard';
import type { PortfolioItem } from '../types';

interface ContentRowProps {
    title: string;
    items: PortfolioItem[];
    onCardClick: (item: PortfolioItem) => void;
}

const Arrow: React.FC<{direction: 'left' | 'right', onClick: () => void}> = ({ direction, onClick }) => (
    <button
        aria-label={direction === 'left' ? 'Scroll row left' : 'Scroll row right'}
        onClick={onClick}
        className={`absolute top-0 bottom-0 ${direction === 'left' ? 'left-0' : 'right-0'} z-30 w-12 bg-black bg-opacity-50 hover:bg-opacity-75 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100`}
    >
        {direction === 'left' ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        )}
    </button>
);


const ContentRow: React.FC<ContentRowProps> = ({ title, items, onCardClick }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredItemId, setHoveredItemId] = useState<string | number | null>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth * 0.8
                : scrollLeft + clientWidth * 0.8;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'instant' });
        }
    };

    return (
        <div className="mb-8 md:mb-12 lg:mb-16 group">
            <h2 id={title.toLowerCase().replace(/\s+/g, '-')} className="text-xl md:text-2xl font-bold mb-4 pt-20 -mt-20">{title}</h2>
            <div className="relative">
                {/* When the mouse leaves the entire row, we reset the hover state. */}
                <div 
                    ref={scrollContainerRef} 
                    className="flex overflow-x-scroll scrollbar-hide space-x-2 md:space-x-4 py-12 -my-12"
                    onMouseLeave={() => setHoveredItemId(null)}
                >
                    {items.map(item => (
                        <ContentCard 
                            key={item.id} 
                            item={item} 
                            onClick={() => onCardClick(item)}
                            onMouseEnter={() => setHoveredItemId(item.id)}
                            isHovered={hoveredItemId === item.id}
                            isDimmed={hoveredItemId !== null && hoveredItemId !== item.id}
                        />
                    ))}
                    <div className="flex-shrink-0 w-4"></div>
                </div>
                <Arrow direction="left" onClick={() => scroll('left')} />
                <Arrow direction="right" onClick={() => scroll('right')} />
            </div>
        </div>
    );
};

export default ContentRow;
