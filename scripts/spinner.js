window.addEventListener("load", function(){
  const loader = document.querySelector("#loader-container");
  setTimeout(function() {
    loader.classList.add("hidden");
  }, 500);
});
