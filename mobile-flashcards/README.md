## About

mobile-flashcard is a project created for Udacity's React Nanodegree program. 
This is a mobile application built with React Native that uses Redux and AsyncStorage to manage state and data storage.
The application was developed and tested in Android environment (emulator running Samsung Galaxy S6 - v5.1.0 - API 22).


## Table of Contents

* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
* [Sample JSON Data](#sample-json-data)


## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm install`

Install the app dependencies.

### `npm start`

Runs your app in development mode. Use 'a' for Android, 'i' for iOS.

## Sample JSON Data

```javascript
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
```

