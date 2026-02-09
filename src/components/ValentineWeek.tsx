
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInSeconds, startOfDay, isBefore, isAfter } from 'date-fns';
import RosePlanting from './RosePlanting';
import ProposeDay from './days/ProposeDay';
import ChocolateDay from './days/ChocolateDay';
import TeddyDay from './days/TeddyDay';

// Initial Year for Valentine Week (Current Year)
const CURRENT_YEAR = new Date().getFullYear();

// Definition of days with their specific dates
const DAYS_CONFIG = [
    { date: `Feb 7`, fullDate: new Date(CURRENT_YEAR, 1, 7), label: 'Rose Day', icon: '🌹', id: 'rose' },
    { date: `Feb 8`, fullDate: new Date(CURRENT_YEAR, 1, 8), label: 'Propose Day', icon: '💍', id: 'propose' },
    { date: `Feb 9`, fullDate: new Date(CURRENT_YEAR, 1, 9), label: 'Chocolate Day', icon: '🍫', id: 'chocolate' },
    { date: `Feb 10`, fullDate: new Date(CURRENT_YEAR, 1, 10), label: 'Teddy Day', icon: '🧸', id: 'teddy' },
    { date: `Feb 11`, fullDate: new Date(CURRENT_YEAR, 1, 11), label: 'Promise Day', icon: '🤝', id: 'promise' },
    { date: `Feb 12`, fullDate: new Date(CURRENT_YEAR, 1, 12), label: 'Hug Day', icon: '🫂', id: 'hug' },
    { date: `Feb 13`, fullDate: new Date(CURRENT_YEAR, 1, 13), label: 'Kiss Day', icon: '💋', id: 'kiss' },
    { date: `Feb 14`, fullDate: new Date(CURRENT_YEAR, 1, 14), label: 'Valentine\'s Day', icon: '❤️', id: 'valentine' },
];

