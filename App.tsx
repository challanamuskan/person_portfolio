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
    const introSeen = window.localStorage.getItem('introSeen') === 'true';
    return !introSeen;
  });
  const [currentPage, setCurrentPage] = useState('home');

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleIntroFinish = () => {
    setShowIntro(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('introSeen', 'true');
    }
  }

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
        <title>Muskan Challana — AI Builder & Vibe Coder | Jaipur, India</title>
        <meta
          name="description"
          content="Muskan Challana — AI Builder and Vibe Coder from Jaipur. I ship live AI products for real businesses using Claude, Gemini, Python, and React. 4 live projects. 6 IIT/IIM fests. Open to freelance and collaborations."
        />
        <meta property="og:title" content="Muskan Challana — AI Builder & Vibe Coder" />
        <meta property="og:description" content="I ship live AI products for real businesses. Freelance AI developer from Jaipur, India." />
        <meta property="og:image" content="https://muskanchallana.vercel.app/og-image.png" />
        <meta property="og:url" content="https://muskanchallana.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Muskan Challana — AI Builder & Vibe Coder" />
        <meta name="twitter:description" content="I ship live AI products for real businesses. Freelance AI developer from Jaipur, India." />
      </Helmet>

      <Header 
        onShowHome={handleBackToHome}
        onShowProjects={() => handleShowPage('projects')}
        onShowAchievements={() => handleShowPage('achievements')}
        onShowExperience={() => handleShowPage('experience')}
        onShowSkills={() => handleShowPage('skills')}
        onShowResume={() => handleShowPage('resume')}
      />
      
      <main>
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