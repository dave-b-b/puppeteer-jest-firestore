const {db, FieldValue} = require("../initializeFirestoreApp");

async function addMessagesToDatabase(messages) {
    try {
        for (let message of messages) {
            const serializedMessage = serializeMessage(message);
            const documentReference = await db.collection('testCollection').doc("id1");
            const documentSnapshot = await documentReference.get();

            if (!documentSnapshot.exists) {
                await documentReference.set({
                        'arrayOfMessages': [serializedMessage],
                    })

            } else if (documentSnapshot.exists) {
                await documentReference
                    .update({
                        'arrayOfMessages': FieldValue.arrayUnion(serializedMessage),
                    })
            }
        }
    } catch(e){
        console.error(`Could not add messages to Firestore database: Here's the error${e}`)
        return false;
    }

    return true;
}

function serializeMessage(message){
    let result = {};
    for(const prop in message){
        result[prop] = message[prop];
    }
    return result;
}

module.exports = {
    addMessagesToDatabase
}