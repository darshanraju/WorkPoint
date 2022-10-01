const setDocumentTheme = () => {
  if (localStorage.getItem("cseGigsTheme") === "dark") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.remove("light");
  }
};

setDocumentTheme();
