 


const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    e.preventDefault();

    const sectionId = navLinks[i].getAttribute("data-section");

    for (let j = 0; j < sections.length; j++) {
      sections[j].classList.add("hidden");
    }

    document.getElementById(sectionId).classList.remove("hidden");
  });
}

// =======================
//  بلاش تشتغل عليعا قبل الجيم 
//  XMLHttpRequest  استعمل  مره  
//  ومره  استعمل fetch 
// =======================

const img = document.getElementById("apod-image");
const apodTitle = document.getElementById("apod-title");
const apodExplanation = document.getElementById("apod-explanation");
const apodDate = document.getElementById("apod-date");
const apodDateDetail = document.getElementById("apod-date-detail");
const apodDateInfo = document.getElementById("apod-date-info");
const apodMediaType = document.getElementById("apod-media-type");
const apodCopyright = document.getElementById("apod-copyright");
const apodLoading = document.getElementById("apod-loading");

const dateInput = document.getElementById("apod-date-input");
const loadDateBtn = document.getElementById("load-date-btn");
const todayBtn = document.getElementById("today-apod-btn");
const selectedDateText = document.getElementById("selected-date-text");

const NASA_API_KEY = "EBeHhdw3Y2ofMuSzEfCaKQswfE5dz8y534N3qrRW";
const today = new Date().toISOString().split("T")[0];

dateInput.max = today;
dateInput.value = today;

function updateSelectedDateText(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (selectedDateText) {
    selectedDateText.innerText = formattedDate;
  }
}

function getTodayInSpace(date = "") {
  apodLoading.classList.remove("hidden");
  img.classList.add("hidden");

  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ""
    }`
  );

  xhr.responseType = "json";
  xhr.send();

  xhr.addEventListener("load", function () {
    apodLoading.classList.add("hidden");

    if (xhr.status !== 200 || xhr.response === null) {
      apodTitle.innerText = "NASA API Error";
      apodExplanation.innerText = "NASA service is temporarily unavailable.";
      return;
    }

    let res = xhr.response;

    apodTitle.innerText = res.title;
    apodExplanation.innerText = res.explanation;
    apodDate.innerText = `Astronomy Picture of the Day - ${res.date}`;
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${res.date}`;
    apodDateInfo.innerText = res.date;
    apodMediaType.innerText = res.media_type;
    apodCopyright.innerText = res.copyright ? `© ${res.copyright}` : "© NASA";

    if (res.media_type === "image") {
      img.src = res.url;
      img.alt = res.title;
      img.classList.remove("hidden");
    }
  });
}

loadDateBtn.addEventListener("click", function () {
  updateSelectedDateText(dateInput.value);
  getTodayInSpace(dateInput.value);
});

todayBtn.addEventListener("click", function () {
  dateInput.value = today;
  updateSelectedDateText(today);
  getTodayInSpace();
});

dateInput.addEventListener("change", function () {
  updateSelectedDateText(dateInput.value);
});

updateSelectedDateText(today);
getTodayInSpace();



// اعمل اخر واحده  بعد  الراجه 


const launchesGrid = document.getElementById("launches-grid");
const featuredLaunchImage = document.getElementById("featured-launch-image");

async function getLaunches() {
  try {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=9"
    );

    const data = await response.json();

    if (!data.results) {
      console.log("No Launches Data");
      return;
    }

    const launches = data.results;
    const featuredLaunch = launches[0];

    if (featuredLaunchImage) {
      featuredLaunchImage.src =
        featuredLaunch.image || "./assets/images/placeholder.webp";
    }

    let cartona = "";

    for (let i = 1; i < launches.length; i++) {
      cartona += `
        <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
          <div class="relative h-48 bg-slate-900/50 overflow-hidden">
            ${
              launches[i].image
                ? `
                  <img
                    src="${launches[i].image}"
                    alt="${launches[i].name}"
                    class="w-full h-full object-cover"
                  />
                `
                : `
                  <div class="w-full h-full flex items-center justify-center">
                    <i class="fas fa-rocket text-6xl text-slate-600"></i>
                  </div>
                `
            }

            <div class="absolute top-3 right-3">
              <span class="px-3 py-1 bg-green-500/90 text-white rounded-full text-xs font-semibold">
                ${launches[i].status?.name || "Unknown"}
              </span>
            </div>
          </div>

          <div class="p-5">
            <h4 class="font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors">
              ${launches[i].name}
            </h4>

            <p class="text-sm text-slate-400 mb-3">
              <i class="fas fa-building mr-2"></i>
              ${launches[i].launch_service_provider?.name || "Unknown"}
            </p>

            <div class="space-y-2 text-sm text-slate-300">
              <p>
                <i class="fas fa-calendar mr-2"></i>
                ${new Date(launches[i].net).toLocaleDateString()}
              </p>

              <p>
                <i class="fas fa-clock mr-2"></i>
                ${new Date(launches[i].net).toLocaleTimeString()}
              </p>

              <p>
                <i class="fas fa-rocket mr-2"></i>
                ${launches[i].rocket?.configuration?.name || "Unknown"}
              </p>

              <p>
                <i class="fas fa-map-marker-alt mr-2"></i>
                ${launches[i].pad?.location?.name || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      `;
    }

    launchesGrid.innerHTML = cartona;
  } catch (error) {
    console.log("Launches Error:", error);
  }
}

