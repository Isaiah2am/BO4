function myFunction() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

var topElement = document.getElementById("top");
topElement.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});