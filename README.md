# guilded.js-template
A simple guilded.js template made by midora

# first version of this template
- command handler with aliases

# how to run?
run this in termial: `npm install`, it will download all the package
```env
TOKEN = your_bot_token
PREFIX = your_bot_prefix
MONGODB = yout_bot_mongo_url (optional)
```

# connect to mongodb
run in this terminal: `npm i mongoose`

place this code in `index.js`:
```js
const { connect } = require('mongoose')
client.on("ready", () => {
    connect(config.mongodb || process.env["MONGODB"], { keepAlive: true })
      .then(() => {
        console.log("Connected to database!");
      })
      .catch((err) => {
        console.log(err);
      });
  console.log(`Bot is successfully logged in as ${client.user.name}`);
});
```
note: delete this in `index.js` when connect to mongodb
```js
client.on("ready", () => {
  console.log(`Bot is successfully logged in as ${client.user.name}`);
});
```

### pls dont remove credit when u use my template >:(
