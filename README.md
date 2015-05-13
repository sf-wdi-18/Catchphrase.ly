#ToEat.ly

##Starting point

* npm init
* npm install express --save

* touch index.js
* require express
* create a route for "/" and listen, test it works

* use nodemon

* touch html file
* require path & serve up public folder assets
* sendFile index.html
* link to css & js in html

* require bootstrap & jQuery

* seed food index

* food index path, render JSON


##Goals

###This morning
* Get foods displayed on index.html using AJAX & Underscore templating

###This afternoon
* Perform CRUD actions in a SPA
* Add foods to our data-set and update the page
* Delete specific foods from our data-set and update the page 



##CRUD

##SPA

##Tips

* Have one small goal. Solve it. Then move to the next one.
* Console log is your friend!

##Posting
* Add a food with a bootstrap form, an AJAX post, and an Express route that pushes a new food into the foods array

* form event listener
* serialize
* post request
* body parser
* respond with object created
* ONLY on done re-render the View (or just append the new element)

##Deleting
* Delete a *specific* food from the array and update the DOM

* Using unique incrementing ids
	* add a data-id in template
	* access the data of the element using jQuery's `.data()`
* send a delete request with the `.ajax()` method and pass in an object 
* Our delete request cannot take data, so we must give it a route that maps to our object's id
* Similarly, we must create a delete route that expects a dynamic id
* finding the food with the proper ID & remove from array
	* let's add underscore to the project and leverage it's `.findWhere` method
	* remember to convert your id back to a integer as it is coming through the params!
* When done, re-render the View (or remove the specific element)