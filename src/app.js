//const { App, LogLevel } = require('@slack/bolt');
import pkg from "@slack/bolt";
import * as pkg2 from 'chatgpt';
const {App, LogLevel } = pkg;
const {ChatGPTAPI} = pkg2;
const clientOptions = {};

const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN
})

const app = new App({
    // receiver: socketModeReceiver,
    token: process.env.SLACK_BOT_TOKEN, //disable this if enabling OAuth in socketModeReceiver
    // logLevel: LogLevel.DEBUG,
    clientOptions,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG,
});

(async () => {
    await app.start();
    console.log('⚡️ Bolt app started');
})();

// Publish a App Home
app.event('app_home_opened', async ({ event, client }) => {
    await client.views.publish({
        user_id: event.user,
        view: {
            "type": "home",
            "blocks": [
                {
                    "type": "section",
                    "block_id": "section678",
                    "text": {
                        "type": "mrkdwn",
                        "text": "App Home Published"
                    },
                }
            ]
        },
    });
});

// Listen to slash command
// need to add commands permission
// create slash command in App Config
app.command('/askai', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();

    // ensure the API is properly authenticated
    await api.ensureAuth()

    // send a message and wait for the response
    const response = await api.sendMessage(
        `${command.text}`
    )
    console.log(command)
    //await say(response);
    await say({
        "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*" + command.user_name + " asked the question:* \n\n" + command.text
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*AI's response:* \n\n" + response
            }
        },
    ]
    });
});