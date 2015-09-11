## To run the page locally:
1. Clone the repo
2. To install all dependencies, run: npm install
3. To run the build use: grunt build
This will do the necessary menification, image optimzation and assets compression.
4. Run: grunt
This defaults to serve the production ready files.
5. To run page speed insight on index.html, after you serve the pages using the command 'grunt' run the command (in a different terminal window): grunt perf

## Performance Optimizations
### index.html
1. Move scripts from head to end of body tag
2. Add print styles to style.css to minimize number of files requested
3. Reduce size of pizzeria.jpg
4. a) Add a grunt task to automate minifying CSS and inlining it in the index, since there's not too much CSS we can inline it and enhance the performance in desktop and especially on mobile.
b) Same task also inlines javascript file perfmatters.js since it's a small script too
5. Add a gunt task to automate uglify JS (minifying Javascript)
7. Add a grunt task to automate and compressing images
8. Serve optimized files by adding a grunt task that serves the files form dist folder
9. Use font Web Font Loader library. Improves performance BUT it has a side effect of flashing a different font at first then changing the font once it's available. (FOUC)

### pizza.html
1. Remove the cause of forced synchronous layout from 'changePizzaSizes' function. Instead of calculating 'offsetWidth' and changing the style, the function sizeSwitcher calculates an appropriate size and returns the value to be assigned to width as a percentage
2. Change any 'querySelectorAll' or 'querySelector' functions to 'getElementByClassName' or 'getElementById'
3. Instead of accessing the DOM each time we call updatePositions, we query pizzas with 'mover' class and put them in an array
4. Since phase in 'updatePositions' function only has 5 values, there's no need to calculate it them in the foor loop that updates the positions for every item. We can calculate the five values outside of that for loop and save them in an array to access them per item.
5. Instead of updating the width for every single pizza in the 'changePizzaSizes' function. A class was added to the container of the pizzas 'pizzaGenerator', changing the width of the child elements (the pizza containers) depending on the class added, 'small', 'medium' or 'large' which the 'sizeClass' function returns
6. Moved the 'pizzasDiv' variable outside of the loop that is generating pizzas, so it only makes one DOM call instead of calling it on each iteration of the loop
7. Instead of filling the screen of moving pizzas we only need a certain number which is what appears on the screen at any given time. We can calculate the number of rows by taking the height of the screen and diving it by 's', we then calculate the number of pizzas needed by multiplying the number of cloumns with the number of rows.
8. Moved the declaration of 'elem' in the 'DOMContentLoaded' listener function outside the loop so it's not declared every iteration
9. in the 'views/style.css' file, added 'transform: translateZ(0);' property to the 'mover' class to trigger the GPU. And 'backface-visibility: hidden' to enable hardware acceleration


## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