getLaunches();

// =======================
// Planets
// خليها بعد  الجيم
// =======================

const planetCards = document.querySelectorAll(".planet-card");

const planetDetailImage = document.getElementById("planet-detail-image");
const planetDetailName = document.getElementById("planet-detail-name");
const planetDetailDescription = document.getElementById(
  "planet-detail-description"
);

const planetDistance = document.getElementById("planet-distance");
const planetRadius = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetOrbitalPeriod = document.getElementById("planet-orbital-period");
const planetRotation = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetGravity = document.getElementById("planet-gravity");

const planetsData = {
  mercury: {
    name: "Mercury",
    image: "./assets/images/mercury.png",
    description: "Mercury is the closest planet to the Sun.",
    distance: "57.9M km",
    radius: "2,439 km",
    mass: "3.30 × 10²³ kg",
    density: "5.43 g/cm³",
    orbitalPeriod: "88 days",
    rotation: "58.6 days",
    moons: "0",
    gravity: "3.7 m/s²",
  },
  venus: {
    name: "Venus",
    image: "./assets/images/venus.png",
    description: "Venus is the second planet from the Sun.",
    distance: "108.2M km",
    radius: "6,051 km",
    mass: "4.87 × 10²⁴ kg",
    density: "5.24 g/cm³",
    orbitalPeriod: "225 days",
    rotation: "243 days",
    moons: "0",
    gravity: "8.87 m/s²",
  },
  earth: {
    name: "Earth",
    image: "./assets/images/earth.png",
    description: "Earth is the third planet from the Sun and our home planet.",
    distance: "149.6M km",
    radius: "6,371 km",
    mass: "5.97 × 10²⁴ kg",
    density: "5.51 g/cm³",
    orbitalPeriod: "365.25 days",
    rotation: "24 hours",
    moons: "1",
    gravity: "9.8 m/s²",
  },
  mars: {
    name: "Mars",
    image: "./assets/images/mars.png",
    description: "Mars is known as the Red Planet.",
    distance: "227.9M km",
    radius: "3,389 km",
    mass: "6.42 × 10²³ kg",
    density: "3.93 g/cm³",
    orbitalPeriod: "687 days",
    rotation: "24.6 hours",
    moons: "2",
    gravity: "3.71 m/s²",
  },
  jupiter: {
    name: "Jupiter",
    image: "./assets/images/jupiter.png",
    description: "Jupiter is the largest planet in the Solar System.",
    distance: "778.5M km",
    radius: "69,911 km",
    mass: "1.90 × 10²⁷ kg",
    density: "1.33 g/cm³",
    orbitalPeriod: "11.9 years",
    rotation: "9.9 hours",
    moons: "95",
    gravity: "24.79 m/s²",
  },
  saturn: {
    name: "Saturn",
    image: "./assets/images/saturn.png",
    description: "Saturn is famous for its beautiful rings.",
    distance: "1.43B km",
    radius: "58,232 km",
    mass: "5.68 × 10²⁶ kg",
    density: "0.69 g/cm³",
    orbitalPeriod: "29.5 years",
    rotation: "10.7 hours",
    moons: "146",
    gravity: "10.44 m/s²",
  },
  uranus: {
    name: "Uranus",
    image: "./assets/images/uranus.png",
    description: "Uranus is an ice giant with a blue-green color.",
    distance: "2.87B km",
    radius: "25,362 km",
    mass: "8.68 × 10²⁵ kg",
    density: "1.27 g/cm³",
    orbitalPeriod: "84 years",
    rotation: "17.2 hours",
    moons: "27",
    gravity: "8.69 m/s²",
  },
  neptune: {
    name: "Neptune",
    image: "./assets/images/neptune.png",
    description: "Neptune is the farthest planet from the Sun.",
    distance: "4.50B km",
    radius: "24,622 km",
    mass: "1.02 × 10²⁶ kg",
    density: "1.64 g/cm³",
    orbitalPeriod: "164.8 years",
    rotation: "16.1 hours",
    moons: "14",
    gravity: "11.15 m/s²",
  },
};

function showPlanetDetails(planetId) {
  const planet = planetsData[planetId];

  planetDetailImage.src = planet.image;
  planetDetailName.innerText = planet.name;
  planetDetailDescription.innerText = planet.description;

  planetDistance.innerText = planet.distance;
  planetRadius.innerText = planet.radius;
  planetMass.innerText = planet.mass;
  planetDensity.innerText = planet.density;
  planetOrbitalPeriod.innerText = planet.orbitalPeriod;
  planetRotation.innerText = planet.rotation;
  planetMoons.innerText = planet.moons;
  planetGravity.innerText = planet.gravity;
}

for (let i = 0; i < planetCards.length; i++) {
  planetCards[i].addEventListener("click", function () {
    const planetId = planetCards[i].getAttribute("data-planet-id");
    showPlanetDetails(planetId);
  });
}

showPlanetDetails("earth");