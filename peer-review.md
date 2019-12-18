## P3 Peer Review

+ Reviewer's name: Jiajia Chen
+ Reviwee's name: Mihika Shilpi
+ URL to reviewee's Github repo: *<https://github.com/mihika-shilpi/e28>*

*Answer the following questions in regards to the student's project you are reviewing. Include context and code examples in your answers when relevant.*


### Are you able to produce any errors or unexpected results?
* No errors in console
* Unlike a typical "like" and unlike a typical "cart", adding an album multiple times added 1 unit of the album again

### Were there any parts of the interface that you found confusing or unclear?
* Menu item called LIKE is more of a current status of all like events currently active.
* Album page lists tracks, but no links to listen to or preview the tracks
* Position of Like button changed for different sizes of the album image. To fix this problem, set the image width and height either in HTML attributes or in CSS, or set the image to fill 100% of a defined parent element, or set the Like button's position to always be below the image.
* Removing an item from Like unexpectedly navigates from the Like page to the page of the album removed because the Remove button is also enclosed within the router-link tag -
```
<div v-for='item in items' :key='item.id' class="uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l">
    <router-link :to='{ name: "album", params: {"id" : item.id }}'>
    <div>
    <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
        <img
            :alt='"Album image of  " + item.name'
            :src='"./../../assets/images/" + item.id + ".jpg"'
        />
        </div>
            <div class="uk-card-footer">
            <button @click='removeFromLike(item.id)' class="uk-button uk-button-default uk-button-small uk-width-1-1">Remove</button>
            <transition name='fade'>
              <div class='uk-alert-danger' v-if='addAlert'>Your like has been removed!</div>
          </transition>

        </div>
    </div>
    </div>
    </router-link>
    </div>
```
Could be more like the following to solve for this navigation -
```
<div v-for='item in items' :key='item.id' class="uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l">
  <div>
    <router-link :to='{ name: "album", params: {"id" : item.id }}'>
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <img
              :alt='"Album image of  " + item.name'
              :src='"./../../assets/images/" + item.id + ".jpg"'
          />
        </div>
      </div>
    </router-link>
    <div class="uk-card-footer">
      <button @click='removeFromLike(item.id)' class="uk-button uk-button-default uk-button-small uk-width-1-1">Remove</button>
      <transition name='fade'>
        <div class='uk-alert-danger' v-if='addAlert'>Your like has been removed!</div>
      </transition>
    </div>
  </div>
</div>
```

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?
* Although Like.js contains the function to total up the Likes for each album, this is not used, and would be good to comment out the code for performance reasons or indicate that it is not in use for code readability
```
count() {
    let sum = 0;
    for (let key of Object.keys(this.items)) {
        sum += this.items[key].quantity;
    }
    return sum;
}
```

### Are there any parts of the code that you found interesting or taught you something new?
* Use of UIkit from https://getuikit.com/ to build the navigation bar and all of the CSS
* Overall scope of this p3 is minimal and covers the basic requirements of p3

### Are there any best practices discussed in course material that you feel were not addressed in the code?
* 3 of the 5 .vue files under components make an axios call to fetch static data. Could have used the sharedState example our professor showed in the course material to reduce calls to the server.
* The name used for the url in app.js is api, which made it confusing at first glace to see the axios calls.

### Do you have any additional comments not covered in the above questions?
* Very well chosen set of use-cases for this version of the application and the simplicity of the solution is very good too.
* The more things you try, the more challenges you encounter and the more mistakes you make, and the more you learn. The minimalistic approach to this p3 covers all the basic requirements of the assigned project, but seems limited for learning. I hope this is the final optimized version of a lot of use-cases that were discarded for sake of a v0.1 MVP.  

