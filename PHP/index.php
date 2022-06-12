<?php
include 'dotenv.php';
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Twitch-Anti-Follower-Bot</title>
		<link rel="stylesheet" href="index.css">
	</head>
	<body>
		<div style="position: sticky; top: 0; backgrund-color: black; color: white;">
			<a id="authorizeBtn" href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=<?php echo $TWITCH_CLIENT_ID; ?>&redirect_uri=<?php echo urlencode($REDIRECT_URI); ?>&scope=chat:read+chat:edit+channel:moderate">Authorize</a>
			<form id="botForm" action="javascript:void(0);" onsubmit="connect()">
				<label for="username">Username:</label><br />
				<input type="text" id="username" name="username" placeholder="Bot Username" /><br />
				<label for="channel">Channel:</label><br />
				<input type="text" id="channel" name="Channel" placeholder="Channelname" /><br />
				<input type="submit" value="Connect" />
			</form>
			<div id="statusBox"></div>
		</div>
		<ul id="chat"></ul>
		<script src="tmi.min.js"></script>
		<script src="app.js"></script>
	</body>
</html>
