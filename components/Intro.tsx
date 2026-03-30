import React, { useRef, useState, useEffect } from 'react';

// Base64 encoded "ta-dum" sound effect to avoid needing a separate file.
const introSound = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQ1LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAZAAAATGF2YzU4Ljc2LjEwMAAAAAAAAAAAAAA/xZgAAGkAAAAAAAAA0gAAAAATEFN//tAwxAAAAAAAAA0gAAAAATEFNVQAALAAAAAABNaW5ndXMODAZEuAIAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw-';

interface IntroProps {
  onFinished: () => void;
}

const Intro: React.FC<IntroProps> = ({ onFinished }) => {
  const [animationState, setAnimationState] = useState('initial'); // 'initial', 'playing', 'finished'
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (userInteracted || animationState !== 'initial') return;
    const timer = setTimeout(() => {
      onFinished();
    }, 3000);
    return () => clearTimeout(timer);
  }, [userInteracted, animationState, onFinished]);

  const startIntro = () => {
    if (userInteracted || !audioRef.current) return;
    setUserInteracted(true);

    // To satisfy browser autoplay policies, we play the audio immediately on click,
    // but with the volume at 0. It will play silently in the background.
    const audio = audioRef.current;
    audio.volume = 0;
    audio.play().catch(e => {
      console.warn("Initial silent audio play failed. This might happen on some devices.", e);
    });

    setAnimationState('playing');
  };

  // Effect to handle the animation and sound playback sequence
  useEffect(() => {
    if (animationState !== 'playing' || !audioRef.current) return;

    // Timer to play the sound at the correct animation keyframe.
    const soundTimer = setTimeout(() => {
      // We don't call play() again. Instead, we rewind the already-playing
      // audio to the beginning and turn the volume up. This is much more reliable.
      const audio = audioRef.current!;
      audio.currentTime = 0;
      audio.volume = 1;
    }, 1875); // Re-synced with new, dramatic animation climax

    // Timer to end the animation sequence
    const finishTimer = setTimeout(() => {
      setAnimationState('finished');
    }, 3500);

    // Cleanup function to clear timers if the component unmounts prematurely
    return () => {
      clearTimeout(soundTimer);
      clearTimeout(finishTimer);
    };
  }, [animationState]);

  // Effect to handle the final fade-out and call the onFinished callback
  useEffect(() => {
    if (animationState !== 'finished') return;

    // After the animation is 'finished', wait for the fade-out transition to complete
    const transitionTimer = setTimeout(onFinished, 500);

    // Cleanup function for the final timer
    return () => {
      clearTimeout(transitionTimer);
    };
  }, [animationState, onFinished]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-[100] transition-opacity duration-500 ease-out ${animationState === 'finished' ? 'opacity-0' : 'opacity-100'} cursor-pointer`}
      aria-hidden={animationState === 'finished'}
      onClick={startIntro}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          startIntro();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <button
        onClick={(event) => {
          event.stopPropagation();
          onFinished();
        }}
        style={{
          position: 'fixed',
          top: '16px',
          right: '20px',
          zIndex: 9999,
          color: 'white',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          opacity: 0.6,
        }}
      >
        Skip →
      </button>

      {!userInteracted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white animate-pulse">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              startIntro();
            }}
            aria-label="Play intro animation"
            className="min-w-[44px] min-h-[44px] flex flex-col items-center justify-center"
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <p className="text-xl font-semibold tracking-wider">Click to Enter</p>
          </button>
        </div>
      )}

      {/* The animation container is only visible after user interaction */}
      <div className={`relative w-48 h-64 md:w-64 md:h-80 perspective-container transition-opacity duration-300 ${userInteracted ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`m-part left ${animationState}`}></div>
        <div className={`m-part right ${animationState}`}></div>
        <div className={`m-shadow ${animationState}`}></div>
      </div>
      <audio ref={audioRef} src={introSound} preload="auto" playsInline />

      <style>{`
        .perspective-container {
          perspective: 800px;
          -webkit-perspective: 800px;
        }
        .m-part {
          position: absolute;
          top: 0;
          left: 50%;
          width: 22%;
          height: 100%;
          background-color: #E50914;
          transform-origin: center;
          -webkit-transform-origin: center;
          opacity: 0;
          box-shadow: 0 0 10px #E50914, 0 0 20px #E50914, 0 0 30px #FF1E2D;
        }
        .m-part.left {
          transform: translateX(-100%) scaleY(0);
        }
        .m-part.right {
          transform: translateX(0%) scaleY(0);
        }
        .m-shadow {
            position: absolute;
            bottom: -15%;
            left: 0;
            right: 0;
            height: 30%;
            background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 70%);
            transform: scale(0);
            opacity: 0;
        }

        .m-part.left.playing {
            animation: foldLeft-dramatic 2.5s cubic-bezier(0.6, 0.0, 0, 1.0) forwards;
          -webkit-animation: foldLeft-dramatic 2.5s cubic-bezier(0.6, 0.0, 0, 1.0) forwards;
        }
        .m-part.right.playing {
            animation: foldRight-dramatic 2.5s cubic-bezier(0.6, 0.0, 0, 1.0) forwards;
          -webkit-animation: foldRight-dramatic 2.5s cubic-bezier(0.6, 0.0, 0, 1.0) forwards;
        }
        .m-shadow.playing {
            animation: shadowGrow-dramatic 2s cubic-bezier(0.2, 1, 0.2, 1) 0.5s forwards;
          -webkit-animation: shadowGrow-dramatic 2s cubic-bezier(0.2, 1, 0.2, 1) 0.5s forwards;
        }

        @keyframes foldLeft-dramatic {
            0%   { transform: translateX(-50%) scaleY(0); opacity: 0; }
            15%  { transform: translateX(-50%) scaleY(1.1); opacity: 1; }
            20%  { transform: translateX(-50%) scaleY(1); opacity: 1; }
            40%  { transform: translateX(-50%) rotateY(90deg) scaleY(1); }
            60%  { transform: translateX(-110%) rotateY(15deg) scaleY(1) skewY(20deg); width: 22%; }
            75%  { transform: translateX(-190%) rotateY(0deg) scaleY(1.05) skewY(28deg); width: 26%; }
            100% { transform: translateX(-180%) rotateY(0deg) scaleY(1) skewY(25deg); width: 25%; }
        }
        @keyframes foldRight-dramatic {
            0%   { transform: translateX(-50%) scaleY(0); opacity: 0; }
            15%  { transform: translateX(-50%) scaleY(1.1); opacity: 1; }
            20%  { transform: translateX(-50%) scaleY(1); opacity: 1; }
            40%  { transform: translateX(-50%) rotateY(-90deg) scaleY(1); }
            60%  { transform: translateX(10%) rotateY(-15deg) scaleY(1) skewY(-20deg); width: 22%; }
            75%  { transform: translateX(90%) rotateY(0deg) scaleY(1.05) skewY(-28deg); width: 26%; }
            100% { transform: translateX(80%) rotateY(0deg) scaleY(1) skewY(-25deg); width: 25%; }
        }
        @keyframes shadowGrow-dramatic {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1.8); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Intro;
