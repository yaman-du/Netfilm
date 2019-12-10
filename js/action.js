$(document).ready(function() {
    
    let actionlist = ["tt0110413", "tt0060196", "tt0468569", "tt5463162", "tt1074638", "tt0090605", "tt0172495", "tt7975244"];
    
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
            //aktivering utav modal        
            let imgcontainer = $('<div>');
            imgcontainer.attr("class", "imgcontainer")
                        .appendTo($('#product-container'))
                        .click(function(){
                            $("#modal").css("display","block");
                            $("#modal").click(function(e){
                                if (e.target == this) {
                                    $("#modal").css("display", "none");
                                }
                            })
                        });            
            let myImage = $('<img/>');
            myImage.attr("src", "http://image.tmdb.org/t/p/w500/" + product.imgurl)
                    .appendTo(imgcontainer);
            let titletext = $('<span>');
            titletext.html(product.title)
                .appendTo(imgcontainer);

            let buybutton = $('<div>');
            buybutton.html("Köp " + " " + " " + product.price + " kr")
                    .appendTo(imgcontainer)
                    .addClass("addtocart")
                    .click(function() {
                        addtocart( product );
                        updatecart();
                    });

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

    $('#cart-icon').click( function(event) {
    
        if( event.target == this || event.target == this.children[1] ) {
            console.log($("#cart-container").css("right") + " " +
            window.innerWidth);
            if($("#cart-container").css("right") == "-1000px") {
                $("#cart-container").css("right", "-50px");
            }
            else {
                $('#cart-container').css("right", "-1000px");
            } 
        }
        else {
            return;
           
        }
    });

    $('.fa-arrow-alt-circle-right').click(function() {
        if($("#cart-container").css("right") == "-1000px") {
            $("#cart-container").css("right", "-50px");
        }
        else {
            $('#cart-container').css("right", "-1000px");
        } 
    });

    $("#remove-all").on("click", function() {
        $('.cart-content').remove();
        localStorage.clear();
        $('#cart-count').html(0);
        
        $('#total-price').html("Totalpris: 0 kr");
       
    });

    updatecart();
    $("#lowtohigh").click(function() {
        for ( let i = 0; i < $('#product-container')[0].childNodes.length-1; i++) {
            
        }
    });
}); 



function updatecart() {
    $('.cart-content').remove();
    let cartcount = 0;
    let totalprice = 0;

    for (let i = 0; i < localStorage.length; i++) {  
        let productobject = localStorage.getItem(localStorage.key(i));
        productobject = JSON.parse(productobject);
        let div = $('<div>');
        let img = $('<img>');   
        let para = $('<p>');
        let para2 = $('<p>');
        let div2 = $('<div>');
        let ileft = $('<p>');
        let iright = $('<p>');
        let para3 = $('<p>');
        let div3 = $('<div>');

        div.addClass('cart-content')
            .insertAfter($('#cart-header'));

        img.attr("src","http://image.tmdb.org/t/p/w500/" + productobject.imgurl )
            .appendTo(div);

        para.html(productobject.title)
            .appendTo(div)
            .addClass("title");

        div3.html("&times")
            .appendTo(div)
            .addClass("remove")
            .click(function() {
                localStorage.removeItem(productobject.title);
                updatecart();
            });

        para2.html( productobject.price*productobject.amount + " kr")
            .appendTo(div)
            .addClass("price");
        
        div2.appendTo(div)
            .addClass("amount-div");
        ileft.html("-")
            .appendTo(div2)
            .click(function() {
                productobject.amount--;
                if ( productobject.amount <= 0 ) {
                    localStorage.removeItem(productobject.title);
                }
                else {
                    localStorage.setItem(productobject.title, JSON.stringify(productobject));
                }
                
                updatecart();
            });

        para3.html(productobject.amount)
            .appendTo(div2);

        iright.html("+")
            .appendTo(div2)
            .click(function() {
                productobject.amount++;
                console.log(productobject.amount);
                localStorage.setItem(productobject.title, JSON.stringify(productobject));
                updatecart();
            });
        

        cartcount += productobject.amount;
        totalprice += productobject.price*productobject.amount;

        $('#cart-count').html(cartcount);
     
    }

    $('#total-price').html("Totalpris: " + totalprice + " kr");     
}

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