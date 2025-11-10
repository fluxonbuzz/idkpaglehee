import { useState, useEffect } from "react";

export default function MatchSetupScreen() {
  const [selectedStadium, setSelectedStadium] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [overs, setOvers] = useState<string>("20");
  const [pitchType, setPitchType] = useState<string>("Hard");
  const [skipIntro, setSkipIntro] = useState<boolean>(false);
  const [timeOfDay, setTimeOfDay] = useState<string>("Afternoon");
  const [rainChance, setRainChance] = useState<string>("No Rain");

  const stadiums = [
    { name: "Mumbai, India", image: "/stadiums/mumbai.jpg" },
    { name: "London, UK", image: "/stadiums/london.jpg" },
    { name: "Melbourne, Australia", image: "/stadiums/melbourne.jpg" },
    { name: "Cape Town, South Africa", image: "/stadiums/capetown.jpg" }
  ];

  const difficulties = ["Easy", "Medium", "Hard", "Expert", "Hardcore"];
  const oversOptions = ["2", "5", "10", "20", "50"];
  const pitchTypes = ["Hard", "Dry", "Green"];
  const timeOptions = ["Morning", "Afternoon", "Evening", "Dusk", "Night"];
  const rainOptions = ["No Rain", "25%", "50%", "75%", "100%"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0000] via-[#2a0000] to-black text-white relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl mb-4">
            CRICKFUSION
          </h1>
          <div className="bg-gradient-to-r from-red-800/50 to-red-900/50 border border-red-500/30 rounded-2xl p-4 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-white">WORLD CUP 19 EDITION</h2>
          </div>
        </header>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Stadium Selection */}
          <section className="bg-black/40 border-2 border-red-900/50 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-wider border-b border-red-500/30 pb-2">
              Match Venue
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stadiums.map((stadium, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedStadium === index
                      ? "ring-4 ring-red-500 ring-opacity-80 scale-105 glow-red"
                      : "ring-2 ring-gray-700 hover:ring-red-400/50"
                  } rounded-xl overflow-hidden`}
                  onClick={() => setSelectedStadium(index)}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-2 border border-red-500/30">
                        <span className="text-2xl">🏟️</span>
                      </div>
                      <span className="font-semibold text-white">{stadium.name}</span>
                    </div>
                  </div>
                  {selectedStadium === index && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Match Settings */}
          <section className="bg-black/40 border-2 border-red-900/50 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-wider border-b border-red-500/30 pb-2">
              Match Settings
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Difficulty */}
              <div>
                <label className="block text-red-300 font-bold mb-4 text-lg uppercase tracking-wide">
                  Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        difficulty === level
                          ? "bg-red-600 text-white glow-red shadow-lg"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overs */}
              <div>
                <label className="block text-red-300 font-bold mb-4 text-lg uppercase tracking-wide">
                  Match Overs
                </label>
                <div className="flex flex-wrap gap-2">
                  {oversOptions.map((over) => (
                    <button
                      key={over}
                      onClick={() => setOvers(over)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        overs === over
                          ? "bg-red-600 text-white glow-red shadow-lg"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {over}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pitch Type */}
              <div>
                <label className="block text-red-300 font-bold mb-4 text-lg uppercase tracking-wide">
                  Pitch Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {pitchTypes.map((pitch) => (
                    <button
                      key={pitch}
                      onClick={() => setPitchType(pitch)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        pitchType === pitch
                          ? "bg-red-600 text-white glow-red shadow-lg"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {pitch}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Settings */}
          <section className="bg-black/40 border-2 border-red-900/50 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-wider border-b border-red-500/30 pb-2">
              Advanced Settings
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Skip Intro */}
              <div>
                <label className="block text-red-300 font-bold mb-4 text-lg uppercase tracking-wide">
                  Skip Intro
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSkipIntro(true)}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      skipIntro
                        ? "bg-red-600 text-white glow-red shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setSkipIntro(false)}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      !skipIntro
                        ? "bg-red-600 text-white glow-red shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Time of Day */}
              <div>
                <label className="block text-red-300 font-bold mb-4 text-lg uppercase tracking-wide">
                  Time of Day
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      onClick={() => setTimeOfDay(time)}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm ${
                        timeOfDay === time
                          ? "bg-red-600 text-white glow-red shadow-lg"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chance of Rain */}
              <div>
                <label className="block text-red-300 font-bold mb-4 text-lg uppercase tracking-wide">
                  Chance of Rain
                </label>
                <div className="flex flex-wrap gap-2">
                  {rainOptions.map((rain) => (
                    <button
                      key={rain}
                      onClick={() => setRainChance(rain)}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm ${
                        rainChance === rain
                          ? "bg-red-600 text-white glow-red shadow-lg"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {rain}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-8 left-8 right-8 flex justify-between">
          <button className="bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-all border-2 border-red-600/50 hover:glow-red">
            Back
          </button>
          
          <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-12 py-4 rounded-xl font-bold uppercase tracking-wider text-lg transition-all glow-red hover:glow-red-intense shadow-2xl flex items-center gap-3">
            START MATCH <span className="text-xl">▶</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .glow-red {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
        }
        .glow-red-intense {
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.8);
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
