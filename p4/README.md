*Any instructions/notes in italics should be removed from the template before submitting.*

# Project 4
+ By: *Jiajia Chen*
+ Production URL: <http://p4.acjj.me>

## Improvements based on P3 peer review feedback

* Added validation to number of shares and cost of shares for newly added holdings. So no more negative numbers for shares or cost, which was mentioned in the peer reviews.
* Changed variable names in global helper functions from si (which meant SI system of units) to units and from rx to regularExpression
* Removed calculation & class logic from the template and moved these into the script for all quotes displayed on the Today page.
* Made the Today page mobile friendly with flex display of components that are now able to float into the available space on any screen size.
* Added event listeners to capture enter key after user types new holding info, so that hitting enter adds the new holding to the portfolio


## Outside resources

* npm install --save axios firebase vue-chartjs sass-loader sass chart.js firebase vuelidate
* Modified my AutoComplete component from p3 so as to show the user name and symbol of the company stock in the AutoComplete dropdown list. Because this required use of objects or templates as list items, my AutoComplete needed significiant refactoring. After evaluating several options, decided to modify a component from a [public package](https://github.com/iamstevendao/vue-suggestion) parts of which can be seen in my Suggestion.vue and I customized the component for my interface requirements.


## Notes for instructor

New features:
* Input validation for number of shares and cost of shares for both new holdings (per peer review) and for editing of existing holdings. In addition, added input validation for SignUp and SignIn components for user account management. Used vuelidate standard validations such as email, password, confirm password, etc, in addition to my own validation functions preventing integers below 1 for shares and negative decimal numbers for cost.
* Firebase for user accounts and authentication. Using the Firebase authentication APIs to allow users to create their own accounts, and also delete their accounts. The delete has been useful for E2E tests too.
* Account page with SignUp, SignIn, and SignOut, which is the user's interface to the above Firebase feature added.
* Firebase realtime database for cross-session persistence of the user's portfolio information. Each portfolio record is stored with key as the Firebase uid from the same user's authentication. This allows clear mapping of records in Firebase.
* Vuex global state management across the application. This helps retain the most recently researched company data so as to both improve user experience and to reduce the number of expensive axios calls. Also in Vuex is the currently logged in user's data such as Firebase uid and db reference which can be a security risk to store in Local Storage. Finally, also using Vuex to share state of editing of portfolio holdings between components.
* Management of data across Vuex, Local Storage and Firebase real-time database, accounting for all changes of holdings in the portfolio across signups, signins, signouts, page refreshes, and new sessions. Enabled users to start building their portfolio without having to create an account, but if they do create an account, the application clears the user's holding data from Local Storage after the user has signed out, so as protect their data and privacy.
* Card format for displaying News Headlines that flow from left to right and fill the available space, so as to be slightly more mobile and multi-form-factor friendly.
* Showing image thumbnails that are lazy loaded within News article headlines, which progressively degrades to show no image if none is available while maintaining user experience. While the user sees no errors in the browser, there will be some [404 errors in the console](https://stackoverflow.com/questions/7035466/check-if-file-exists-but-prevent-404-error-in-console-from-showing-up) in cases where NewsAPI provides image URLs which are non-existent or inaccessible
* E2E testing in MarketDash.js has a set of workflows that would be most commonly followed by the users.
* Unit tests folder contains unit tests to verify proper functioning of the use-cases, but isn't an exhaustive list because this p4 now has several components.
* Netlify used for production.

Improvements
* Moved helper or globally used functions into a global mixin, e.g. formatting of large numbers representing money, calculation of time intervals). Learned about mixins while using chart.js.
* Improved code efficiency, e.g. using Javascript functions for map, reduce, filter, etc, instead of brute force code to accomplish the same.
* Refactored to create more modular architecture, e.g. moved router into its own folder, split components into smaller reusable logically-cohesive components, etc
* Refactored the portfolio page significantly by breaking it down into logically cohesive smaller components. This enables editing of a single holding at a time and each such holding now resides in its own component. The newest holding in process of being added is now its own separate component too.
* Added lazy load to improve performance on initial load, and lazy load for images such as for the News Headlines. This way all images are not loaded upfront, but rather as the user scrolls to view more news articles. This reduces the size of initial page load and improves performance.  Learned how to create Vue directives using IntersectionObserver for loading images.
* Continuing to use Local Storage to hold portfolio information, but refactored to neatly account for more transactions of the same company into a consolidated state of all holdings in the portfolio.
* Consolidated axios calls into fewer components with better control over requests and flow of data.

Design Decisions
* While stock & news data in this p4 are accessed using axios, this p4 uses Firebase API for reading/writing portfolio metadata to Firebase as it caches and stores query results, improving network bandwidth utilization and lower latency. The results appear faster for users, even on intermittent connections.
