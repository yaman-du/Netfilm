$(document).ready(function() {
    
    let actionlist = ["tt0110413", "tt0060196", "tt0468569", "tt5463162", "tt1074638", "tt0090605", "tt0172495"];
    
    let Product = function(t,u,y,v,d,a) {
        this.title = t;
        this.imgurl = u;
        this.year = y;
        this.trailerurl = v;
        this.description = d;
        this.vote = a;
        this.price = 0;
        this.genre = [];
        this.amount = 1;
    }
    
    for ( let i = 0; i < actionlist.length; i++){
        let a = $.ajax("https://api.themoviedb.org/3/find/"+actionlist[i] +"?api_key=990c8bcf3ed6fe9927c44ba174b1574d&language=en-US&external_source=imdb_id", {
            method:'GET',
            async: true,
        });


        a.done(function(data) {
            console.log(data.movie_results[0]);
            
            let movieresult = data.movie_results[0];

            let product = new Product(movieresult.title, movieresult.poster_path, movieresult.release_date, "", movieresult.overview, movieresult.vote_average);
              
            if ( product.vote < 7.2) {
                product.price = 79;
            }
            else if ( 7.2 < product.vote && product.vote < 8.0) {
                product.price = 99;
            }
            else {
                product.price = 129;
            }
            
            let imgcontainer = $('<div>');
            imgcontainer.attr("class", "imgcontainer")
                        .appendTo($('#product-container'))
                        .on("click", function() {
                            addtocart( product );
                        });
            let myImage = $('<img/>');
            myImage.attr("src", "http://image.tmdb.org/t/p/w500/" + product.imgurl)
                    .appendTo(imgcontainer);
            let para = $('<p>');
            para.html(product.title + " " + product.price + " kr")
                .appendTo(imgcontainer);
        });
    }
    let o = 0;
    $(".fa-sliders-h").on("click", function() {
      
        if (o == 0) {
            $("#side-filter-overlay").css("width", "600");
            o = 1;
        }
        else {
            $("#side-filter-overlay").css("width", "80");
            o = 0;
        }
    });

    $('#cart-icon').on("click", function() {
        for (let i = 0; i < localStorage.length; i++) {
            
            let productobject = localStorage.getItem(localStorage.key(i));
            let div = $('<div>');
            let img = $('<img>');   
            let para = $('<p>');
            div.addClass('cart-content')
                .appendTo($('#cart-container'));
            img.attr("src","http://image.tmdb.org/t/p/w500/" + JSON.parse(productobject).imgurl )
                .appendTo(div);
            // $('.cart-container')
        }
    });

}); 

function addtocart(a) {
    if ( localStorage.getItem(a.title) != undefined ) {
        let p = localStorage.getItem(a.title);
        p = JSON.parse(p);
        p.amount++;
        localStorage.setItem(a.title,JSON.stringify(p));
    }
    else {
        localStorage.setItem(a.title, JSON.stringify(a));
    }    
}