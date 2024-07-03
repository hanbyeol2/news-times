const API_KEY = 'bb3d0f0d23ab4da99054430762f9a69e';
let newsList=[];
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu=>menu.addEventListener('click', (event)=>getNewsByCategory(event)))
let url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);

const getNews = async()=>{
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(response.status===200){
            if(data.articles.length===0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            render();
        }else{
            throw new Error(data.message);
        }

    }catch(error){
        errorRender(error.message)
    }

}

const getLatestNews = async () => {
    url =  new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    ); // URL 인스턴스를 만듦 
    getNews();
};

const getNewsByCategory = async (event)=>{
    const category = event.target.textContent.toLowerCase();
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    getNews();
}

const getNewsByKeyword = async ()=>{
    const keyword = document.getElementById('search-input').value;
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    );
    getNews();
}

const render=()=>{
    const newsHTML=newsList.map(news=>`<div class="row news">
        <div class="col-lg-4">
            <img src="${news.urlToImage}" alt="" class="news-img-size">
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description} </p>
            <div>
                ${news.source.name} * ${news.publishedAt}
            </div>
        </div>
    </div>`
    ).join('');

    document.getElementById('news-board').innerHTML=newsHTML
}

const errorRender = (errorMassage) => {
    const errorHTML = 
   `<div class="alert alert-danger" role="alert">${errorMassage}</div>` ;
   document.getElementById('news-board').innerHTML = errorHTML;
}

getLatestNews();


//버튼에 클릭이벤트 주시 
//카테고리별 뉴스 가져오기 
//그 뉴스를 보여주기 