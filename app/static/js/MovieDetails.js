


// $(document).ready(() => {
//     $('#searchForm').on('submit', (e) => {
//         let searchText = $('#searchText').val();
//         getMovies(searchText);
//         e.preventDefault();
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
                        youtube_url = ""
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
                                    <div class="col-md-8">
                                        <h2>${movie.title}</h2>
                                        <ul id=movie-info class="list-group">
                                        <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                                        <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                                        <li class="list-group-item"><strong>Genres:</strong> ${movie.genres[0].name + ", " + movie.genres[1].name}</li>
                                        <li class="list-group-item"><strong>Cast:</strong> ${cast[0].name + ", " + cast[1].name + ", "
                                + cast[2].name + ", " + cast[3].name + ", " + cast[4].name + ", " + cast[5].name} </li>
                                        <li class="list-group-item"><strong>Director:</strong> ${crew[0].name} </li>
                                        <li class="list-group-item"><strong>Plot:</strong>${" " + movie.overview}</li>
                                        </ul>
                                        <br>
                                        <h4>Trailer</h4>
                                        <iframe width="560" height="315" src="${youtube_url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                        </div>
                                            <a href="index.html" class="btn btn-default">Go Back To Search</a>
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