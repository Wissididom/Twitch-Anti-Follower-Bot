require('dotenv').config();
const open = require('open');
const express = require('express');
const fetch = require('node-fetch');

open(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env['TWITCH_CLIENT_ID']}&redirect_uri=http://localhost:3000&scope=chat:read+chat:edit+channel:moderate`);
console.log(`Opened https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env['TWITCH_CLIENT_ID']}&redirect_uri=http://localhost:3000&scope=chat:read+chat:edit+channel:moderate in your default browser (If not just copy+paste it in the browser)`);

const app = express();
const port = 3000;
app.get('/', async (req, res) => {
	res.setHeader('content-type', 'text/plain');
	if (req.query.code) {
		const authObj = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000`, {
			method: 'POST'
		}).then(res => res.json()).catch(err => console.error);
		if (authObj.access_token) {
			res.send(`oauth:${authObj.access_token}`);
		} else {
			res.send("Couldn't get the access token!");
			console.log("Couldn't get the access token!");
		}
		server.close(() => {
			console.log('Server shutdown!');
		});
	} else {
		res.send(`${req.query.error}\n${req.query.error_description}`);
	}
});
const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
