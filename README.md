# lukis-lukis
Lukis-lukis is a solo project for codeworks. It is a webapp that allows two or more friends to draw on one canvas together.

## Usage
To run, simply run npm start on frontend, frontend/server and backend. Mongodb should also be run. Users will be greeted with a log in page and where they have to enter their name in order to access the canvas. There are also a cookie which contain the username, this cookie does not expire but will be remove if user log out. 
When any user enter the canvas, their name shows up in the list of active users.
When one user interact with the canvas, other user will be lock out of the canvas(drawingmode = false).
When one user send the canvas over by clicking the send button, the canvas data will be save to the database and other user will see the updated result through socket io. 
When one user logout / send the canvas/ close the browser, the canvas will be unlocked and available for anyone to draw (drawingmode= true).
Clear will clear the canvas but it will also locked it. users can send over clear canvas to their friends.

## Dependencies
- Npm / Node
- Mongodb

## Technologies
- [Node js](https://nodejs.org/)
- [Socket.io](https://socket.io/)
- [Fabric.js](http://fabricjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)

## Testing
This product is set up with react unit test library found [here](https://testing-library.com/docs/react-testing-library/intro)
The test-cases are incomplete.
