// function getValues(){
// $(document).ready(() => {

//     $("#keywords1").focus();

//     $("#keywords1").blur(function () {
//         if ($(this).val() != '') {
//             $("#keywords2").removeAttr("disabled");
//         }
//         else {
//             $("#keywords2").attr("disabled", "disabled");
//             $("#keywords3").attr("disabled", "disabled");
//             $("#keywords4").attr("disabled", "disabled");
//         }
//     });

//     $("#keywords2").blur(function () {
//         if ($(this).val() != '') {
//             $("#keywords3").removeAttr("disabled");
//         }
//         else {
//             $("#keywords3").attr("disabled", "disabled");
//             $("#keywords4").attr("disabled", "disabled");
//         }
//     });

//     $("#keywords3").blur(function () {
//         if ($(this).val() != '') {
//             $("#keywords4").removeAttr("disabled");
//         }
//         else {
//             $("#keywords4").attr("disabled", "disabled");
//         }
//     });
//     //actors
//     $("#actors1").focus();

//     $("#actors1").blur(function () {
//         if ($(this).val() != '') {
//             $("#actors12").removeAttr("disabled");
//         }
//         else {
//             $("#actors2").attr("disabled", "disabled");
//             $("#actors3").attr("disabled", "disabled");
//             $("#actors4").attr("disabled", "disabled");
//         }
//     });

//     $("#actors2").blur(function () {
//         if ($(this).val() != '') {
//             $("#actors3").removeAttr("disabled");
//         }
//         else {
//             $("#actors3").attr("disabled", "disabled");
//             $("#actors4").attr("disabled", "disabled");
//         }
//     });

//     $("#actors3").blur(function () {
//         if ($(this).val() != '') {
//             $("#actors4").removeAttr("disabled");
//         }
//         else {
//             $("#actors4").attr("disabled", "disabled");
//         }
//     });
//     //directors
//     $("#directors1").focus();

//     $("#directors1").blur(function () {
//         if ($(this).val() != '') {
//             $("#directors2").removeAttr("disabled");
//         }
//         else {
//             $("#directors2").attr("disabled", "disabled");
//             $("#directors3").attr("disabled", "disabled");
//             $("#directors4").attr("disabled", "disabled");
//         }
//     });

//     $("#keywords2").blur(function () {
//         if ($(this).val() != '') {
//             $("#keywords3").removeAttr("disabled");
//         }
//         else {
//             $("#keywords3").attr("disabled", "disabled");
//             $("#keywords4").attr("disabled", "disabled");
//         }
//     });

//     $("#keywords3").blur(function () {
//         if ($(this).val() != '') {
//             $("#keywords4").removeAttr("disabled");
//         }
//         else {
//             $("#keywords4").attr("disabled", "disabled");
//         }
//     });
// });

$(document).ready(() => {
    $('#searchForm').submit((e) => {
        let title = $('#title').val();
        let genres = $('#genres').val();
        let mpaa_ratings = $('#mpaa').val();

        let keyword1 = $('#keywords1').val();
        // let keyword2 = $('#keywords2').val();
        // let keyword3 = $('#keywords3').val();
        // let keyword4 = $('#keywords4').val();

        let actor1 = $('#actors1').val();
        // let actor2 = $('#actors2').val();
        // let actor3 = $('#actors3').val();
        // let actor4 = $('#actors4').val();

        let director1 = $('#directors1').val();
        // let director2 = $('#directors2').val();
        // let director3 = $('#directors3').val();
        // let director4 = $('#directors4').val();

        let rating = $('#rating').val();
        if (rating > 10 || rating < 10) {
            rating = 1;
        }

        // let keywords = $('input[name^=keywords]').map(function (idx, elem) {
        //     return $(elem).val();
        // }).get();
        // let actors = $('input[name^=actors]').map(function (idx, elem) {
        //     return $(elem).val();
        // }).get();
        // let directors = $('input[name^=directors]').map(function (idx, elem) {
        //     return $(elem).val();
        // }).get();

        let isBefore = false;
        if ($('#time').val() == "before") {
            isBefore = true;
        }
        let year = $('#year').val();


        //get movies based on search
        if (title != "") {
            getMovies(title);
        } else {
            discoverMovies(genres, mpaa_ratings, keyword1, actor1, director1, isBefore, year, rating);
        }

        e.preventDefault();
    });
});
//  }


let API_KEY = 'f0060a08bbd35f8312d0c4cc87b05595';
let IMG_SIZE_XSMALL = 'w45';
let IMG_SIZE_SMALL = 'w200';
let IMG_SIZE_LARGE = 'w342';
var image_url;
var DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=f0060a08bbd35f8312d0c4cc87b05595&language=en-US&sort_by=popularity.asc&certification_country=en-us&include_adult=true&page=1&';

