import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Modal from './components/Modal';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Chatbot from './components/Chatbot';
import ProjectsPage from './components/ProjectsPage';
import AchievementsPage from './components/AchievementsPage';
import ExperiencePage from './components/ExperiencePage';
import SkillsPage from './components/SkillsPage';
import ResumePage from './components/ResumePage';
import { PORTFOLIO_DATA } from './constants';
import type { PortfolioItem } from './types';

function App() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('skip') === '1') return false;
    const hasVisited = window.localStorage.getItem('hasVisited') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !(hasVisited || prefersReducedMotion);
  });
  const [isMainVisible, setIsMainVisible] = useState(false);
  const [mainFadeDurationMs] = useState<number>(() => {
    if (typeof window === 'undefined') return 300;
    const params = new URLSearchParams(window.location.search);
    const skipIntro = params.get('skip') === '1';
    const hasVisited = window.localStorage.getItem('hasVisited') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return skipIntro || hasVisited || prefersReducedMotion ? 300 : 500;
  });
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (showIntro) {
      setIsMainVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsMainVisible(true);
    }, 20);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showIntro]);

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleIntroFinish = () => {
    setShowIntro(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('hasVisited', 'true');
    }
  };

  const handleShowPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' }); // Go to top of new page
  };

  const handleBackToHome = () => {
    handleShowPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
        case 'projects':
            return <ProjectsPage />;
        case 'achievements':
            return <AchievementsPage />;
        case 'experience':
            return <ExperiencePage />;
        case 'skills':
            return <SkillsPage />;
        case 'resume':
          return <ResumePage onBack={handleBackToHome} />;
        case 'home':
        default:
            return (
                <>
              <Hero onViewResume={() => handleShowPage('resume')} />
                    <div className="py-4 md:py-8 lg:py-16 pl-4 md:pl-12 lg:pl-16 relative z-10 -mt-16 md:-mt-24">
                    {PORTFOLIO_DATA.map((category) => (
                      <CategorySection
                                key={category.title}
                                title={category.title}
                                items={category.items}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                </>
            );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <Helmet>
        <title>Muskan Challana — AI Product Builder | Jaipur</title>
        <meta
          name="description"
          content="AI product builder shipping deployed systems for Indian SMEs. Built Satyam Tex Fabb CRM (live), RAG legal assistant, and B2B automation tools using Python, Claude API, and React."
        />
        <meta property="og:title" content="Muskan Challana — AI Product Builder" />
        <meta property="og:description" content="Self-taught builder. Live CRM for a 30-year-old Jaipur textile business. RAG pipelines, WhatsApp automation, MIS dashboards." />
        <meta property="og:image" content="https://muskanchallana.vercel.app/og-image.png" />
        <meta property="og:url" content="https://muskanchallana.vercel.app" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Muskan Challana — AI Product Builder" />
        <meta name="twitter:description" content="Self-taught builder. Live CRM for a 30-year-old Jaipur textile business. RAG pipelines, WhatsApp automation, MIS dashboards." />
      </Helmet>

      <Header 
        onShowHome={handleBackToHome}
        onShowProjects={() => handleShowPage('projects')}
        onShowAchievements={() => handleShowPage('achievements')}
        onShowExperience={() => handleShowPage('experience')}
        onShowSkills={() => handleShowPage('skills')}
        onShowResume={() => handleShowPage('resume')}
      />
      
      <main
        className={`transition-opacity ${isMainVisible ? 'opacity-100' : 'opacity-0'} ${showIntro ? 'pointer-events-none' : ''}`}
        style={{ transitionDuration: `${mainFadeDurationMs}ms` }}
      >
        {renderCurrentPage()}
      </main>

      {selectedItem && <Modal item={selectedItem} onClose={closeModal} />}
      <Footer />
      <Chatbot />

      {showIntro && <Intro onFinished={handleIntroFinish} />}
    </div>
  );
}

export default App;