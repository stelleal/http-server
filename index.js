const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
	{
		id: 1,
		name: 'Midori',
	},
	{
		id: 2,
		name: 'Gato',
	},
	{
		id: 3,
		name: 'Fifi',
	},
];

server.on('request', (req, res) => {
	const items = req.url.split('/');
	// /friends/2 => ['', 'friends', '2']

	if (req.method === 'POST' && items[1] === 'friends') {
		req.on('data', (data) => {
			const newFriend = data.toString();
			console.log('Request:', newFriend);
			friends.push(JSON.parse(newFriend));
		});
    req.pipe(res);
	} else if (req.method === 'GET' && items[1] === 'friends') {
		// res.writeHead(200, {
		// 	'Content-Type': 'application/json',
		// });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');

		if (items.length === 3) {
			const friendIndex = --items[2];
			res.end(JSON.stringify(friends[friendIndex]));
		} else {
			res.end(JSON.stringify(friends));
		}

	} else if (items[1] === 'messages') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<body>');
		res.write('<ul>');
		res.write('<li>Hello Midori!</li>');
		res.write('<li>Do you like fish?</li>');
		res.write('</ul>');
		res.write('</body>');
		res.write('</html>');
		res.end();

	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
