


// $(document).ready(() => {
//     $('#searchForm').on('submit', (e) => {
//         let searchText = $('#searchText').val();
//         getMovies(searchText);
//         e.preventDefault();
//     });
// });

// $(document).ready(() => {
//     console.log("i did this");
//     $('#watch-button').on('submit', (e) => {
//         e.preventDefault();
//         $('#watch-button').css("display", "none");
       
//     });
// });

let API_KEY = 'f0060a08bbd35f8312d0c4cc87b05595';
let IMG_SIZE_XSMALL = 'w45';
let IMG_SIZE_SMALL = 'w200';
let IMG_SIZE_LARGE = 'w342';
let URL_YOUTUBE = 'https://www.youtube.com/embed/';
var image_url;

function getYouTubeURL() {
    let movieId = sessionStorage.getItem('movieId');
    var url = ''
    axios.get('https://api.themoviedb.org/3/movie/' + movieId + "/videos?api_key=" + API_KEY)
        .then((response) => {
            let trailerKey = response.data.results[0].key;
            console.log(trailerKey);
            url = "https://www.youtube.com/embed/" + trailerKey;
        })
        .catch((err) => {
            console.log(err);
        });

    return url;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    let youtube_url = '';
    //console.log(youtube_url);
    //get general movie information
    axios.get('https://api.themoviedb.org/3/movie/' + movieId + "?api_key=" + API_KEY)
        .then((response) => {
            console.log(response);
            let movie = response.data;
            if (movie.poster_path == null) {
                image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
            } else {
                image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
            }
            //get the trailer
            axios.get('https://api.themoviedb.org/3/movie/' + movieId + "/videos?api_key=" + API_KEY)
                .then((response) => {
                    console.log(response);
                    if (response.data.results.length == 0) {
                        youtube_url = "http://www.techsmyway.com/wp-content/uploads/2018/01/Fix-This-Video-is-not-available-in-your-Country-Error-on-YouTube.png"
                    } else {
                        let trailerKey = response.data.results[0].key;
                        console.log(trailerKey);
                        youtube_url = URL_YOUTUBE + trailerKey;
                    }
                    //get the cast, director, producer
                    axios.get('https://api.themoviedb.org/3/movie/' + movieId + "/credits?api_key=" + API_KEY)
                        .then((response) => {
                            console.log(response);
                            let cast = response.data.cast;
                            let crew = response.data.crew;
                            let output = `
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src= "${image_url}" class="thumbnail">
                                    </div>
                                    <div class="col-md-4">
                                            <form id="watched_form" action="/addToWatchedList" method="post" style="margin-right:5%;float:left">
                                            <span>Rating</span>
                                            <select name="rating"> 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                            <button id="watch-button" type=submit name="watched" value="${movie.id}+${movie.title}+${image_url}" class="btn btn-primary">I've seen it!</button>
                                            </form>
                                            <form id="watch_form" action="/addToWatchList" method="post" style="float:left">
                                            <button type=submit name="watch" value="${movie.id}+${movie.title}+${image_url}" class="btn btn-primary">I want to watch!</button>
                                            </form>
                                    </div>
                                    <div class="col-md-8">
                                        <h2>${movie.title}</h2>
                                        <ul id=movie-info class="list-group">
                                        <li class="list-group-item"><strong>Released: </strong> ${movie.release_date}</li>
                                        <li class="list-group-item"><strong>Rated: </strong> ${movie.vote_average}</li>
                                        <li class="list-group-item"><strong>Rated: </strong>`

                            for(var i =0; i< movie.genres.length; i++){
                                if(i==movie.genres.length-1){
                                    output+= `${movie.genres[i].name}`;
                                } else {
                                    output+= `${movie.genres[i].name}, `;
                                }
                                
                            }
                                        output+=`</li>
                                        <li class="list-group-item"><strong>Cast: </strong>`
                            for(var i =0; i< 5; i++){
                                if(i==4){
                                    output+= `${cast[i].name}`;
                                } else {
                                    output+= `${cast[i].name}, `;
                                }
                                
                            }
                                        
                                        output+=`</li>
                                        <li class="list-group-item"><strong>Director:</strong> ${crew[0].name} </li>
                                        <li class="list-group-item"><strong>Plot:</strong>${" " + movie.overview}</li>
                                        </ul>
                                        <br>
                                        <h4>Trailer</h4>
                                        <iframe width="560" height="315" src="${youtube_url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                        </div>
                                        
                                    </div>
                                </div>
                            `;

                            $('#movie').html(output);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}