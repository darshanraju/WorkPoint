// Icons
// const sunIcon = document.querySelector(".sun");
const sunIcon = document.querySelectorAll(".sun");
// const moonIcon = document.querySelector(".moon");
const moonIcon = document.querySelectorAll(".moon");

// Theme vars
const userTheme = localStorage.getItem("CSEGigsTheme");
const systemTheme = window.matchMedia("(prefers-color-schema: dark)").matches;

// Icon Toggling
const iconToggle = () => {
  moonIcon.classsList.toggle("display-none");
  sunIcon.classsList.toggle("display-none");
};

// Initial Theme Check
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("display-none");
    return;
  }
  sunIcon.classList.add("display-none");
};

// Manual Theme Switch
const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("CSEGigsTheme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("CSEGigsTheme", "dark");
  iconToggle();
};

// Call Theme switch on clicking buttons
sunIcon.addEventListener("click", () => {
  themeSwitch();
});

moonIcon.addEventListener("click", () => {
  themeSwitch();
});

// Invoke theme check on initial load
themeCheck();
