Chatly-ifier

This web app is designed to take data from the API, https://api.myjson.com/bins/18ce70 and transform it into a series of messages between two people.  

It utilizes:
- A clean, simple HTML structure.  
- SCSS files transpiled into css.  
   - In order to add additional SCSS, you'll need to utilize npm.  Two commands in particular: 
      - npm init (this creates the node modules)
      - npm run compile:sass (this will transpile the SCSS into CSS)
   - Works with Chrome, Firefox or Safari
   - Adjusts to screen sizes ranging from as small as the iPhone SE (350px) to large at over 2000px
- JavaScript with ES6 syntax
  - Vanilla JS as I beleive was the requirement
  - Involves modular reusable code as requested
- Uses an asynchronous network request to retreive the API data (no library/framework/npm needed)
