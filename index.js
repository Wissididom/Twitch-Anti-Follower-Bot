require('dotenv').config();
const tmi = require('tmi.js');
const client = new tmi.Client({
    options: { debug: false },
    identity: {
        username: process.env['TMI_BOT_USERNAME'],
        password: process.env['TMI_OAUTH_TOKEN']
    },
    channels: [
        process.env['TMI_CHANNEL_NAME']
    ]
});
client.connect().then(([server, port]) => {
    console.log(`Connected to ${server}:${port}`);
}).catch(err => {
    console.error(`Error connecting to Twitch Chat: ${err}`);
});
client.on('message', async (channel, tags, message, self) => {
    if (self) return; // Ignore echoed messages.
    if (message.toLowerCase() === '!antifollowerping') {
        client.say(channel, 'antifollowerpong');
    }
    if (tags.badges?.broadcaster || tags.badges?.moderator || tags.badges?.subscriber || tags.badges?.vip) {
        console.log(`Bypassed by Badges of ${tags.username}: ${message}`);
    } else {
        // Example message: "Buy viewers, followers and primes on website. com"
        // Example message: "Wanna become famous? Buy viewers, followers and primes on website. shop "
        // Example message: "Get viewers, followers and primes on website. com"
        if (message.match(/.*(?:Buy|Get) (?:(?:viewers|followers|primes|and),? ?)+ on .+\. ?(?:com|shop|store)/gi)) {
			try {
            	await client.deletemessage(channel, tags.id);
            	console.log(`Deleted Message by ${tags.username}: ${message}`);
            } catch (err) {
            	console.log(`Couldn't delete Message due to: ${err}`);
            }
        } else {
            console.log(`Not Bypassed by Badges of ${tags.username}: ${message}`);
        }
    }
});
