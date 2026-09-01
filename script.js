/* =================================
   STUDY STREAK APP
================================= */


/* =================================
   DATA
================================= */

let sessions =
    JSON.parse(
        localStorage.getItem("studySessions")
    ) || [];


let journalEntries =
    JSON.parse(
        localStorage.getItem("journalEntries")
    ) || [];


let dailyGoal =
    Number(
        localStorage.getItem("dailyGoal")
    ) || 120;


/* =================================
   ELEMENTS
================================= */

const studyForm =
    document.getElementById("studyForm");

const journalForm =
    document.getElementById("journalForm");

const themeBtn =
    document.getElementById("themeBtn");

const saveGoalBtn =
    document.getElementById("saveGoalBtn");


/* =================================
   CURRENT DATE
================================= */

function getToday() {

    const today = new Date();

    return today.toISOString().split("T")[0];
}


function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


/* =================================
   DISPLAY CURRENT DATE
================================= */

function displayCurrentDate() {

    const dateElement =
        document.getElementById(
            "currentDate"
        );

    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
}


/* =================================
   SAVE DATA
================================= */

function saveData() {

    localStorage.setItem(
        "studySessions",
        JSON.stringify(sessions)
    );

    localStorage.setItem(
        "journalEntries",
        JSON.stringify(journalEntries)
    );

    localStorage.setItem(
        "dailyGoal",
        dailyGoal
    );
}


/* =================================
   ADD STUDY SESSION
================================= */

studyForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const subject =
            document
                .getElementById("subject")
                .value
                .trim();


        const minutes =
            Number(
                document
                    .getElementById("minutes")
                    .value
            );


        if (!subject || minutes <= 0) {

            alert(
                "Please enter a valid subject and study time."
            );

            return;
        }


        const session = {

            id: Date.now(),

            subject: subject,

            minutes: minutes,

            date: getToday()
        };


        sessions.push(session);


        saveData();

        studyForm.reset();

        updateDashboard();

        alert(
            `Great job! You studied ${minutes} minutes of ${subject}. 🔥`
        );
    }
);


/* =================================
   CALCULATE TODAY'S MINUTES
================================= */

function getTodayMinutes() {

    const today = getToday();

    return sessions

        .filter(
            session =>
                session.date === today
        )

        .reduce(
            (total, session) =>
                total + session.minutes,
            0
        );
}


/* =================================
   TOTAL STUDY TIME
================================= */

function getTotalMinutes() {

    return sessions.reduce(
        (total, session) =>
            total + session.minutes,
        0
    );
}


/* =================================
   CALCULATE STREAK
================================= */

function calculateStreak() {

    if (sessions.length === 0) {

        return 0;
    }


    const studyDates = [

        ...new Set(
            sessions.map(
                session => session.date
            )
        )

    ];


    studyDates.sort(
        (a, b) =>
            new Date(b) -
            new Date(a)
    );


    let streak = 0;

    let currentDate =
        new Date(getToday());


    for (
        let i = 0;
        i < studyDates.length;
        i++
    ) {

        const date =
            new Date(studyDates[i]);


        const difference =
            Math.floor(
                (
                    currentDate - date
                ) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 0) {

            streak++;

            currentDate = new Date(date);

        } else if (difference === 1) {

            streak++;

            currentDate = new Date(date);

        } else {

            break;
        }
    }


    return streak;
}


/* =================================
   UPDATE STATISTICS
================================= */

function updateStats() {

    const totalMinutes =
        getTotalMinutes();


    const totalHours =
        (totalMinutes / 60)
            .toFixed(1);


    document.getElementById(
        "totalHours"
    ).textContent = totalHours;


    document.getElementById(
        "sessionCount"
    ).textContent =
        sessions.length;


    document.getElementById(
        "streak"
    ).textContent =
        calculateStreak();
}


/* =================================
   UPDATE DAILY GOAL
================================= */

function updateGoal() {

    const todayMinutes =
        getTodayMinutes();


    const percentage =
        Math.min(
            Math.round(
                (
                    todayMinutes /
                    dailyGoal
                ) * 100
            ),
            100
        );


    document.getElementById(
        "todayMinutes"
    ).textContent =
        todayMinutes;


    document.getElementById(
        "goalMinutes"
    ).textContent =
        dailyGoal;


    document.getElementById(
        "goalPercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";


    document.getElementById(
        "goalInput"
    ).value =
        dailyGoal;
}


/* =================================
   SAVE DAILY GOAL
================================= */

saveGoalBtn.addEventListener(
    "click",
    function() {

        const value =
            Number(
                document.getElementById(
                    "goalInput"
                ).value
            );


        if (value < 10) {

            alert(
                "Goal should be at least 10 minutes."
            );

            return;
        }


        dailyGoal = value;

        saveData();

        updateGoal();

        alert(
            "Daily goal updated! 🎯"
        );
    }
);


/* =================================
   WEEKLY CHART
================================= */

function updateChart() {

    const chart =
        document.getElementById(
            "weeklyChart"
        );


    chart.innerHTML = "";


    const today =
        new Date();


    const days = [];


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date(today);


        date.setDate(
            today.getDate() - i
        );


        const dateString =
            date.toISOString()
                .split("T")[0];


        const minutes =
            sessions

                .filter(
                    session =>
                        session.date ===
                        dateString
                )

                .reduce(
                    (
                        total,
                        session
                    ) =>
                        total +
                        session.minutes,
                    0
                );


        days.push({

            date: dateString,

            minutes: minutes,

            name:
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                )

        });
    }


    const maxMinutes =
        Math.max(
            ...days.map(
                day => day.minutes
            ),
            60
        );


    days.forEach(
        day => {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "bar-wrapper";


            const value =
                document.createElement(
                    "span"
                );


            value.className =
                "bar-value";


            value.textContent =
                day.minutes + "m";


            const bar =
                document.createElement(
                    "div"
                );


            bar.className =
                "bar";


            const height =
                Math.max(
                    (
                        day.minutes /
                        maxMinutes
                    ) * 160,
                    4
                );


            bar.style.height =
                height + "px";


            const dayName =
                document.createElement(
                    "span"
                );


            dayName.className =
                "bar-day";


            dayName.textContent =
                day.name;


            wrapper.appendChild(
                value
            );

            wrapper.appendChild(
                bar
            );

            wrapper.appendChild(
                dayName
            );


            chart.appendChild(
                wrapper
            );
        }
    );
}


