const api_key = 'AIzaSyC-pvI3J0WNJY2yI82H6PGggEgUR-Hv5iY';
const baseurl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLNiucQiR7LtQSLOd5hZS7199O5xS7PWPO';
const num = 3;
const resulturl = `${baseurl}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

fetch(resulturl)
	.then((data) => data.json())
	.then((json) => {
		console.log(json);
	});
