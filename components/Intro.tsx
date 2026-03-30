import React, { useEffect, useState } from 'react';

interface IntroProps {
  onFinished: () => void;
}

const INTRO_PLAY_MS = 3000;
const INTRO_FADE_OUT_MS = 500;

const Intro: React.FC<IntroProps> = ({ onFinished }) => {
  const [animationState, setAnimationState] = useState<'playing' | 'finished'>('playing');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onFinished();
      return;
    }

    const finishTimer = window.setTimeout(() => {
      setAnimationState('finished');
    }, INTRO_PLAY_MS);

    const completeTimer = window.setTimeout(() => {
      onFinished();
    }, INTRO_PLAY_MS + INTRO_FADE_OUT_MS);

    return () => {
      window.clearTimeout(finishTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-[100] transition-opacity duration-500 ease-out ${animationState === 'finished' ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden={animationState === 'finished'}
    >
      <div className="relative w-48 h-64 md:w-64 md:h-80 perspective-container">
        <div className={`m-part left ${animationState}`}></div>
        <div className={`m-part right ${animationState}`}></div>
        <div className={`m-shadow ${animationState}`}></div>
      </div>

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
          background-color: #e50914;
          transform-origin: center;
          -webkit-transform-origin: center;
          opacity: 0;
          box-shadow: 0 0 10px #e50914, 0 0 20px #e50914, 0 0 30px #ff1e2d;
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

        @media (prefers-reduced-motion: no-preference) {
          .m-part.left.playing {
            animation: foldLeft-dramatic 2.5s cubic-bezier(0.6, 0, 0, 1) forwards;
            -webkit-animation: foldLeft-dramatic 2.5s cubic-bezier(0.6, 0, 0, 1) forwards;
          }

          .m-part.right.playing {
            animation: foldRight-dramatic 2.5s cubic-bezier(0.6, 0, 0, 1) forwards;
            -webkit-animation: foldRight-dramatic 2.5s cubic-bezier(0.6, 0, 0, 1) forwards;
          }

          .m-shadow.playing {
            animation: shadowGrow-dramatic 2s cubic-bezier(0.2, 1, 0.2, 1) 0.5s forwards;
            -webkit-animation: shadowGrow-dramatic 2s cubic-bezier(0.2, 1, 0.2, 1) 0.5s forwards;
          }

          @keyframes foldLeft-dramatic {
            0% {
              transform: translateX(-50%) scaleY(0);
              opacity: 0;
            }
            15% {
              transform: translateX(-50%) scaleY(1.1);
              opacity: 1;
            }
            20% {
              transform: translateX(-50%) scaleY(1);
              opacity: 1;
            }
            40% {
              transform: translateX(-50%) rotateY(90deg) scaleY(1);
            }
            60% {
              transform: translateX(-110%) rotateY(15deg) scaleY(1) skewY(20deg);
              width: 22%;
            }
            75% {
              transform: translateX(-190%) rotateY(0deg) scaleY(1.05) skewY(28deg);
              width: 26%;
            }
            100% {
              transform: translateX(-180%) rotateY(0deg) scaleY(1) skewY(25deg);
              width: 25%;
            }
          }

          @keyframes foldRight-dramatic {
            0% {
              transform: translateX(-50%) scaleY(0);
              opacity: 0;
            }
            15% {
              transform: translateX(-50%) scaleY(1.1);
              opacity: 1;
            }
            20% {
              transform: translateX(-50%) scaleY(1);
              opacity: 1;
            }
            40% {
              transform: translateX(-50%) rotateY(-90deg) scaleY(1);
            }
            60% {
              transform: translateX(10%) rotateY(-15deg) scaleY(1) skewY(-20deg);
              width: 22%;
            }
            75% {
              transform: translateX(90%) rotateY(0deg) scaleY(1.05) skewY(-28deg);
              width: 26%;
            }
            100% {
              transform: translateX(80%) rotateY(0deg) scaleY(1) skewY(-25deg);
              width: 25%;
            }
          }

          @keyframes shadowGrow-dramatic {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1.8);
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Intro;