/* =================================
   ACHIEVEMENTS
================================= */

function updateAchievements() {

    const badges =
        document.getElementById(
            "badges"
        );


    badges.innerHTML = "";


    const totalMinutes =
        getTotalMinutes();


    const streak =
        calculateStreak();


    const achievements = [

        {
            icon: "🔥",

            name: "7 Day Streak",

            unlocked:
                streak >= 7
        },


        {
            icon: "⚡",

            name: "10 Hours",

            unlocked:
                totalMinutes >= 600
        },


        {
            icon: "🏆",

            name: "30 Day Streak",

            unlocked:
                streak >= 30
        },


        {
            icon: "📚",

            name: "50 Sessions",

            unlocked:
                sessions.length >= 50
        },


        {
            icon: "💎",

            name: "50 Hours",

            unlocked:
                totalMinutes >= 3000
        },


        {
            icon: "👑",

            name: "100 Hours",

            unlocked:
                totalMinutes >= 6000
        }

    ];


    let unlockedCount = 0;


    achievements.forEach(
        achievement => {

            if (
                achievement.unlocked
            ) {

                unlockedCount++;
            }


            const badge =
                document.createElement(
                    "div"
                );


            badge.className =
                "badge";


            if (
                achievement.unlocked
            ) {

                badge.classList.add(
                    "unlocked"
                );
            }


            badge.innerHTML = `

                <div class="badge-icon">
                    ${achievement.icon}
                </div>

                <div class="badge-name">
                    ${achievement.name}
                </div>

            `;


            badges.appendChild(
                badge
            );
        }
    );


    document.getElementById(
        "badgeCount"
    ).textContent =
        unlockedCount;
}


/* =================================
   JOURNAL
================================= */

journalForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const text =
            document
                .getElementById(
                    "journalText"
                )
                .value
                .trim();


        if (!text) {

            return;
        }


        const entry = {

            id: Date.now(),

            text: text,

            date: getToday()

        };


        journalEntries.unshift(
            entry
        );


        saveData();

        journalForm.reset();

        displayJournal();
    }
);


/* =================================
   DISPLAY JOURNAL
================================= */

function displayJournal() {

    const list =
        document.getElementById(
            "journalList"
        );


    list.innerHTML = "";


    if (
        journalEntries.length === 0
    ) {

        list.innerHTML = `

            <div class="empty">

                No journal entries yet.
                Start learning and write
                something today! 📝

            </div>

        `;

        return;
    }


    journalEntries.forEach(
        entry => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "journal-entry";


            item.innerHTML = `

                <div>

                    <div class="journal-date">
                        ${formatDate(entry.date)}
                    </div>

                    <p>
                        ${escapeHTML(entry.text)}
                    </p>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteJournal(${entry.id})">

                    🗑️

                </button>

            `;


            list.appendChild(
                item
            );
        }
    );
}


/* =================================
   DELETE JOURNAL
================================= */

function deleteJournal(id) {

    journalEntries =
        journalEntries.filter(
            entry =>
                entry.id !== id
        );


    saveData();

    displayJournal();
}


/* =================================
   SECURITY HELPER
================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;
}


/* =================================
   DARK MODE
================================= */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "darkMode",
            darkMode
        );


        themeBtn.textContent =
            darkMode
                ? "☀️"
                : "🌙";
    }
);


/* =================================
   LOAD DARK MODE
================================= */

function loadTheme() {

    const darkMode =
        localStorage.getItem(
            "darkMode"
        );


    if (darkMode === "true") {

        document.body.classList.add(
            "dark"
        );

        themeBtn.textContent =
            "☀️";
    }
}


/* =================================
   UPDATE EVERYTHING
================================= */

function updateDashboard() {

    updateStats();

    updateGoal();

    updateChart();

    updateAchievements();

    displayJournal();
}


/* =================================
   START APPLICATION
================================= */

displayCurrentDate();

loadTheme();

updateDashboard();
