const frame = document.querySelector('section');
const api_key = 'AIzaSyC-pvI3J0WNJY2yI82H6PGggEgUR-Hv5iY';
const baseurl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLNiucQiR7LtQSLOd5hZS7199O5xS7PWPO';
const num = 5;
const resulturl = `${baseurl}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 50;

//일정 글자수 이상일때 글자짜르고 말줄임표 붙이기
//문자열.substr(시작위치,자를 글자수)

fetch(resulturl)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);

		let tags = '';

		json.items.map((data) => {
			tags += `
        <article>
          <h2>${
						data.snippet.title.length > tit_len
							? data.snippet.title.substr(0, 30) + '...'
							: data.snippet.title
					}</h2>
          <div class="txt">
            <p>${data.snippet.description}</p>
            <span>${data.snippet.publishedAt}</span>
          </div>
          <div class="pic">
            <img src="${data.snippet.thumbnails.standard.url}">
          </div>
        </article>
      `;
		});
		frame.innerHTML = tags;
	});
