bootstrap-singlepage
====================

Plugin for Twitter Bootstrap that converts websites to single page apps on the fly! This is a simple jQuery plugin designed for Twitter Bootstrap that uses ajax calls to turn a website into a mobile capable, single page app. Websites saved to the homescreen on iOS will not show the browser controls and act as standalone apps. Stay tuned for live demo coming soon.
  
This is currently a work in progress and needs much testing for advanced/complex use cases - however it should function just fine for simple sites. Please feel free to contribute.

### Requirements:  
-Twitter Bootstrap  
-jQuery  
**-All pages must share similiar components (navbar, etc) and have one element encompasing the content of the page**

### Usage:

Simply include the plugin file, update the selectors in the example code below, and run that after your page loads.  

    $.singlePageApp({
        selector: '#maincontainer',
        refreshScripts: true,
        loadingElement: '.loadingicon',
        userAgents: ['iPad','iPod','iPhone','Android','webOS','BlackBerry']
    });


### Configuration Options
**selector**: the jQuery selector for the main content element that will be swapped out on page change.  
**refreshScripts**: whether or not to check if any scripts should also be copied and added from the new page.  
**loadingElement**: jQuery selector for the element that will be shown/hidden between page loads.  
**userAgents**: array of user agent string fragments that will be tested against. If the user agent does not match one of these strings the single page app functionality will be disabled. *If you do not include this parameter single page app will be enabled on ALL user agents!*
