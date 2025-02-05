(function() {
    function createEmbed() {
        var scriptTags = document.getElementsByTagName("script");
        var currentScript = scriptTags[scriptTags.length - 1];

        var embedURL = "https://piyushdoorwar.github.io/PocketInsights/bmac"; // Change to your GitHub Pages URL
        var iframe = document.createElement("iframe");

        iframe.src = embedURL;
        iframe.width = "100%";
        iframe.height = "150"; // Adjust height if needed
        iframe.style.border = "none";
        iframe.style.overflow = "hidden";

        currentScript.parentNode.insertBefore(iframe, currentScript);
    }

    createEmbed();
})();
