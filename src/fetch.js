export function askAI(question, id ){
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    return postData('https://www.aiprotege.com/api/message', {
        "conversationID": id,
        "messages": [
            {
                "messageID": generateUUID(),
                "messageDatetime": Math.floor(Date.now() / 1000),
                "author": "You",
                "message": question,
                "messageType": "question",
                "origin": "user",
                "isImage": false
            }
        ],
        "protege": {
            "protegeID": "e60fe2f0-ea06-47dc-b19e-d3faa55e53a4",
            "shortName": "Paul",
            "name": "Paul Graham's Protégé",
            "basedOn": "Paul Graham",
            "href": "/conversation/Paul Graham",
            "iconURL": "/protegeIcons/PaulIcon.png"
        }
    }).then(reply => {
        return reply;
    });

}

export function generateUUID() {
    let
        d = new Date().getTime(),
        d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};