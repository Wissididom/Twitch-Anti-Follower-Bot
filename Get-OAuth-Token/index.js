const open = require('open');
const express = require('express');

open('https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=kei9stdp5a05bvd31gr5okdswcx9re&redirect_uri=http://localhost:3000&scope=chat:read+chat:edit+channel:moderate');
console.log('Opened https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=kei9stdp5a05bvd31gr5okdswcx9re&redirect_uri=http://localhost:3000&scope=chat:read+chat:edit+channel:moderate in your default browser (If not just copy+paste it in the browser)');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
	res.setHeader('content-type', 'text/plain');
	if (req.query.code)
		res.send(`oauth:${req.query.code}`);
	else
		res.send(`${req.query.error}\n${req.query.error_description}`);
});
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
