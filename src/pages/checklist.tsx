// components/Checklist.tsx
import { useEffect, useState, useCallback } from 'react';
import { 
  Check, X, BookOpen, ClipboardCheck, FileText, Bookmark, 
  Award, FileCheck, RotateCw, BarChart2, Filter, ChevronDown, ChevronUp,
  Settings, Moon, Sun, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Chapter = {
  name: string;
  notes: string;
};

type Column = {
  name: string;
  icon: React.ReactNode;
  weight: number;
  highlight?: boolean;
  description?: string;
};

const Checklist = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(true);
  
  // Chapters data with notes
  const [chapters, setChapters] = useState<Chapter[]>([
    { name: 'Optical Isomerism', notes: '' },
    { name: 'Haloalkanes and Haloarenes', notes: '' },
    { name: 'Alcohols, Phenols and Ethers', notes: '' },
    { name: 'Aldehydes, Ketones and Carboxylic Acids', notes: '' },
    { name: 'Amines', notes: '' },
    { name: 'Biomolecules', notes: '' },
    { name: 'Practical Organic Chemistry', notes: '' },
  ]);

  // Columns configuration with weights
  const [columns, setColumns] = useState<Column[]>([
    { name: 'Lecture', icon: <BookOpen size={16} />, weight: 1, description: 'Watch lecture videos' },
    { name: 'DPP', icon: <ClipboardCheck size={16} />, weight: 1.2, description: 'Daily Practice Problems' },
    { name: 'Class Ques Sheet', icon: <FileText size={16} />, weight: 1.3, description: 'Class question sheets' },
    { name: 'General Practice Sheet', icon: <Bookmark size={16} />, weight: 1.5, description: 'General practice problems' },
    { name: 'KATTAR Practice Sheet', icon: <Award size={16} />, weight: 1.8, description: 'Advanced problems' },
    { name: 'KEHAR Practice Sheet', icon: <Award size={16} />, weight: 1.8, description: 'Advanced problems' },
    { name: 'Revision 1', icon: <FileCheck size={16} />, weight: 2, highlight: true, description: 'First revision pass' },
    { name: 'Revision 2', icon: <FileCheck size={16} />, weight: 2.2, highlight: true, description: 'Second revision pass' },
    { name: 'Revision 3', icon: <FileCheck size={16} />, weight: 2.5, highlight: true, description: 'Final revision pass' },
    { name: 'Test Papers', icon: <FileText size={16} />, weight: 3, description: 'Full-length test papers' },
  ]);

  // Checklist state
  const [state, setState] = useState<Record<string, boolean>>({});
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShowNotes] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<'all' | 'incomplete'>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'completion'>('default');

  // Load saved data
  useEffect(() => {
    const savedState = localStorage.getItem('organic-checklist-state');
    const savedChapters = localStorage.getItem('organic-checklist-chapters');
    const savedColumns = localStorage.getItem('organic-checklist-columns');
    const savedDarkMode = localStorage.getItem('organic-checklist-darkmode');
    
    if (savedState) setState(JSON.parse(savedState));
    if (savedChapters) setChapters(JSON.parse(savedChapters));
    if (savedColumns) setColumns(JSON.parse(savedColumns));
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('organic-checklist-state', JSON.stringify(state));
    localStorage.setItem('organic-checklist-chapters', JSON.stringify(chapters));
    localStorage.setItem('organic-checklist-columns', JSON.stringify(columns));
    localStorage.setItem('organic-checklist-darkmode', darkMode.toString());
  }, [state, chapters, columns, darkMode]);

  // Toggle completion state
  const toggle = useCallback((row: number, col: number) => {
    const key = `${row}-${col}`;
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Reset progress
  const resetProgress = useCallback(() => {
    setState({});
    setShowResetModal(false);
  }, []);

  // Calculate weighted progress
  const calculateProgress = useCallback(() => {
    let totalWeight = 0;
    let completedWeight = 0;

    chapters.forEach((_, row) => {
      columns.forEach((col, colIndex) => {
        totalWeight += col.weight;
        const key = `${row}-${colIndex}`;
        if (state[key]) completedWeight += col.weight;
      });
    });

    return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
  }, [chapters, columns, state]);

  const progress = calculateProgress();

  // Toggle chapter notes
  const toggleNotes = (index: number) => {
    setShowNotes(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Update chapter notes
  const updateNotes = (index: number, notes: string) => {
    const newChapters = [...chapters];
    newChapters[index].notes = notes;
    setChapters(newChapters);
  };

  // Filtered and sorted chapters
  const filteredChapters = chapters
    .filter(chapter => {
      if (filter === 'all') return true;
      
      // For incomplete filter
      const chapterIndex = chapters.findIndex(c => c.name === chapter.name);
      return columns.some((_, colIndex) => !state[`${chapterIndex}-${colIndex}`]);
    })
    .sort((a, b) => {
      if (sortOrder === 'default') return 0;
      
      // Sort by completion percentage
      const aIndex = chapters.findIndex(c => c.name === a.name);
      const bIndex = chapters.findIndex(c => c.name === b.name);
      
      const aCompleted = columns.filter((_, colIndex) => state[`${aIndex}-${colIndex}`]).length;
      const bCompleted = columns.filter((_, colIndex) => state[`${bIndex}-${colIndex}`]).length;
      
      return aCompleted / columns.length - bCompleted / columns.length;
    });

  // Calculate chapter completion
  const chapterCompletion = (row: number) => {
    const completed = columns.filter((_, colIndex) => state[`${row}-${colIndex}`]).length;
    return Math.round((completed / columns.length) * 100);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} border backdrop-blur-sm shadow-lg`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Organic Chemistry Checklist
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Track your progress through each chapter and practice material
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg flex items-center gap-2 transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg flex items-center gap-2 transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <Settings size={16} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 overflow-hidden rounded-xl ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} border`}
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings size={18} /> Checklist Settings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Filter size={16} /> Filter Chapters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'incomplete'].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f as any)}
                          className={`px-3 py-1 rounded-md text-sm transition ${filter === f ? 
                            (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') : 
                            (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')}`}
                        >
                          {f === 'all' && 'All Chapters'}
                          {f === 'incomplete' && 'Incomplete Only'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <BarChart2 size={16} /> Sort Order
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['default', 'completion'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSortOrder(s as any)}
                          className={`px-3 py-1 rounded-md text-sm transition ${sortOrder === s ? 
                            (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800') : 
                            (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')}`}
                        >
                          {s === 'default' && 'Default Order'}
                          {s === 'completion' && 'By Completion'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mb-8 rounded-xl p-6 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} border backdrop-blur-sm shadow-md`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BarChart2 size={20} /> Overall Progress
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Weighted progress based on task importance
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {progress}%
              </div>
              
              <button
                onClick={() => setShowResetModal(true)}
                className={`px-3 py-1 rounded-lg flex items-center gap-2 text-sm transition ${darkMode ? 'bg-red-900/50 hover:bg-red-900/70 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-800'}`}
              >
                <RotateCw size={14} /> Reset
              </button>
            </div>
          </div>
          
          <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden"
            >
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
          
          <div className="flex justify-between mt-3 text-sm">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {Object.values(state).filter(Boolean).length} completed
            </span>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {chapters.length * columns.length - Object.values(state).filter(Boolean).length} remaining
            </span>
          </div>
        </motion.div>

        {/* Checklist Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold min-w-[200px] sticky left-0 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">Chapter Name</span>
                    </div>
                  </th>
                  {columns.map((col, i) => (
                    <th
                      key={i}
                      className={`px-3 py-3 font-semibold text-sm whitespace-nowrap ${
                        col.highlight ? (darkMode ? 'text-red-400' : 'text-red-600') : (darkMode ? 'text-gray-300' : 'text-gray-700')
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1">
                          {col.icon}
                          <span>{col.name}</span>
                        </div>
                        <span className={`text-xs font-normal ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          {col.weight}x
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="px-3 py-3 font-semibold text-sm whitespace-nowrap text-center">
                    Progress
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-700/50">
                {filteredChapters.map((chapter, rowIndex) => {
                  const originalRowIndex = chapters.findIndex(c => c.name === chapter.name);
                  return (
                    <motion.tr 
                      key={originalRowIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`hover:${darkMode ? 'bg-gray-700/20' : 'bg-gray-100/50'} transition`}
                    >
                      <td className={`px-4 py-3 font-medium whitespace-nowrap sticky left-0 ${darkMode ? 'bg-gray-800/80' : 'bg-white'}`}>
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <span className={`${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                              {chapter.name}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => toggleNotes(originalRowIndex)}
                            className={`text-xs mt-1 flex items-center gap-1 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
                          >
                            {showNotes[originalRowIndex] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            Notes
                          </button>
                          
                          {showNotes[originalRowIndex] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2"
                            >
                              <textarea
                                value={chapter.notes}
                                onChange={(e) => updateNotes(originalRowIndex, e.target.value)}
                                placeholder="Add notes for this chapter..."
                                className={`w-full p-2 text-sm rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                rows={3}
                              />
                            </motion.div>
                          )}
                        </div>
                      </td>
                      
                      {columns.map((col, colIndex) => {
                        const key = `${originalRowIndex}-${colIndex}`;
                        return (
                          <td key={colIndex} className="px-3 py-3 text-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggle(originalRowIndex, colIndex)}
                              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all relative ${
                                state[key]
                                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md'
                                  : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                              }`}
                              data-tooltip={col.description}
                            >
                              {state[key] ? <Check size={16} /> : null}
                              {col.highlight && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                              )}
                            </motion.button>
                          </td>
                        );
                      })}
                      
                      <td className="px-3 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {chapterCompletion(originalRowIndex)}%
                          </div>
                          <div className={`w-full h-1 rounded-full mt-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className={`h-1 rounded-full ${chapterCompletion(originalRowIndex) >= 80 ? 'bg-green-500' : chapterCompletion(originalRowIndex) >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${chapterCompletion(originalRowIndex)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Empty state */}
        {filteredChapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`mt-8 p-8 text-center rounded-xl ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}
          >
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold mb-2">Nothing to show here!</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              You've completed all chapters!
            </p>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
            >
              Show All Chapters
            </button>
          </motion.div>
        )}

        {/* Reset Confirmation Modal */}
        <AnimatePresence>
          {showResetModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`rounded-xl max-w-md w-full border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 shadow-2xl`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <RotateCw size={20} /> Reset Progress
                  </h3>
                  <button 
                    onClick={() => setShowResetModal(false)}
                    className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Are you sure you want to reset all your progress? This will clear all checkmarks and cannot be undone.
                </p>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className={`px-4 py-2 rounded-lg transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={resetProgress}
                    className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                  >
                    <RotateCw size={16} /> Reset All
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className={`py-6 text-center ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-lg mb-2">Organic Chemistry Checklist</p>
          <p className="text-sm flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by fluxon
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Checklist;
