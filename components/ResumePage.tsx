import React, { useMemo, useState } from 'react';
import { PERSONAL_INFO } from '../constants';

type ResumeTab = 'resume' | 'skills' | 'achievements';

interface ResumePageProps {
    onBack: () => void;
}

type ExperienceItem = {
    title: string;
    subtitle: string;
    year: string;
    color: string;
    bullets: string[];
};

type AchievementItem = {
    title: string;
    description: string;
    year: string;
};

const experience: ExperienceItem[] = [
    {
        title: 'Freelance AI Builder',
        subtitle: 'Independent, Jaipur',
        year: '2025–Present',
        color: '#E50914',
        bullets: [
            'Key accomplishment: Delivered Satyam Tex Fabb CRM — live at satyam-tex-fabb.streamlit.app',
            'Features: OCR scanning, WhatsApp + Email automation, MIS, role-based login',
            '100% AI vibe-coded using Claude, Copilot, Cursor',
        ],
    },
    {
        title: 'Sales & Marketing Coordinator',
        subtitle: 'Lagardère AWPL · Australia',
        year: '2022–2024',
        color: '#2E5BBA',
        bullets: [
            'Transformed daily customer data into Excel insights, lifting sales by 15%.',
            'Cut stock variances by 22% with pivot table inventory analysis.',
            'Boosted upsell rates by 20% with tailored luxury buyer pitches.',
            'Built weekly Google Sheets dashboards for real-time team performance tracking.',
        ],
    },
    {
        title: 'Hospitality & Events Staff',
        subtitle: 'Adelaide Oval & Adelaide Convention Centre · Australia',
        year: '2022–2024',
        color: '#8b5cf6',
        bullets: [
            'Managed high-volume service at premier Australian venues including Adelaide Oval (50k+ capacity).',
            'Developed elite teamwork and customer service skills during major international cricket and AFL events.',
        ],
    },
    {
        title: 'COVID Concierge',
        subtitle: 'Flinders Medical Centre · Adelaide, Australia',
        year: '2022–2023',
        color: '#10b981',
        bullets: [
            'Provided critical patient and visitor screening at Flinders Medical Centre.',
            'Managed infection control protocols and crisis communication in a high-pressure healthcare setting.',
        ],
    },
    {
        title: 'Student Mentor',
        subtitle: 'University of South Australia',
        year: '2022–2024',
        color: '#f59e0b',
        bullets: ['Mentored 2 years of international students'],
    },
];

const certifications = [
    'Nestlé YEP Academy × 4 + Nesternship',
    'McKinsey Forward',
    'Google Data Analytics',
    'Cisco Networking Academy × 7',
    'GitHub Student Developer Pack',
];

const education = [
    'Sabarmati University — Bachelor of Commerce (Completed)',
    'Torrens University, Adelaide — Bachelor of Business Information Systems (On Hold)',
];

const skillGroups = [
    {
        title: 'AI & Vibe Coding',
        tags: ['Claude', 'Gemini', 'Cursor', 'GitHub Copilot', 'Prompt Engineering'],
    },
    {
        title: 'Data & Analytics',
        tags: ['Python', 'Streamlit', 'Pandas', 'R', 'SQL', 'Google Sheets API', 'Power BI'],
    },
    {
        title: 'Supply Chain & Ops',
        tags: ['Inventory Management', 'Procurement Tracking', 'MIS', 'Logistics Analysis'],
    },
    {
        title: 'Business & Strategy',
        tags: ['CRM Systems', 'Sales Strategy', 'Case Competitions', 'Marketing'],
    },
    {
        title: 'APIs & Integrations',
        tags: ['Gmail API', 'WhatsApp automation', 'OCR (Tesseract)', 'Google Cloud'],
    },
];

