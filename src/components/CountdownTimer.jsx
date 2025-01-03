import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/images/Group 8.png";

const FlipNumber = ({ number, unit }) => {
    const [currentNumber, setCurrentNumber] = useState(number);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        if (currentNumber !== number) {
            setIsFlipping(true);
            const timer = setTimeout(() => {
                setCurrentNumber(number);
                setIsFlipping(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [number, currentNumber]);

    return (
        <div className="relative group ">
            <div className="absolute inset-0  bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-black/50 backdrop-blur-sm p-3 sm:p-6 rounded-lg border border-white/10">
                <div className="relative h-16 w-14 sm:h-24 sm:w-20 perspective">
                    <div
                        className={`w-full h-full relative preserve-3d transition-transform duration-300 ${isFlipping ? 'flip-card' : ''}`}
                    >
                        <div className="absolute w-full h-full backface-hidden bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white text-3xl sm:text-6xl font-bold">
                                {String(currentNumber).padStart(2, '0')}
                            </span>
                        </div>
                        <div className="absolute w-full h-full backface-hidden rotate-x-180 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white text-3xl sm:text-6xl font-bold">
                                {String(number).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-blue-400 text-xs sm:text-sm uppercase tracking-wider mt-2">
                    {unit}
                </div>
            </div>
        </div>
    );
};

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem('countdownTime');
        if (savedTime) {
            const parsedTime = JSON.parse(savedTime);
            const totalSeconds =
                parsedTime.days * 86400 +
                parsedTime.hours * 3600 +
                parsedTime.minutes * 60 +
                parsedTime.seconds;

            if (totalSeconds > 0) {
                return parsedTime;
            }
        }
        const defaultTime = {
            days: 45,
            hours: 24,
            minutes: 0,
            seconds: 0
        };
        localStorage.setItem('countdownTime', JSON.stringify(defaultTime));
        return defaultTime;
    });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const backgroundRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('countdownTime', JSON.stringify(timeLeft));
    }, [timeLeft]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime.days === 0 && prevTime.hours === 0 &&
                    prevTime.minutes === 0 && prevTime.seconds === 0) {
                    clearInterval(timer);
                    return prevTime;
                }

                let newSeconds = prevTime.seconds - 1;
                let newMinutes = prevTime.minutes;
                let newHours = prevTime.hours;
                let newDays = prevTime.days;

                if (newSeconds < 0) {
                    newSeconds = 59;
                    newMinutes -= 1;
                }
                if (newMinutes < 0) {
                    newMinutes = 59;
                    newHours -= 1;
                }
                if (newHours < 0) {
                    newHours = 23;
                    newDays -= 1;
                }

                return {
                    days: newDays,
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setMousePosition({
                x: (clientX / window.innerWidth) * 2 - 1,
                y: (clientY / window.innerHeight) * 2 - 1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden ">
            {/* Logo */}
            <div className="flex justify-center items-center z-10 p-4 ">
                <div className="rounded-lg">
                    <div className="rounded-lg">
                        <img src={logo} alt="Logo" className="w-32 sm:w-48 h-16 sm:h-24 object-contain" />
                    </div>
                </div>
            </div>

            {/* Animated Background */}


            {/* Content */}
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 -mt-24">
                <div className="w-full max-w-3xl mx-auto text-center space-y-8 sm:space-y-12">
                    <h1 className="text-white text-3xl sm:text-5xl font-bold mb-8 sm:mb-16 animate-fade-in relative">
                        We're Coming Soon
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
                    </h1>

                    {/* Flip Timer */}
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                        <FlipNumber number={timeLeft.days} unit="Days" />
                        <div className="text-orange-500 text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 animate-pulse">:</div>
                        <FlipNumber number={timeLeft.hours} unit="Hours" />
                        <div className="text-orange-500 text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 animate-pulse">:</div>
                        <FlipNumber number={timeLeft.minutes} unit="Minutes" />
                        <div className="text-orange-500 text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 animate-pulse">:</div>
                        <FlipNumber number={timeLeft.seconds} unit="Seconds" />
                    </div>

                    {/* Email subscription */}
                    <div className="mt-8 sm:mt-16 space-y-4 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4 px-4 sm:px-0">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 bg-black/30 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                            />
                            <button className="group relative px-4 sm:px-6 py-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transition-all hover:scale-105">
                                <div className="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform group-hover:translate-x-0" />
                                SUBSCRIBE
                            </button>
                        </div>

                        <p className="text-gray-300 text-sm sm:text-base mt-4 sm:mt-8 px-4 sm:px-0">
                            We are working very hard on the new version of our site.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .perspective {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-x-180 {
                    transform: rotateX(90deg);
                }
                .flip-card {
                    transform: rotateX(90deg);
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
                @keyframes shine {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }
                .animate-float {
                    animation: float linear infinite;
                }
                .animate-shine {
                    animation: shine 3s linear infinite;
                }
                .animate-fade-in {
                    animation: fadeIn 1s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default CountdownTimer;