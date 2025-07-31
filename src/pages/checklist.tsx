// components/Checklist.tsx
import { useEffect, useState } from 'react';
import { Check, X, BookOpen, ClipboardCheck, FileText, Bookmark, Award, FileCheck } from 'lucide-react';

const chapters = [
  'Optical Isomerism',
  'Haloalkanes and Haloarenes',
  'Alcohols, Phenols and Ethers',
  'Aldehydes, Ketones and Carboxylic Acids',
  'Amines',
  'Biomolecules',
  'Practical Organic Chemistry',
];

const columns = [
  { name: 'Lecture', icon: <BookOpen size={16} /> },
  { name: 'DPP', icon: <ClipboardCheck size={16} /> },
  { name: 'Class Ques Sheet', icon: <FileText size={16} /> },
  { name: 'General Practice Sheet', icon: <Bookmark size={16} /> },
  { name: 'KATTAR Practice Sheet', icon: <Award size={16} /> },
  { name: 'KEHAR Practice Sheet', icon: <Award size={16} /> },
  { name: 'Revision 1', icon: <FileCheck size={16} />, highlight: true },
  { name: 'Revision 2', icon: <FileCheck size={16} />, highlight: true },
  { name: 'Revision 3', icon: <FileCheck size={16} />, highlight: true },
  { name: 'Test Papers', icon: <FileText size={16} /> },
];

const Checklist = () => {
  const [state, setState] = useState<Record<string, boolean>>({});
  const [showResetModal, setShowResetModal] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('organic-checklist');
    if (saved) setState(JSON.parse(saved));
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('organic-checklist', JSON.stringify(state));
  }, [state]);

  const toggle = (row: number, col: number) => {
    const key = `${row}-${col}`;
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetProgress = () => {
    setState({});
    setShowResetModal(false);
  };

  const calculateProgress = () => {
    const totalItems = chapters.length * columns.length;
    const completedItems = Object.values(state).filter(Boolean).length;
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            Organic Chemistry Checklist
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Track your progress through each chapter and practice material
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-purple-800/30 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ClipboardCheck size={20} /> Overall Progress
            </h2>
            <span className="text-lg font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>{Object.values(state).filter(Boolean).length} completed</span>
            <span>{chapters.length * columns.length - Object.values(state).filter(Boolean).length} remaining</span>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-purple-300 min-w-[200px]">
                    Chapter Name
                  </th>
                  {columns.map((col, i) => (
                    <th
                      key={i}
                      className={`px-3 py-3 font-semibold text-sm whitespace-nowrap ${
                        col.highlight ? 'text-red-400' : 'text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {col.icon}
                        <span>{col.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {chapters.map((chapter, row) => (
                  <tr key={row} className="hover:bg-gray-700/20 transition">
                    <td className="px-4 py-3 font-medium text-red-300 whitespace-nowrap">
                      {chapter}
                    </td>
                    {columns.map((_, col) => {
                      const key = `${row}-${col}`;
                      return (
                        <td key={col} className="px-3 py-3 text-center">
                          <button
                            onClick={() => toggle(row, col)}
                            className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                              state[key]
                                ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                                : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-400'
                            }`}
                          >
                            {state[key] ? <Check size={16} /> : null}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowResetModal(true)}
            className="px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-300 rounded-lg border border-red-800/50 transition flex items-center gap-2"
          >
            <X size={16} /> Reset Progress
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl max-w-md w-full border border-purple-800/50 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Reset Progress</h3>
              <button 
                onClick={() => setShowResetModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">Are you sure you want to reset all your progress? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={resetProgress}
                className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-lg transition flex items-center gap-2"
              >
                <X size={16} /> Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
