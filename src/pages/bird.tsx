'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Home, Volume2, VolumeX } from 'lucide-react';

interface Pipe {
  id: number;
  x: number;
  gapY: number;
  passed: boolean;
}

interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  catY: number;
  catVelocity: number;
  pipes: Pipe[];
  gameSpeed: number;
  isMuted: boolean;
}

export default function FlappyCat() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0,
    catY: 50,
    catVelocity: 0,
    pipes: [],
    gameSpeed: 2,
    isMuted: false,
  });

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastPipeTimeRef = useRef<number>(0);
  const pipeGap = 120;
  const pipeWidth = 60;
  const catSize = 40;
  const gravity = 0.5;
  const jumpStrength = -8;

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    if (!gameState.isPlaying || gameState.isPaused) return;

    setGameState(prev => {
      // Generate new pipes
      const newPipes = [...prev.pipes];
      if (timestamp - lastPipeTimeRef.current > 1500) {
        lastPipeTimeRef.current = timestamp;
        const gapY = Math.random() * 40 + 20; // 20-60% from top
        newPipes.push({
          id: Date.now(),
          x: 100,
          gapY,
          passed: false,
        });
      }

      // Update pipe positions
      const updatedPipes = newPipes.map(pipe => ({
        ...pipe,
        x: pipe.x - prev.gameSpeed,
      })).filter(pipe => pipe.x > -pipeWidth);

      // Update cat physics
      const newVelocity = prev.catVelocity + gravity;
      const newCatY = Math.max(0, Math.min(100 - (catSize / 3), prev.catY + newVelocity));

      // Check collisions and score
      let newScore = prev.score;
      let gameOver = false;

      // Ground collision
      if (newCatY >= 100 - (catSize / 3)) {
        gameOver = true;
      }

      // Pipe collisions
      for (const pipe of updatedPipes) {
        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + pipeWidth;
        const catLeft = 20;
        const catRight = 20 + catSize;
        
        // Horizontal overlap
        if (catRight > pipeLeft && catLeft < pipeRight) {
          const gapTop = pipe.gapY;
          const gapBottom = pipe.gapY + 30; // gap size in %
          const catTop = newCatY;
          const catBottom = newCatY + (catSize / 3);
          
          // Vertical collision
          if (catTop < gapTop || catBottom > gapBottom) {
            gameOver = true;
          }
        }

        // Score point
        if (!pipe.passed && pipe.x + pipeWidth < 20) {
          pipe.passed = true;
          newScore += 1;
        }
      }

      if (gameOver) {
        return {
          ...prev,
          isPlaying: false,
          highScore: Math.max(prev.highScore, newScore),
          catVelocity: 0,
        };
      }

      return {
        ...prev,
        catY: newCatY,
        catVelocity: newVelocity,
        pipes: updatedPipes,
        score: newScore,
      };
    });

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.isPlaying, gameState.isPaused]);

  // Start game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, gameLoop]);

  // Handle user input
  const handleJump = () => {
    if (!gameState.isPlaying || gameState.isPaused) return;
    setGameState(prev => ({
      ...prev,
      catVelocity: jumpStrength,
    }));
  };

  const startGame = () => {
    setGameState({
      isPlaying: true,
      isPaused: false,
      score: 0,
      highScore: gameState.highScore,
      catY: 50,
      catVelocity: 0,
      pipes: [],
      gameSpeed: 2,
      isMuted: gameState.isMuted,
    });
    lastPipeTimeRef.current = 0;
  };

  const togglePause = () => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  const toggleMute = () => {
    setGameState(prev => ({
      ...prev,
      isMuted: !prev.isMuted,
    }));
  };

  // Handle space bar and touch
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!gameState.isPlaying) {
          startGame();
        } else {
          handleJump();
        }
      }
    };

    const handleClick = () => {
      if (gameState.isPlaying) {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    if (gameAreaRef.current) {
      gameAreaRef.current.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameAreaRef.current) {
        gameAreaRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [gameState.isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border-2 border-white/20 shadow-2xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Flappy Cat</h1>
          <div className="flex justify-between items-center text-white">
            <div className="text-lg">
              Score: <span className="font-bold">{gameState.score}</span>
            </div>
            <div className="text-lg">
              Best: <span className="font-bold">{gameState.highScore}</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={gameAreaRef}
          className="relative bg-blue-300/50 rounded-xl border-2 border-white/30 h-96 overflow-hidden cursor-pointer"
          onClick={handleJump}
        >
          {/* Cat Character */}
          <div
            className="absolute transition-transform duration-100"
            style={{
              left: '20px',
              top: `${gameState.catY}%`,
              transform: `rotate(${Math.min(30, Math.max(-30, gameState.catVelocity * 2))}deg)`,
            }}
          >
            {/* Cat Body */}
            <div className="relative">
              {/* Cat Head */}
              <div className="w-10 h-10 bg-orange-400 rounded-full border-2 border-orange-600">
                {/* Ears */}
                <div className="absolute -top-2 -left-1 w-4 h-4 bg-orange-400 rotate-45 border-l-2 border-t-2 border-orange-600 rounded-tl-full"></div>
                <div className="absolute -top-2 -right-1 w-4 h-4 bg-orange-400 -rotate-45 border-r-2 border-t-2 border-orange-600 rounded-tr-full"></div>
                
                {/* Eyes */}
                <div className="absolute top-2 left-2 w-2 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-3 bg-green-500 rounded-full"></div>
                
                {/* Whiskers */}
                <div className="absolute top-4 left-0 w-3 h-0.5 bg-gray-600 transform -rotate-45"></div>
                <div className="absolute top-5 left-0 w-3 h-0.5 bg-gray-600"></div>
                <div className="absolute top-4 right-0 w-3 h-0.5 bg-gray-600 transform rotate-45"></div>
                <div className="absolute top-5 right-0 w-3 h-0.5 bg-gray-600"></div>
              </div>
              
              {/* Cat Body */}
              <div className="absolute top-8 left-3 w-8 h-6 bg-orange-400 rounded-full border-2 border-orange-600"></div>
              
              {/* Tail */}
              <div className="absolute top-6 -right-4 w-6 h-2 bg-orange-400 rounded-full border-2 border-orange-600 transform rotate-45"></div>
            </div>
          </div>

          {/* Pipes */}
          {gameState.pipes.map(pipe => (
            <div key={pipe.id}>
              {/* Top Pipe */}
              <div
                className="absolute bg-green-500 border-2 border-green-700 rounded-t-lg"
                style={{
                  left: `${pipe.x}%`,
                  top: '0%',
                  width: `${pipeWidth}px`,
                  height: `${pipe.gapY}%`,
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-600 border-t-2 border-green-800"></div>
              </div>
              
              {/* Bottom Pipe */}
              <div
                className="absolute bg-green-500 border-2 border-green-700 rounded-b-lg"
                style={{
                  left: `${pipe.x}%`,
                  top: `${pipe.gapY + 30}%`,
                  width: `${pipeWidth}px`,
                  height: `${100 - pipe.gapY - 30}%`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-4 bg-green-600 border-b-2 border-green-800"></div>
              </div>
            </div>
          ))}

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-yellow-600 border-t-2 border-yellow-800"></div>

          {/* Game Over / Start Screen */}
          {!gameState.isPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
              <div className="text-center text-white p-6">
                <div className="text-3xl font-bold mb-4">
                  {gameState.score > 0 ? 'Game Over!' : 'Flappy Cat'}
                </div>
                <div className="text-xl mb-2">Score: {gameState.score}</div>
                <div className="text-lg mb-6">Best: {gameState.highScore}</div>
                <button
                  onClick={startGame}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  {gameState.score > 0 ? 'Play Again' : 'Start Game'}
                </button>
                <div className="text-sm mt-4 text-white/80">
                  Press SPACE or tap to jump
                </div>
              </div>
            </div>
          )}

          {/* Pause Overlay */}
          {gameState.isPaused && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-4">Paused</div>
                <button
                  onClick={togglePause}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={toggleMute}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
          >
            {gameState.isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>

          {gameState.isPlaying && (
            <button
              onClick={togglePause}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
            >
              {gameState.isPaused ? (
                <Play className="w-6 h-6 text-white" />
              ) : (
                <Pause className="w-6 h-6 text-white" />
              )}
            </button>
          )}

          <button
            onClick={startGame}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </button>

          <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300">
            <Home className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-4 text-white/80 text-sm">
          <p>Press SPACE or tap to make the cat jump</p>
          <p>Avoid the pipes and don't hit the ground!</p>
        </div>
      </div>
    </div>
  );
}
