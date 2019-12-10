$(document).ready(function() {
    //Id för vår film(genre)
    let actionlist = ["tt0110413", "tt0060196", "tt0468569", "tt5463162", "tt1074638", "tt0090605", "tt0172495"];
    
    //Skapar klass för våra filmer
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
    //Ajax hämtning utav vår api
    for ( let i = 0; i < actionlist.length; i++){
        let a = $.ajax("https://api.themoviedb.org/3/find/"+actionlist[i] +"?api_key=990c8bcf3ed6fe9927c44ba174b1574d&language=en-US&external_source=imdb_id", {
            method:'GET',
            async: true,
        });

    //när funktion klar - Jämför rating och ge ut ett pris
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
                        })
    //hämtar in bilder i rätt storlek
            let myImage = $('<img/>');
            myImage.attr("src", "http://image.tmdb.org/t/p/w500/" + product.imgurl)
                    .appendTo(imgcontainer);
    //Hämtar in titel och pris
            let para = $('<p>');
            para.html(product.title + " " + product.price + " kr")
                .appendTo(imgcontainer);
        });
    }
    //Side bar 
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
    //Öppna och stäng varukorg
    $('#cart-icon').click( function(event) {
    
        if( event.target == this || event.target == this.children[1] ) {
            console.log($("#cart-container").css("right") + " " +
            window.innerWidth);
            if($("#cart-container").css("right") == "-1000px") {
                $("#cart-container").css("right", "0");
            }
            else {
                $('#cart-container').css("right", "-1000px");
            } 
        }
        else {
            return;
           
        }
    });
    //rensa varukorg
    $("#remove-all").on("click", function() {
        $('.cart-content').remove();
        localStorage.clear();
        $('#cart-count').html(0);
        
        $('#total-price').html("Totalpris: 0 kr");
       
    });

    updatecart();

}); 



function updatecart() {
    $('.cart-content').remove();
    let cartcount = 0;
    let totalprice = 0;
//Hämtar information från localstorage om vad som finns i 
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
    //spara till local storage
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