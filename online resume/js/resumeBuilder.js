//bio object

var bio = {
    "name": "gurleen Singh",
    "role": "web-developer",
    "contacts": {
        "mobile": ": +978197",

        "email": ": gurleen.singh08@gmail.com",

        "github": ": gurleensingh8",

        "twitter": ": gurleen08",


        "location": ": muktsar"
    },
    "biopic": "images/profile.jpg",
    "welcomeMessage": "NEVER BACK DOWN.",
    "skills": ["Food-Blogger","Foodholic","Html", "Css", "Javascript", "Bootstrap",]
};

//display bio
bio.display = function() {
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));
    $("#topContacts, #footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#topContacts, #footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#topContacts, #footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#topContacts, #footerContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
    $("#topContacts, #footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
    $("#header").append(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (var i = 0; i < bio.skills.length; i++) {
            var formattedSkills = HTMLskills.replace("%data%", bio.skills[i]);
            $("#skills").append(formattedSkills);
        }
    }
};


//work object
var work = {
    "jobs": [{
        "employer": "Chitkara University",
        "title": "food blogger",
        "dates": "2015 - 2019",
        "location": "Punjab(campus)",
        "description": "Currently doing Btech in computer science"
    }]
};
//display work
work.display = function() {
    $("#workExperience").append(HTMLworkStart);
    for (var i = 0; i < work.jobs.length; i++) {
        $(".work-entry").append(HTMLworkEmployer.replace("%data%", work.jobs[i].employer) + HTMLworkTitle.replace("%data%", work.jobs[i].title));
        $(".work-entry").append(HTMLworkDates.replace("%data%", work.jobs[i].dates));
        $(".work-entry").append(HTMLworkLocation.replace("%data%", work.jobs[i].location));
        $(".work-entry").append(HTMLworkDescription.replace("%data%", work.jobs[i].description));

    }
};
//project object
var projects = {
    "projects": [{
            "title": "food-blogger",
            "dates": "1/12/2015-16/12/2015",
            "description": "Find the latest news, trends & tips from India's premier food-blogger society",
            "images": ["images/blogger.jpg"]
        },
        {
            "title": "limited-edition-cars",
            "dates": "1/1/2016-5/1/2016",
            "description": "Ferrari has designed more topsides for Australian F1 race this year.",
            "images": ["images/ferrari.jpg"]
        },
        {
            "title": "Prada",
            "dates": "8/2/2016-12/2/2016",
            "description": "Prada is a clothes manufacturing company that is part of the Italian luxury fashion house & founded in 1913",
            "images": ["images/prada.jpg"]
        },
        {
            "title": "Famous Gallery Posters",
            "dates": "1/5/2016-2/5/2016",
            "description": "Created and enhanced photos, and artwork with Chandigarh famous art gallery house.",
            "images": ["images/art.jpg"]
        }
    ]
};

//display project
projects.display = function() {
    $("#projects").append(HTMLprojectStart);
    for (i = 0; i < projects.projects.length; i++) {
        $(".project-entry").append(HTMLprojectTitle.replace("%data%", projects.projects[i].title));
        $(".project-entry").append(HTMLprojectDates.replace("%data%", projects.projects[i].dates));
        $(".project-entry").append(HTMLprojectDescription.replace("%data%", projects.projects[i].description));
        for (j = 0; j < projects.projects[i].images.length; j++) {
            $(".project-entry").append(HTMLprojectImage.replace("%data%", projects.projects[i].images[j]));
        }
    }
};
//project education
var education = {
    "schools": [{
            "name": "muktsar public school",
            "location": "muktsar,punjab,India",
            "degree": "High School",
            "majors": ["PCM"],
            "dates": "2015",


        },
        {
            "name": "Chitkara University",
            "location": "Punjab(Rajpura)",
            "degree": "Btech",
            "majors": ["CSE"],
            "dates": "2015-2019"

        }
    ],
    "onlinecourses": [{
            "title": "Front-end-Nanodegree",
            "school": "Udacity",
            "dates": "2018",
            "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        },
        {
            "title": "Foodholic",
            "school": "fiesta-cooking-house",
            "dates": "2017",
            "url": "https://cookieandkate.com/how-to-start-a-food-blog/"
        },
        {
            "title": "Intro to Git and Github",
            "school": "Udacity",
            "dates": "2017",
            "url": "https:www.udacity.com/course/how-to-use-git-and-github--ud775"
        }
    ]
};
//display education
education.display = function() {
    $("#education").append(HTMLschoolStart);
    for (var i = 0; i < education.schools.length; i++) {
        $(".education-entry").append(HTMLschoolName.replace("%data%", education.schools[i].name) + HTMLschoolDegree.replace("%data%", education.schools[i].degree));
        $(".education-entry").append(HTMLschoolDates.replace("%data%", education.schools[i].dates));
        for (var j = 0; j < education.schools[i].majors.length; j++) {
            $(".education-entry").append(HTMLschoolMajor.replace("%data%", education.schools[i].majors[j]));
        }
        $(".education-entry").append(HTMLschoolLocation.replace("%data%", education.schools[i].location));
    }

    $(".education-entry").append(HTMLonlineClasses);

    for (var k = 0; k < education.onlinecourses.length; k++) {
        $(".education-entry").append(HTMLonlineTitle.replace("%data%", education.onlinecourses[k].title) + HTMLonlineSchool.replace("%data%", education.onlinecourses[k].school));
        $(".education-entry").append(HTMLonlineDates.replace("%data%", education.onlinecourses[k].dates));
        $(".education-entry").append(HTMLonlineURL.replace("%data%", education.onlinecourses[k].url));
    }
};
//calling all the functions
bio.display();
education.display();
work.display();
projects.display();
//adding map to resume
$("#mapDiv").append(googleMap);
