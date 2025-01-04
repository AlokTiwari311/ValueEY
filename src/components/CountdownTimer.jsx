import React, { useEffect } from 'react';
import logo from "../assets/images/Group 8.png"
import "../components/styles.css"

const CountdownTimer = () => {
    const flipAllCards = (time) => {
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60) % 60;
        const hours = Math.floor(time / 3600) % 24;
        const days = Math.floor(time / 86400);

        flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
        flip(document.querySelector("[data-days-ones]"), days % 10);
        flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
        flip(document.querySelector("[data-hours-ones]"), hours % 10);
        flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
        flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
        flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
        flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
    };

    const flip = (flipCard, newNumber) => {
        const top = flipCard.querySelector(".top");
        const bottom = flipCard.querySelector(".bottom");
        const startNumber = parseInt(top.textContent);

        if (newNumber === startNumber) return;

        top.textContent = startNumber;
        bottom.textContent = startNumber;
        flipCard.dataset.currentNumber = newNumber;
        flipCard.dataset.nextNumber = newNumber;

        flipCard.addEventListener("animationstart", () => {
            top.textContent = newNumber;
        });

        flipCard.addEventListener("animationend", () => {
            bottom.textContent = newNumber;
            flipCard.classList.remove("flip");
        });

        flipCard.classList.add("flip");
    };

    useEffect(() => {
        let targetTime = localStorage.getItem("targetTime");
        if (!targetTime) {
            const startTime = new Date().getTime();
            targetTime = startTime + 45 * 24 * 60 * 60 * 1000;
            localStorage.setItem("targetTime", targetTime);
        }

        targetTime = Number(targetTime);

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const totalCountDownTime = Math.ceil((targetTime - currentTime) / 1000);

            if (totalCountDownTime <= 0) {
                clearInterval(interval);
                localStorage.removeItem("targetTime");
            } else {
                flipAllCards(totalCountDownTime);
            }
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
            <img src={logo} alt="Logo" className="w-24 sm:w-32 md:w-48 h-12 sm:h-16 md:h-24 object-contain mb-4 sm:mb-8" />
            <h1 className="text-white text-5xl font-bold mb-6 animate-fade-in relative">
                We're Coming Soon
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl font-light tracking-wider mb-2 sm:mb-10 text-center bg-clip-text px-4">
                Our exciting new platform is currently under development, and we're<br className="hidden sm:block" />thrilled to announce that we’ll be launching soon.!
            </h2>


            <div className="countdown-container backdrop-blur-lg bg-black/30 p-4 sm:p-8 md:p-12 rounded-2xl border border-white/5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                    <div className="countdown-cards">
                        <div className="card-container scale-75 sm:scale-90 md:scale-100">
                            <div className="flip-card" data-days-tens>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                            <div className="flip-card" data-days-ones>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                        </div>
                        <div className="card-title uppercase tracking-widest text-xs sm:text-sm text-gray-400 mt-2">Days</div>
                    </div>

                    <div className="countdown-cards">
                        <div className="card-container scale-75 sm:scale-90 md:scale-100">
                            <div className="flip-card" data-hours-tens>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                            <div className="flip-card" data-hours-ones>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                        </div>
                        <div className="card-title uppercase tracking-widest text-xs sm:text-sm text-gray-400 mt-2">Hours</div>
                    </div>

                    <div className="countdown-cards">
                        <div className="card-container scale-75 sm:scale-90 md:scale-100">
                            <div className="flip-card" data-minutes-tens>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                            <div className="flip-card" data-minutes-ones>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                        </div>
                        <div className="card-title uppercase tracking-widest text-xs sm:text-sm text-gray-400 mt-2">Minutes</div>
                    </div>

                    <div className="countdown-cards">
                        <div className="card-container scale-75 sm:scale-90 md:scale-100">
                            <div className="flip-card" data-seconds-tens>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                            <div className="flip-card" data-seconds-ones>
                                <div className="top">0</div>
                                <div className="bottom">0</div>
                            </div>
                        </div>
                        <div className="card-title uppercase tracking-widest text-xs sm:text-sm text-gray-400 mt-2">Seconds</div>
                    </div>
                </div>
            </div>

            <h2 className="text-base sm:text-lg md:text-xl font-light tracking-wider mt-2 sm:mt-6 text-center bg-clip-text px-4">
                Risk & Business Consulting | Audits | Field Reviews | Compliances
            </h2>

            <div className="mt-4 sm:mt-12 w-full max-w-md px-4">
                <div className="flex text-sm flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="flex-1 text-sm bg-black/30 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                    <button className="group relative px-4 sm:px-6 py-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transition-all hover:scale-105">
                        <div className="absolute inset-0 text-sm bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform group-hover:translate-x-0" />
                        SUBSCRIBE
                    </button>
                </div>

                <p className="text-gray-300 text-sm sm:text-base mt-4 text-center">
                    We are working very hard on the new version of our site.
                </p>
            </div>
        </div>
    );
};

export default CountdownTimer;