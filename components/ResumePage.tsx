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
        title: 'Founder — Nexivo',
        subtitle: 'DPIIT-Registered Startup · Jaipur, Rajasthan',
        year: '2026–Present',
        color: '#E50914',
        bullets: [
            'Founded Nexivo — B2B AI ops for Indian SMEs. DPIIT-registered under Startup India.',
            'Products: Nexivo CRM (pipeline + WhatsApp/email automation, live), Nexivo Audit (AI audit platform, live at audit-nexivo.vercel.app), Nexivo Automate (workflow automation).',
            '2 paying clients acquired within 3 months. CRM saves clients 8+ hours of manual admin per week.',
            'Built using Python, Streamlit, Supabase PostgreSQL, Claude API, Gmail OAuth, WhatsApp Business API — AI-assisted development from zero coding background.',
        ],
    },
    {
        title: 'Freelance AI Builder',
        subtitle: 'Independent · Jaipur, Rajasthan',
        year: 'Dec 2025–2026',
        color: '#9333ea',
        bullets: [
            'Delivered a live production CRM for a 30-year-old Jaipur manufacturing business — OCR bill scanning, WhatsApp + email automation, MIS dashboard, role-based login.',
            'Delivered a B2B product catalogue and lead generation website for a textile machinery parts dealer.',
        ],
    },
    {
        title: 'Sales & Marketing Coordinator',
        subtitle: 'Lagardère AWPL · Adelaide, Australia',
        year: '2022–2024',
        color: '#2E5BBA',
        bullets: [
            'Transformed daily customer data into Excel insights, lifting sales by 15%.',
            'Cut stock variances by 22% with pivot table inventory optimisation.',
            'Boosted upsell rates by 20% with tailored luxury buyer pitches.',
            'Built weekly Google Sheets dashboards for real-time team performance tracking.',
        ],
    },
    {
        title: 'Student Mentor',
        subtitle: 'University of South Australia · Adelaide',
        year: '2022–2024',
        color: '#f59e0b',
        bullets: [
            'Mentored international students through academic, cultural, and personal transitions for 2 years as part of the formal UniSA peer mentoring programme.',
        ],
    },
];

const certifications = [
    'McKinsey Forward — Global leadership & structured problem-solving (McKinsey & Company)',
    'Nestlé YEP Academy × 4 — Idea Generation · Solution Creation · Successful Entrepreneur · Food Product Development',
    'Nestlé Nesternship — Virtual internship programme (Nestlé)',
    'Nestlé FoodTech Course — Food Product Development (Nestlé YEP Academy)',
    'Google Data Analytics Professional Certificate (Coursera)',
    'Cisco Networking Academy × 7 — Networking, SQL, Analytics, Excel, Dashboarding',
    'HP LIFE × 2 — Data Science & Analytics · AI for Business Professionals',
    'GitHub Student Developer Pack',
];

const education = [
    'Vivekananda Global University — MCA, Master of Computer Applications · Distance · 2026–2028 (in progress)',
    'Sabarmati University — B.Com, Bachelor of Commerce · Graduated 2025',
];

const internationalExposure =
    'Adelaide, Australia (2022–2025): 3 years of independent living and professional work experience across corporate, hospitality, and education sectors. Returned to India July 2025.';

const skillGroups = [
    {
        title: 'AI & LLM',
        tags: ['Claude API', 'Gemini API', 'OpenAI API', 'RAG Pipelines', 'Multi-Agent Systems', 'Prompt Engineering', 'Vector Search'],
    },
    {
        title: 'AI-Assisted Development',
        tags: ['Claude', 'Cursor', 'GitHub Copilot', 'Iterative AI Build', 'Rapid Prototyping'],
    },
    {
        title: 'Languages & Frameworks',
        tags: ['Python', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Streamlit'],
    },
    {
        title: 'APIs & Infrastructure',
        tags: ['Supabase PostgreSQL', 'Gmail API (OAuth)', 'WhatsApp Business API', 'Google Sheets API', 'Vercel', 'GitHub'],
    },
    {
        title: 'Data & Analytics',
        tags: ['pandas', 'matplotlib', 'Advanced Excel', 'SQL', 'Google Sheets Dashboards', 'MIS Reporting'],
    },
    {
        title: 'Business & Strategy',
        tags: ['Product Management', 'B2B Client Management', 'SME Operations', 'McKinsey Problem-Solving Framework', 'Startup Development'],
    },
];

const achievements: AchievementItem[] = [
    { title: 'DPIIT-Registered Startup — Nexivo', description: 'Nexivo recognised under DPIIT, Government of India. Startup India benefits and accelerator eligibility.', year: '2026' },
    { title: 'McKinsey Forward Certified', description: 'Selective global leadership and structured problem-solving programme by McKinsey & Company.', year: '2025' },
    { title: '3rd Place — IIM Rohtak National Competition', description: "Podium finish at a national competition at IIM Rohtak — one of India's premier management institutes.", year: '2025' },
    { title: 'IIT Madras — SHAastra 2026 × 4', description: '4 certificates: ADI Reverse Engineering, Embedded Programming, E-Contest, Petri Dish Challenge.', year: '2026' },
    { title: "IIM Kozhikode — Backwaters'26 × 4", description: '4 certificates: IPL Fantasy, Avatar CEO, Kotler Sutra Marketing, Project Horizon GPAI.', year: '2026' },
    { title: 'IIT Bombay — Techfest 2025 × 2', description: "2 certificates from Asia's largest science and technology festival — CTF cybersecurity + Agrowsera.", year: '2025' },
    { title: "Campus Ambassador — IIT Delhi eDCon'26", description: "Official Campus Ambassador for IIT Delhi's entrepreneurship and design conclave.", year: '2026' },
    { title: 'Nestlé YEP Academy × 4 + Nesternship', description: '4 YEP Academy completions (Idea Generation, Solution Creation, Successful Entrepreneur, Food Product Development) + Nestlé Nesternship virtual internship.', year: '2023–2024' },
    { title: 'National Athlete — Swimming & Kathak', description: 'Represented India internationally in freestyle swimming (2014–2016) and classical Kathak dance (2012–2014).', year: '2012–2016' },
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
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                Muskan Challana
                            </h1>
                            <p className="mt-2 text-red-500 text-lg md:text-xl font-semibold">{PERSONAL_INFO.title}</p>
                        </div>
                        <span className="mt-1 px-3 py-1 rounded-full bg-green-900/60 border border-green-700 text-green-300 text-xs font-semibold tracking-wide">
                            DPIIT Registered · Startup India
                        </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-300">
                        <a className="hover:text-white" href="mailto:cmuskan2068@gmail.com">cmuskan2068@gmail.com</a>
                        <a className="hover:text-white" href="https://www.linkedin.com/in/muskan-challana-408234163/" target="_blank" rel="noreferrer">LinkedIn</a>
                        <a className="hover:text-white" href="https://github.com/challanamuskan" target="_blank" rel="noreferrer">GitHub</a>
                        <a className="hover:text-white" href="https://audit-nexivo.vercel.app" target="_blank" rel="noreferrer">audit-nexivo.vercel.app</a>
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

                        <section className="border border-zinc-800 rounded-xl p-5 bg-zinc-950">
                            <h3 className="text-lg font-semibold text-red-500 mb-3">International Exposure</h3>
                            <p className="text-sm text-zinc-200 leading-relaxed">{internationalExposure}</p>
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
