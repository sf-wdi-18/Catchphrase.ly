#catchphrase.ly Sample Solution

##Day 1 - Get & Render
Reference lesson: [Underscore templating](https://github.com/sf-wdi-18/notes/tree/master/lectures/week-03/day_3_todo_ajax/dawn_templating)

###User Stories
**A User can now see a list of existing `phrases` on the home page**

* A phrase object now has the properties: `id`, `word`, & `definition`

* The app now holds an array of hard-coded phrases. This serves as our "database". (We made a few up!)

###Walkthrough  

####Start an express project with all the necessary requirements. 

We're starting from nothing, so let's break this into subgoals:
      
1. *We'll want to connect every new project to a GitHub repo.* You can start with a remote GitHub repo, or start with a local directory.   

	**Option A**: Make a GitHub repo for the project and clone it onto your computer. (This is like what we've been doing.)   
	* From your GitHub account, in the right side of the page's navbar, click the `+` button next to your user name.    
	* In the `+` dropdown, choose "New repository".  
	* Use the form to create your new repo.   
	* Clone the repo to your computer with `git clone`.   

	**Option B**: Make a directory for the project, turn it into a git repo, and connect it to a new remote GitHub repo.    
	* Make a directory and turn it into a git repo.   
	```  
	$ mkdir catchphrase.ly 
	
	$ cd catchphrase.ly    
	
	$ git init    
	```
	
	* Make a new repo for your project on GitHub.      
	* Add your new repo as a remote origin from your local repo. Use the same url we use for cloning.    
	
	```
	$ git remote add origin https://github.com/YOURUSERNAME/catchphrase.ly.git
	```   
			
			
			    
	*Now we're ready to start work on our project.*

2. Create a file where our server code will live. We've been calling ours `index.js` because that's the default for npm. If you want, you could name yours `server.js` or some other more descriptive name.

	```
	$ touch index.js
	```

3. Use `npm init` to create a `package.json` for us. `package.json` catalogs basic information about the project. 

	```
	$ npm init
	name: (catchphrase.ly) 
	version: (1.0.0) 
	description: 
	entry point: (index.js) 
	test command: 
	git repository: 
	keywords: 
	author: 
	license: (ISC) 
	```
	You'll see `npm init` asks about the "entry point" for your project. The default is `index.js`, so if you used another name, enter it for that question instead.

4. Install the node packages we plan to use with `npm install --save`. Note that we can install multiple packages at once:

	```
	npm install --save express body-parser underscore
	```

	The command `npm install --save some-package` does three things:   
   	(1) creates a `node_modules` directory (if there isn't one already),    
   	(2) downloads the package into the `node_modules` directory, and    
   	(3) adds the package to the list of our project's dependencies in `package.json`.

   	If we didn't have ToEat.ly as a model, we might not know from the start that we want all of these packages. But we do!

5. Now is a good time to tell git to ignore all this extra code from our node packages.  We'll add the `node_modules` to the end of our `.gitignore` file.
	```
	$ echo "node_modules" >> .gitignore
	```   
	   
	   
   	*Now we're ready to start coding on our server (in `index.js`).*


6. Open up `index.js` and `require` the node packages we're using.
	```
	//index.js
	var express = require("express"),
	    path = require("path"),
	    _ = require("underscore"),
	    bodyParser = require("body-parser");
	```
 

7. Still in `index.js`, create the express app.   
	```
	var app = express();
	```
	Now we can configure `body-parser`:   
	```
	app.use(bodyParser.urlencoded({ extended: true }));
	```
	Let's set up reminders that this is where our data and routing instructions will live.   
	```
	// DATA
	phrases = [];

	// ROUTING
	app.get("/", function(req, res){
		res.send("catchphrase.ly home page");
		//TODO: send actual home page!
	});

	```
	Finally, tell the server what port to listen on when we start it up with `node index.js` or `nodemon`:
	```
	app.listen(3000, function (){
  		console.log("listening on port 3000");
	});
	```   
   
   
	*Everything to this point has been generic project setup, and setup on the server side. Right now, you could start up the server and see "catchphrase.ly home page" at `localhost:3000/`. We're ready to move over to the client side.*


#### Create an index (home) page

Set up a `public` directory and a `views` subdirectory, then create the home page. In class we've been calling it `index.html`, but let's use `home.html`.  

```
$ mkdir public  
$ mkdir public/views  
$ touch public/views/home.html  
```

#### Serve up your static assets (html, css, js) in a public directory

1. Set up the `js` and `css` directories.
	```
	$ mkdir public/js
	$ mkdir public/css
	```
2. Create the file where our client side code will live: `app.js`.
	```
	$ touch public/js/app.js
	```

####Your '/phrases' route should return phrases as JSON   
Routing is the server's job (and that's where our phrases data is), so we'll have to work on this in `index.js`. See that file for the solution.

####Use AJAX to GET phrases   
The client makes requests, so we'll work on this in `app.js`. See `app.js` for the solution. 

####Render the phrases on the index page using underscore templating    
This requires code in our `home.html` and `app.js` files. Check it out!

