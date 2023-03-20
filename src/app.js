import pkg from "@slack/bolt";
const {App, LogLevel } = pkg;
const clientOptions = {};
import { askAI } from "./fetch.js";

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
app.command('/askai', async ({command, ack, say}) => {
    // Acknowledge command request
    await ack();

    await say({
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "A new question from " + command.user_name + " has arrived!",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*The question:* \n\n" + command.text
                }
            },
            {
                "type": "divider"
            }
        ]
    });

    // send a message and wait for the response
    const response = await askAI(
        `${command.text}`
    ).then((response) => response).catch((error) => 'Error: ' + error);

    //await say(response);
    await say({
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*AI's response:* \n\n" + response
                }
            },
            {
                "type": "divider"
            },
        ]
    });
});