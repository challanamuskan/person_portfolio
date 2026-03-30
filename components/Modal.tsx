

import React, { useEffect, useState, useCallback } from 'react';
import type { PortfolioItem } from '../types';

interface ModalProps {
    item: PortfolioItem;
    onClose: () => void;
}

const AchievementBackground: React.FC = () => (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 -translate-x-1/2 -translate-y-1/2 opacity-10 animate-float">
            <svg viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 400a48 48 0 110-96 48 48 0 110 96zm48-208c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V128h96v64z"/>
            </svg>
        </div>
    </div>
);


const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300); // Should match animation duration
    }, [onClose]);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [handleClose]);

    const backdropAnimation = isClosing ? 'animate-fade-out' : 'animate-fade-in';
    const modalAnimation = isClosing ? 'animate-fade-out-slide-down' : 'animate-fade-in-slide-up';

    return (
        <div 
            className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${backdropAnimation}`}
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`relative bg-zinc-900 rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2 max-w-4xl max-h-[90vh] flex flex-col transform ${modalAnimation}`}
                onClick={(e) => e.stopPropagation()}
            >
                {item.modalStyle === 'achievement' && <AchievementBackground />}

                <div className="relative">
                    <img src={item.imageUrl.replace('/500/280', '/800/450')} alt={item.title} className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                    <button 
                        onClick={handleClose} 
                        aria-label="Close modal" 
                        className="absolute top-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="absolute bottom-4 left-6 text-2xl md:text-4xl font-bold text-white z-10">{item.title}</h2>
                </div>
                <div className="p-6 md:p-8 overflow-y-auto relative z-10">
                    {item.subtitle && <p className="text-zinc-300 text-sm md:text-base mb-3">{item.subtitle}</p>}
                    <div className="flex justify-between items-baseline mb-4">
                       <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="bg-zinc-700 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                        <span className="text-gray-400 font-bold text-sm">{item.year ?? ''}</span>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{item.longDescription ?? item.description ?? ''}</p>
                    
                    {item.link && (
                         <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-6 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
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
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fade-out {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-fade-out { animation: fade-out 0.3s ease-out forwards; }

                @keyframes fade-in-slide-up {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fade-out-slide-down {
                    from { opacity: 1; transform: translateY(0) scale(1); }
                    to { opacity: 0; transform: translateY(20px) scale(0.98); }
                }
                .animate-fade-in-slide-up { animation: fade-in-slide-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                .animate-fade-out-slide-down { animation: fade-out-slide-down 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
            
                @keyframes float {
                    0% { transform: translate(-50%, -50%) translateY(0px) rotate(-2deg); }
                    50% { transform: translate(-50%, -50%) translateY(-20px) rotate(2deg); }
                    100% { transform: translate(-50%, -50%) translateY(0px) rotate(-2deg); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Modal;