// function getPersonId(person){
//     return axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + person)
//       .then(response => {
//         this.response = response.results;
//         console.log(this.response);
//         return this.response[0].id;
//       }) 
// }

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function discoverMovies(genres, mpaa_ratings, keyword1, actor1, director1, isBefore, year, rating) {
    var DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=f0060a08bbd35f8312d0c4cc87b05595&language=en-US&sort_by=vote_average.asc&certification_country=en-us&include_adult=true&page=1';

    if (year != "") {
        if (isBefore) {
            DISCOVER_URL = DISCOVER_URL + "&primary_release_date.lte=" + year;
        }
        DISCOVER_URL = DISCOVER_URL + "&primary_release_date.gte=" + year;
    }
    if (genres.length != 0) {
        DISCOVER_URL = DISCOVER_URL + "&with_genres=";
        if (genres.length == 1) {
            DISCOVER_URL = DISCOVER_URL + genres.toString();
        } else {
            DISCOVER_URL = DISCOVER_URL + genres.toString().replaceAll(",", "|");
        }
    }
    if (mpaa_ratings.length != 0) {
        DISCOVER_URL = DISCOVER_URL + "&certification=";
        if (mpaa_ratings.length == 1) {
            DISCOVER_URL = DISCOVER_URL + mpaa_ratings.toString();
        } else {
            DISCOVER_URL = DISCOVER_URL + mpaa_ratings.toString().replaceAll(",", "|");
        }
    }

    if (rating != "") {
        DISCOVER_URL = DISCOVER_URL + "&vote_average.gte=" + rating;
    }

    if (keyword1 != "" && actor1 != "" && director1 != "") {
        DISCOVER_URL = DISCOVER_URL + "&with_keyword="
        axios.get('https://api.themoviedb.org/3/search/keyword?api_key=' + API_KEY + "&query=" + keyword1)
            .then((response) => {
                console.log(response);
                let id = response.data.results[0].id;
                DISCOVER_URL = DISCOVER_URL + id;
                console.log(DISCOVER_URL);
                DISCOVER_URL = DISCOVER_URL + "&with_people=";
                axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + actor1)
                    .then((response) => {
                        console.log(response);
                        let id = response.data.results[0].id;
                        DISCOVER_URL = DISCOVER_URL + id;
                        console.log(DISCOVER_URL);
                        axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + director1)
                            .then((response) => {
                                console.log(response);
                                let id = response.data.results[0].id;
                                if (!(DISCOVER_URL.includes("with_people"))) {
                                    DISCOVER_URL = DISCOVER_URL + "&with_people=" + id;
                                } else {
                                    DISCOVER_URL = DISCOVER_URL + "|" + id;
                                }
                                console.log(DISCOVER_URL);
                                axios.get(DISCOVER_URL)
                                    .then((response) => {
                                        console.log(response);
                                        let movies = response.data.results;
                                        let output = '<h3>Results</h3>';
                                        $.each(movies, (index, movie) => {
                                            if (movie.poster_path == null) {
                                                image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                                            } else {
                                                image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                                            }
                                            output += `
                                        <div class="col-md-3">
                                        <div class="well text-center">
                                            <img src= "${image_url}" id="movie-poster">
                                            <h5>${movie.title}</h5>
                                            <form action="/movieDetails" method="get">
                                            <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                                            </form>
                                        </div>
                                        </div>
                                    `;
                                        });
                                        $('#movies').append(output);
                                        $('#movie-poster').css('width', '75%');
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            })
                    })
            })
    }

    if (keyword1 == "" && director1 != "" && actor1 != "") {
        DISCOVER_URL = DISCOVER_URL + "&with_people="
        axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + actor1)
            .then((response) => {
                console.log(response);
                let id = response.data.results[0].id;
                DISCOVER_URL = DISCOVER_URL + id;
                console.log(DISCOVER_URL);
                axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + director1)
                    .then((response) => {
                        console.log(response);
                        let id = response.data.results[0].id;
                        if (!(DISCOVER_URL.includes("with_people"))) {
                            DISCOVER_URL = DISCOVER_URL + "&with_people=" + id;
                        } else {
                            DISCOVER_URL = DISCOVER_URL + "|" + id;
                        }
                        console.log(DISCOVER_URL);
                        axios.get(DISCOVER_URL)
                            .then((response) => {
                                console.log(response);
                                let movies = response.data.results;
                                let output = '<h3>Results</h3>';
                                $.each(movies, (index, movie) => {
                                    if (movie.poster_path == null) {
                                        image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                                    } else {
                                        image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                                    }
                                    output += `
                                        <div class="col-md-3">
                                        <div class="well text-center">
                                            <img src= "${image_url}" id="movie-poster">
                                            <h5>${movie.title}</h5>
                                            <form action="/movieDetails" method="get">
                                            <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                                            </form>
                                        </div>
                                        </div>
                                    `;
                                });
                                $('#movies').html(output);
                                $('#movie-poster').css('width', '75%%');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
            })
    }

    if (keyword1 != "" && director1 != "" && actor1 == "") {
        DISCOVER_URL = DISCOVER_URL + "&with_keyword="
        axios.get('https://api.themoviedb.org/3/search/keyword?api_key=' + API_KEY + "&query=" + keyword1)
            .then((response) => {
                console.log(response);
                let id = response.data.results[0].id;
                DISCOVER_URL = DISCOVER_URL + id;
                console.log(DISCOVER_URL);
                DISCOVER_URL = DISCOVER_URL + "&with_people=";
                axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + director1)
                    .then((response) => {
                        console.log(response);
                        let id = response.data.results[0].id;
                        if (!(DISCOVER_URL.includes("with_people"))) {
                            DISCOVER_URL = DISCOVER_URL + "&with_people=" + id;
                        } else {
                            DISCOVER_URL = DISCOVER_URL + "|" + id;
                        }
                        console.log(DISCOVER_URL);
                        axios.get(DISCOVER_URL)
                            .then((response) => {
                                console.log(response);
                                let movies = response.data.results;
                                let output = '<h3>Results</h3>';
                                $.each(movies, (index, movie) => {
                                    if (movie.poster_path == null) {
                                        image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                                    } else {
                                        image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                                    }
                                    output += `
                                        <div class="col-md-3">
                                        <div class="well text-center">
                                            <img id="movie-poster" src= "${image_url}">
                                            <h5>${movie.title}</h5>
                                            <form action="/movieDetails" method="get">
                                            <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                                            </form>
                                        </div>
                                        </div>
                                    `;
                                });
                                $('#movies').html(output);
                                $('#movie-poster').css('width', '75%');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })

            })

    }

    if (keyword1 != "" && actor1 != "" && director1 == "") {
        DISCOVER_URL = DISCOVER_URL + "&with_keyword="
        axios.get('https://api.themoviedb.org/3/search/keyword?api_key=' + API_KEY + "&query=" + keyword1)
            .then((response) => {
                console.log(response);
                let id = response.data.results[0].id;
                DISCOVER_URL = DISCOVER_URL + id;
                console.log(DISCOVER_URL);
                DISCOVER_URL = DISCOVER_URL + "&with_people=";
                axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + actor1)
                    .then((response) => {
                        console.log(response);
                        let id = response.data.results[0].id;
                        if (!(DISCOVER_URL.includes("with_people"))) {
                            DISCOVER_URL = DISCOVER_URL + "&with_people=" + id;
                        } else {
                            DISCOVER_URL = DISCOVER_URL + "|" + id;
                        }
                        console.log(DISCOVER_URL);
                        axios.get(DISCOVER_URL)
                            .then((response) => {
                                console.log(response);
                                let movies = response.data.results;
                                let output = '<h3>Results</h3>';
                                $.each(movies, (index, movie) => {
                                    if (movie.poster_path == null) {
                                        image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                                    } else {
                                        image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                                    }
                                    output += `
                                        <div class="col-md-3">
                                        <div class="well text-center">
                                            <img src= "${image_url}" id="movie-poster">
                                            <h5>${movie.title}</h5>
                                            <form action="/movieDetails" method="get">
                                            <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                                            </form>
                                        </div>
                                        </div>
                                    `;
                                });
                                $('#movies').html(output);
                                $('#movie-poster').css('width', '75%');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })

            })
    }

    if (keyword1 != "" && actor1 == "" && director1 == "") {
        DISCOVER_URL = DISCOVER_URL + "&with_keyword="
        axios.get('https://api.themoviedb.org/3/search/keyword?api_key=' + API_KEY + "&query=" + keyword1)
            .then((response) => {
                console.log(response);
                let id = response.data.results[0].id;
                DISCOVER_URL = DISCOVER_URL + id;
                console.log(DISCOVER_URL);
                axios.get(DISCOVER_URL)
                    .then((response) => {
                        console.log(response);
                        let movies = response.data.results;
                        let output = '<h3>Results</h3>';
                        $.each(movies, (index, movie) => {
                            if (movie.poster_path == null) {
                                image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                            } else {
                                image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                            }
                            output += `
                                        <div class="col-md-3">
                                        <div class="well text-center">
                                            <img src= "${image_url}" id="movie-poster">
                                            <h5>${movie.title}</h5>
                                            <form action="/movieDetails" method="get">
                                            <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                                            </form>
                                        </div>
                                        </div>
                                    `;
                        });
                        $('#movies').html(output);
                        $('#movie-poster').css('width', '75%');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
    }

    if (keyword1 == "" && actor1 != "" && director1 == "") {
        axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + actor1)
            .then((response) => {
                console.log(response);
                let id = response.data.results[0].id;
                if (!(DISCOVER_URL.includes("with_people"))) {
                    DISCOVER_URL = DISCOVER_URL + "&with_people=" + id;
                } else {
                    DISCOVER_URL = DISCOVER_URL + "|" + id;
                }
                console.log(DISCOVER_URL);
                axios.get(DISCOVER_URL)
                    .then((response) => {
                        console.log(response);
                        let movies = response.data.results;
                        let output = '<h3>Results</h3>';
                        $.each(movies, (index, movie) => {
                            if (movie.poster_path == null) {
                                image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                            } else {
                                image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                            }
                            output += `
                                        <div class="col-md-3">
                                        <div class="well text-center">
                                            <img src= "${image_url}" id="movie-poster">
                                            <h5>${movie.title}</h5>
                                            <form action="/movieDetails" method="get">
                                            <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                                            </form>
                                        </div>
                                        </div>
                                    `;
                        });
                        $('#movies').html(output);
                        $('#movie-poster').css('width', '75%');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })

    }

    if (keyword1 == "" && actor1 == "" && director1 != "") {
        axios.get('https://api.themoviedb.org/3/search/person?api_key=' + API_KEY + "&query=" + director1)
            .then((response) => {
                console.log(response);
                let id = response.data.results[0].id;
                if (!(DISCOVER_URL.includes("with_people"))) {
                    DISCOVER_URL = DISCOVER_URL + "&with_people=" + id;
                } else {
                    DISCOVER_URL = DISCOVER_URL + "|" + id;
                }
                console.log(DISCOVER_URL);
                axios.get(DISCOVER_URL)
                    .then((response) => {
                        console.log(response);
                        let movies = response.data.results;
                        let output = '<h3>Results</h3>';
                        $.each(movies, (index, movie) => {
                            if (movie.poster_path == null) {
                                image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                            } else {
                                image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                            }
                            output += `
                                        <div class="col-md-3">
                                        <div class="well text-center">
                                            <img src= "${image_url}" id="movie-poster">
                                            <h5>${movie.title}</h5>
                                            <form action="/movieDetails" method="get">
                                            <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                                            </form>
                                        </div>
                                        </div>
                                    `;
                        });
                        $('#movies').html(output);
                        $('#movie-poster').css('width', '75%');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
    }

    if (keyword1 == "" && actor1 == "" && director1 == "") {
        axios.get(DISCOVER_URL)
            .then((response) => {
                console.log(response);
                let movies = response.data.results;
                let output = '<h3>Results</h3>';
                $.each(movies, (index, movie) => {
                    if (movie.poster_path == null) {
                        image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                    } else {
                        image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                    }
                    output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src= "${image_url}" id="movie-poster">
                <h5>${movie.title}</h5>
                <form action="/movieDetails" method="get">
                <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                </form>
              </div>
            </div>
          `;
                });
                $('#movies').html(output);
                $('#movie-poster').css('width', '75%');
            })
            .catch((err) => {
                console.log(err);
            });
    }






}
function getMovies(title) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + "&query=" + title)
        .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = '<h3>Results</h3>';
            $.each(movies, (index, movie) => {
                if (movie.poster_path == null) {
                    image_url = "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                } else {
                    image_url = "https://image.tmdb.org/t/p/" + IMG_SIZE_LARGE + movie.poster_path;
                }
                output += `
            <div class="col-md-3">
              <div class="well text-center">
              <img src= "${image_url}" id="movie-poster">
                <h5>${movie.title}</h5>
                <form action="/movieDetails" method="get">
                <button type=submit name="detail-button" onclick="movieSelected('${movie.id}')" value="${movie.id}" class="btn btn-primary">Movie Details</a>
                </form>
              </div>
            </div>
          `;
            });
            $('#movies').html(output);
            $('#movie-poster').css('width', '75%');
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    //window.location = "/templates/home/movie-detail.html";
    return false;
}

