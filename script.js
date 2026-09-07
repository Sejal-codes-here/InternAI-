/* =========================================================
   INTERNFINDER - SCRIPT.JS
   ========================================================= */

/* -----------------------------
   GLOBAL STATE
----------------------------- */

let selectedSkills = [];
let selectedWorkMode = "Any";
let currentYear = 2027;


/* -----------------------------
   INTERNSHIP DATA
----------------------------- */

const internships = [
    {
        id: 1,
        company: "Google",
        logo: "G",
        role: "Software Engineering Intern",
        category: "Software Engineering",
        skills: ["Python", "C++", "SQL", "Data Structures"],
        location: "Bangalore / Remote",
        workMode: "Hybrid",
        status: "expected",
        openingWindow: "Feb - Mar",
        deadline: "Expected March 2027",
        description:
            "Software engineering internship involving software development, algorithms and scalable systems.",
        why:
            "Your programming, database and problem-solving skills align strongly with this role.",
        historicalPattern: "3 of the last 4 years",
        confidence: "High"
    },

    {
        id: 2,
        company: "Microsoft",
        logo: "M",
        role: "Software Engineer Intern",
        category: "Software Engineering",
        skills: ["C++", "Data Structures", "Git & GitHub", "JavaScript"],
        location: "Hyderabad / Bangalore",
        workMode: "Hybrid",
        status: "upcoming",
        openingWindow: "Mar - Apr",
        deadline: "Opening soon",
        description:
            "Engineering internship focused on building software products and solving large-scale technical problems.",
        why:
            "Your DSA, programming and development skills match the technical requirements.",
        historicalPattern: "4 of the last 5 years",
        confidence: "High"
    },

    {
        id: 3,
        company: "Amazon",
        logo: "A",
        role: "SDE Intern",
        category: "Software Engineering",
        skills: ["Java", "Data Structures", "SQL", "Python"],
        location: "Bangalore / Chennai / Hyderabad",
        workMode: "On-site",
        status: "open",
        openingWindow: "Jan - Feb",
        deadline: "Apply soon",
        description:
            "Software development internship involving coding, debugging and scalable systems.",
        why:
            "Your Python, SQL and DSA background makes this a strong technical match.",
        historicalPattern: "5 of the last 5 years",
        confidence: "Very High"
    },

    {
        id: 4,
        company: "Meta",
        logo: "M",
        role: "Software Engineer Intern",
        category: "Software Engineering",
        skills: ["Python", "C++", "JavaScript", "Data Structures"],
        location: "Remote / Bangalore",
        workMode: "Remote",
        status: "expected",
        openingWindow: "May - Jun",
        deadline: "Expected in May",
        description:
            "Engineering internship involving product development, algorithms and large-scale systems.",
        why:
            "Your programming and web development skills are relevant to this opportunity.",
        historicalPattern: "3 of the last 4 years",
        confidence: "Medium"
    },

    {
        id: 5,
        company: "Adobe",
        logo: "A",
        role: "Frontend Development Intern",
        category: "Web Development",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        location: "Noida / Bangalore",
        workMode: "Hybrid",
        status: "upcoming",
        openingWindow: "Apr - May",
        deadline: "Opening soon",
        description:
            "Frontend development internship focused on building modern user interfaces.",
        why:
            "Your web development skills are directly relevant to this role.",
        historicalPattern: "4 of the last 5 years",
        confidence: "High"
    },

    {
        id: 6,
        company: "Infosys",
        logo: "I",
        role: "Data Science Intern",
        category: "Data Science",
        skills: ["Python", "SQL", "Machine Learning"],
        location: "Pune / Bangalore",
        workMode: "Hybrid",
        status: "expected",
        openingWindow: "Jun - Jul",
        deadline: "Expected in June",
        description:
            "Data science internship involving analytics, machine learning and data-driven problem solving.",
        why:
            "Your Python, SQL and ML skills align with this opportunity.",
        historicalPattern: "3 of the last 4 years",
        confidence: "Medium"
    },

    {
        id: 7,
        company: "Flipkart",
        logo: "F",
        role: "Backend Development Intern",
        category: "Backend Development",
        skills: ["Java", "Node.js", "SQL", "Git & GitHub"],
        location: "Bangalore",
        workMode: "On-site",
        status: "expected",
        openingWindow: "Jul - Aug",
        deadline: "Expected in July",
        description:
            "Backend engineering internship focused on APIs, databases and scalable services.",
        why:
            "Your backend, database and version-control skills match this role.",
        historicalPattern: "3 of the last 5 years",
        confidence: "Medium"
    },

    {
        id: 8,
        company: "NVIDIA",
        logo: "N",
        role: "AI / ML Intern",
        category: "AI/ML",
        skills: ["Python", "Machine Learning", "C++", "Data Structures"],
        location: "Bangalore",
        workMode: "On-site",
        status: "expected",
        openingWindow: "Sep - Oct",
        deadline: "Expected in September",
        description:
            "AI/ML internship focused on machine learning systems, algorithms and computational technologies.",
        why:
            "Your Python, ML and programming background aligns with this opportunity.",
        historicalPattern: "4 of the last 5 years",
        confidence: "High"
    }
];


