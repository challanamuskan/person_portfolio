import React, { useEffect, useMemo, useRef, useState } from 'react';

type Message = {
    role: 'user' | 'bot';
    text: string;
};

const SUGGESTIONS = [
    'Tell me about the CRM',
    'What are her skills?',
    'Show achievements',
    'How to contact her?',
];

const REPLIES: Array<{ regex: RegExp; text: string }> = [
    {
        regex: /hi|hello|hey|namaste/i,
        text: "Hey! I'm Jerry 👋 Muskan's AI assistant. Ask me anything about her projects, skills, achievements, or how to hire her!",
    },
    {
        regex: /crm|satyam|tex fabb|streamlit/i,
        text: "📦 **Satyam Tex Fabb CRM** is Muskan's flagship live project — a complete business CRM for a 30-year textile machinery company in Bhilwara.\n\nFeatures: OCR bill scanning, WhatsApp + Email automation, MIS with attendance tracking, role-based login, live calendar.\n\n🔗 Live now: https://satyam-tex-fabb.streamlit.app",
    },
    {
        regex: /nsc|national sales|b2b|catalogue/i,
        text: '🏭 **NSC B2B Catalogue** — a full React + TypeScript product website Muskan built for a textile machinery parts dealer. Animated logo, 7-category catalogue, RFQ inquiry form, and AI chatbot.',
    },
    {
        regex: /f1|pitpilot|formula|race|pit/i,
        text: '🏎️ **PitPilot** is an AI-driven F1 race strategy assistant. Recommends pit stop windows, tyre strategy, and overtaking opportunities using live race data. Built with Python.',
    },
    {
        regex: /student|legal|visa|gateway/i,
        text: '⚖️ **Student Legal Gateway** — a RAG AI assistant helping international students understand visa conditions and legal rights in plain English. Uses vector search + conversational AI.',
    },
    {
        regex: /project|built|made|portfolio/i,
        text: "Muskan has 4 main projects:\n1. 🏭 Satyam Tex Fabb CRM (live!)\n2. 🏢 NSC B2B Catalogue\n3. 🏎️ PitPilot F1 AI\n4. ⚖️ Student Legal Gateway\n\nAll vibe-coded — no manual code writing!",
    },
    {
        regex: /skill|tech|code|vibe|ai tool|stack/i,
        text: "🛠️ Muskan's stack:\n• **AI**: Claude, Cursor, Gemini, GitHub Copilot\n• **Languages**: Python, TypeScript, SQL, R\n• **Web**: React, Vite, Streamlit\n• **Data**: Excel, Google Sheets, Pandas\n\nSuperpower: shipping real products through vibe-coding.",
    },
    {
        regex: /experience|work|job|career|australia/i,
        text: "💼 Experience:\n• **Freelance AI Builder** — Bhilwara (2025–Present)\n• **Campus Ambassador eDCon'26** — IIT Delhi\n• **Hospitality & Bartending** — Adelaide Oval & Convention Centre (2022–2024)\n• **COVID Concierge** — Flinders Medical Centre (2022–2023)\n• **Sales & Marketing Coordinator** — Lagardère AWPL, Australia\n• **Student Mentor** — UniSA",
    },
    {
        regex: /iit|iim|mckinsey|achieve|award|competition|fest|certificate/i,
        text: "🏆 Competition record:\n• **McKinsey Forward** certified (highly selective)\n• **Top 3** — IIM Rohtak\n• **× 4 certs** — IIT Madras SHAastra 2026\n• **× 2 certs** — IIT Bombay Techfest 2025\n• **× 4 certs** — IIM Kozhikode Backwaters'26\n• **IIM Indore** IRIS 2026\n• **83 total** competition certs on Unstop\n• **Campus Ambassador** — IIT Delhi eDCon'26",
    },
    {
        regex: /certif|nestle|google|cisco|hp|credential/i,
        text: '📜 Certifications:\n• McKinsey Forward\n• Nestlé YEP × 4 + FoodTech\n• Google Data Analytics\n• Cisco Networking Academy × 7\n• HP LIFE × 2\n• 83 competition certs (Unstop)\n\n**100+ verified credentials total!**',
    },
    {
        regex: /swim|sport|dance|kathak|india|international|represent/i,
        text: '🏊 Muskan represented India internationally **twice in freestyle swimming** (2014–2016) and **twice in classical Kathak dance** (2012–2014) — competing and performing at elite level since childhood.',
    },
    {
        regex: /hospital|bartend|adelaide|flinders|covid|healthcare|oval/i,
        text: "🏟️ Muskan worked at **Adelaide Oval** and **Adelaide Convention Centre** (hospitality & bartending, 2022–2024), and as **COVID Concierge** at Flinders Medical Centre (2022–2023) — managing patient screening at one of South Australia's largest public hospitals.",
    },
    {
        regex: /contact|hire|email|linkedin|available|freelance|work with/i,
        text: '📬 Want to work with Muskan?\n• **Email**: cmuskan2068@gmail.com\n• **LinkedIn**: linkedin.com/in/muskan-challana-408234163\n• **GitHub**: github.com/challanamuskan\n\nOpen to freelance projects, remote roles, and internships!',
    },
    {
        regex: /location|where|bhilwara|rajasthan|india/i,
        text: '📍 Based in **Bhilwara, Rajasthan, India**. Previously lived in **Adelaide, Australia** for 2 years. Available for remote work globally.',
    },
    {
        regex: /thank|thanks|great|awesome|nice|cool/i,
        text: "You're welcome! 😊 Anything else you'd like to know about Muskan?",
    },
    {
        regex: /bye|goodbye|later|cya/i,
        text: "Bye! 👋 Check out Muskan's live CRM → https://satyam-tex-fabb.streamlit.app",
    },
];

