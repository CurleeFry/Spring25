let currentFilename = "";
let currentLaborData = [];

async function loadCSV(csvFile) {
    const response = await fetch(csvFile);
    const data = await response.text();
    const rows = data.split('\n').map(row => row.split(','));

    function formatPercentage(value) {
        return value ? value.replace(/%+/g, '%') : '0%';
    }

    // Green Box
    document.querySelector("#greenbox h1:nth-of-type(1)").innerText = rows[1]?.[0] || '';
    document.querySelector("#greenbox h1:nth-of-type(2)").innerText = rows[2]?.[0] || '';
    document.querySelector("#greenbox h1:nth-of-type(3)").innerText = formatPercentage(rows[3]?.[0] || '');
    document.querySelector("#greenbox h1:nth-of-type(4)").innerText = formatPercentage(rows[4]?.[0] || '');

    // Yellow Box
    document.querySelector("#morning_block h1").innerText = formatPercentage(rows[6]?.[0] || '');
    document.querySelector("#afternoon_block h1").innerText = formatPercentage(rows[7]?.[0] || '');
    document.querySelector("#evening_block h1").innerText = formatPercentage(rows[8]?.[0] || '');

    // Orange Box (Weekly Data)
    const weekData = rows.slice(11, 18); // Assuming 7 rows for 7 days

    const dateCells = document.querySelectorAll("#turbogrid .date");
    const laborCells = document.querySelectorAll("#turbogrid .laborpercent");
    const morningCells = document.querySelectorAll("#turbogrid .morning");
    const afternoonCells = document.querySelectorAll("#turbogrid .afternoon");
    const eveningCells = document.querySelectorAll("#turbogrid .evening");

    weekData.forEach((row, i) => {
        if (!row || row.length < 5) return;

        const day = row[0]?.trim();                   // e.g. "Tuesday (1/7)"
        const baseDay = day?.split(" ")[0];           // ✅ Extract "Tuesday"

        const labor = row[1];
        const morning = row[2];
        const afternoon = row[3];
        const evening = row[4];

        // ✅ Update button inside .date cell (DON'T overwrite it!)
        const button = dateCells[i]?.querySelector("button");
        if (button) {
            button.textContent = day;                 // Keep full display
            button.setAttribute("data-day", baseDay); // ✅ Use just weekday
        }

        if (laborCells[i]) laborCells[i].innerText = formatPercentage(labor);
        if (morningCells[i]) morningCells[i].innerText = formatPercentage(morning);
        if (afternoonCells[i]) afternoonCells[i].innerText = formatPercentage(afternoon);
        if (eveningCells[i]) eveningCells[i].innerText = formatPercentage(evening);
    });
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

const laborDetails = {
    Monday: [
        { time: "8:00", percent: 20 }, { time: "9:00", percent: 21 }, { time: "10:00", percent: 22 },
        { time: "11:00", percent: 23 }, { time: "12:00", percent: 24 }, { time: "1:00", percent: 22 },
        { time: "2:00", percent: 21 }, { time: "3:00", percent: 25 }, { time: "4:00", percent: 27 },
        { time: "5:00", percent: 28 }, { time: "6:00", percent: 22 }, { time: "7:00", percent: 21 },
        { time: "8:00", percent: 20 }, { time: "9:00", percent: 19 }, { time: "10:00", percent: 18 },
        { time: "11:00", percent: 0 }
    ],
    Tuesday: [
        { time: "8:00", percent: 25 }, { time: "9:00", percent: 23 }, { time: "10:00", percent: 20 },
        { time: "11:00", percent: 20 }, { time: "12:00", percent: 18 }, { time: "1:00", percent: 22 },
        { time: "2:00", percent: 23 }, { time: "3:00", percent: 25 }, { time: "4:00", percent: 24 },
        { time: "5:00", percent: 20 }, { time: "6:00", percent: 19 }, { time: "7:00", percent: 21 },
        { time: "8:00", percent: 22 }, { time: "9:00", percent: 25 }, { time: "10:00", percent: 45 },
        { time: "11:00", percent: 0 }
    ],
    Wednesday: [
        { time: "8:00", percent: 18 }, { time: "9:00", percent: 20 }, { time: "10:00", percent: 21 },
        { time: "11:00", percent: 22 }, { time: "12:00", percent: 23 }, { time: "1:00", percent: 24 },
        { time: "2:00", percent: 22 }, { time: "3:00", percent: 20 }, { time: "4:00", percent: 19 },
        { time: "5:00", percent: 18 }, { time: "6:00", percent: 17 }, { time: "7:00", percent: 19 },
        { time: "8:00", percent: 20 }, { time: "9:00", percent: 21 }, { time: "10:00", percent: 22 },
        { time: "11:00", percent: 0 }
    ],
    Thursday: [
        { time: "8:00", percent: 22 }, { time: "9:00", percent: 23 }, { time: "10:00", percent: 24 },
        { time: "11:00", percent: 25 }, { time: "12:00", percent: 24 }, { time: "1:00", percent: 23 },
        { time: "2:00", percent: 22 }, { time: "3:00", percent: 21 }, { time: "4:00", percent: 20 },
        { time: "5:00", percent: 19 }, { time: "6:00", percent: 18 }, { time: "7:00", percent: 20 },
        { time: "8:00", percent: 21 }, { time: "9:00", percent: 22 }, { time: "10:00", percent: 23 },
        { time: "11:00", percent: 0 }
    ],
    Friday: [
        { time: "8:00", percent: 30 }, { time: "9:00", percent: 28 }, { time: "10:00", percent: 27 },
        { time: "11:00", percent: 25 }, { time: "12:00", percent: 24 }, { time: "1:00", percent: 23 },
        { time: "2:00", percent: 22 }, { time: "3:00", percent: 25 }, { time: "4:00", percent: 27 },
        { time: "5:00", percent: 28 }, { time: "6:00", percent: 26 }, { time: "7:00", percent: 25 },
        { time: "8:00", percent: 24 }, { time: "9:00", percent: 26 }, { time: "10:00", percent: 30 },
        { time: "11:00", percent: 0 }
    ],
    Saturday: [
        { time: "8:00", percent: 35 }, { time: "9:00", percent: 33 }, { time: "10:00", percent: 32 },
        { time: "11:00", percent: 30 }, { time: "12:00", percent: 29 }, { time: "1:00", percent: 28 },
        { time: "2:00", percent: 27 }, { time: "3:00", percent: 28 }, { time: "4:00", percent: 29 },
        { time: "5:00", percent: 30 }, { time: "6:00", percent: 28 }, { time: "7:00", percent: 27 },
        { time: "8:00", percent: 26 }, { time: "9:00", percent: 28 }, { time: "10:00", percent: 32 },
        { time: "11:00", percent: 0 }
    ],
    Sunday: [
        { time: "8:00", percent: 15 }, { time: "9:00", percent: 14 }, { time: "10:00", percent: 13 },
        { time: "11:00", percent: 12 }, { time: "12:00", percent: 11 }, { time: "1:00", percent: 10 },
        { time: "2:00", percent: 9 }, { time: "3:00", percent: 10 }, { time: "4:00", percent: 11 },
        { time: "5:00", percent: 12 }, { time: "6:00", percent: 13 }, { time: "7:00", percent: 14 },
        { time: "8:00", percent: 15 }, { time: "9:00", percent: 16 }, { time: "10:00", percent: 18 },
        { time: "11:00", percent: 0 }
    ]
};

// ========== DOM Ready ==========

document.addEventListener("DOMContentLoaded", () => {
    // Set text and data-day attribute of the first date button
    const firstDateBtn = document.querySelector(".date-btn");
    if (firstDateBtn) {
        firstDateBtn.textContent = "Loading,,,";
        firstDateBtn.setAttribute("data-day", "Tuesday");
    }

    // Use event delegation or direct click
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("date-btn")) {
            const day = e.target.getAttribute("data-day");
            const details = laborDetails[day];

            if (details) {
                let message = `${day} Labor Details:\n\n`;
                details.forEach(entry => {
                    message += `${entry.time} - ${entry.percent}%\n`;
                });
                alert(message);
            } else {
                alert(`No detailed data for ${day}`);
            }
        }
    });
});

