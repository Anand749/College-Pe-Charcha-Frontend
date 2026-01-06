import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import CAP01 from '../data/CAP_01_2024.json';
import CAP02 from '../data/CAP_02_2024.json';
import CAP03 from '../data/CAP_03_2024.json';
import AI_CAP1 from '../data/AI_CAP1.json';
import AI_CAP2 from '../data/AI_CAP2.json';
import AI_CAP3 from '../data/AI_CAP3.json';

import {
  GraduationCap,
  Search,
  Filter,
  MapPin,
  Award,
  Users,
  CheckCircle,
  Download,
  RotateCcw,
  X
} from 'lucide-react';
import UserNavbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';


const casteFallbackOrder = {
  NT3: ["NT3", "NT2", "NT1", "OPEN"],
  NT2: ["NT2", "NT1", "NT3", "OPEN"],
  NT1: ["NT1", "NT2", "NT3", "OPEN"],
  VJ: ["VJ", "NT1", "NT2", "NT3", "OPEN"],
  OBC: ["OBC", "OPEN"],
  SEBC: ["SEBC", "OBC", "OPEN"],
  SC: ["SC", "OPEN"],
  ST: ["ST", "OPEN"],
  OPEN: ["OPEN"],
  EWS: ["EWS", "OPEN"],
};

const initialFilters = {
  percentile: "",
  rank: "",
  caste: "",
  branch: [],
  district: [],
  gender: "general",
  universityType: "any",
  isDefence: false,
  isPWD: false,
};

// Define a type for the flat preference object *used only for the PDF*
type PreferenceItem = {
  collegeCode: string;
  collegeName: string;
  branch_info: string;
  matchedSeatCode: string;
  bestCutoff: number;
  bestCutoffRank: number;
  district: string;
  status: string;
  level: string;
};


