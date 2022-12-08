# SlackChatGTP
SlackChatGTP is a Slack App that uses the ChatGTP API to fetch answers to user queries.
## Installation
To install and use SlackChatGTP, follow these steps:
1. Clone the repo: git clone https://github.com/Akdr/SlackChatGTP.git
2. Install the dependencies: npm install
3. Set up your ChatGTP API key:
    1. Create a file called .env in the root directory of the repo
    2. In .env, add the following lines, replacing the values:
       SLACK_BOT_TOKEN=xoxb-your-bot-token
       SLACK_SIGNING_SECRET=your-state-secret
       SLACK_APP_TOKEN=xapp-your-app-token
       SESSION_TOKEN=yourChatGTPToken

4. Start the app: npm start
5. Once the app is running, you can use it in your Slack channels by writing `/askai <your question>`.