const ValentineWeek = () => {
    const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number } | null>(null);
    const [targetEventLabel, setTargetEventLabel] = useState<string>('');
    const [activeDay, setActiveDay] = useState<string | null>('rose'); 
    // State to hold the dynamic list of days with their locked status
    const [days, setDays] = useState(DAYS_CONFIG.map(d => ({ ...d, locked: true })));
    
    const contentRef = useRef<HTMLDivElement>(null);

    // Update locked status and countdown every second
    useEffect(() => {
        const updateTimeAndLocks = () => {
            const now = new Date();

            // 1. Update Locked Status
            const updatedDays = DAYS_CONFIG.map(day => {
                // If the current time is BEFORE the day's start (00:00), it is locked.
                // Exception: using mocked locked value for debugging if needed, but here relying on FullDate
                // note: month is 0-indexed (1 = Feb).
                const isLocked = isBefore(now, day.fullDate);
                return { ...day, locked: isLocked };
            });
            
            // Only update state if something changed to avoid re-renders (simple check)
            // For simplicity in this interval, we can just set it, React batches updates well.
            // Using a functional update to avoid dependency circles if we wanted, 
            // but here we just recalculate based on 'now'.
            setDays(updatedDays);

            // 2. Countdown Logic
            // Find the first event that is locked (i.e., in the future)
            // OR if today is locked (which shouldn't happen if we strictly follow the list order, 
            // effectively we look for the first day where isBefore(now, day.fullDate) is true.
            let nextEvent = DAYS_CONFIG.find(day => isBefore(now, day.fullDate));
            
            if (!nextEvent) {
                 // All days passed or it's current year late. Target next year Rose Day.
                 const nextYearRose = new Date(CURRENT_YEAR + 1, 1, 7);
                 nextEvent = { fullDate: nextYearRose, label: 'Next Valentine Week', date: 'Feb 7', icon: '🌹', id: 'next' };
            }

            const diff = differenceInSeconds(nextEvent.fullDate, now);
            
            if (diff > 0) {
                const hours = Math.floor(diff / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = diff % 60;
                
                setTimeLeft({ hours, minutes, seconds });
                setTargetEventLabel(nextEvent.label);
            } else {
                setTimeLeft(null);
            }
        };

        updateTimeAndLocks(); // Initial call
        const interval = setInterval(updateTimeAndLocks, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleDayClick = (dayId: string) => {
        setActiveDay(dayId);
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const renderActiveComponent = () => {
        switch(activeDay) {
            case 'rose': return <RosePlanting onRoseComplete={() => {}} />;
            case 'propose': return <ProposeDay onComplete={() => {}} />;
            case 'chocolate': return <ChocolateDay onComplete={() => {}} />;
            case 'teddy': return <TeddyDay onComplete={() => {}} />;
            default: return (
                <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                    <span className="text-4xl mb-4">🎁</span>
                    <h3 className="text-xl font-display text-rose-500 mb-2">Coming Soon!</h3>
                    <p className="text-muted-foreground">This surprise is waiting for its special day to unlock.</p>
                </div>
            );
        }
    };

    return (
        <section id="valentine-week" className="py-20 sm:py-32 px-4 bg-gradient-to-b from-background via-rose-50/30 to-background min-h-screen">
            {/* Countdown Header */}
            <div className="max-w-4xl mx-auto mb-16 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card shadow-petal border border-rose-light/30">
                    <span className="text-xs sm:text-sm font-heading text-muted-foreground mr-1 sm:mr-2">
                        {targetEventLabel ? `Countdown to ${targetEventLabel}:` : 'Loading...'}
                    </span>
                    
                    {timeLeft ? (
                        <>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <div className="text-center">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg gradient-romantic flex items-center justify-center text-primary-foreground font-bold font-heading text-base sm:text-lg">
                                        {String(timeLeft.hours).padStart(2, '0')}
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-heading mt-0.5 block">Hours</span>
                                </div>
                            </div>
                            
                            <span className="text-rose-deep font-bold text-sm sm:text-base">:</span>

                            <div className="flex items-center gap-1 sm:gap-2">
                                <div className="text-center">
                                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg gradient-romantic flex items-center justify-center text-primary-foreground font-bold font-heading text-base sm:text-lg">
                                        {String(timeLeft.minutes).padStart(2, '0')}
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-heading mt-0.5 block">Minutes</span>
                                </div>
                            </div>

                            <span className="text-rose-deep font-bold text-sm sm:text-base">:</span>

                            <div className="flex items-center gap-1 sm:gap-2">
                                <div className="text-center">
                                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg gradient-romantic flex items-center justify-center text-primary-foreground font-bold font-heading text-base sm:text-lg">
                                        {String(timeLeft.seconds).padStart(2, '0')}
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-heading mt-0.5 block">Seconds</span>
                                </div>
                            </div>
                        </>
                    ) : (
                         <span className="text-rose-deep font-bold italic">Happening Now!</span>
                    )}
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-12">
                <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
                >
                    {days.map((day) => (
                        <button
                            key={day.id}
                            onClick={() => !day.locked && handleDayClick(day.id)}
                            disabled={day.locked}
                            className={`relative p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden flex flex-col items-center text-center group
                                ${day.locked 
                                    ? 'bg-muted/50 border-border/50 cursor-not-allowed opacity-70' 
                                    : activeDay === day.id
                                        ? 'bg-card border-rose-500 shadow-petal ring-2 ring-rose-200' 
                                        : 'bg-card border-border hover:shadow-petal hover:border-rose-light cursor-pointer'
                                }
                            `}
                        >
                            {day.locked && (
                                <div className="absolute inset-0 bg-muted/30 backdrop-blur-[2px] rounded-xl sm:rounded-2xl flex items-center justify-center z-10">
                                    <div className="bg-background/80 p-2 rounded-full shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/60"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    </div>
                                </div>
                            )}
                            
                            <div className={`text-sm sm:text-base md:text-lg font-bold font-heading mb-1 sm:mb-2 ${day.id === 'chocolate' ? 'text-black/80' : 'text-muted-foreground'}`}>
                                {day.date}
                            </div>
                            <span className="text-2xl sm:text-3xl md:text-4xl block mb-1 sm:mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                {day.icon}
                            </span>
                            <span className={`font-heading text-xs sm:text-sm font-semibold block ${day.id === 'chocolate' ? 'text-black' : 'text-foreground'}`}>
                                {day.label}
                            </span>
                            
                            {!day.locked && (
                                <div className="absolute top-1 right-1 text-xs animate-pulse">✨</div>
                            )}

                            {day.id === 'chocolate' && !day.locked && (
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(25,60%,30%)] to-[hsl(30,50%,45%)]" />
                            )}
                        </button>
                    ))}
                </motion.div>

                <div ref={contentRef} className="min-h-[500px] bg-white/50 backdrop-blur-sm rounded-3xl border border-rose-100 shadow-xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay || 'empty'}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 sm:p-8"
                        >
                            {renderActiveComponent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ValentineWeek;