function PercentileDisplay() {
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);
  const [capRound, setCapRound] = useState<string>('01');
  const [examType, setExamType] = useState<string>('MHT-CET');
  const [filterType, setFilterType] = useState<string>('percentile');


  const casteCategories = [
    { value: "OPEN", label: "Open Category" },
    { value: "SC", label: "Scheduled Caste (SC)" },
    { value: "ST", label: "Scheduled Tribe (ST)" },
    { value: "VJ", label: "Vimukta Jati (VJ)" },
    { value: "NT1", label: "Nomadic Tribe 1 (NT1)" },
    { value: "NT2", label: "Nomadic Tribe 2 (NT2)" },
    { value: "NT3", label: "Nomadic Tribe 3 (NT3)" },
    { value: "OBC", label: "Other Backward Class (OBC)" },
    { value: "SEBC", label: "Socially and Educationally Backward Class (SEBC)" },
    { value: "EWS", label: "Economically Weaker Section (EWS)" },
  ];

  const [filters, setFilters] = useState(initialFilters);

  const [percentileError, setPercentileError] = useState("");
  const [rankError, setRankError] = useState("");

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // --- STATE REVERTED ---
  // This state now holds the college-grouped data for the UI
  const [filteredColleges, setFilteredColleges] = useState<any[]>([]);

  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  const [isSearching, setIsSearching] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);



  useEffect(() => {
    let data;
    if (examType === "MHT-CET") {
      if (capRound === "01") data = CAP01;
      else if (capRound === "02") data = CAP02;
      else data = CAP03;
    } else {
      if (capRound === "01") data = AI_CAP1;
      else if (capRound === "02") data = AI_CAP2;
      else data = AI_CAP3;
    }

    const branchesSet = new Set();
    const districtsSet = new Set();

    if (examType === "MHT-CET") {
      Object.values(data).forEach((college: any) => {
        if (college.district) districtsSet.add(college.district);
        college.branches.forEach((branch) => branchesSet.add(branch.branch_info));
      });
    } else {
      data.forEach((college: any) => {
        if (college.District) districtsSet.add(college.District);
        college.Courses.forEach((course) => branchesSet.add(course["Course Name"]));
      });
    }

    setAvailableBranches(Array.from(branchesSet).sort());
    setAvailableDistricts(Array.from(districtsSet).sort());
  }, [capRound, examType]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "filterType") {
      setFilterType(value);
      setFilters((prev) => ({ ...prev, percentile: "", rank: "" }));
      setPercentileError("");
      setRankError("");
      return;
    }

    if (name === "examType") {
      setExamType(value);
      setFilteredColleges([]); // Reverted
      setNoResultsFound(false);
      setFilters(initialFilters);
      return;
    }

    if (name === "percentile") {
      setPercentileError("");
      if (value && (parseFloat(value) > 100 || parseFloat(value) < 0)) {
        setPercentileError("Percentile must be between 0 and 100.");
      }
    }

    if (name === "rank") {
      setRankError("");
      if (value && parseInt(value) <= 0) setRankError("Rank must be a positive number.");
    }

    if (name === "branch") {
      setSelectedBranch(value);
    } else if (name === "district") {
      setSelectedDistrict(value);
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setFilterType('percentile');
    setExamType('MHT-CET');
    setCapRound('01');
    setSelectedBranch('');
    setSelectedDistrict('');
    setFilteredColleges([]); // Reverted
    setNoResultsFound(false);
    setPercentileError('');
    setRankError('');
  }

  const addBranch = () => {
    if (selectedBranch && !filters.branch.includes(selectedBranch)) {
      setFilters((prev) => ({ ...prev, branch: [...prev.branch, selectedBranch] }));
      setSelectedBranch("");
    }
  };

  const removeBranch = (branchToRemove: string) => {
    setFilters((prev) => ({ ...prev, branch: prev.branch.filter((b) => b !== branchToRemove) }));
  };

  const addDistrict = () => {
    if (selectedDistrict && !filters.district.includes(selectedDistrict)) {
      setFilters((prev) => ({ ...prev, district: [...prev.district, selectedDistrict] }));
      setSelectedDistrict("");
    }
  };

  const removeDistrict = (districtToRemove: string) => {
    setFilters((prev) => ({ ...prev, district: prev.district.filter((d) => d !== districtToRemove) }));
  };

  const getSeatSuffix = (collegeLevel: string) => {
    if (collegeLevel?.toLowerCase().includes("home university")) return "H";
    if (collegeLevel?.toLowerCase().includes("outside")) return "O";
    return "S";
  }

  // --- applyFilters REVERTED to build college-grouped list ---
  const applyFilters = () => {
    setIsSearching(true);
    setFilteredColleges([]); // Reverted
    setNoResultsFound(false);

    setTimeout(() => {
      const { percentile, rank, caste, branch, district, gender, universityType, isDefence, isPWD } = filters;

      if (filterType === 'percentile' && !percentile) {
        alert("Please enter your percentile.");
        setIsSearching(false);
        return;
      }
      if (filterType === 'rank' && !rank) {
        alert("Please enter your rank.");
        setIsSearching(false);
        return;
      }
      if (examType === "MHT-CET" && !caste) {
        alert("Please select a caste category.");
        setIsSearching(false);
        return;
      }

      const percentileValue = parseFloat(percentile);
      const rankValue = parseInt(rank, 10);

      let data;
      if (examType === "MHT-CET") {
        if (capRound === "01") data = CAP01; else if (capRound === "02") data = CAP02; else data = CAP03;
      } else {
        if (capRound === "01") data = AI_CAP1; else if (capRound === "02") data = AI_CAP2; else data = AI_CAP3;
      }

      let results = []; // This will be the college-grouped list

      if (examType === "MHT-CET") {
        let collegesToSearch = Object.entries(data);

        if (district.length > 0) {
          collegesToSearch = collegesToSearch.filter(([_, info]: any) => district.includes(info.district));
        }
        if (universityType === "HU") {
          collegesToSearch = collegesToSearch.filter(([_, info]: any) => info.level?.toLowerCase().includes("home university"));
        } else if (universityType === "OHU") {
          collegesToSearch = collegesToSearch.filter(([_, info]: any) => info.level?.toLowerCase().includes("outside"));
        } else if (universityType === "SL") {
          collegesToSearch = collegesToSearch.filter(([_, info]: any) => !info.level?.toLowerCase().includes("home university") && !info.level?.toLowerCase().includes("outside"));
        }

        results = collegesToSearch.map(([collegeName, collegeInfo]: any) => {
          const eligibleBranches = collegeInfo.branches.map(currentBranch => {
            let bestAvailableSeatForBranch = { cutoffPercentile: -1, cutoffRank: Infinity, seatCode: null };

            const prefixFallback = isPWD ? ['PWD'] : isDefence ? ['DEF'] : gender === 'female' ? ['L', 'G'] : ['G'];
            const casteFallback = casteFallbackOrder[caste] || [caste];

            for (const prefix of prefixFallback) {
              for (const fallbackCaste of casteFallback) {
                const suffix = getSeatSuffix(collegeInfo.level);
                const seatCode = `${prefix}${fallbackCaste}${suffix}`;

                for (const row of currentBranch.table_data) {
                  if (row[seatCode]) {
                    const parts = row[seatCode].split("\n");
                    const cutoffRank = parseInt(parts[0], 10);
                    const cutoffPercentile = parseFloat(parts[1]?.replace(/[()]/g, ""));

                    const isEligible = (filterType === 'percentile' && !isNaN(cutoffPercentile) && percentileValue >= cutoffPercentile) ||
                      (filterType === 'rank' && !isNaN(cutoffRank) && rankValue <= cutoffRank);

                    if (isEligible && cutoffPercentile > bestAvailableSeatForBranch.cutoffPercentile) {
                      bestAvailableSeatForBranch = {
                        cutoffPercentile: cutoffPercentile,
                        cutoffRank: cutoffRank,
                        seatCode: seatCode,
                      };
                    }
                  }
                }
              }
            }

            if (bestAvailableSeatForBranch.seatCode) {
              return {
                branch_info: currentBranch.branch_info,
                bestCutoff: bestAvailableSeatForBranch.cutoffPercentile,
                bestCutoffRank: bestAvailableSeatForBranch.cutoffRank,
                matchedSeatCode: bestAvailableSeatForBranch.seatCode,
              };
            }
            return null;
          }).filter(Boolean);

          const finalEligibleBranches = branch.length > 0
            ? eligibleBranches.filter(b => branch.some(sel => sel.trim().toLowerCase() === b.branch_info.trim().toLowerCase()))
            : eligibleBranches;

          if (finalEligibleBranches.length > 0) {
            return {
              collegeName, // This is the full "CODE - NAME" key
              status: collegeInfo.status,
              level: collegeInfo.level,
              district: collegeInfo.district,
              branches: finalEligibleBranches.sort((a, b) => b.bestCutoff - a.bestCutoff),
              closingPercentile: Math.max(...finalEligibleBranches.map(b => b.bestCutoff)),
              closingRank: Math.min(...finalEligibleBranches.map(b => b.bestCutoffRank)),
            };
          }
          return null;
        }).filter(Boolean);

      } else { // JEE (All India) logic

        results = data.filter((college: any) => {
          const districtMatch = district.length === 0 || district.some(d => d === college.District);
          if (!districtMatch) return false;
          return college.Courses.some(course => {
            const branchMatch = branch.length === 0 || branch.some(b => b.trim().toLowerCase() === course["Course Name"].trim().toLowerCase());
            if (!branchMatch) return false;
            const meritData = course["All India Merit"].split(" ");
            const cutoffRank = parseInt(meritData[0], 10);
            const cutoffPercentile = parseFloat(meritData[1]?.replace(/[()]/g, ""));
            if (filterType === 'percentile') return !isNaN(cutoffPercentile) && percentileValue >= cutoffPercentile;
            else return !isNaN(cutoffRank) && rankValue <= cutoffRank;
          });
        }).map((college: any) => {
          const matchingCourses = college.Courses.filter(course => {
            const branchMatch = branch.length === 0 || branch.some(b => b.trim().toLowerCase() === course["Course Name"].trim().toLowerCase());
            if (!branchMatch) return false;
            const meritData = course["All India Merit"].split(" ");
            const cutoffRank = parseInt(meritData[0], 10);
            const cutoffPercentile = parseFloat(meritData[1]?.replace(/[()]/g, ""));
            if (filterType === 'percentile') return !isNaN(cutoffPercentile) && percentileValue >= cutoffPercentile;
            else return !isNaN(cutoffRank) && rankValue <= cutoffRank;
          });
          const getRank = c => parseInt(c["All India Merit"].split(" ")[0], 10);
          const getPercentile = c => parseFloat(c["All India Merit"].split(" ")[1]?.replace(/[()]/g, ""));

          // --- MODIFICATION: Create "CODE - NAME" string for JEE colleges ---
          const collegeCode = college["Institute Code"] || 'JEE-AI';
          const collegeName = `${collegeCode} - ${college["Institute Name"]}`;

          return {
            collegeName: collegeName, // Use the new combined name
            status: matchingCourses[0]["Merit Exam"],
            level: "All India",
            district: college.District,
            branches: matchingCourses.map(c => ({
              branch_info: c["Course Name"],
              bestCutoff: getPercentile(c),
              bestCutoffRank: getRank(c),
              matchedSeatCode: "JEE-AI"
            })).sort((a, b) => b.bestCutoff - a.bestCutoff),
            closingPercentile: Math.max(...matchingCourses.map(getPercentile)),
            closingRank: Math.min(...matchingCourses.map(getRank)),
          };
        });
      }

      // Sort the colleges by their best cutoff
      if (filterType === 'percentile') {
        results.sort((a, b) => b.closingPercentile - a.closingPercentile);
      } else {
        results.sort((a, b) => a.closingRank - b.closingRank);
      }

      setFilteredColleges(results.slice(0, 30)); // Set the college-grouped list, max 30

      if (results.length === 0) {
        setNoResultsFound(true);
      }
      setIsSearching(false);
    }, 100);
  }

  // --- downloadPDFList UPDATED to flatten the college list first ---
  const downloadPDFList = () => {
    if (filteredColleges.length === 0) { // Check the college list
      alert("No college data to download!");
      return;
    }

    // --- NEW LOGIC: Create the flat preference list from the college list ---
    const filteredPreferences: PreferenceItem[] = filteredColleges.flatMap(college => {
      // Split college key "CODE - NAME" into parts
      // This now works for both MHT-CET and JEE
      const nameParts = college.collegeName.split(' - ');
      const collegeCode = nameParts[0] || 'N/A';
      const collegeNameOnly = nameParts.length > 1 ? nameParts.slice(1).join(' - ') : college.collegeName;

      // Map each branch to the flat PreferenceItem structure
      return college.branches.map(b => ({
        collegeCode: collegeCode,
        collegeName: collegeNameOnly,
        branch_info: b.branch_info,
        matchedSeatCode: b.matchedSeatCode,
        bestCutoff: b.bestCutoff,
        bestCutoffRank: b.bestCutoffRank,
        district: college.district,
        status: college.status,
        level: college.level,
      }));
    });

    // Sort the new flat list by cutoff
    if (filterType === 'percentile') {
      filteredPreferences.sort((a, b) => b.bestCutoff - a.bestCutoff);
    } else {
      filteredPreferences.sort((a, b) => a.bestCutoffRank - b.bestCutoffRank);
    }
    // --- END OF NEW LOGIC ---


    const doc = new jsPDF();
    let startY = 20;

    // Add title and filters (same as before)
    doc.setFontSize(18);
    doc.text("Your Predicted Preference List", 14, startY);
    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text(
      `College Pe Charcha - ${examType} (CAP Round ${capRound})`,
      14,
      startY + 7
    );
    startY += 15;
    doc.setFontSize(11);
    doc.setTextColor(40);
    doc.text("Filters Applied:", 14, startY);
    startY += 7;
    doc.setFontSize(9);
    doc.setTextColor(60);
    const scoreText =
      filterType === "rank"
        ? `Your Rank: ${filters.rank}`
        : `Your Percentile: ${filters.percentile}`;
    doc.text(scoreText, 14, startY);
    startY += 5;
    if (examType === "MHT-CET") {
      doc.text(`Category: ${filters.caste} (${filters.gender})`, 14, startY);
      startY += 5;
      let special = [];
      if (filters.isDefence) special.push("Defence");
      if (filters.isPWD) special.push("PWD");
      if (special.length > 0) {
        doc.text(`Special Category: ${special.join(", ")}`, 14, startY);
        startY += 5;
      }
    }
    if (filters.branch.length > 0) {
      const branchText = `Preferred Branches: ${filters.branch.join(", ")}`;
      const splitBranchText = doc.splitTextToSize(branchText, 180);
      doc.text(splitBranchText, 14, startY);
      startY += splitBranchText.length * 5;
    }
    if (filters.district.length > 0) {
      const districtText = `Preferred Locations: ${filters.district.join(", ")}`;
      const splitDistrictText = doc.splitTextToSize(districtText, 180);
      doc.text(splitDistrictText, 14, startY);
      startY += splitDistrictText.length * 5;
    }
    startY += 5;

    // --- Create One Big Table from the flat list ---
    const tableColumn = [
      "#",
      "College Code",
      "College Name",
      "Branch",
      "Seat Type",
      filterType === "rank" ? "Cutoff Rank" : "Cutoff %ile",
    ];
    const tableRows = [];

    // Use the new filteredPreferences list we just created
    filteredPreferences.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.collegeCode,
        item.collegeName,
        item.branch_info,
        item.matchedSeatCode,
        filterType === "rank"
          ? (item.bestCutoffRank !== Infinity ? item.bestCutoffRank.toString() : 'N/A')
          : (item.bestCutoff ? item.bestCutoff.toFixed(2) : 'N/A')
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: startY,
      theme: "grid",
      headStyles: { fillColor: [246, 128, 20] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 25 },
        2: { cellWidth: 65 },
        3: { cellWidth: 45 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
      },
      didDrawPage: (data) => {
        startY = data.cursor.y;
      },
    });

    doc.save("CollegePeCharcha_Preference_List.pdf");
  };

  // --- JSX RENDER REVERTED ---
  return (
    <div className="min-h-screen transition-colors duration-300 bg-orange-50">

      {/* <UserNavbar /> */}

      <div className="backdrop-blur-md border-b transition-colors duration-300 border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-3 sm:mb-4">
              <div className="hidden sm:block bg-[#f68014] p-3 sm:p-4 rounded-2xl flex-shrink-0">
                <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h1 style={{ fontSize: "1.5rem" }} className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#f68014] sm:mb-0 text-center">
                College Predictor 2025
              </h1>
            </div>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 transition-colors duration-300 text-gray-600">
              Find your perfect engineering college based on your score and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="rounded-2xl shadow-xl border sticky top-24 transition-colors duration-300 bg-white border-orange-100">
              <div className="p-4 sm:p-6 border-b flex justify-between items-center transition-colors duration-300 border-orange-100">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center space-x-2 transition-colors duration-300 text-gray-800">
                  <Filter className="h-5 w-5 text-[#f68014]" />
                  <span>Filter Criteria</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <button onClick={resetFilters} title="Reset All Filters" className="transition-colors duration-200 text-gray-400 hover:text-[#f68014]">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* All filters are unchanged */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Select Exam Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["MHT-CET", "JEE"].map((type) => (
                      <label key={type} className="relative">
                        <input type="radio" name="examType" value={type} checked={examType === type} onChange={handleFilterChange} className="peer sr-only" />
                        <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                          <span className="text-xs sm:text-sm font-medium">{type === 'JEE' ? 'JEE-AI' : type}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">CAP Round</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["01", "02", "03"].map((round) => (
                      <label key={round} className="relative">
                        <input type="radio" name="capRound" value={round} checked={capRound === round} onChange={() => setCapRound(round)} className="peer sr-only" />
                        <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                          <span className="text-xs sm:text-sm font-medium">CAP_{round}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Filter By</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["percentile", "rank"].map((type) => (
                      <label key={type} className="relative">
                        <input type="radio" name="filterType" value={type} checked={filterType === type} onChange={handleFilterChange} className="peer sr-only" />
                        <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                          <span className="text-xs sm:text-sm font-medium capitalize">{type}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {filterType === 'percentile' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Award className="h-4 w-4 text-[#f68014]" /><span>Your Percentile</span></label>
                    <input type="number" name="percentile" value={filters.percentile} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${percentileError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="e.g., 95.5" />
                    {percentileError && <div className="text-xs text-red-600 mt-1">{percentileError}</div>}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Award className="h-4 w-4 text-[#f68014]" /><span>Your Rank</span></label>
                    <input type="number" name="rank" value={filters.rank} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${rankError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="e.g., 5000" />
                    {rankError && <div className="text-xs text-red-600 mt-1">{rankError}</div>}
                  </div>
                )}

                {examType === "MHT-CET" && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Gender</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[{ v: 'general', l: 'General' }, { v: 'female', l: 'Ladies' }].map((g) => (
                          <label key={g.v} className="relative">
                            <input type="radio" name="gender" value={g.v} checked={filters.gender === g.v} onChange={handleFilterChange} className="peer sr-only" />
                            <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                              <span className="text-xs sm:text-sm font-medium">{g.l}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">University Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[{ v: 'any', l: 'Any' }, { v: 'HU', l: 'Home (HU)' }, { v: 'OHU', l: 'Other (OHU)' }, { v: 'SL', l: 'State Level' }].map((u) => (
                          <label key={u.v} className="relative">
                            <input type="radio" name="universityType" value={u.v} checked={filters.universityType === u.v} onChange={handleFilterChange} className="peer sr-only" />
                            <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                              <span className="text-xs sm:text-sm font-medium">{u.l}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Users className="h-4 w-4 text-[#f68014]" /><span>Caste Category</span></label>
                      <select name="caste" value={filters.caste} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 border-orange-200 bg-gray-50`}>
                        <option value="">-- Select Caste --</option>
                        {casteCategories.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Special Categories</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" name="isDefence" checked={filters.isDefence} onChange={handleFilterChange} className="sr-only peer" />
                          <div className="w-5 h-5 border-2 border-orange-300 rounded peer-checked:bg-[#f68014] peer-checked:border-[#f68014] flex items-center justify-center"><CheckCircle className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" /></div>
                          <span className="text-sm transition-colors duration-300 text-gray-700">Defence Category</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" name="isPWD" checked={filters.isPWD} onChange={handleFilterChange} className="sr-only peer" />
                          <div className="w-5 h-5 border-2 border-orange-300 rounded peer-checked:bg-[#f68014] peer-checked:border-[#f68014] flex items-center justify-center"><CheckCircle className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" /></div>
                          <span className="text-sm transition-colors duration-300 text-gray-700">Person with Disability (PWD)</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><GraduationCap className="h-4 w-4 text-[#f68014]" /><span>Branches (Optional)</span></label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <select name="branch" value={selectedBranch} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 border-orange-200 bg-gray-50`}>
                        <option value="">Select Branch to add</option>
                        {availableBranches.filter(b => !filters.branch.includes(b)).map(b => (<option key={b} value={b}>{b}</option>))}
                      </select>
                      <button onClick={addBranch} disabled={!selectedBranch} className="px-4 py-2 bg-[#f68014] text-white rounded-xl hover:bg-orange-600 disabled:opacity-50">Add</button>
                    </div>
                    {filters.branch.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {filters.branch.map((b) => (
                          <div key={b} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors duration-300 bg-orange-100 text-[#f68014]">
                            <span>{b}</span>
                            <button onClick={() => removeBranch(b)} className="hover:text-orange-700"><X className="h-3 w-3" /></button>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><MapPin className="h-4 w-4 text-[#f68014]" /><span>Locations (Optional)</span></label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <select name="district" value={selectedDistrict} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 border-orange-200 bg-gray-50`}>
                        <option value="">Select Location to add</option>
                        {availableDistricts.filter(d => !filters.district.includes(d)).map(d => (<option key={d} value={d}>{d}</option>))}
                      </select>
                      <button onClick={addDistrict} disabled={!selectedDistrict} className="px-4 py-2 bg-[#f68014] text-white rounded-xl hover:bg-orange-600 disabled:opacity-50">Add</button>
                    </div>
                    {filters.district.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {filters.district.map((d) => (
                          <div key={d} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors duration-300 bg-orange-100 text-[#f68014]">
                            <span>{d}</span>
                            <button onClick={() => removeDistrict(d)} className="hover:text-orange-700"><X className="h-3 w-3" /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button onClick={applyFilters} className="w-full bg-[#f68014] text-white py-3 px-4 rounded-xl hover:bg-orange-600 transition flex items-center justify-center space-x-2 shadow-lg">
                  <Search className="h-5 w-5" />
                  <span className="font-medium">Find Colleges</span>
                </button>
              </div>
            </div>
          </div>

          {/* --- JSX RENDER REVERTED to college-grouped list --- */}
          <div className="lg:col-span-3">
            <div className="space-y-4 sm:space-y-6">
              {filteredColleges.length > 0 && (
                <div className="flex justify-between items-center rounded-2xl shadow-lg border p-4 transition-colors duration-300 bg-white border-orange-100">
                  <p className="text-sm font-medium transition-colors duration-300 text-gray-700">Showing top <b className="text-[#f68014]">{filteredColleges.length}</b> colleges based on your criteria.</p>
                  <button onClick={downloadPDFList} className="bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                    <Download className="h-4 w-4" />
                    <span className="font-medium">Download List (PDF)</span>
                  </button>
                </div>
              )}

              {isSearching ? (
                <div className="rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition-colors duration-300 bg-white border-orange-100">
                  <div className="flex justify-center items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f68014]"></div>
                    <h3 className="text-base sm:text-lg font-semibold transition-colors duration-300 text-gray-800">Finding best colleges for you...</h3>
                  </div>
                </div>
              ) : filteredColleges.length > 0 ? (
                <>
                  {filteredColleges.map((college, idx) => (
                    <div key={idx} className="rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-white border-orange-100">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4">
                          <div className="flex-1">
                            <h2 className="text-lg sm:text-xl font-bold my-2 leading-tight transition-colors duration-300 text-gray-800">{college.collegeName}</h2>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm mb-3">
                              <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm">{college.status}</span>
                              <span className="flex items-center space-x-1 text-xs sm:text-sm transition-colors duration-300 text-gray-600"><Award className="h-3 w-3 sm:h-4 sm:w-4" /><span>{college.level}</span></span>
                            </div>
                            {college.district && (<p className="text-xs sm:text-sm flex items-center space-x-1 mb-2 transition-colors duration-300 text-gray-600"><MapPin className="h-3 w-3 sm:h-4 sm:w-4" /><span>District: {college.district}</span></p>)}
                          </div>
                          <div className="text-left">
                            <div className="bg-[#f68014] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl inline-block">
                              <div className="text-xs font-medium opacity-90">{filterType === 'rank' ? 'Best Closing Rank' : 'Best Closing %ile'}</div>
                              <div className="text-base sm:text-lg text-left font-bold">{filterType === 'rank' ? (college.closingRank !== Infinity ? college.closingRank : 'N/A') : (college.closingPercentile ? college.closingPercentile.toFixed(2) : 'N/A')}</div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t pt-4 transition-colors duration-300 border-orange-100">
                          <h3 className="font-semibold mb-3 flex items-center space-x-2 text-sm sm:text-base transition-colors duration-300 text-gray-800"><GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-[#f68014]" /><span>Eligible Branches For You</span></h3>
                          <div className="space-y-2">
                            {college.branches.map((branch, i) => (
                              <div key={i} className="rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-orange-50 transition-colors duration-200 bg-gray-50 text-gray-700">
                                <div className="flex justify-between items-center">
                                  <span className="flex items-center space-x-2"><div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f68014] rounded-full"></div><span className="font-medium">{branch.branch_info}</span></span>
                                  <span className="font-mono text-right transition-colors duration-300 text-gray-500">{filterType === 'rank' ? `Rank: ${branch.bestCutoffRank}` : `Cutoff: ${branch.bestCutoff.toFixed(2)}%`}</span>
                                </div>
                                <div className="pl-4 mt-1"><span className="text-orange-700 font-semibold" style={{ fontSize: '11px' }}>Seat: {branch.matchedSeatCode}</span></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : noResultsFound ? (
                <div className="rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition-colors duration-300 bg-white border-orange-100">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><X className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" /></div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 text-gray-800">No Colleges Found</h3>
                  <p className="text-sm sm:text-base mb-4 transition-colors duration-300 text-gray-600">Unfortunately, no colleges match your specific criteria. Please try adjusting the filters.</p>
                </div>
              ) : (
                <div className="rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition-colors duration-300 bg-white border-orange-100">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 bg-gray-100"><Search className="h-6 w-6 sm:h-8 sm:w-8 transition-colors duration-300 text-gray-400" /></div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 text-gray-800">Find Your College</h3>
                  <p className="text-sm sm:text-base mb-4 transition-colors duration-300 text-gray-600">Fill in the filters and click "Find Colleges" to see your personalized results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default PercentileDisplay;