const achievements: AchievementItem[] = [
    { title: 'IIT Madras — Shaastra 2026', description: '4 certificates across engineering, AI, operations and entrepreneurship events.', year: '2026' },
    { title: 'IIM Kozhikode — Backwaters\'26', description: '4 certificates across strategy, marketing, finance and operations events.', year: '2026' },
    { title: 'IIT Bombay — Techfest 2025', description: '2 certificates from Asia\'s largest science and technology festival.', year: '2025' },
    { title: 'Campus Ambassador — IIT Delhi eDCon\'26', description: 'Official Campus Ambassador for IIT Delhi\'s entrepreneurship conclave.', year: '2026' },
    { title: 'McKinsey Forward Certified', description: 'Selective global leadership and structured problem solving program.', year: '2025' },
    { title: '3rd Place — IIM Rohtak National Competition', description: 'Podium finish at a national competition at India\'s premier management institute.', year: '2025' },
    { title: 'Represented India — International Swimming', description: 'Twice represented India in freestyle swimming internationally.', year: '2014–2016' },
    { title: 'Represented India — Classical Kathak', description: 'Twice represented India in classical Kathak dance internationally.', year: '2012–2014' },
];

const ResumePage: React.FC<ResumePageProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<ResumeTab>('resume');

    const tabButtonClass = (tab: ResumeTab) =>
        `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === tab
                ? 'bg-red-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
        }`;

    const heading = useMemo(() => {
        if (activeTab === 'skills') return 'Skills Snapshot';
        if (activeTab === 'achievements') return 'Major Achievements';
        return 'Professional Resume';
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="sticky top-0 z-40 border-b border-zinc-800 bg-black/90 backdrop-blur">
                <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-sm"
                    >
                        Back
                    </button>

                    <div className="flex items-center gap-2">
                        <button onClick={() => setActiveTab('resume')} className={tabButtonClass('resume')}>Resume</button>
                        <button onClick={() => setActiveTab('skills')} className={tabButtonClass('skills')}>Skills</button>
                        <button onClick={() => setActiveTab('achievements')} className={tabButtonClass('achievements')}>Achievements</button>
                    </div>

                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-sm font-semibold"
                    >
                        Print PDF
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <section className="mb-8 border border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-zinc-950 to-black">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                        Muskan Challana
                    </h1>
                    <p className="mt-2 text-red-500 text-lg md:text-xl font-semibold">{PERSONAL_INFO.title}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-300">
                        <a className="hover:text-white" href="mailto:cmuskan2068@gmail.com">cmuskan2068@gmail.com</a>
                        <a className="hover:text-white" href="https://www.linkedin.com/in/muskan-challana-408234163/" target="_blank" rel="noreferrer">LinkedIn</a>
                        <a className="hover:text-white" href="https://github.com/challanamuskan" target="_blank" rel="noreferrer">GitHub</a>
                        <span>Jaipur, India</span>
                    </div>
                </section>

                <h2 className="text-2xl font-bold mb-4">{heading}</h2>

                {activeTab === 'resume' && (
                    <div className="space-y-8">
                        <section className="space-y-4">
                            {experience.map((item) => (
                                <article
                                    key={item.title}
                                    className="border border-zinc-800 rounded-xl p-5 bg-zinc-950"
                                    style={{ borderLeft: `6px solid ${item.color}` }}
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-zinc-300 text-sm">{item.subtitle}</p>
                                        </div>
                                        <span className="text-xs bg-zinc-800 text-zinc-200 rounded-full px-3 py-1">{item.year}</span>
                                    </div>
                                    <ul className="mt-3 list-disc pl-5 text-sm text-zinc-200 space-y-1">
                                        {item.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </section>

                        <section className="grid md:grid-cols-2 gap-4">
                            <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-950">
                                <h3 className="text-lg font-semibold text-red-500 mb-3">Education</h3>
                                <ul className="space-y-2 text-sm text-zinc-200 list-disc pl-5">
                                    {education.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-950">
                                <h3 className="text-lg font-semibold text-red-500 mb-3">Certifications</h3>
                                <ul className="space-y-2 text-sm text-zinc-200 list-disc pl-5">
                                    {certifications.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-4">
                        {skillGroups.map((group) => (
                            <section key={group.title} className="border border-zinc-800 rounded-xl p-5 bg-zinc-950">
                                <h3 className="text-lg font-semibold text-red-500 mb-3">{group.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-sm bg-zinc-800 text-zinc-100 border border-zinc-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <section className="grid md:grid-cols-2 gap-4">
                        {achievements.map((item) => (
                            <article key={item.title} className="border border-zinc-800 rounded-xl p-5 bg-zinc-950">
                                <div className="flex justify-between gap-2 items-start">
                                    <h3 className="font-semibold text-base md:text-lg">{item.title}</h3>
                                    <span className="shrink-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full">{item.year}</span>
                                </div>
                                <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default ResumePage;
