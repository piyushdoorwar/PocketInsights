
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
