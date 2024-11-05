
// Dynamically load the Google Analytics library
(function() {
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-9KBTC02Z34";
  document.head.appendChild(script);

  // Initialize Google Analytics after the library loads
  script.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-9KBTC02Z34');
  };
})();


/*
// Function to load an external script dynamically
function loadScript(src, attributes = {}, onloadCallback = null) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;

  // Set additional attributes for the script element
  for (const [key, value] of Object.entries(attributes)) {
    script.setAttribute(key, value);
  }

  // Add onload callback if provided
  if (onloadCallback) {
    script.onload = onloadCallback;
  }

  // Append the script to the head
  document.head.appendChild(script);
}

// Load Google Analytics
loadScript("https://www.googletagmanager.com/gtag/js?id=G-9KBTC02Z34", {}, function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-9KBTC02Z34');
});

// Load ConsentManager script
loadScript("https://cdn.consentmanager.net/delivery/autoblocking/cb3bc89eb17ed.js", {
  "type": "text/javascript",
  "data-cmp-ab": "1",
  "data-cmp-host": "c.delivery.consentmanager.net",
  "data-cmp-cdn": "cdn.consentmanager.net",
  "data-cmp-codesrc": "16"
});
*/
