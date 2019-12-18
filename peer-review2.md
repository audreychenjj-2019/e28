## P3 Peer Review

+ Reviewer's name: Jiajia Chen
+ Reviwee's name: Pat Ausman
+ URL to reviewee's Github repo: *https://github.com/pausman/e28/tree/master/p3*

*Answer the following questions in regards to the student's project you are reviewing. Include context and code examples in your answers when relevant.*


### Are you able to produce any errors or unexpected results?
+ None in the console when running the application on the hosted URL online. Even after browsing back and forth several times through all of the links, I saw no errors.
+ With ```npm run serve``` I see the warning ```"export 'store' (imported as 'app') was not found in './app.js'```. Reading the code, the error comes from ```sharedState: app.store``` in App.vue. Looks like a remnant of  Vuex store which has since been removed from the application. The persistent data item is currently stored in Local Storage.
+ While not a requirement for p3, it looks like one of the github updates was the addition of ```.htaccess```. However, named routes in the URL do not work. Perhaps this helps [mod_rewrite](https://github.com/susanBuck/e28-fall19/issues/147)?
+ Again not an error that could have been fixed by p3 submission date, compiling and running on my system I came across the ```serialize-javascript``` issue showing 5 moderate severity vulnerabilities.

### Were there any parts of the interface that you found confusing or unclear?
This application interface is neat and clear. I did not see parts that were confusing or unclear. The points I mention here are merely small user experience and user interface topics -
+ For those user segments who aren't familiar with the breeds or can't remember the breed names or are more visual, it would be valuable to have a voting button on the Available Dog information page, and/or place small thumbnails of the dogs on the Voting page. Ideally have smaller sized thumbnail images to load there instead of only resizing to improve performance.
+ When a user visits the Available Dog information page after voting for that specific dog breed, given that the voting information is already in Local Storage that this dog received the vote, it would be valuable for the user to see that they voted for this dog.
+ Mostly popularized by e-commerce sites, but even more important to give all dogs in a shelter an opportunity to be adopted, the rectangular frames for each dog on the Available Dog page could float to the left of the previous dog thereby increasing the number of dogs visible on each view without scrolling. Floating to the left would also render better if viewed on phone web browsers.
+ Beyond the current use-case of the app, but would be good to group the dogs into categories so that users who are seeking a certain category of dog, such as working, herding, sporting, non-sporting, etc, or by temperament such as affectionate, friendly, intelligent, wild, etc, or by lifespan can filter more easily to see all the available dogs that match what they are looking for.
+ The page to Vote for next week's featured dog shows the current vote at the top. At the same time the page shows a button to vote for the same dog again without an indicator next to the dog's name that it is the current vote.

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?
Most of the code is self-evident. Below are only some small improvements to make or comment for explanation.
+ In App.vue, is an axios call, but the dogs is not defined in the data section and the response stored in this.dogs is not used thereafter. Consider removing this axios call as these are expensive calls for network bandwidth. Or comment why to leave it here for future extensions.
```
mounted() {
   app.axios.get(app.config.api + 'dogs').then(response => {
     this.dogs = response.data;
   });
 }
```
+ In ShowFeatured.vue, instead of hard-coding the featured dog like this
```
methods: {
   featuredDog: function() {
     this.afeaturedDog = this.dogs.filter(dog => {
       return dog.id === 3;
     });
   }
 },
 ```
consider a named constant which can be centrally changed, for example in app.js. Also, because the featured criteria can change, perhaps have a watcher or computed property, depending on how the criteria are accessed, rather than a method called from ```mounted()```.
+ Would be better to remove the import statement for app.js from App.vue and along with it the declaration of sharedState as it is not in use. Or comment about a future intended purpose of leaving it in.
+ The ```getVote``` method and ```addAlert``` data element in VoteDog.vue are unused. Would be good to know how these are planned for future extensions, or consider removing them.


### Are there any parts of the code that you found interesting or taught you something new?
+ The code for each component is atomic (does just one thing) and well encapsulated (so side-effects of any errors aren't spread across components), except for the use of localStorage. If any error were to occur, one could easily pinpoint where to fix it.
+ Looking at the data schema on the server, it is well designed to extract the precise data elements needed for parts of the application. I could use this kind of schema design for more complex applications of my own where each data object is huge and I only need a few small data elements from the object to be brought into my application.


### Are there any best practices discussed in course material that you feel were not addressed in the code?
Overall the code followed the best practices discussed in course material. The few improvements that could be included are -
+ Given the number of axios calls and the associated wait times, the application seems to not have created any error in rendering when I ran it on the hosted server and again on my computer. The lack of errors could be primarily due to the size of the data. Would be useful to set up a flag variable, e.g. ```isLoading: true```, in the data section, and in the response section of the axios call check if there is data available in the response and if so set ```isLoading=false```, and before rendering the dogs in the ```<template>```, surround it by another element such as a div which only renders if ```isLoading==false```.
+ Local Storage is directly accessed in several files which can make [unit testing difficult](https://github.com/susanBuck/e28-fall19/issues/157) and goes against the concept of separation of concerns discussed in our course. The Cart.js example Susan showed for zipfoods could be a starting point to build upon here. Doing so would allow to create unit tests with mock localStorage data passed in and out of the component.
+ Vuex store or event the global store using app.js from course materials could have been used to reduce the number of axios calls made in this app. Given that the data is relatively static, i.e. would probably change once a day but not every second, fewer axios calls from fewer components or pages would increase performance of this application. The way to solve for this is to make the axios calls on relatively static data from fewer components/pages and share that data across the application through Vuex or state class or app.js.
Other than these, the variable and function names are meaningfully named and used, and most other concepts were well used.


### Do you have any additional comments not covered in the above questions?
I appreciate the application is well written for the use-cases, with some of the areas for improvements mentioned above.
+ While I enjoyed reading about all of the dogs (their specialties, lifespans and even came across worldlifeexpectancy.com/dog-life-expectancy), I see that this application could be extended in so many different ways, e.g. more animals for adoption, other topics or issues items to vote for, etc. The application could be built with planned extensibility, which means less hard-coding and structuring code with deliberate intent to extend or reuse.
