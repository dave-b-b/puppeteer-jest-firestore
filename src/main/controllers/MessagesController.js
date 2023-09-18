const { operateCorrlinks, operateCrawler} = require("../services/Crawler");

const { onSchedule } = require("firebase-functions/v2/scheduler");

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2/options");
const {addMessagesToDatabase} = require("../services/FirestoreDatabase");
//Set memory to at least 1GiB in order for Puppeteer to run in the cloud
setGlobalOptions({ maxInstances: 10, memory: "2GiB" });

// onSchedule sets up a cron job to return based on the first parameter
exports.processOutgoingMessages = onSchedule("every 15 mins", async (event) => {
// You can uncomment the line below and comment-out the line above to be able to hit the endpoint for testing purposes.
// exports.processOutgoingMessages = onRequest(async (request, response) => {

    const messages = await operateCrawler();

    addMessagesToDatabase(messages)
});