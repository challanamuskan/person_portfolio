import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentRow from './components/ContentRow';
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
  const [showIntro, setShowIntro] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleIntroFinish = () => {
    setShowIntro(false);
    setIsIntroFinished(true);
  }

  const handleShowPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' }); // Go to top of new page
  };

  const handleBackToHome = () => {
    handleShowPage('home');
  };

  // Create a summary version of the data for the homepage
  const summaryCategories = ["Experience", "Projects", "Achievements", "Skills"];
  const homepageData = PORTFOLIO_DATA.map(category => {
      if (summaryCategories.includes(category.title)) {
          return {
              ...category,
              items: category.items.slice(0, 3) // Show top 3 items for summary sections
          };
      }
      return category; // Show all items for other sections like Education, Certs
  });


  if (showIntro) {
    return <Intro onFinished={handleIntroFinish} />;
  }
  
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
                        {homepageData.map((category) => (
                            <ContentRow
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
    <div className={`bg-black text-white min-h-screen font-sans transition-opacity duration-1000 ${isIntroFinished ? 'opacity-100' : 'opacity-0'}`}>
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
    </div>
  );
}

export default App;