/* =========================================================
   SKILL SELECTION
   ========================================================= */

function toggleSkill(button) {

    const skill = button.textContent.trim();

    if (selectedSkills.includes(skill)) {

        selectedSkills = selectedSkills.filter(function(item) {
            return item !== skill;
        });

        button.classList.remove("selected");

    } else {

        selectedSkills.push(skill);
        button.classList.add("selected");
    }

    updateSkillProfile();
}


/* =========================================================
   UPDATE PROFILE
   ========================================================= */

function updateSkillProfile() {

    const countElement = document.getElementById("skill-count");
    const container = document.getElementById("selected-skills");

    if (!countElement || !container) {
        return;
    }

    countElement.textContent = selectedSkills.length;

    container.innerHTML = "";

    if (selectedSkills.length === 0) {

        const emptyText = document.createElement("p");

        emptyText.className = "empty-skills";
        emptyText.textContent =
            "Select skills to build your profile.";

        container.appendChild(emptyText);

        return;
    }

    selectedSkills.forEach(function(skill) {

        const tag = document.createElement("span");

        tag.className = "selected-skill";
        tag.textContent = skill;

        container.appendChild(tag);
    });
}


/* =========================================================
   WORK MODE SELECTION
   ========================================================= */

function selectChoice(button, type) {

    const parent = button.parentElement;

    if (!parent) {
        return;
    }

    const buttons = parent.querySelectorAll(".choice-btn");

    buttons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    if (type === "workMode") {
        selectedWorkMode = button.textContent.trim();
    }
}


/* =========================================================
   CALCULATE MATCH
   ========================================================= */

function calculateMatch(job) {

    if (selectedSkills.length === 0) {

        return {
            score: 0,
            matchedSkills: [],
            missingSkills: job.skills.slice()
        };
    }

    const matchedSkills = job.skills.filter(function(skill) {

        return selectedSkills.includes(skill);

    });

    const missingSkills = job.skills.filter(function(skill) {

        return !selectedSkills.includes(skill);

    });


    /* Skill score = 70% */
    const skillScore =
        (matchedSkills.length / job.skills.length) * 70;


    /* Role score = 20% */
    const roleElement =
        document.getElementById("preferred-role");

    const selectedRole =
        roleElement ? roleElement.value : "";


    let roleScore = 0;

    if (
        selectedRole === "" ||
        selectedRole === "Any Role" ||
        selectedRole === job.category
    ) {
        roleScore = 20;
    } else {
        roleScore = 5;
    }


    /* Work mode score = 10% */
    let workScore = 0;

    if (
        selectedWorkMode === "Any" ||
        selectedWorkMode === job.workMode ||
        job.workMode === "Hybrid"
    ) {
        workScore = 10;
    }


    let score =
        Math.round(skillScore + roleScore + workScore);


    if (score > 100) {
        score = 100;
    }

    return {
        score: score,
        matchedSkills: matchedSkills,
        missingSkills: missingSkills
    };
}


/* =========================================================
   GET MATCHED INTERNSHIPS
   ========================================================= */

function getMatchedInternships() {

    return internships.map(function(job) {

        const match = calculateMatch(job);

        return {
            job: job,
            score: match.score,
            matchedSkills: match.matchedSkills,
            missingSkills: match.missingSkills
        };

    }).sort(function(a, b) {

        return b.score - a.score;

    });
}


/* =========================================================
   DISPLAY JOBS
   ========================================================= */

function updateJobMatches() {

    const container =
        document.getElementById("jobs-container");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const results = getMatchedInternships();


    results.forEach(function(result) {

        const card =
            createJobCard(
                result.job,
                result.score,
                result.matchedSkills
            );

        container.appendChild(card);

    });


    const recommendationText =
        document.getElementById("recommendation-text");

    if (recommendationText) {

        recommendationText.textContent =
            "Found " +
            results.length +
            " opportunities ranked by your profile match.";

    }
}


/* =========================================================
   CREATE JOB CARD
   ========================================================= */

