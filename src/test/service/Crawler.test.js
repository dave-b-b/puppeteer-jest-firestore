const {
	operateCorrlinks,
	createNewUserAccount, setupBrowser, operateCrawler, sampleOperation, performCrawl,
} = require("../../main/services/Crawler");
const {error} = require("firebase-functions/logger");
const timeout = 30000;
describe("setupBrowser()", () => {
	it('should return an instance of the browser', async () => {
		const browser = await setupBrowser();

		expect(browser.isConnected()).toBe(true);
	})
});

describe("performCrawl()", () => {
	it('should return undefined when the browser closes', async () => {
		const browser = await performCrawl();

		expect(browser).toBe(undefined);
	}, timeout)
});

describe("sampleOperation()", () => {
	it('should return a list of quotes', async () => {
		const browser = await setupBrowser();
		const page = await browser.newPage();

		const result = await sampleOperation(page);

		expect(result.filter(message => typeof message.body === 'string').length).toBe(10);
	}, timeout)
});

describe('operateCrawler', () => {
	it('should retry three times, then throw an error', async () => {
		const result = await operateCrawler(0);

		expect(result.message).toBe("Operation failed");
	}, timeout)
})
// operateCrawler,
// 	setupBrowser,
// 	sampleOperation,
// 	performCrawl