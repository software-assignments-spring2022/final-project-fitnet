## Building and testing 
* `npm install ` will install all dependencies listen in the `package.json` file
* `npm start` is one way to start the server - it will require you to manually restart whenever you change the code
* install `nodemon` by doing `npm install -g nodemon`
* `nodemon server` will start up the server with a monitoring process that will stop and restart the server automatically anytime code is changed

Once started, the server will by default be available on `port 3000` of the local computer at the URL, `http://localhost:3000`.

## Testing the routes
It is possible to try out the routes directly in a web browser. However, it is often more convenient to use an API-testing tool like Postman to test out the server API end-points.

 * Import the test file named `express-js-starter-app.postman_collection.json` into Postman to test out the API end-points.
