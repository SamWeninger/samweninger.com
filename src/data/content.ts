export const data = {
  home: {
    pics: [
      {
        text: "Vancouver Island, 2002",
        img: "/sam.jpg"
      },
      {
        text: "Oregon Coast, 2004",
        img: "/fam.jpg"
      }
    ],
    fName: "sam",
    lName: "weninger",
    description: "Software engineer at Microsoft. Ineligible NHL draft prospect."
  },
  projects: {
    items: [
      {
        img: "/pebbles.png",
        color: "white",
        project: {title: "Pebbles", link: "https://pebbles-capstone.netlify.app/"},
        github: "https://github.com/pebbles-capstone",
        timeline: "July 2021 - April 2022",
        description: "Pebbles helps University of Toronto Electrical and Computer Engineering students find like-minded teammates and professors who would make an ideal fit for a design team. This full stack application uses user data and clustering to group users and make suggestions for optimal teammates.",
        skills: "Python Flask, Docker, React.js, PostgreSQL, Adminer, Notion"
      },
      {
        img: "/course-finder.png",
        color: "#14639f",
        project: {title: "Sigma Educate", link: ""},
        github: "https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab",
        timeline: "September 2021 - December 2021",
        description: "SigmaEducate is a course selection tool for University of Toronto students which supports creating and editing multiple profiles, fast and smooth course navigation, and boasts a modern and easy to use user interface",
        skills: "Node.js, Machine Learning, AWS (including DynamoDB), Docker, React.js, Netlify"
      },
      {
        img: "/jane-street.png",
        color: "#94d8ac",
        project: {title: "Jane Street Electronic Trading Challenge (2nd Place)", link: ""},
        github: "https://github.com/SamWeninger/Jane_Street_ETC",
        timeline: "June 2019",
        description: "Developed a trading algorithm to buy and sell different financial instruments (i.e. stocks, bonds, ETFs, ADRs) in order to maximize profit in a simulated market with other teams. Our team looked to find ETF Arbitrage opportunities in the simulated market and common stock / ADR pairings. Placed 2nd with over 100 undergraduate and graduate student participants in the competition.",
        skills: "C++"
      },
      {
        img: "/bri.png",
        color: "#ffffff",
        project: {title: "Wearable Biofeedback System", link: "https://www.mdpi.com/1424-8220/20/6/1628"},
        github: "",
        timeline: "Summer 2018, Summer 2019",
        description: "Designed a data acquisition / biofeedback system capable of measuring and improving gait in lower limb amputees.",
        skills: "C++, Arduino, Matlab, Digital Electronics"
      },
      {
        img: "/snakes.png",
        color: "#ffffff",
        project: {title: "Venomous Snake Detection Using Deep Learning", link: ""},
        github: "https://github.com/SamWeninger/MachineLearning/blob/master/VenomousSnakes.ipynb",
        timeline: "January 2020 - April 2020",
        description: "Created a deep learning model to train on web-scraped images of venomous and non-venomous snakes. Final testing accuracy was around 80% for predictions on venomous and non-venomous snakes.",
        skills: "Python, Bash, Deep Learning (DenseNet-121)"
      },
      {
        img: "/resume.png",
        color: "#ffffff",
        project: {title: "Resume", link: "https://raw.githubusercontent.com/SamWeninger/Awesome-CV/master/examples/cv.png"},
        github: "https://github.com/SamWeninger/Awesome-CV",
        timeline: "",
        description: "Resume created using Awesome-CV template",
        skills: "LaTex"
      }
    ]
  },
  work: {
    jobs: [
      {
        img: "/microsoft.jpeg",
        color: "white",
        company: "Microsoft",
        role: "Software Engineer",
        location: "Bellevue, Washington",
        timeline: "September 2022 - Present",
        description: "Software Engineer on the Web Experiences Team (WebXT) team at Microsoft."
      },
      {
        img: "/huawei.png",
        color: "#Fdf7f7",
        company: "Huawei",
        role: "Software Engineering Intern",
        location: "Markham, Ontario (Remote)",
        timeline: "May 2020 - August 2021",
        description: "Collaborated with a team of architects and engineers to develop a distributed database management system (C++) ready for use in 5G networks. Optimized storage and transactional aspects of a distributed database system, and made server-side modifications to fix and improve the efficiency of client-server database transactions (C++, SQL). Assessed and evaluated functionality of database queries and transactions; uncovered, reproduced, and repaired underlying issues in database, and provided tests for these issues (Python, Bash)."
      },
      {
        img: "/bloorview.jpeg",
        color: "#01ae07",
        company: "Holland Bloorview", // Kids Rehabilitation Hospital",
        role: "Research Assistant", //"Computer Engineering Research Assistant",
        location: "Toronto, Ontario",
        timeline: "Summer 2018, Summer 2019",
        description: "Designed, tested and implemented a data acquisition/biofeedback system to measure and improve gait in lower limb amputees (C++). Implemented a program to efficiently sort and analyze data returned from a biofeedback system (Matlab). Developed algorithm to make accurate interpretations of readings from force sensing resistors (C++)."
      }
    ]
  },
  education: {
    image: "/uoft.png",
    school: "University of Toronto",
    degree: "Bachelor of Applied Science",
    major: "Computer Engineering, Minor in A.I. Engineering",
    gpa: "3.72/4",
    courses: [
      {class: "Algorithms and Data Structures", code: "https://engineering.calendar.utoronto.ca/course/ece345h1"},
      {class: "Operating Systems", code: "https://engineering.calendar.utoronto.ca/course/ece344h1"},
      {class: "Software Communication and Design", code: "https://engineering.calendar.utoronto.ca/course/ece297h1"},
      {class: "Applied Fundamentals of Deep Learning", code: "https://engineering.calendar.utoronto.ca/course/aps360h1"},
      {class: "Introduction to Databases", code: "https://artsci.calendar.utoronto.ca/course/csc343h1"},
      {class: "Computer Networks", code: "https://engineering.calendar.utoronto.ca/course/ece361h1"},
      {class: "Introduction to Machine Learning", code: "https://engineering.calendar.utoronto.ca/course/ece421h1"},
      {class: "Software Engineering", code: "https://engineering.calendar.utoronto.ca/course/ece444h1"},
      {class: "Introduction to Artificial Intelligence", code: "https://artsci.calendar.utoronto.ca/course/csc384h1"}
    ],
    awards: [
      "Graduate with Honours (2022)",
      "Dean's Honour List (2017-2021)",
      "Director's Summer Research Opportunity Award, IBBME @ UofT (2018)",
      "IBBME Award Winner, IBBME @ UofT (2018)"
    ]
  },
  footer: {
    github: "https://github.com/SamWeninger",
    linkedin: "https://www.linkedin.com/in/samuel-weninger/",
    hockey: "https://www.eliteprospects.com/player/455776/sam-weninger",
    message: "https://www.mcdonalds.com/us/en-us/full-menu.html"
  }
};
