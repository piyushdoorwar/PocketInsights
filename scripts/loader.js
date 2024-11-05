// Show loader on page load and hide when content is ready
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("loader").style.display = "none";
        document.body.classList.remove("d-flex", "flex-column", "min-vh-100");
    }, 500); // Adjust time as needed
});
