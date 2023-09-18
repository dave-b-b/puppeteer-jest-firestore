# Webscraper with testing

This is just a webscaper setup for Puppeteer with Testing

## Tech Stack

1. Node.js
2. Firebase functions
3. Firestore
4. Puppeteer
5. Jest

## How to set up

In order to get this running, first you'll have to clone this repository to your local machine.

Then you'll need to create a *.env* file with your Firestore Service Account key. It needs to be in the following format for the code to work and needs to be located in the root directory:

`SERVICE_ACCOUNT_KEY=<Your_API_KEY>`

The key needs to all be in JSON format and on one line since .env key-value pairs cannot span multiple lines. 

Once, you have cloned the repo and created the .env file, run the following commands:
1. `npm install`

** You might have to run the following command to get Firebase working in a new project:

`firebase init`

## How to test

If you want to run the Jest tests, you can just run them in VSCode or webStorm (or whatever IDE you are using).

If you want to test the controller layer of your app, then you should use the following command:

`npm run emulators`

** You might also have to run the following command to install the emulators:

`firebase init emulators`