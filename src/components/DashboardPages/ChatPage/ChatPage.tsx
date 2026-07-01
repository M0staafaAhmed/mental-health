import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Send, Loader2, Bot, Plus, MessageCircle,  PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import type { RootState } from '../../../redux/store';

interface ChatMessage {
    UserMessage: string;
    AiResponse: string;
    CreatedAt: string;
}

interface UIMessage {
    role: 'user' | 'ai';
    text: string;
    time: string;
}

function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });
}

function getNow() {
    return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });
}

function getDateLabel(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return 'TODAY';
    if (date.toDateString() === yesterday.toDateString()) return 'YESTERDAY';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function historyToMessages(history: ChatMessage[]): UIMessage[] {
    return history.flatMap(m => ([
        { role: 'user' as const, text: m.UserMessage, time: formatTime(m.CreatedAt) },
        { role: 'ai' as const, text: m.AiResponse, time: formatTime(m.CreatedAt) },
    ]));
}

export default function ChatPage() {
    const token = useSelector((state: RootState) => state.userInfo.token);
    const queryClient = useQueryClient();

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<UIMessage[]>([]);
    const [isNewConvo, setIsNewConvo] = useState(false);
    const [initialLoadDone, setInitialLoadDone] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // مخفي افتراضياً
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const getAuthHeader = (rawToken: string) => {
        if (!rawToken) return '';
        return rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
    };

    const { data: historyData, isLoading: historyLoading } = useQuery<any>({
        queryKey: ['chat-history'],
        queryFn: async () => {
            const res = await axios.get(
                'https://mental-heath-backend.vercel.app/chat/history',
                { headers: { Authorization: getAuthHeader(token) } }
            );
            return res.data;
        },
        enabled: !!token,
    });

    const history: ChatMessage[] = historyData?.history || [];

    useEffect(() => {
        if (!initialLoadDone && !isNewConvo && history.length > 0) {
            setMessages(historyToMessages(history));
            setInitialLoadDone(true);
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'instant' });
            }, 50);
        }
    }, [history, initialLoadDone, isNewConvo]);

    const groupedByDay = history.reduce((acc: Record<string, ChatMessage>, msg) => {
        const label = getDateLabel(msg.CreatedAt);
        if (!acc[label]) acc[label] = msg;
        return acc;
    }, {});

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async (message: string) => {
            const res = await axios.post(
                'https://mental-heath-backend.vercel.app/chat',
                { message },
                { headers: { Authorization: getAuthHeader(token) } }
            );
            return res.data;
        },
        onSuccess: (data) => {
            const aiText = data.reply || 'Sorry, I could not process that.';
            setMessages(prev => [...prev, { role: 'ai', text: aiText, time: getNow() }]);
            queryClient.invalidateQueries({ queryKey: ['chat-history'] });
        },
        onError: () => {
            setMessages(prev => [...prev, {
                role: 'ai', text: 'Something went wrong. Please try again.', time: getNow()
            }]);
        }
    });

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed || isPending) return;
        setIsNewConvo(false);
        setMessages(prev => [...prev, { role: 'user', text: trimmed, time: getNow() }]);
        setInput('');
        sendMessage(trimmed);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewConversation = () => {
        setMessages([]);
        setIsNewConvo(true);
        setInitialLoadDone(true);
        setInput('');
        setShowSidebar(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSelectDay = (label: string) => {
        const dayMsgs = history.filter(m => getDateLabel(m.CreatedAt) === label);
        setMessages(historyToMessages(dayMsgs));
        setIsNewConvo(false);
        setInitialLoadDone(true);
        setShowSidebar(false);
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'instant' });
        }, 50);
    };

    useEffect(() => {
        if (messages.length > 0 && initialLoadDone) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const isEmpty = messages.length === 0 && !historyLoading;

    return (
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-64px)] relative">

            {/* Overlay لما الـ sidebar مفتوح على الموبايل */}
            {showSidebar && (
                <div
                    className="absolute inset-0 bg-black/20 z-10 md:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Sidebar — floating على الموبايل، push على الـ desktop */}
            <div className={`
                shrink-0 border-r border-slate-100 bg-white flex flex-col z-20
                absolute md:relative h-full
                transition-all duration-300 ease-in-out
                ${showSidebar ? 'w-72' : 'w-0'}
                overflow-hidden
            `}>
                <div className="w-72 flex flex-col h-full">
                    <div className="p-4 border-b border-slate-50 flex items-center gap-2">
                        <input
                            placeholder="Search conversations..."
                            className="flex-1 px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 placeholder-slate-400"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto py-3 space-y-1 px-3">
                        {historyLoading ? (
                            <div className="flex items-center justify-center py-10">
                                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                            </div>
                        ) : Object.keys(groupedByDay).length === 0 ? (
                            <div className="text-center py-10 space-y-2">
                                <MessageCircle className="w-8 h-8 text-slate-200 mx-auto" />
                                <p className="text-xs font-medium text-slate-400">No conversations yet</p>
                            </div>
                        ) : (
                            Object.entries(groupedByDay).map(([label, firstMsg]) => {
                                const dayCount = history.filter(m => getDateLabel(m.CreatedAt) === label).length;
                                return (
                                    <button
                                        key={label}
                                        onClick={() => handleSelectDay(label)}
                                        className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left group"
                                    >
                                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                            <Bot className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1">
                                                <p className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                                                    {label === 'TODAY' ? "Today's Chat" : label === 'YESTERDAY' ? "Yesterday's Chat" : `Chat — ${label}`}
                                                </p>
                                                <span className="text-[10px] text-slate-400 shrink-0">
                                                    {formatTime(firstMsg.CreatedAt)}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                {dayCount} message{dayCount !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-100">
                        <button
                            onClick={handleNewConversation}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all active:scale-[0.98]"
                        >
                            <Plus className="w-4 h-4" />
                            New Conversation
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Area — دايماً full width */}
            <div className="flex-1 flex flex-col bg-slate-50/50 min-w-0 h-[calc(100vh-145px)]">

                {/* Header */}
                <div className="bg-white border-b border-slate-100 px-4 md:px-6 py-4 flex items-center gap-3 shrink-0">
                    {/* Toggle Sidebar Button */}
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
                    >
                        {showSidebar
                            ? <PanelLeftClose className="w-5 h-5" />
                            : <PanelLeftOpen className="w-5 h-5" />
                        }
                    </button>

                    <div className="relative">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-black text-slate-800">Safe Space AI Assistant</p>
                        <p className="text-[11px] font-semibold text-emerald-500">● Always listening</p>
                    </div>

                    {/* New Conversation Button في الـ header */}
                    <button
                        onClick={handleNewConversation}
                        className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">New Chat</span>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4 scrollbar-none">

                    {historyLoading && (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        </div>
                    )}

                    {isEmpty && (
                        <div className="flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-lg font-black text-slate-800">Hello! I'm here to support you.</h3>
                                <p className="text-sm text-slate-400 font-medium max-w-sm leading-relaxed">
                                    How are you feeling today? This is a safe, non-judgmental space.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                {[
                                    "I've been feeling anxious",
                                    "I can't sleep well",
                                    "I feel overwhelmed",
                                    "I want an assessment",
                                ].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => { setInput(s); inputRef.current?.focus(); }}
                                        className="px-3 py-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-xs font-semibold text-slate-600 hover:text-blue-600 rounded-xl transition-all"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'ai' && (
                                <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 mb-1">
                                    <Bot className="w-3.5 h-3.5 text-white" />
                                </div>
                            )}
                            <div className={`max-w-[80%] md:max-w-[65%] space-y-1 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed wrap-break-words ${
                                    msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-bl-sm'
                                }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[10px] font-semibold text-slate-400 px-1">{msg.time}</span>
                            </div>
                        </div>
                    ))}

                    {isPending && (
                        <div className="flex items-end gap-2">
                            <div className="w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                <Bot className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="bg-white border-t border-slate-100 px-4 md:px-6 py-4 shrink-0">
                    <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here..."
                            rows={1}
                            disabled={isPending}
                            className="flex-1 bg-transparent text-sm font-medium text-slate-700 placeholder-slate-400 resize-none focus:outline-none leading-relaxed disabled:opacity-50 max-h-32 overflow-y-auto"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isPending}
                            className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shrink-0"
                        >
                            {isPending
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Send className="w-4 h-4" />
                            }
                        </button>
                    </div>
                    <p className="text-center text-[10px] font-medium text-slate-400 mt-2">
                        Safe Space AI provides support but is not a replacement for professional medical advice.
                    </p>
                </div>
            </div>
        </div>
    );
}