function createJobCard(job, score, matchedSkills) {

    const card =
        document.createElement("div");

    card.className = "job-card";

    card.setAttribute("data-status", job.status);


    let statusText = "Expected";

    if (job.status === "open") {
        statusText = "Open Now";
    }

    if (job.status === "upcoming") {
        statusText = "Opening Soon";
    }


    let matchedText =
        "No direct skill match yet";

    if (matchedSkills.length > 0) {

        matchedText =
            matchedSkills.join(", ");

    }


    card.innerHTML =

        '<div class="job-top">' +

            '<div class="company-logo">' +
                escapeHTML(job.logo) +
            '</div>' +

            '<div class="job-info">' +

                '<h3>' +
                    escapeHTML(job.role) +
                '</h3>' +

                '<p>' +
                    escapeHTML(job.company) +
                '</p>' +

            '</div>' +

            '<div class="match-badge">' +
                score +
                '% Match' +
            '</div>' +

        '</div>' +


        '<span class="job-status status-' +
            job.status +
        '">' +
            statusText +
        '</span>' +


        '<div class="card-tags">' +

            job.skills.map(function(skill) {

                return '<span>' +
                    escapeHTML(skill) +
                    '</span>';

            }).join("") +

        '</div>' +


        '<div class="job-details">' +

            '<span>📍 ' +
                escapeHTML(job.location) +
            '</span>' +

            '<span>🗓 ' +
                escapeHTML(job.openingWindow) +
            '</span>' +

            '<span>✓ Matching skills: ' +
                escapeHTML(matchedText) +
            '</span>' +

        '</div>' +


        '<div class="job-card-footer">' +

            '<span class="countdown">' +
                escapeHTML(job.deadline) +
            '</span>' +

            '<button class="view-btn" type="button">' +
                'View Details →' +
            '</button>' +

        '</div>';


    const viewButton =
        card.querySelector(".view-btn");

    if (viewButton) {

        viewButton.addEventListener(
            "click",
            function() {
                openJobModal(job.id);
            }
        );

    }


    return card;
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = String(value);

    return div.innerHTML;
}


/* =========================================================
   SHOW JOBS
   ========================================================= */

function showJobs() {

    if (selectedSkills.length === 0) {

        alert(
            "Please select at least one skill to find matching internships."
        );

        scrollToProfile();

        return;
    }

    updateJobMatches();

    const jobsSection =
        document.getElementById("jobs");

    if (jobsSection) {

        jobsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* =========================================================
   FILTER JOBS
   ========================================================= */

function filterJobs() {

    const filterElement =
        document.getElementById("job-filter");

    if (!filterElement) {
        return;
    }

    const filter =
        filterElement.value;


    const cards =
        document.querySelectorAll(".job-card");


    cards.forEach(function(card) {

        const status =
            card.getAttribute("data-status");


        if (
            filter === "all" ||
            filter === status
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });
}


/* =========================================================
   JOB MODAL
   ========================================================= */

function openJobModal(id) {

    const job =
        internships.find(function(item) {

            return item.id === id;

        });


    if (!job) {
        return;
    }


    const modal =
        document.getElementById("job-modal");

    const content =
        document.getElementById("modal-content");


    if (!modal || !content) {
        return;
    }


    const match =
        calculateMatch(job);


    content.innerHTML =

        '<div class="modal-content-header">' +

            '<div class="company-logo">' +
                escapeHTML(job.logo) +
            '</div>' +

            '<div>' +

                '<h2>' +
                    escapeHTML(job.role) +
                '</h2>' +

                '<p>' +
                    escapeHTML(job.company) +
                    ' · ' +
                    escapeHTML(job.location) +
                '</p>' +

            '</div>' +

        '</div>' +


        '<div class="modal-match">' +

            '<span>Your Match Score</span>' +

            '<strong>' +
                match.score +
                '%' +
            '</strong>' +

            '<p>' +
                escapeHTML(job.why) +
            '</p>' +

        '</div>' +


        '<p style="font-size:13px;color:#627486;">' +

            escapeHTML(job.description) +

        '</p>' +


        '<div class="modal-list">' +

            '<div>' +
                '🎯 <strong>Role:</strong> ' +
                escapeHTML(job.category) +
            '</div>' +

            '<div>' +
                '🧠 <strong>Required Skills:</strong> ' +
                escapeHTML(job.skills.join(", ")) +
            '</div>' +

            '<div>' +
                '📅 <strong>Recruitment Window:</strong> ' +
                escapeHTML(job.openingWindow) +
            '</div>' +

            '<div>' +
                '📊 <strong>Historical Pattern:</strong> ' +
                escapeHTML(job.historicalPattern) +
            '</div>' +

            '<div>' +
                '🔮 <strong>Prediction Confidence:</strong> ' +
                escapeHTML(job.confidence) +
            '</div>' +

        '</div>';


    modal.classList.add("active");
}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal() {

    const modal =
        document.getElementById("job-modal");

    if (modal) {

        modal.classList.remove("active");

    }
}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================================= */

function setupModal() {

    const modal =
        document.getElementById("job-modal");

    if (!modal) {
        return;
    }


    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                closeModal();

            }

        }
    );
}