const DEFAULT_REPLY =
    "Hmm, not sure about that! Try asking about Muskan's **projects**, **skills**, **experience**, **achievements**, or how to **contact** her 😊";

const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={`b-${index}`}>{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={`t-${index}`}>{part}</React.Fragment>;
    });
};

const TypingDots: React.FC = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ background: '#2a2a2a', borderRadius: 12, padding: '10px 12px' }}>
            <div style={{ display: 'flex', gap: 6 }}>
                <span className="jerry-dot" />
                <span className="jerry-dot" style={{ animationDelay: '0.12s' }} />
                <span className="jerry-dot" style={{ animationDelay: '0.24s' }} />
            </div>
        </div>
    </div>
);

const findReply = (input: string) => {
    for (const entry of REPLIES) {
        if (entry.regex.test(input)) {
            return entry.text;
        }
    }
    return DEFAULT_REPLY;
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    const showSuggestions = useMemo(() => isOpen && messages.length === 0 && !isTyping, [isOpen, messages.length, isTyping]);

    const ask = (question: string) => {
        const trimmed = question.trim();
        if (!trimmed || isTyping) {
            return;
        }

        setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
        setInput('');
        setIsTyping(true);

        window.setTimeout(() => {
            setMessages((prev) => [...prev, { role: 'bot', text: findReply(trimmed) }]);
            setIsTyping(false);
        }, 600);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        ask(input);
    };

    return (
        <>
            <style>{`
                @keyframes jerryBounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
                    40% { transform: translateY(-5px); opacity: 1; }
                }
                .jerry-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 9999px;
                    background: #f5f5f5;
                    animation: jerryBounce 1s infinite;
                }
            `}</style>

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle Jerry assistant"
                style={{
                    position: 'fixed',
                    right: 20,
                    bottom: 20,
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    border: 'none',
                    background: '#e50914',
                    color: '#fff',
                    fontSize: 24,
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
                    zIndex: 70,
                }}
            >
                🎬
            </button>

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 88,
                        width: 360,
                        maxWidth: 'calc(100vw - 24px)',
                        maxHeight: 500,
                        background: '#141414',
                        border: '1px solid #2a2a2a',
                        borderRadius: 14,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
                        zIndex: 70,
                    }}
                >
                    <div
                        style={{
                            background: '#e50914',
                            color: '#fff',
                            padding: '10px 12px',
                            fontWeight: 800,
                            fontSize: 14,
                        }}
                    >
                        🎬 Jerry · Muskan's AI Assistant
                    </div>

                    <div
                        ref={listRef}
                        style={{
                            padding: 12,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            overflowY: 'auto',
                            flex: 1,
                        }}
                    >
                        {showSuggestions && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {SUGGESTIONS.map((chip) => (
                                    <button
                                        key={chip}
                                        type="button"
                                        onClick={() => ask(chip)}
                                        style={{
                                            border: '1px solid #3a3a3a',
                                            background: '#1f1f1f',
                                            color: '#ddd',
                                            borderRadius: 9999,
                                            padding: '6px 10px',
                                            fontSize: 12,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div
                                key={`${message.role}-${index}`}
                                style={{
                                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                                    background: message.role === 'user' ? '#e50914' : '#2a2a2a',
                                    color: '#fff',
                                    borderRadius: 12,
                                    padding: '10px 12px',
                                    maxWidth: '85%',
                                    fontSize: 14,
                                    lineHeight: 1.4,
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                {renderWithBold(message.text)}
                            </div>
                        ))}

                        {isTyping && <TypingDots />}
                    </div>

                    <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #2a2a2a' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Ask Jerry anything..."
                            disabled={isTyping}
                            style={{
                                flex: 1,
                                background: '#1e1e1e',
                                border: '1px solid #333',
                                color: '#fff',
                                borderRadius: 9999,
                                padding: '9px 12px',
                                fontSize: 14,
                                outline: 'none',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            style={{
                                border: 'none',
                                background: '#e50914',
                                color: '#fff',
                                borderRadius: 9999,
                                padding: '0 14px',
                                fontWeight: 700,
                                cursor: !input.trim() || isTyping ? 'not-allowed' : 'pointer',
                                opacity: !input.trim() || isTyping ? 0.6 : 1,
                            }}
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
