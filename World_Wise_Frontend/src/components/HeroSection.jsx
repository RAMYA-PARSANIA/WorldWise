import React, {useState, useEffect, useRef } from "react";
import { gsap } from "gsap"; // First install GSAP: npm install gsap
import { useNavigate } from "react-router-dom";
import ChatBot from "./Chatbot";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const HeroSection = () => {
  const mapRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current || !navRef.current) return;

    const mapPins = mapRef.current.querySelectorAll('#Map-shape g');
    const navItems = navRef.current.querySelectorAll('[data-location]');

    const randomIntFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Animate map pins
    mapPins.forEach((pin) => {
      // Create a timeline for each pin group
      const groupTimeline = gsap.timeline({ paused: true });
      
      // Fade out animation
      groupTimeline.to(pin, {
        duration: 0.25,
        opacity: 0
      });

      // Pulse animation for pin background
      const pinTimeline = gsap.timeline({
        repeat: -1,
        delay: randomIntFromInterval(1, 3),
        repeatDelay: randomIntFromInterval(0, 1)
      });
      
      pinTimeline.to(pin.querySelector('.Pin-back'), {
        duration: 3,
        scale: 50,
        transformOrigin: 'center center',
        opacity: 0,
        ease: "power1.out"
      });

      // Store timelines on the pin for later use
      pin.groupTimeline = groupTimeline;
      pin.pinTimeline = pinTimeline;
    });

    // Add hover interactions
    navItems.forEach((navItem) => {
      navItem.addEventListener('mouseenter', (e) => {
        const location = e.target.getAttribute('data-location');
        
        mapPins.forEach((pin) => {
          if (pin.getAttribute('data-location') !== location) {
            pin.groupTimeline.play();
          }
        });
      });

      navItem.addEventListener('mouseleave', () => {
        mapPins.forEach((pin) => {
          pin.groupTimeline.reverse();
        });
      });
    });

    // Cleanup function
    return () => {
      navItems.forEach((navItem) => {
        navItem.removeEventListener('mouseenter', () => {});
        navItem.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="bg-[#232f3e] py-24">
    <div className="container mx-auto text-center px-4">
      <h1 className="text-5xl font-extrabold text-[#f2f2f2] mb-6 leading-tight">
        Your First Export <span className="text-[#ff9900]">Simplified.</span>
      </h1>
        
        <div className="Container max-w-4xl mx-auto mb-12">
          <div className="Map-container">
            <svg 
              ref={mapRef}
              id="Map-svg" 
              viewBox="0 0 670.2 432.4" 
              className="w-full"
              style={{enableBackground: "new 0 0 670.2 432.4"}}
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <linearGradient id="Map-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0.35" />
                </linearGradient>
                <clipPath id="Map-mask">
                  <use xlinkHref="#Map-globe" />
                </clipPath>
              </defs>
              <g clipPath="url(#Map-mask)" fill="url(#Map-gradient)" id="Map-shape">
                <path 
                  id="Map-globe" 
                  d="M338,49.3l7.5-0.6l7.7-6.7h10.6l6.2-2.4v5l-2.9,5.5l1.5,0.1l-3.5,4.1l5.2,5.7l-14.8,13.8l-3.4,0.2l-6.2-4.7l0,0
          v-3.9l-4-4.4v-7.5l-4-3.4L338,49.3L338,49.3z M312,166v9.1l10.7,10.9H320l-0.6,9H296v-20.7l12.5-12.8L312,166z M134,26.4l20.5-7.4h7
          l12.8-13h22.9H197v8.6l-15,15v18.1l-12,12.6V79h-11.6l-5.1-7l4.2-9.1L134,42.7V26.4z M201.4,132.1l-7.4,6.5V160h-0.6L180,143.2
          v-17.4l-17.6-17.7l-9,8.6l-7.2-6.9l-5.3,4.4L125.2,101h53.3l13.5,12v8.4L201.4,132.1z M123.1,57.1l14.5-0.1l6.8,5.1l-4.6,3.3
          L157.3,86h12.5l6.3,5H140l-17-17.8L123.1,57.1z M107.5,73l6.5,7.3V93h-4.5L94.1,77.8L93.8,73H107.5z M78,95h21.2l6.3,6h8l22.2,22.7
          l-1.5,2.3h-7.8l-4.2-4.2L118,126h-10.3l-10.5-11h-5.8L78,101.6V95z M247,315v18.3L219,362v7l-27,28.7V409l-5,3.7v19.7l-10-10.7v-32
          l3-3.3v-20l2-3.7V345l-21-21.3v-21.3l5.8-5.3l-12.1-13h-15.2l-11-12h-3.7L96,243.3v-6.7l-15-14v-29L53.8,165H40.2l-15.4,9.6L7,157.3
          v-14.7L0,136v-16.3l18.5-4.6h12.7l5,5h14.7l5.7,4h41.1l9.6,11h11l4.3-4.3l4.3,4.3h12l7.3-11.5l6.1,3.5l6.3-8.1l4.4,7.4v8.7l-22,22.3
          V180h14.5l13.5,11.6v-12.9l7-7l-5-5V157h12.2l34,34.3L191.8,217H182l-8,8v5.3l-13.7,13v3.3l2.1,3.4l-0.1,6.4l-3,0.1l-3.6-6.5
          l-23.8,0.3v12L142,273l9.9-2v1.6l17.8,17.4h46.7l23.3,25H247L247,315z M262.3,131l-22.3,8.7v2.7l-6,6.2V166l-16-15v-37.2l-10-9.6
          V86.4l-6.4-7.4H181V59.6l6-7.2V31.1l18.1-0.1l15.3-15h9.5l16.2-16h17.1l15.9,13.1l-4.4,1.7l5.9,7.7l6.8-3.5h6l8.6,8.5l-20,13.1v25.3
          l-3,3.9v19.7l-2,6.9l3.2,20.3L269.7,131H262.3z M272,145.1v-6.4l12.5-0.8h7.5v2.7l-0.5,13.3h-10.8L272,145.1z M412,339.8l-6,5.5V361
          h-5v-25.7l11-11.4V339.8z M395,309.2v24.3l-11,9.3v8.6l-4,4.3v7l-4.1,17.3h-13.7L343,361.5v-16l-5-4.9v-28.9l-5-5V301h-28.6
          L285,282.3V255l28.7-15h7.1l4.8-5H337v6h12.1l5.9,7v-3h18.8l13.2,15v8.3l21.5,20.7h6.7L395,309.2z M525.3,322.6H509v-3.2L498.7,309
          v-6.7l12.2,12.2h12.5l4.2,4.2L525.3,322.6z M600.3,400l-3.2-4.3l0.3-3.1h4.3L600.3,400z M591.6,388l-2.8-2.7l0.2-6.3h-7.3l-5.3-6
          H564l-4.6,6h-8.6l-2.8,1h-12v-16.2l-0.6-2l2.9-9l6.5-2.9h5.2l15.2-15H576v-3.1l10,10.6V331h3l6,4v3.8l10,12.2l0.1,37.1h-13.5V388z
           M533.6,313.8L552,298l-1.3,23.3l-7.6,2.7L533.6,313.8z M590.3,219.3h-5.5l-2.3,3.2l2.4,3.5l0.1,9l-10.3,7.7v2l-2.1,1.3l-3.4-2.7
          l0.1-6.5l10.5-8.2l-0.1-11.3l6.8-7.8l8,4.7L590.3,219.3z M600.8,327h-16.3l-8.2-8.6l3-3.4h18.6l3.1,2.4L600.8,327z M654,142.2v4.1
          L612.7,190l1.9-16.4l8.7-11.5l-10.6,9h-19l-13.5,14h3.8v14.3l-21.2,24.4l6.6,4.7l-7.1,5.7l-6.3-3.6v-2.8l-7.2-6.2l-5.8,4.9v6.2l5,4
          v12.9l-4.5,17.6h-14.6l-8.3,1.8l8.4,9.4v3.8l-6.8,11.5L516,286v9.3l2.1,3.2l-0.6,6l-5.8-0.5l-2-7.5l-0.2-16.4L495.9,266h-4
          l-15.3,12.7l-0.3,4l-5.1,6.2l-8.4-8.1l-0.2-9.7L449.2,261h-15.3l6,5.8L422.5,284h-11.7L392,266.1v-7.9l-15.3-16l7.4-6.2h-8.6
          l-22.2-25.1l-4.4-2.9v4.6l6.3,6.6v4.7l-3.8,2l-10.1-6.9h-7l-16.1,16h-8.5L299,224.2V219h16v-15.6l20.9-16.4h21.6l4.6-17.4v-9.3h-3
          v-11.8l3-3.7l-12,3.5V181H341v-8h-14v-27.6l42.2-29.4h12.6l13.2,13.7v3.8l-6.5,5.9l-8.5-7.8v6.1l12.1,11.2l28.3-21.9h16.1l21-20h12
          l25.7-25h15.9l12.5-13.1l5.7,6.1h8.2l-0.1,16.5l-8.9,9.5h30.2l8.8,9h44l14.3,14h16.3l2.3-3h15.5l10.3,11.4L654,142.2z"
                  // Truncated for brevity, full path from your original SVG would go here
                />
                                <g data-location="USA">
                  <circle className="Pin-back" cx="174" cy="222" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="174" cy="222" r="2.5" fill="#fff" />
                </g>
                <g data-location="UAE">
                  <circle className="Pin-back" cx="440" cy="270" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="440" cy="270" r="2.5" fill="#fff" />
                </g>
                <g data-location="China">
                  <circle className="Pin-back" cx="520" cy="240" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="520" cy="240" r="2.5" fill="#fff" />
                </g>
                <g data-location="Bangladesh">
                  <circle className="Pin-back" cx="490" cy="270" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="490" cy="270" r="2.5" fill="#fff" />
                </g>
                <g data-location="Netherlands">
                  <circle className="Pin-back" cx="353" cy="190" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="353" cy="190" r="2.5" fill="#fff" />
                </g>
                <g data-location="Singapore">
                  <circle className="Pin-back" cx="515" cy="301" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="515" cy="301" r="2.5" fill="#fff" />
                </g>
                <g data-location="HongKong">
                  <circle className="Pin-back" cx="535" cy="260" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="535" cy="260" r="2.5" fill="#fff" />
                </g>
                <g data-location="UK">
                  <circle className="Pin-back" cx="317" cy="186" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="317" cy="186" r="2.5" fill="#fff" />
                </g>
                <g data-location="Belgium">
                  <circle className="Pin-back" cx="352" cy="195" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="352" cy="195" r="2.5" fill="#fff" />
                </g>
                <g data-location="Germany">
                  <circle className="Pin-back" cx="364" cy="200" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="364" cy="200" r="2.5" fill="#fff" />
                </g>
                <g data-location="Nepal">
                  <circle className="Pin-back" cx="490" cy="250" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="490" cy="250" r="2.5" fill="#fff" />
                </g>
                <g data-location="SaudiArabia">
                  <circle className="Pin-back" cx="420" cy="270" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="420" cy="270" r="2.5" fill="#fff" />
                </g>
                <g data-location="Turkey">
                  <circle className="Pin-back" cx="390" cy="220" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="390" cy="220" r="2.5" fill="#fff" />
                </g>
                <g data-location="Indonesia">
                  <circle className="Pin-back" cx="540" cy="320" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="540" cy="320" r="2.5" fill="#fff" />
                </g>
                <g data-location="Australia">
                  <circle className="Pin-back" cx="570" cy="350" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="570" cy="350" r="2.5" fill="#fff" />
                </g>
                <g data-location="Italy">
                  <circle className="Pin-back" cx="360" cy="210" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="360" cy="210" r="2.5" fill="#fff" />
                </g>
                <g data-location="SouthKorea">
                  <circle className="Pin-back" cx="550" cy="240" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="550" cy="240" r="2.5" fill="#fff" />
                </g>
                <g data-location="Malaysia">
                  <circle className="Pin-back" cx="525" cy="310" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="525" cy="310" r="2.5" fill="#fff" />
                </g>
                <g data-location="Vietnam">
                  <circle className="Pin-back" cx="525" cy="280" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="525" cy="280" r="2.5" fill="#fff" />
                </g>
                <g data-location="France">
                  <circle className="Pin-back" cx="340" cy="200" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="340" cy="200" r="2.5" fill="#fff" />
                </g>
                <g data-location="Brazil">
                  <circle className="Pin-back" cx="250" cy="330" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="250" cy="330" r="2.5" fill="#fff" />
                </g>
                <g data-location="Japan">
                  <circle className="Pin-back" cx="560" cy="230" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="560" cy="230" r="2.5" fill="#fff" />
                </g>
                <g data-location="SouthAfrica">
                  <circle className="Pin-back" cx="380" cy="350" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="380" cy="350" r="2.5" fill="#fff" />
                </g>
                <g data-location="SriLanka">
                  <circle className="Pin-back" cx="480" cy="300" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="480" cy="300" r="2.5" fill="#fff" />
                </g>
                <g data-location="Thailand">
                  <circle className="Pin-back" cx="520" cy="280" r="2.5" fill="#fff" fillOpacity="0.5" />
                  <circle className="Pin-front" cx="520" cy="280" r="2.5" fill="#fff" />
                </g>
              </g>
            </svg>
          </div>
          
          <nav 
            ref={navRef}
            className="Location-nav js-Location-nav mt-8 text-white"
          >
           
          </nav>
        </div>
        <div className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto space-y-6">
        <p>
          Navigating India's export landscape can be overwhelming. With over 70+ documents, 15+ government portals, and complex compliance requirements, many businesses struggle to start their export journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-lg mt-12">
          <div className="bg-[#1a2634] p-6 rounded-xl">
            <h3 className="text-[#ff9900] font-bold mb-3">Current Challenges</h3>
            <ul className="space-y-2 text-[#f2f2f2]">
              <li>• Complex documentation across multiple departments</li>
              <li>• Expensive consulting fees (₹50,000 - ₹2,00,000)</li>
              <li>• Time-consuming manual processes</li>
              <li>• Risk of non-compliance penalties</li>
              <li>• Limited access to export incentives</li>
            </ul>
          </div>
          
          <div className="bg-[#1a2634] p-6 rounded-xl">
            <h3 className="text-[#ff9900] font-bold mb-3">World Wise Solution</h3>
            <ul className="space-y-2 text-[#f2f2f2]">
              <li>• Step-by-step guided documentation</li>
              <li>• AI-powered document assistance</li>
              <li>• Real-time compliance checking</li>
              <li>• Automated risk assessment</li>
              <li>• Comprehensive incentive discovery</li>
            </ul>
          </div>
        </div>
      </div>
        <div className="space-x-4 flex flex-wrap justify-center gap-4">
        <button 
          onClick={() => navigate('/checklist')}
          className="bg-[#146eb4] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#ff9900] hover:text-[#000000] transition duration-300"
        >
          PathWise Guidance
        </button>
        <button 
          onClick={() => navigate('/risk-analysis')}
          className="bg-[#146eb4] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#ff9900] hover:text-[#000000] transition duration-300"
        >
          Risk Calculation
        </button>
        <button 
          onClick={() => navigate('/create-document')}
          className="bg-[#146eb4] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#ff9900] hover:text-[#000000] transition duration-300"
        >
          Export Documents Templates
        </button>
        <button 
          onClick={() => navigate('/get-incentives')}
          className="bg-[#146eb4] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#ff9900] hover:text-[#000000] transition duration-300"
        >
          Get Incentives
        </button>
        <button 
          onClick={() => navigate('/summarize')}
          className="bg-[#146eb4] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#ff9900] hover:text-[#000000] transition duration-300"
        >
          Summmarize Documents
        </button>
        <button 
          onClick={() => navigate('/negotiation')}
          className="bg-[#146eb4] text-[#f2f2f2] px-8 py-3 rounded-full font-bold hover:bg-[#ff9900] hover:text-[#000000] transition duration-300"
        >
          Negotiation Coach
        </button>
      </div>
    </div>
    <ChatBot/>
  </div>
);
};

export default HeroSection;
