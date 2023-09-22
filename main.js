//전역변수 정보값
//외부데이터 fetching시 준비사항, api-key발급,쿼리값
//api-key, 가져올 데이터갯수, 플레이리스트아이디
//위의 쿼리값들을 조합해서 최종 데이터 요청 url완성
const frame = document.querySelector('section');
const api_key = 'AIzaSyC-pvI3J0WNJY2yI82H6PGggEgUR-Hv5iY';
const baseurl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLNiucQiR7LtQSLOd5hZS7199O5xS7PWPO';
const num = 5;
const resulturl = `${baseurl}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 50;
const desc_len = 180;

//동적으로 생성되는 요소애는 무조건 window에 이벤트 위임을 걸고
window.addEventListener('click', (e) => {
	// 선택자 요소에 따라 다른 다른 함수를 호출
	//썸네일 클릭시 팝업 호출
	if (e.target.nodeName === 'IMG') createPop(e.target.getAttribute('data-vid'));
	//닫기버튼 클릭시 팝업 제거
	if (e.target.className === 'close') removePop();
});
//브라우저 로딩시 fetch함수 호출

fetch(resulturl)
	//promise로 넘어온 데이터를 동기적으로 받아서 json형태로 parsing한 다음에
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);

		let tags = '';
		//
		//동적으로 목록생성
		json.items.map((data) => {
			//글자값이 길어서 글자짜르기로 가공처리
			let desc = data.snippet.description;
			desc.length > desc_len ? (desc = desc.substr(0, desc_len) + '...') : desc;
			//parsing된 배열데이터를 반복돌면서
			//동적으로 목록 생성
			let date = data.snippet.publishedAt.split('T')[0];
			date = date.split('-').join('.');

			tags += `
        <article>
          <h2>${
						data.snippet.title.length > tit_len
							? data.snippet.title.substr(0, tit_len) + '...'
							: data.snippet.title
					}</h2>
          <div class="txt">
            <p>${desc}</p>
            <span>${date}</span>
          </div>
          <div class="pic">
            <img src="${data.snippet.thumbnails.standard.url}" data-vid=${
				data.snippet.resourceId.videoId
			}/>
          </div>
        </article>
      `;
		});
		frame.innerHTML = tags;
	});

//이벤트위임으로 썸네일 클릭시 동적으로 팝업호출시 영상출력 함수
function createPop(id) {
	const aside = document.createElement('aside');
	aside.innerHTML = `
  <div class="con">
  <iframe src="https://www.youtube.com/embed/${id}"></iframe>
  </div>
  <span class="close">close</span>
  `;
	document.body.append(aside);
	document.body.style.overflow = 'hidden';
}
//이벤트위임으로 닫기 버튼클릭시 팝업 제거하는 함수
function removePop() {
	const pop = document.querySelector('aside');
	pop.remove();
	document.body.style.overflow = 'auto';
}
