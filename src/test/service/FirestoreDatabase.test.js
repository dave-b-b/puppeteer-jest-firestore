const { addMessagesToDatabase } = require('../../main/services/FirestoreDatabase')
const { Message } = require("../../main/models/Message");
const timeout = 30_000;

describe("addMessagesToDatabase", () => {
	it('should add new list of messages', async () =>{
		const listOfMessages = [
			new Message("sample subject", "sample body"),
			new Message("another subject", "another body")
		];

		const result = await addMessagesToDatabase(listOfMessages)

		expect(result).toBe(true);
	}, timeout)

});
