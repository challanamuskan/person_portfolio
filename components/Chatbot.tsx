import React, { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types';

type FAQItem = {
    patterns: RegExp[];
    response: string;
};

const FAQ: FAQItem[] = [
    {
        patterns: [/project|portfolio|build|app|crm|website/i],
        response:
            "Muskan's key **projects** include the live **Satyam Tex Fabb CRM**, the **NSC B2B product catalogue and lead-gen site**, **PitPilot (F1 strategy AI)**, and **Student Legal Gateway**.",
    },
    {
        patterns: [/skill|tech|stack|python|streamlit|ai|vibe/i],
        response:
            "Her core **skills** are **vibe coding**, **Python**, **Streamlit**, **SQL/analytics**, and AI tools like **Claude, Cursor, and Gemini** to ship products quickly.",
    },
    {
        patterns: [/experience|work|career|lagard|nespresso|freelance|ambassador/i],
        response:
            "Her **experience** includes Freelance AI Builder (Jaipur), **Lagardère AWPL** (Sales & Marketing), **Nespresso** (Sales), and **Campus Ambassador at IIT Delhi eDCon'26**.",
    },
    {
        patterns: [/achievement|award|iit|iim|mckinsey|swim|kathak|top.?3/i],
        response:
            "Top **achievements**: **McKinsey Forward**, IIT Madras (×4), IIT Bombay (×2), IIM Kozhikode (×4), **Top 3 at IIM Rohtak**, plus representing India internationally in **swimming** and **Kathak**.",
    },
    {
        patterns: [/contact|email|linkedin|reach|connect/i],
        response:
            "You can contact Muskan at **cmuskan2068@gmail.com** and LinkedIn: **linkedin.com/in/muskan-challana-408234163**.",
    },
    {
        patterns: [/hire|available|freelance|internship|remote/i],
        response:
            "Muskan is **open to freelance, internships, and remote opportunities** in AI products, analytics, and business operations.",
    },
    {
        patterns: [/location|based|city|where/i],
        response: 'She is based in **Jaipur, India**.',
    },
    {
        patterns: [/education|university|college|degree|bcom|bbis/i],
        response:
            "She completed **B.Com at Sabarmati University** and pursued **BBIS at Torrens University (on hold)** while building real client products.",
    },
    {
        patterns: [/certification|certificate|cert/i],
        response:
            'Certifications include **McKinsey Forward**, **Nestle YEP (5 total)**, **Google Data Analytics**, **Cisco Networking Academy (x7)**, **HP LIFE**, and **BRICS Mathematics Stage 2**.',
    },
    {
        patterns: [/^hi$|^hello$|^hey$|^yo$/i],
        response:
            "Hey, I'm **Jerry**. Ask me about Muskan's projects, skills, achievements, certifications, or availability.",
    },
];

const FALLBACK =
    "I can help with **projects, skills, experience, achievements, certifications, contact, education, and availability**. Try: 'Tell me about her projects'.";

const formatBold = (input: string) => {
    const escaped = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

const matchFAQ = (text: string): string => {
    for (const item of FAQ) {
        if (item.patterns.some((pattern) => pattern.test(text))) {
            return item.response;
        }
    }
    return FALLBACK;
};

const TypingDots: React.FC = () => (
    <div className="flex justify-start">
        <div className="bg-zinc-700 rounded-lg px-3 py-2">
            <div className="flex gap-1">
                <span className="h-2 w-2 bg-zinc-300 rounded-full animate-bounce" />
                <span className="h-2 w-2 bg-zinc-300 rounded-full animate-bounce [animation-delay:120ms]" />
                <span className="h-2 w-2 bg-zinc-300 rounded-full animate-bounce [animation-delay:240ms]" />
            </div>
        </div>
    </div>
);

const Bubble: React.FC<ChatMessage> = ({ role, text }) => (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
            className={`max-w-xs md:max-w-sm rounded-lg px-3 py-2 text-sm md:text-base ${
                role === 'user' ? 'bg-red-600 text-white' : 'bg-zinc-700 text-zinc-100'
            }`}
        >
            <span dangerouslySetInnerHTML={{ __html: formatBold(text) }} />
        </div>
    </div>
);

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = (content: string) => {
        const question = content.trim();
        if (!question || isTyping) {
            return;
        }

        setMessages((prev) => [...prev, { role: 'user', text: question }]);
        setIsTyping(true);

        const delay = 600 + Math.floor(Math.random() * 401);
        window.setTimeout(() => {
            setMessages((prev) => [...prev, { role: 'model', text: matchFAQ(question.toLowerCase()) }]);
            setIsTyping(false);
        }, delay);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const question = input;
        setInput('');
        sendMessage(question);
    };

    return (
        <>
            <div className={`fixed bottom-5 right-5 transition-all duration-300 z-[60] ${isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Open Jerry chatbot"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.894 8.894 0 01-4.22-1.22l-1.854.618a.5.5 0 01-.622-.622l.618-1.854A8.894 8.894 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd" /></svg>
                </button>
            </div>

            <div className={`fixed bottom-5 right-5 w-[calc(100%-40px)] md:w-96 h-[70vh] bg-zinc-900 rounded-xl shadow-2xl flex flex-col border border-zinc-700 transition-transform duration-500 z-[60] ${isOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                <div className="flex justify-between items-center p-4 border-b border-zinc-700">
                    <div>
                        <h3 className="text-lg font-bold text-white">Jerry</h3>
                        <p className="text-xs text-zinc-400">Portfolio Assistant</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white" aria-label="Close chatbot">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div ref={bodyRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.length === 0 && (
                        <div className="text-sm text-zinc-300 bg-zinc-800 rounded-lg p-3">
                            Ask me about projects, skills, achievements, certifications, contact, or hiring.
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <Bubble key={`${msg.role}-${idx}`} role={msg.role} text={msg.text} />
                    ))}
                    {isTyping && <TypingDots />}
                </div>

                <div className="p-4 border-t border-zinc-700">
                    <form onSubmit={onSubmit} className="flex items-center gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Jerry..."
                            className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 disabled:bg-zinc-600"
                            aria-label="Send message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