/* =========================================================
   RECRUITMENT CALENDAR
   ========================================================= */

const recruitmentCalendar = {

    January: [
        {
            company: "Amazon",
            window: "Jan - Feb",
            status: "OPEN NOW"
        }
    ],

    February: [
        {
            company: "Google",
            window: "Feb - Mar",
            status: "EXPECTED"
        }
    ],

    March: [
        {
            company: "Microsoft",
            window: "Mar - Apr",
            status: "EXPECTED"
        }
    ],

    April: [
        {
            company: "Adobe",
            window: "Apr - May",
            status: "EXPECTED"
        }
    ],

    May: [
        {
            company: "Meta",
            window: "May - Jun",
            status: "EXPECTED"
        }
    ],

    June: [
        {
            company: "Infosys",
            window: "Jun - Jul",
            status: "EXPECTED"
        }
    ],

    July: [
        {
            company: "Flipkart",
            window: "Jul - Aug",
            status: "EXPECTED"
        }
    ],

    August: [
        {
            company: "NVIDIA",
            window: "Aug - Sep",
            status: "EXPECTED"
        }
    ],

    September: [
        {
            company: "NVIDIA",
            window: "Sep - Oct",
            status: "EXPECTED"
        }
    ],

    October: [
        {
            company: "Microsoft",
            window: "Oct - Nov",
            status: "EXPECTED"
        }
    ],

    November: [
        {
            company: "Google",
            window: "Nov - Dec",
            status: "EXPECTED"
        }
    ],

    December: [
        {
            company: "Amazon",
            window: "Dec - Jan",
            status: "EXPECTED"
        }
    ]

};


/* =========================================================
   RENDER CALENDAR
   ========================================================= */

function renderCalendar() {

    const container =
        document.getElementById("calendar-grid");

    const yearElement =
        document.getElementById("calendar-year");


    if (!container || !yearElement) {
        return;
    }


    yearElement.textContent = currentYear;

    container.innerHTML = "";


    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    months.forEach(function(month) {

        const monthCard =
            document.createElement("div");

        monthCard.className = "month-card";


        const monthTitle =
            document.createElement("div");

        monthTitle.className = "month-name";
        monthTitle.textContent = month;

        monthCard.appendChild(monthTitle);


        const events =
            recruitmentCalendar[month] || [];


        events.forEach(function(event) {

            const eventContainer =
                document.createElement("div");


            eventContainer.innerHTML =

                '<div class="calendar-company">' +

                    '<span class="calendar-dot"></span>' +

                    '<strong>' +
                        escapeHTML(event.company) +
                    '</strong>' +

                '</div>' +


                '<div class="calendar-window">' +
                    escapeHTML(event.window) +
                '</div>' +


                '<span class="calendar-status">' +
                    escapeHTML(event.status) +
                '</span>';


            monthCard.appendChild(eventContainer);

        });


        container.appendChild(monthCard);

    });
}


/* =========================================================
   CHANGE CALENDAR YEAR
   ========================================================= */

function changeYear(direction) {

    currentYear += direction;

    renderCalendar();
}


/* =========================================================
   SCROLL FUNCTIONS
   ========================================================= */

function scrollToProfile() {

    const profile =
        document.getElementById("profile");

    if (profile) {

        profile.scrollIntoView({
            behavior: "smooth"
        });

    }
}


function scrollToCalendar() {

    const calendar =
        document.getElementById("calendar");

    if (calendar) {

        calendar.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    const navLinks =
        document.querySelector(".nav-links");

    if (navLinks) {

        navLinks.classList.toggle(
            "mobile-active"
        );

    }
}


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

function setupNavigation() {

    const links =
        document.querySelectorAll(".nav-links a");


    links.forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                links.forEach(function(item) {

                    item.classList.remove("active");

                });

                link.classList.add("active");


                const navLinks =
                    document.querySelector(".nav-links");

                if (navLinks) {

                    navLinks.classList.remove(
                        "mobile-active"
                    );

                }

            }
        );

    });
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateSkillProfile();

        renderCalendar();

        setupModal();

        setupNavigation();

        console.log(
            "InternFinder initialized successfully."
        );

    }
);
