import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, PolarArea } from 'react-chartjs-2';
import {
  Search,
  BarChart3,
  X,
  GraduationCap,
  Award,
  MapPin,
  Users,
  CheckCircle,
  RotateCcw,
  Moon,
  Sun,
  TrendingUp,
  TrendingDown,
  Star,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Target,
  Zap,
  BookOpen,
  Building2,
  Filter
} from 'lucide-react';
 

// Import CAP data files
import CAP01 from '../data/CAP_01_2024.json';
import CAP02 from '../data/CAP_02_2024.json';
import CAP03 from '../data/CAP_03_2024.json';
import AI_CAP1 from '../data/AI_CAP1.json';
import AI_CAP2 from '../data/AI_CAP2.json';
import AI_CAP3 from '../data/AI_CAP3.json';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

// Define initial interface for chart data
interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderRadius?: number;
    borderSkipped?: boolean;
    tension?: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointBorderWidth?: number;
    pointRadius?: number;
    pointHoverRadius?: number;
  }>;
}

const CollegeComparison = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Category system
  const [selectedCategory, setSelectedCategory] = useState('GOPENS'); // Default to General Open
  const [selectedExamType, setSelectedExamType] = useState('MHT-CET');
  const [selectedCapRound, setSelectedCapRound] = useState('all'); // 'all', '01', '02', '03'
  interface College {
    value: string;
    label: string;
    district: string;
    status: string;
    level: string;
    branches: any[];
  }

  const [availableColleges, setAvailableColleges] = useState<College[]>([]);
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);
  
  // State for college panels
  const [leftCollege, setLeftCollege] = useState({
    college: '',
    branches: [],
    data: null
  });
  const [rightCollege, setRightCollege] = useState({
    college: '',
    branches: [],
    data: null
  });
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBranchDropdown, setShowBranchDropdown] = useState({ left: false, right: false });
  const [chartType, setChartType] = useState('bar'); // 'bar', 'line', 'pie', 'doughnut', 'polar'
  const [showAllRounds, setShowAllRounds] = useState(true); // Show all 3 rounds by default

  // Category mapping for MHT-CET
  const categoryMapping = {
    'GOPENS': { label: 'General Open', prefix: 'G', suffix: 'S', color: 'bg-blue-100 text-blue-800' },
    'GOBCS': { label: 'General OBC', prefix: 'G', suffix: 'S', color: 'bg-green-100 text-green-800' },
    'GSCS': { label: 'General SC', prefix: 'G', suffix: 'S', color: 'bg-purple-100 text-purple-800' },
    'GSTS': { label: 'General ST', prefix: 'G', suffix: 'S', color: 'bg-indigo-100 text-indigo-800' },
    'GVJS': { label: 'General VJ', prefix: 'G', suffix: 'S', color: 'bg-orange-100 text-orange-800' },
    'GNT1S': { label: 'General NT1', prefix: 'G', suffix: 'S', color: 'bg-yellow-100 text-yellow-800' },
    'GNT2S': { label: 'General NT2', prefix: 'G', suffix: 'S', color: 'bg-pink-100 text-pink-800' },
    'GNT3S': { label: 'General NT3', prefix: 'G', suffix: 'S', color: 'bg-red-100 text-red-800' },
    'GSEBCS': { label: 'General SEBC', prefix: 'G', suffix: 'S', color: 'bg-teal-100 text-teal-800' },
    'LOPENS': { label: 'Ladies Open', prefix: 'L', suffix: 'S', color: 'bg-rose-100 text-rose-800' },
    'LOBCS': { label: 'Ladies OBC', prefix: 'L', suffix: 'S', color: 'bg-emerald-100 text-emerald-800' },
    'LSCS': { label: 'Ladies SC', prefix: 'L', suffix: 'S', color: 'bg-violet-100 text-violet-800' },
    'LSTS': { label: 'Ladies ST', prefix: 'L', suffix: 'S', color: 'bg-cyan-100 text-cyan-800' },
    'LVJS': { label: 'Ladies VJ', prefix: 'L', suffix: 'S', color: 'bg-amber-100 text-amber-800' },
    'LNT1S': { label: 'Ladies NT1', prefix: 'L', suffix: 'S', color: 'bg-lime-100 text-lime-800' },
    'LNT2S': { label: 'Ladies NT2', prefix: 'L', suffix: 'S', color: 'bg-fuchsia-100 text-fuchsia-800' },
    'LNT3S': { label: 'Ladies NT3', prefix: 'L', suffix: 'S', color: 'bg-sky-100 text-sky-800' },
    'LSEBCS': { label: 'Ladies SEBC', prefix: 'L', suffix: 'S', color: 'bg-stone-100 text-stone-800' },
    'EWS': { label: 'EWS', prefix: 'G', suffix: 'S', color: 'bg-slate-100 text-slate-800' },
    'TFWS': { label: 'TFWS', prefix: 'G', suffix: 'S', color: 'bg-gray-100 text-gray-800' }
  };

  // Load college data from CAP files
  useEffect(() => {
    const loadCollegeData = () => {
      try {
        console.log('Loading college data...');
        setIsLoading(true);
        
        // Get all data for multi-round support
        let allData: { [key: string]: any } = {};
        if (selectedExamType === "MHT-CET") {
          console.log('Loading MHT-CET data...');
          allData = { '01': CAP01, '02': CAP02, '03': CAP03 };
        } else {
          console.log('Loading JEE data...');
          allData = { '01': AI_CAP1, '02': AI_CAP2, '03': AI_CAP3 };
        }
        console.log('Data loaded:', Object.keys(allData));

        if (selectedExamType === "MHT-CET") {
          // Extract colleges and branches from MHT-CET data
          const collegeNames = Object.keys(allData['01']); // Use CAP01 as base
          
          const colleges = collegeNames.map(collegeName => ({
            value: collegeName,
            label: collegeName,
            district: allData['01'][collegeName].district || 'Unknown',
            status: allData['01'][collegeName].status || 'Unknown',
            level: allData['01'][collegeName].level || 'Unknown',
            branches: allData['01'][collegeName].branches || []
          }));
          
          setAvailableColleges(colleges);

          // Extract all unique branches
          const allBranches = new Set();
          Object.values(allData['01']).forEach(college => {
            if (college.branches) {
              college.branches.forEach(branch => {
                allBranches.add(branch.branch_info);
              });
            }
          });
          setAvailableBranches(Array.from(allBranches).sort());
        } else {
          // Extract colleges and branches from JEE data
          const colleges = allData['01'].map(college => ({
            value: college["Institute Name"],
            label: college["Institute Name"],
            district: college.District || 'Unknown',
            status: college.Courses[0]?.["Merit Exam"] || 'JEE',
            level: "All India",
            branches: college.Courses || []
          }));
          
          setAvailableColleges(colleges);

          // Extract all unique branches
          const allBranches = new Set();
          allData['01'].forEach(college => {
            college.Courses.forEach(course => {
              allBranches.add(course["Course Name"]);
            });
          });
          setAvailableBranches(Array.from(allBranches).sort());
        }
        
        setError(''); // Clear any previous errors
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading college data:', error);
        setError('Failed to load college data: ' + error.message);
        setIsLoading(false);
      }
    };

    loadCollegeData();
  }, [selectedExamType]);

  // Get college branches
  const getCollegeBranches = (collegeName) => {
    const college = availableColleges.find(c => c.value === collegeName);
    if (!college) return [];
    
    if (selectedExamType === "MHT-CET") {
      return college.branches.map(branch => branch.branch_info);
    } else {
      return college.branches.map(course => course["Course Name"]);
    }
  };

  // Get cutoff data for a specific college and branch with category filtering
  const getCutoffData = (collegeName, branchName, round = null) => {
    try {
      let allData = {};
      if (selectedExamType === "MHT-CET") {
        allData = { '01': CAP01, '02': CAP02, '03': CAP03 };
      } else {
        allData = { '01': AI_CAP1, '02': AI_CAP2, '03': AI_CAP3 };
      }

      if (selectedExamType === "MHT-CET") {
        const roundsToCheck = round ? [round] : (selectedCapRound === 'all' ? ['01', '02', '03'] : [selectedCapRound]);
        const results = {};
        
        roundsToCheck.forEach(roundKey => {
          const collegeInfo = allData[roundKey][collegeName];
          if (collegeInfo) {
            const branchData = collegeInfo.branches.find(b => b.branch_info === branchName);
            if (branchData && branchData.table_data && branchData.table_data.length > 0) {
              const tableRow = branchData.table_data[0];
              const categoryData = tableRow[selectedCategory];
              if (categoryData) {
                const percentile = parseFloat(categoryData.split('\n')[1]?.replace(/[()]/g, '') || '0');
                const rank = parseInt(categoryData.split('\n')[0] || '0');
                results[roundKey] = { percentile, rank, seatCode: selectedCategory };
              }
            }
          }
        });
        
        if (round) {
          return results[round] || { percentile: 0, rank: 0, seatCode: 'N/A' };
        }
        
        return results;
      } else {
        // JEE data handling
        const roundsToCheck = round ? [round] : (selectedCapRound === 'all' ? ['01', '02', '03'] : [selectedCapRound]);
        const results = {};
        
        roundsToCheck.forEach(roundKey => {
          const collegeInfo = allData[roundKey].find(c => c["Institute Name"] === collegeName);
          if (collegeInfo) {
            const courseData = collegeInfo.Courses.find(c => c["Course Name"] === branchName);
            if (courseData) {
              const meritData = courseData["All India Merit"].split(" ");
              const percentile = parseFloat(meritData[1]?.replace(/[()]/g, "") || '0');
              const rank = parseInt(meritData[0] || '0');
              results[roundKey] = { percentile, rank, seatCode: 'JEE-AI' };
            }
          }
        });
        
        if (round) {
          return results[round] || { percentile: 0, rank: 0, seatCode: 'N/A' };
        }
        
        return results;
      }
    } catch (error) {
      console.error('Error getting cutoff data:', error);
      return round ? { percentile: 0, rank: 0, seatCode: 'N/A' } : {};
    }
  };

  // Handle college selection
  const handleCollegeSelect = (side, collegeName) => {
    if (side === 'left') {
      setLeftCollege({
        college: collegeName,
        branches: [],
        data: null
      });
    } else {
      setRightCollege({
        college: collegeName,
        branches: [],
        data: null
      });
    }
  };

  // Handle branch selection
  const handleBranchToggle = (side, branchName) => {
    if (side === 'left') {
      setLeftCollege(prev => {
        const newBranches = prev.branches.includes(branchName)
          ? prev.branches.filter(b => b !== branchName)
          : [...prev.branches, branchName];
        return { ...prev, branches: newBranches };
      });
    } else {
      setRightCollege(prev => {
        const newBranches = prev.branches.includes(branchName)
          ? prev.branches.filter(b => b !== branchName)
          : [...prev.branches, branchName];
        return { ...prev, branches: newBranches };
      });
    }
  };

  // Remove branch
  const removeBranch = (side, branchName) => {
    if (side === 'left') {
      setLeftCollege(prev => ({
        ...prev,
        branches: prev.branches.filter(b => b !== branchName)
      }));
    } else {
      setRightCollege(prev => ({
        ...prev,
        branches: prev.branches.filter(b => b !== branchName)
      }));
    }
  };

  // Reset comparison
  const resetComparison = () => {
    setLeftCollege({ college: '', branches: [], data: null });
    setRightCollege({ college: '', branches: [], data: null });
    setError('');
  };

  // Generate chart data for comparison with multi-round support
  const generateChartData = () => {
    const allBranches = [...new Set([...leftCollege.branches, ...rightCollege.branches])];
    
    if (selectedCapRound === 'all' && showAllRounds) {
      // Multi-round chart
      const chartData = {
        labels: ['CAP Round 1', 'CAP Round 2', 'CAP Round 3'],
        datasets: []
      };

      if (leftCollege.college && leftCollege.branches.length > 0) {
        const leftData = [];
        ['01', '02', '03'].forEach(round => {
          const roundData = leftCollege.branches.map(branch => {
            const cutoffData = getCutoffData(leftCollege.college, branch, round);
            return cutoffData.percentile;
          });
          leftData.push(roundData.length > 0 ? roundData.reduce((a, b) => a + b, 0) / roundData.length : 0);
        });
        
        chartData.datasets.push({
          label: leftCollege.college,
          data: leftData,
          backgroundColor: 'rgba(246, 128, 20, 0.8)',
          borderColor: 'rgba(246, 128, 20, 1)',
          borderWidth: 3,
          borderRadius: 4,
          borderSkipped: false,
          tension: 0.4,
          pointBackgroundColor: 'rgba(246, 128, 20, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        });
      }

      if (rightCollege.college && rightCollege.branches.length > 0) {
        const rightData = [];
        ['01', '02', '03'].forEach(round => {
          const roundData = rightCollege.branches.map(branch => {
            const cutoffData = getCutoffData(rightCollege.college, branch, round);
            return cutoffData.percentile;
          });
          rightData.push(roundData.length > 0 ? roundData.reduce((a, b) => a + b, 0) / roundData.length : 0);
        });
        
        chartData.datasets.push({
          label: rightCollege.college,
          data: rightData,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 3,
          borderRadius: 4,
          borderSkipped: false,
          tension: 0.4,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        });
      }

      return chartData;
    } else {
      // Single round branch-wise chart
      const chartData = {
        labels: allBranches,
        datasets: []
      };

      if (leftCollege.college && leftCollege.branches.length > 0) {
        const leftData = leftCollege.branches.map(branch => {
          const cutoffData = getCutoffData(leftCollege.college, branch, selectedCapRound === 'all' ? '01' : selectedCapRound);
          return cutoffData.percentile;
        });
        
        chartData.datasets.push({
          label: leftCollege.college,
          data: leftData,
          backgroundColor: 'rgba(246, 128, 20, 0.8)',
          borderColor: 'rgba(246, 128, 20, 1)',
          borderWidth: 3,
          borderRadius: 4,
          borderSkipped: false,
          tension: 0.4,
          pointBackgroundColor: 'rgba(246, 128, 20, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        });
      }

      if (rightCollege.college && rightCollege.branches.length > 0) {
        const rightData = rightCollege.branches.map(branch => {
          const cutoffData = getCutoffData(rightCollege.college, branch, selectedCapRound === 'all' ? '01' : selectedCapRound);
          return cutoffData.percentile;
        });
        
        chartData.datasets.push({
          label: rightCollege.college,
          data: rightData,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 3,
          borderRadius: 4,
          borderSkipped: false,
          tension: 0.4,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        });
      }

      return chartData;
    }
  };

  // Generate pie/doughnut chart data
  const generatePieChartData = () => {
    const allBranches = [...new Set([...leftCollege.branches, ...rightCollege.branches])];
    const data = [];
    const labels = [];
    const backgroundColors = [];

    allBranches.forEach((branch, index) => {
      const leftData = leftCollege.branches.includes(branch) ? 
        getCutoffData(leftCollege.college, branch, selectedCapRound === 'all' ? '01' : selectedCapRound) : 
        { percentile: 0 };
      const rightData = rightCollege.branches.includes(branch) ? 
        getCutoffData(rightCollege.college, branch, selectedCapRound === 'all' ? '01' : selectedCapRound) : 
        { percentile: 0 };
      
      const avgPercentile = (leftData.percentile + rightData.percentile) / 2;
      if (avgPercentile > 0) {
        data.push(avgPercentile);
        labels.push(branch);
        backgroundColors.push(`hsl(${index * 60}, 70%, 60%)`);
      }
    });

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
        borderWidth: 2,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        }
      },
      title: {
        display: true,
        text: selectedCapRound === 'all' && showAllRounds 
          ? `Multi-Round Cutoff Trends - ${categoryMapping[selectedCategory]?.label || selectedCategory}`
          : `Branch-wise Cutoff Comparison - ${categoryMapping[selectedCategory]?.label || selectedCategory}`,
        color: isDarkMode ? '#e5e7eb' : '#374151',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDarkMode ? '#e5e7eb' : '#374151',
        bodyColor: isDarkMode ? '#e5e7eb' : '#374151',
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          title: function(context) {
            return `${context[0].dataset.label}`;
          },
          label: function(context) {
            return `${context.label}: ${context.parsed.y.toFixed(2)}%`;
          },
          afterLabel: function(context) {
            return `${selectedExamType} - CAP Round ${selectedCapRound}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 11,
            weight: 'bold'
          },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Branches',
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        beginAtZero: false,
        min: 60,
        max: 100,
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 12,
            weight: 'bold'
          },
          callback: function(value) {
            return value + '%';
          },
          stepSize: 5
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Cutoff Percentile (%)',
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  // College Panel Component
  const CollegePanel = ({ side, college, branches, onCollegeSelect, onBranchToggle, onRemoveBranch }) => {
    const collegeInfo = availableColleges.find(c => c.value === college);
    const collegeBranches = getCollegeBranches(college);
    
    return (
      <div className={`rounded-2xl shadow-xl border transition-all duration-300 hover:shadow-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
        {/* Header */}
        <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-orange-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-bold flex items-center space-x-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              <Building2 className="h-6 w-6 text-[#f68014]" />
              <span>{side === 'left' ? 'College A' : 'College B'}</span>
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-bold transition-colors duration-300 ${side === 'left' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
              {side === 'left' ? 'A' : 'B'}
            </div>
          </div>
          
          {/* College Selection */}
          <div className="space-y-3">
            <label className={`block text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Select College
            </label>
            <select
              value={college}
              onChange={(e) => onCollegeSelect(side, e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-orange-200 bg-gray-50'}`}
            >
              <option value="">Choose a college...</option>
              {availableColleges.map(collegeOption => (
                <option key={collegeOption.value} value={collegeOption.value}>
                  {collegeOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* College Info */}
        {college && (
          <div className="p-6 border-b transition-colors duration-300 border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#f68014]" />
                <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>District:</strong> {collegeInfo?.district}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-[#f68014]" />
                <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Status:</strong> {collegeInfo?.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-[#f68014]" />
                <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Level:</strong> {collegeInfo?.level}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Branch Selection */}
        {college && (
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Select Branches ({branches.length} selected)
                </label>
                <button
                  onClick={() => setShowBranchDropdown(prev => ({ ...prev, [side]: !prev[side] }))}
                  className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {showBranchDropdown[side] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              
              {showBranchDropdown[side] && (
                <div className={`max-h-48 overflow-y-auto space-y-2 p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  {collegeBranches.map(branchName => (
                    <label key={branchName} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={branches.includes(branchName)}
                        onChange={() => onBranchToggle(side, branchName)}
                        className="sr-only peer"
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-colors duration-300 peer-checked:bg-[#f68014] peer-checked:border-[#f68014] ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}>
                        {branches.includes(branchName) && <CheckCircle className="h-3 w-3 text-white m-0.5" />}
                      </div>
                      <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {branchName}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              
              {/* Selected Branches */}
              {branches.length > 0 && (
                <div className="space-y-2">
                  <h4 className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Selected Branches:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {branches.map(branchName => (
                      <div key={branchName} className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${side === 'left' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                        <span>{branchName}</span>
                        <button
                          onClick={() => onRemoveBranch(side, branchName)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Generate intelligent suggestions based on cutoff trends
  const generateSuggestions = (r1, r2, r3, collegeName) => {
    if (!r1 || !r2 || !r3) return null;
    
    const trend = r1 - r3; // Positive means increasing cutoff (harder to get in)
    const stability = Math.abs(r1 - r2) + Math.abs(r2 - r3); // Lower is more stable
    
    if (trend > 5) {
      return {
        type: 'warning',
        icon: '⚠️',
        message: `Cutoff increased by ${trend.toFixed(1)}% - Getting more competitive`,
        suggestion: 'Consider this as a reach college, have backup options ready'
      };
    } else if (trend < -5) {
      return {
        type: 'success',
        icon: '📈',
        message: `Cutoff decreased by ${Math.abs(trend).toFixed(1)}% - Easier to get in`,
        suggestion: 'Good opportunity! Apply with confidence'
      };
    } else if (stability < 2) {
      return {
        type: 'info',
        icon: '📊',
        message: 'Very stable cutoffs across rounds',
        suggestion: 'Predictable admission chances, reliable choice'
      };
    } else {
      return {
        type: 'neutral',
        icon: '📋',
        message: 'Moderate cutoff fluctuations',
        suggestion: 'Monitor trends, decent admission probability'
      };
    }
  };

  // Branch Comparison Card Component
  const BranchComparisonCard = ({ branchName, leftData, rightData }) => {
    const leftPercentile = leftData?.percentile || 0;
    const rightPercentile = rightData?.percentile || 0;
    const higherCollege = leftPercentile > rightPercentile ? 'left' : 'right';
    
    // Get multi-round data if showing all rounds
    const leftMultiRound = selectedCapRound === 'all' ? getCutoffData(leftCollege.college, branchName) : null;
    const rightMultiRound = selectedCapRound === 'all' ? getCutoffData(rightCollege.college, branchName) : null;
    
    // Generate suggestions
    const leftSuggestion = leftMultiRound ? 
      generateSuggestions(
        leftMultiRound['01']?.percentile, 
        leftMultiRound['02']?.percentile, 
        leftMultiRound['03']?.percentile, 
        leftCollege.college
      ) : null;
    
    const rightSuggestion = rightMultiRound ? 
      generateSuggestions(
        rightMultiRound['01']?.percentile, 
        rightMultiRound['02']?.percentile, 
        rightMultiRound['03']?.percentile, 
        rightCollege.college
      ) : null;
    
    return (
      <div className={`rounded-xl border p-4 transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
        <h4 className={`font-semibold mb-4 text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          {branchName}
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Left College Data */}
          <div className={`p-4 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {leftCollege.college?.split(',')[0] || 'College A'}
                </span>
              </div>
              {higherCollege === 'left' && <TrendingUp className="h-4 w-4 text-green-500" />}
            </div>
            <div className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {leftPercentile > 0 ? `${leftPercentile.toFixed(1)}%` : 'N/A'}
            </div>
            <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Rank: {leftData?.rank?.toLocaleString() || 'N/A'}
            </div>
            {leftMultiRound && (
              <div className="mt-3 space-y-2">
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className={`text-center p-1 rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className="font-bold">R1</div>
                    <div>{leftMultiRound['01']?.percentile > 0 ? `${leftMultiRound['01'].percentile.toFixed(1)}%` : 'N/A'}</div>
                  </div>
                  <div className={`text-center p-1 rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className="font-bold">R2</div>
                    <div>{leftMultiRound['02']?.percentile > 0 ? `${leftMultiRound['02'].percentile.toFixed(1)}%` : 'N/A'}</div>
                  </div>
                  <div className={`text-center p-1 rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className="font-bold">R3</div>
                    <div>{leftMultiRound['03']?.percentile > 0 ? `${leftMultiRound['03'].percentile.toFixed(1)}%` : 'N/A'}</div>
                  </div>
                </div>
                {leftSuggestion && (
                  <div className={`p-2 rounded-lg text-xs transition-colors duration-300 ${
                    leftSuggestion.type === 'warning' ? 'bg-red-50 text-red-700' :
                    leftSuggestion.type === 'success' ? 'bg-green-50 text-green-700' :
                    leftSuggestion.type === 'info' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    <div className="flex items-center space-x-1 mb-1">
                      <span>{leftSuggestion.icon}</span>
                      <span className="font-medium">{leftSuggestion.message}</span>
                    </div>
                    <div className="text-xs opacity-80">{leftSuggestion.suggestion}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Right College Data */}
          <div className={`p-4 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {rightCollege.college?.split(',')[0] || 'College B'}
                </span>
              </div>
              {higherCollege === 'right' && <TrendingUp className="h-4 w-4 text-green-500" />}
            </div>
            <div className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {rightPercentile > 0 ? `${rightPercentile.toFixed(1)}%` : 'N/A'}
            </div>
            <div className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Rank: {rightData?.rank?.toLocaleString() || 'N/A'}
            </div>
            {rightMultiRound && (
              <div className="mt-3 space-y-2">
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className={`text-center p-1 rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className="font-bold">R1</div>
                    <div>{rightMultiRound['01']?.percentile > 0 ? `${rightMultiRound['01'].percentile.toFixed(1)}%` : 'N/A'}</div>
                  </div>
                  <div className={`text-center p-1 rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className="font-bold">R2</div>
                    <div>{rightMultiRound['02']?.percentile > 0 ? `${rightMultiRound['02'].percentile.toFixed(1)}%` : 'N/A'}</div>
                  </div>
                  <div className={`text-center p-1 rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className="font-bold">R3</div>
                    <div>{rightMultiRound['03']?.percentile > 0 ? `${rightMultiRound['03'].percentile.toFixed(1)}%` : 'N/A'}</div>
                  </div>
                </div>
                {rightSuggestion && (
                  <div className={`p-2 rounded-lg text-xs transition-colors duration-300 ${
                    rightSuggestion.type === 'warning' ? 'bg-red-50 text-red-700' :
                    rightSuggestion.type === 'success' ? 'bg-green-50 text-green-700' :
                    rightSuggestion.type === 'info' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    <div className="flex items-center space-x-1 mb-1">
                      <span>{rightSuggestion.icon}</span>
                      <span className="font-medium">{rightSuggestion.message}</span>
                    </div>
                    <div className="text-xs opacity-80">{rightSuggestion.suggestion}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Overall Suggestion */}
        {leftSuggestion && rightSuggestion && (
          <div className="mt-4 p-3 rounded-lg transition-colors duration-300 bg-gradient-to-r from-orange-50 to-blue-50">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-800' : 'text-gray-700'}`}>
                Expert Recommendation
              </span>
            </div>
            <div className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-700' : 'text-gray-600'}`}>
              {leftSuggestion.type === 'success' && rightSuggestion.type === 'warning' 
                ? `🎯 ${leftCollege.college?.split(',')[0]} is the better choice - easier admission with decreasing cutoffs`
                : rightSuggestion.type === 'success' && leftSuggestion.type === 'warning'
                ? `🎯 ${rightCollege.college?.split(',')[0]} is the better choice - easier admission with decreasing cutoffs`
                : leftSuggestion.type === 'info' && rightSuggestion.type !== 'info'
                ? `📊 ${leftCollege.college?.split(',')[0]} has more stable cutoffs - more predictable admission chances`
                : rightSuggestion.type === 'info' && leftSuggestion.type !== 'info'
                ? `📊 ${rightCollege.college?.split(',')[0]} has more stable cutoffs - more predictable admission chances`
                : `💡 Both colleges show similar trends. Consider other factors like location, fees, and reputation.`
              }
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-[#f68014] to-orange-600 p-4 rounded-2xl shadow-lg">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f68014] to-orange-600 bg-clip-text text-transparent">
              Advanced College Comparison Tool
            </h1>
          </div>
          <p className={`text-lg max-w-4xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Compare colleges with category-wise cutoff analysis and multi-round trends
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className={`rounded-2xl shadow-xl border p-6 mb-8 transition-colors duration-300 ${isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center space-x-2">
              <X className="h-6 w-6 text-red-600" />
              <h3 className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? 'text-red-100' : 'text-red-800'}`}>
                Error Loading Data
              </h3>
            </div>
            <p className={`mt-2 transition-colors duration-300 ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
              {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className={`rounded-2xl shadow-xl border p-6 mb-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#f68014]"></div>
              <span className={`text-lg font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Loading college data...
              </span>
            </div>
          </div>
        )}

        {/* Quick Filters */}
        <div className={`rounded-2xl shadow-xl border p-6 mb-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
          <h2 className={`text-xl font-bold flex items-center space-x-2 mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            <Filter className="h-5 w-5 text-[#f68014]" />
            <span>Quick Filters</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Selection */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-orange-200 bg-gray-50'}`}
              >
                {Object.entries(categoryMapping).slice(0, 10).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Type Selection */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Exam
              </label>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-orange-200 bg-gray-50'}`}
              >
                <option value="MHT-CET">MHT-CET</option>
                <option value="JEE">JEE</option>
              </select>
            </div>

            {/* CAP Round Selection */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Round
              </label>
              <select
                value={selectedCapRound}
                onChange={(e) => setSelectedCapRound(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-orange-200 bg-gray-50'}`}
              >
                <option value="all">All Rounds</option>
                <option value="01">Round 1</option>
                <option value="02">Round 2</option>
                <option value="03">Round 3</option>
              </select>
            </div>

            {/* Chart Type */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Chart
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-orange-200 bg-gray-50'}`}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="doughnut">Doughnut</option>
              </select>
            </div>
          </div>

          {/* Selected Category Badge */}
          <div className="mt-4 flex items-center space-x-2">
            <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Selected:
            </span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${categoryMapping[selectedCategory]?.color || 'bg-gray-100 text-gray-800'}`}>
              {categoryMapping[selectedCategory]?.label || selectedCategory}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
              {selectedExamType} - Round {selectedCapRound}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={resetComparison}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}`}
          >
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>Reset Comparison</span>
            </div>
          </button>
        </div>

        {/* Two Panel Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel */}
          <CollegePanel
            side="left"
            college={leftCollege.college}
            branches={leftCollege.branches}
            onCollegeSelect={handleCollegeSelect}
            onBranchToggle={handleBranchToggle}
            onRemoveBranch={removeBranch}
          />

          {/* Right Panel */}
          <CollegePanel
            side="right"
            college={rightCollege.college}
            branches={rightCollege.branches}
            onCollegeSelect={handleCollegeSelect}
            onBranchToggle={handleBranchToggle}
            onRemoveBranch={removeBranch}
          />
        </div>

        {/* Comparison Results */}
        {(leftCollege.college || rightCollege.college) && (
          <div className="space-y-8">
            {/* Chart Visualization */}
            {(leftCollege.branches.length > 0 || rightCollege.branches.length > 0) && (
              <div className={`rounded-2xl shadow-xl border p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-2xl font-bold flex items-center space-x-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    <BarChart3 className="h-6 w-6 text-[#f68014]" />
                    <span>Visual Comparison</span>
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-orange-100 text-orange-800'}`}>
                    {selectedExamType} - CAP Round {selectedCapRound}
                  </div>
                </div>
                
                <div className="h-96">
                  {chartType === 'bar' && <Bar data={generateChartData()} options={chartOptions} />}
                  {chartType === 'line' && <Line data={generateChartData()} options={chartOptions} />}
                  {chartType === 'pie' && <Pie data={generatePieChartData()} options={chartOptions} />}
                  {chartType === 'doughnut' && <Doughnut data={generatePieChartData()} options={chartOptions} />}
                </div>
              </div>
            )}

            {/* Branch-wise Comparison */}
            {leftCollege.branches.length > 0 && rightCollege.branches.length > 0 && (
              <div className={`rounded-2xl shadow-xl border p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
                <h3 className={`text-2xl font-bold flex items-center space-x-2 mb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  <Target className="h-6 w-6 text-[#f68014]" />
                  <span>Branch-wise Comparison</span>
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...new Set([...leftCollege.branches, ...rightCollege.branches])].map(branchName => (
                    <BranchComparisonCard
                      key={branchName}
                      branchName={branchName}
                      leftData={leftCollege.branches.includes(branchName) ? getCutoffData(leftCollege.college, branchName) : null}
                      rightData={rightCollege.branches.includes(branchName) ? getCutoffData(rightCollege.college, branchName) : null}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Summary Section */}
            {leftCollege.college && rightCollege.college && (
              <div className={`rounded-2xl shadow-xl border p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
                <h3 className={`text-2xl font-bold flex items-center space-x-2 mb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  <Star className="h-6 w-6 text-[#f68014]" />
                  <span>Comparison Summary - {categoryMapping[selectedCategory]?.label || selectedCategory}</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left College Summary */}
                  <div className={`p-6 rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                    <h4 className={`text-lg font-bold mb-4 flex items-center space-x-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                      <Building2 className="h-5 w-5 text-[#f68014]" />
                      <span>{leftCollege.college}</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Branches Selected:</strong> {leftCollege.branches.length}</p>
                      <p><strong>District:</strong> {availableColleges.find(c => c.value === leftCollege.college)?.district}</p>
                      <p><strong>Status:</strong> {availableColleges.find(c => c.value === leftCollege.college)?.status}</p>
                    </div>
                  </div>

                  {/* Right College Summary */}
                  <div className={`p-6 rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <h4 className={`text-lg font-bold mb-4 flex items-center space-x-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <span>{rightCollege.college}</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Branches Selected:</strong> {rightCollege.branches.length}</p>
                      <p><strong>District:</strong> {availableColleges.find(c => c.value === rightCollege.college)?.district}</p>
                      <p><strong>Status:</strong> {availableColleges.find(c => c.value === rightCollege.college)?.status}</p>
                    </div>
                  </div>
                </div>
                
                {/* Category Insights */}
                <div className={`mt-6 p-4 rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`text-lg font-bold mb-3 flex items-center space-x-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    <TrendingUp className="h-5 w-5 text-[#f68014]" />
                    <span>Category Insights</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                      <div className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Selected Category: {categoryMapping[selectedCategory]?.label || selectedCategory}
                      </div>
                      <div className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Cutoff data filtered for this specific category
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                      <div className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Round Analysis: {selectedCapRound === 'all' ? 'Multi-Round Trends' : `CAP Round ${selectedCapRound}`}
                      </div>
                      <div className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {selectedCapRound === 'all' ? 'Shows trends across all 3 rounds' : 'Single round analysis'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!leftCollege.college && !rightCollege.college && (
          <div className={`rounded-2xl shadow-xl border p-12 text-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <BarChart3 className={`h-10 w-10 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Start Comparing Colleges
            </h3>
            <p className={`text-lg mb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Select colleges and branches to see detailed comparison with cutoff analysis
            </p>
            <div className="flex justify-center space-x-4">
              <div className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-orange-100 text-orange-800'}`}>
                📊 Interactive Charts
              </div>
              <div className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-800'}`}>
                🎯 Branch Analysis
              </div>
              <div className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-green-100 text-green-800'}`}>
                📈 Real Data
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeComparison;
