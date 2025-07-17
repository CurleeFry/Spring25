let currentFilename = "";
let currentLaborData = [];



async function loadCSV(csvFile) {
    const response = await fetch(csvFile);
    const data = await response.text();
    const rows = data.split('\n').map(row => row.split(','));

    function formatPercentage(value) {
        return value.replace(/%+/g, '%');
    }

    // Green Box
    document.querySelector("#greenbox h1:nth-of-type(1)").innerText = rows[1][0];
    document.querySelector("#greenbox h1:nth-of-type(2)").innerText = rows[2][0];
    document.querySelector("#greenbox h1:nth-of-type(3)").innerText = formatPercentage(rows[3][0]);
    document.querySelector("#greenbox h1:nth-of-type(4)").innerText = formatPercentage(rows[4][0]);

    // Yellow Box
    document.querySelector("#morning_block h1").innerText = formatPercentage(rows[6][0]);
    document.querySelector("#afternoon_block h1").innerText = formatPercentage(rows[7][0]);
    document.querySelector("#evening_block h1").innerText = formatPercentage(rows[8][0]);

    // Orange Box
    const weekData = rows.slice(11, 18);
    document.querySelectorAll("#turbogrid .date").forEach((el, i) => el.innerText = weekData[i][0]);
    document.querySelectorAll("#turbogrid .laborpercent").forEach((el, i) => el.innerText = formatPercentage(weekData[i][1]));
    document.querySelectorAll("#turbogrid .morning").forEach((el, i) => el.innerText = formatPercentage(weekData[i][2]));
    document.querySelectorAll("#turbogrid .afternoon").forEach((el, i) => el.innerText = formatPercentage(weekData[i][3]));
    document.querySelectorAll("#turbogrid .evening").forEach((el, i) => el.innerText = formatPercentage(weekData[i][4]));
}

document.addEventListener("DOMContentLoaded", () => {
    loadCSV("idahofalls.csv");

    const dropdown = document.getElementById("locationSelect");
    dropdown.addEventListener("change", () => {
        const selected = dropdown.value;

        if (selected === "idahofalls") {
            loadCSV("idahofalls.csv");
        } else if (selected === "rexburg") {
            loadCSV("rexburg.csv");
        }
    });
});

// Array to store saved data
const savedData = [];

function saveCurrentData(filename, currentLaborData) {
  const index = savedData.findIndex(entry => entry.filename === filename);

  const newEntry = {
    filename: filename,
    data: currentLaborData
  };

  if (index !== -1) {
    savedData[index] = newEntry;
  } else {
    savedData.push(newEntry);
  }

  console.log(`Saved data for '${filename}':`, newEntry);
}

// Save button listener
const saveButton = document.getElementById('saveBtn');
if (saveButton) {
  saveButton.addEventListener('click', () => {
    if (typeof currentLaborData !== 'undefined' && typeof currentFilename !== 'undefined') {
      saveCurrentData(currentFilename, currentLaborData);
    } else {
      console.warn('No labor data or filename available to save.');
    }
  });
}
