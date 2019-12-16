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
    
    let productlist = [];

    for ( let i = 0; i < actionlist.length; i++){
        let a = $.ajax("https://api.themoviedb.org/3/find/" + actionlist[i] + "?api_key=990c8bcf3ed6fe9927c44ba174b1574d&language=en-US&external_source=imdb_id", {
            method:'GET',
            async: false,
        });


        a.done(function(data) {
            
            let movieresult = data.movie_results[0];

            let product = new Product(movieresult.title, movieresult.poster_path, movieresult.release_date, "", movieresult.overview, movieresult.vote_average);
            
            productlist.push(product);
            
            if ( product.vote < 7.2) {
                product.price = 79;
            }
            else if ( 7.2 < product.vote && product.vote < 8.0) {
                product.price = 99;
            }
            else {
                product.price = 129;
            }
            
            

            if (i == actionlist.length-1 ) {
            
                videoapi( productlist );
                
            
            }
        });

    }



    
    let o = 0;
    $(".fa-sliders-h").on("click", function() {
      
        if (o == 0) {
            if ( innerWidth <= 600  ) {
                $("#side-filter-overlay").css("height", "500px");
                $("#side-filter-overlay").css("flex-basis", "auto");
            }
            else if ( innerWidth <= 1000){
                $("#side-filter-overlay").css("height", "500px");
                $("#side-filter-overlay").css("flex-basis", "auto");
            }
            else if ( innerWidth >= 1000){
                $("#side-filter-overlay").css("flex-basis", "500px");
                $("#side-filter-overlay").css("height", "auto");
            }
            o = 1;
        }
        else {
            if (innerWidth <= 600  ) {
                $("#side-filter-overlay").css("height", "80px");
                $("#side-filter-overlay").css("flex-basis", "auto");
            }
            else if ( innerWidth <= 1000){
                $("#side-filter-overlay").css("height", "80px");
                $("#side-filter-overlay").css("flex-basis", "auto");
            }
            else if ( innerWidth >= 1000){
                $("#side-filter-overlay").css("flex-basis", "80px");
                $("#side-filter-overlay").css("height", "auto");
            }
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
    
    $(document).mouseup(function (e) { 
        if ($(e.target).closest("#cart-container").length 
                    === 0) { 
            $("#cart-container").css("right", "-1000px"); 
        }
        else {
            $("#cart-container").css("right", "-50px");
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
        
        productlist.sort(function(a,b){
            return a.price - b.price
        });
        createElements(productlist);
    });
    $("#hightolow").click(function() {
        
        productlist.sort(function(a,b){
            return  b.price - a.price;
        });
        createElements(productlist);
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

    $('#success-text').html(a.title + " har lagts till i varukorgen");
    $('#success-container').css("top", -30 + "px");
    
    setTimeout(function() {
        $('#success-container').css("top", -200 + "px");
    }, 2500);


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

function videoapi( datalist ) {

    let actionlist = ["tt0110413", "tt0060196", "tt0468569", "tt5463162", "tt1074638", "tt0090605", "tt0172495", "tt7975244"];

    for ( let i = 0; i < datalist.length; i++){
        let b = $.ajax("https://api.themoviedb.org/3/movie/"+actionlist[i] +"/videos?api_key=990c8bcf3ed6fe9927c44ba174b1574d&language=en-US", {
            method:'GET',
            async: false,
        });
        b.done(function( data ){
            datalist[i].trailerurl = data.results[0].key;

        })
 
    }
    createElements(datalist);

}

function createElements( productlist ) {

    $('.productcontent').remove();
    for (i = 0; i < productlist.length; i++) {
    //aktivering utav modal  
    let product = productlist[i];
    let productcontent = $('<div>');
    productcontent.attr("class", "productcontent")
                .appendTo($('#product-container'));          
     
    let imgcontainer=$('<div>');
    imgcontainer.attr("class", "imgcontainer")
                .appendTo($(productcontent));      
                     
    let myImage=$('<img/>');
    myImage.attr("src", "http://image.tmdb.org/t/p/w500/"+product.imgurl)
                .appendTo(imgcontainer)
                .click( function() {
                    openModal(product);
                    
                });
                
    let titletext = $('<span>');
    titletext.html(product.title)
        .appendTo(productcontent);

    let buybutton = $('<div>');
    buybutton.html("Köp " + " " + " " + product.price + " kr")
            .appendTo(productcontent)
            .addClass("addtocart")
            .click(function() {
                addtocart( product );
                updatecart();
            });
     
    }
    
}

function openModal( product ) {
    
    $("#iframe-trailer").attr("src", "https://www.youtube.com/embed/" + product.trailerurl + "?controls=0?&autoplay=1");
    $("#modal-title").html(product.title);
    $("#modal-year").html("(" + product.year.slice(0,4) + ")");
    $("#modal-overview").html(product.description);
    
    //aktivering av modal
    $("#modal").css("display","block");
    
    $("#modal").click(function(e){
        if (e.target == this) {
            $("#modal").css("display", "none");
            $("#iframe-trailer").attr("src", "");
        }
    });
 
    $(".buybtn").off("click");
    $(".buybtn").html("Köp " + product.price + " kr")
                .click(function() {
                    console.log(product);
                    console.log("hej");
                    addtocart( product );
                    updatecart();
                });
}

