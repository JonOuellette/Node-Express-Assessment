### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
What ways of managing asynchronus codes is through callbacks(function passed through as an argument to another function).  Through Promises which is an object representing the eventual completion or failure of an asynchronus operation and through Async/Await which are features that makes it possible to write asynchronous code in a way that looks synchronous - it works on top of promises.

- What is a Promise?
A promise is a one-time guarantee of future value.

- What are the differences between an async function and a regular function?
Async functions are declared using async whereas regular functions do not.  Async functions always return a promise whereas a regular function returns a specific value directly.  Additionally, async functions can use the await keyword to wait for a Promise to resolve in order to make the code appear more like synchronus code - something that is not possible in regular functions.  

- What is the difference between Node.js and Express.js?
Node is a JavaScript environment that runs server-side utilizing the Chrome v8 engine but does not require Chrome.  Node essentially allows a person to run JavaScript on the server-side.
Express is a framework that operates within Node and helps manage everything from routes, requests and views.  Express helps to simplify the development of server-side application in a similar manner that flask does for Python

- What is the error-first callback pattern?
Is a function which either returns an error object or any successful data returned by the function.  The first argument of the function is reserved for the error object   If any error has occurred during the execution of the function it will be returned by the first argument. 

- What is middleware?
It is code that runs in the middle of the request/response cycle.  In Express, middleware are functions that get to access to the request and response objects and can also call the next function.  An example of middleware is express.json(). 


- What does the `next` function do?
next is part of the middleware funciton parameters that allows code to move on to the next route/middleware function in the stack.  

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

Inefficient use of await.  The current code fetches data from 3 different URLs using await - meaning that it will wait for the repvious one to complete before starting the next.  A more efficient way would be to start all requests simultaneously using the Promise.all() which allows all the requests to be made in parallel.

Variable names - although the names follow proper ruels, the naming of the variables are very specific and tied to the content of the URLs which makes it less flexible.  Another approach would be to use names like user1, user2, user3 or to design the function to take an array of usernames as an argument and loop through them.

Hardcoding the urls which is limiting the reusability of the URL instead of constructing URLs to be more dynamically.  

There are no error handling in the function. How the funciton is written if any of the requests fail, the entire function will throw an error and stop executing.  

The return statement order is different for the roder of the requests - which isnt considered to be a best practice approach.


```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
