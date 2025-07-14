async function loadCSV() {
    const response = await fetch('idahofalls.csv');
    const data = await response.text();
    const rows = data.split('\n').map(row => row.split(','));
    
    function formatPercentage(value) {
        return value.replace(/%+/g, '%');
    }
    
    // Green Box (Lines 2-6)
    document.querySelector("#greenbox h1:nth-of-type(1)").innerText = rows[1][0]; // Date
    document.querySelector("#greenbox h1:nth-of-type(2)").innerText = rows[2][0]; // Time
    document.querySelector("#greenbox h1:nth-of-type(3)").innerText = formatPercentage(rows[3][0]); // Daily Labor
    document.querySelector("#greenbox h1:nth-of-type(4)").innerText = formatPercentage(rows[4][0]); // Current Hourly Rate
    
    // Yellow Box (Lines 7-9)
    document.querySelector("#morning_block h1").innerText = formatPercentage(rows[6][0]); // Morning
    document.querySelector("#afternoon_block h1").innerText = formatPercentage(rows[7][0]); // Afternoon
    document.querySelector("#evening_block h1").innerText = formatPercentage(rows[8][0]); // Evening
    
    // Orange Box (Lines 12-18)
    const weekData = rows.slice(11, 18);
    document.querySelectorAll("#turbogrid .date").forEach((el, i) => el.innerText = weekData[i][0]);
    document.querySelectorAll("#turbogrid .laborpercent").forEach((el, i) => el.innerText = formatPercentage(weekData[i][1]));
    document.querySelectorAll("#turbogrid .morning").forEach((el, i) => el.innerText = formatPercentage(weekData[i][2]));
    document.querySelectorAll("#turbogrid .afternoon").forEach((el, i) => el.innerText = formatPercentage(weekData[i][3]));
    document.querySelectorAll("#turbogrid .evening").forEach((el, i) => el.innerText = formatPercentage(weekData[i][4]));
}

document.addEventListener("DOMContentLoaded", loadCSV);
