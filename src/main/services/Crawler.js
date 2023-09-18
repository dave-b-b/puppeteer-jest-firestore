const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const {Message} = require("../models/Message");

const maxRetries = 3;
let retryCount = 0;

async function operateCrawler(value) {

	while (retryCount < maxRetries) {
		try {
			return await performCrawl(value);
		} catch (error) {
			console.log(`Attempt ${retryCount + 1} failed: ${error}`);
			retryCount++;
			if (retryCount < maxRetries) {
				console.log("Retrying...");
			} else {
				console.log("Max retry count reached. Exiting.");
				return new Error("Operation failed")
			}
		}
	}
}

async function performCrawl(value) {
	const browser = await setupBrowser();
	const page = await browser.newPage();

	await sampleOperation(page, value);

	return await browser.close();


}

async function setupBrowser() {
	const options = {
		headless: "new",
		product: "chrome",
		slowMo: 20,
	};
	puppeteer.use(pluginStealth());
	return puppeteer.launch(options);
}

async function sampleOperation(page, value = null) {

	if(value === 0){
		throw new Error;
	}

	await page.setViewport({
		width: 1920 + Math.floor(Math.random() * 100),
		height: 3000 + Math.floor(Math.random() * 100),
		deviceScaleFactor: 1,
		hasTouch: false,
		isLandscape: false,
		isMobile: false,
	});

	await page.goto('https://toscrape.com/');

	await page.waitForSelector('div.container');

	await page.click('body > div > div:nth-child(3) > div.col-md-10 > p > a');

	const quotes = await page.$$eval('span.text', (elements => {
		return elements.map( el => el.innerHTML)
	}))

	const result = quotes.map(quote => {
		const message = new Message("Quote", quote);
		return message;
	});

	return result;
}

module.exports = {
	operateCrawler,
	setupBrowser,
	sampleOperation,
	performCrawl
};
