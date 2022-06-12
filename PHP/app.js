var accessToken = getHashValue('access_token');
var client;
function addListEntry(html, id) {
	let ul = document.getElementById('chat');
	let li = document.createElement('li');
	let textNode = document.createElement('span');
	textNode.innerHTML = html;
	textNode.setAttribute('id', id);
	li.appendChild(textNode);
	ul.appendChild(li);
	window.scrollTo(0, document.body.scrollHeight); // Scroll to bottom of page
}
function getHashValue(key) {
	matches = location.hash.match(new RegExp(key+'=([^&]*)'));
	return matches ? matches[1] : null;
}
function connect() {
	connectImpl(document.getElementById('username').value, accessToken, [document.getElementById('channel').value]);
}
function connectImpl(username, password, channels) {
	channels = channels.map(channel => channel.toLowerCase());
	client = new tmi.Client({
		options: { debug: false },
		identity: {
			username: username.toLowerCase(),
			password
		},
		channels
	});
	client.connect().then(([server, port]) => {
		var statusBox = document.getElementById('statusBox');
		statusBox.innerHTML = 'Connected to ' + server + ':' + port;
		statusBox.classList = 'green';
		console.log('Connected to ' + server + ':' + port);
	}).catch(err => {
		var statusBox = document.getElementById('statusBox');
		statusBox.innerHTML = 'Error connecting to Twitch Chat: ' + err;
		statusBox.classList = 'red';
		console.error('Error connecting to Twitch Chat: ' + err);
	});
	client.on('message', async (channel, tags, message, self) => {
		// if (self) return; // Ignore echoed messages.
		if (message.toLowerCase() === '!antifollowerping') {
			client.say(channel, 'antifollowerpong');
		}
		let response = '';
		if (tags.badges && (tags.badges.broadcaster || tags.badges.moderator || tags.badges.subscriber || tags.badges.vip)) {
			response = 'Bypassed by Badges of ' + tags.username + ': ' + message;
		} else {
			// Example message: "Buy viewers, followers and primes on website. com"
			// Example message: "Wanna become famous? Buy viewers, followers and primes on website. shop "
			// Example message: "Get viewers, followers and primes on website. com"
			if (message.match(/.*(?:Buy|Get) (?:(?:viewers|followers|primes|and),? ?)+ on .+\. ?(?:com|shop|store)/gi)) {
				try {
					await client.deletemessage(channel, tags.id);
					response = 'Deleted Message by ' + tags.username + ': ' + message;
				} catch (err) {
					response = 'Couldn\' delete Message due to: ' + err;
				}
			} else {
				response = 'Not Bypassed by Badges of ' + tags.username + ': ' + message;
			}
		}
		console.log(response);
		addListEntry(response, tags['id']);
	});
}
if (window.accessToken) {
	document.getElementById('authorizeBtn').style.display = 'none';
} else {
	document.getElementById('botForm').style.display = 'none';
}
