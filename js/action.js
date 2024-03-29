$(document).ready(function() {
    
    let actionlist = [ "tt7975244", "tt0110413", "tt0060196", "tt0468569", "tt5463162", "tt1074638", "tt0090605", "tt0172495"];
    
    let Product = function(t,u,y,v,d,a) {
        this.title = t;
        this.imgurl = u;
        this.year = y;
        this.trailerurl = v;
        this.description = d;
        this.vote = a;
        this.price = 0;
        this.genre = [];
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
            
            let cartitem = [];
            
            let amount = 1;

            cartitem.push(amount);
            cartitem.push(product);
            productlist.push(cartitem);
            
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

    $(window).on('resize', function() {

        if ( innerWidth <= 1000 ) {
            $("#side-filter-overlay").css("height", "80px");
            $("#side-filter-overlay").css("flex-basis", "auto");
            
        }
        if ( innerWidth >= 1000 ) {
            $("#side-filter-overlay").css("flex-basis", "80px");
            $("#side-filter-overlay").css("height", "auto");
           
        }
    })

    $(".fa-sliders-h").on("click", function() {
        if ( $("#side-filter-overlay").css("height") == "80px" || $("#side-filter-overlay").css("flex-basis") == "80px" ) {
            
            if ( innerWidth <= 1000 ) {
                $("#side-filter-overlay").css("height", "250px");
                $("#side-filter-overlay").css("flex-basis", "auto");
            }
            else if ( innerWidth >= 1000 ) {
                $("#side-filter-overlay").css("flex-basis", "300px");
                $("#side-filter-overlay").css("height", "auto");
            }
    
        }
        else {
            if ( innerWidth <= 1000 ) {
                $("#side-filter-overlay").css("height", "80px");
                $("#side-filter-overlay").css("flex-basis", "auto");
            }
            else if ( innerWidth >= 1000 ) {
                $("#side-filter-overlay").css("flex-basis", "80px");
                $("#side-filter-overlay").css("height", "auto");
            }
     
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


    $("#sortChoice1").on("click", function() {
        
        productlist.sort(function(a,b){
            return a[1].price - b[1].price
        });
        createElements(productlist);
         
    });
    $("#sortChoice2").on("click", function() {
        
        productlist.sort(function(a,b){
            return  b[1].price - a[1].price;
        });
        createElements(productlist);
    });

    $("#sortChoice3").on("click", function() {
        
        productlist.sort(function(a,b){
            let  fy = a[1].year.substring(0,4);
            let sy = b[1].year.substring(0,4);
            return   sy - fy  ;
        });
        createElements(productlist);
    });
    $("#sortChoice4").on("click", function() {
        
        productlist.sort(function(a,b){
            let  fy = a[1].year.substring(0,4);
            let sy = b[1].year.substring(0,4);
            return   fy - sy;
        });
        createElements(productlist);
    });
    $("#sortChoice5").on("click", function() {
  
        productlist.sort(function(a,b){
            
            if(a[1].title < b[1].title) {  return -1;  }
            if(a[1].title > b[1].title) { return 1; }
            return 0;
        });
        createElements(productlist);
    });
    $("#sortChoice6").on("click", function() {
  
        productlist.sort(function(a,b){
            
            if(a[1].title > b[1].title) {  return -1;  }
            if(a[1].title < b[1].title) { return 1; }
            return 0;
        });
        createElements(productlist);
    });

    $("#tothetop").click(function() {

    
        $(window).scrollTop(0);
        
        
    });

}); 

function updatecart() {
    $('.cart-content').remove();
    let cartcount = 0;
    let totalprice = 0;

    for (let i = 0; i < localStorage.length; i++) {  
        let cartitem = localStorage.getItem(localStorage.key(i));
        cartitem = JSON.parse(cartitem);
        
        let product = cartitem[1];
        let amount = cartitem[0];
        
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

        img.attr("src","http://image.tmdb.org/t/p/w500/" + product.imgurl )
            .appendTo(div);

        para.html(product.title)
            .appendTo(div)
            .addClass("title");

        div3.html("&times")
            .appendTo(div)
            .addClass("remove")
            .click(function() {
                localStorage.removeItem(product.title);
                updatecart();
            });

        para2.html( product.price*amount + " kr")
            .appendTo(div)
            .addClass("price");
    
        div2.appendTo(div)
            .addClass("amount-div");
        ileft.html("-")
            .appendTo(div2)
            .on("click", function() {
                cartitem[0]--;
                
                if ( cartitem[0] <= 0 ) {
                    localStorage.removeItem(product.title);
                }
                else {
                    localStorage.setItem(product.title, JSON.stringify( cartitem ));
                }            
                updatecart();
            });
        para3.html( cartitem[0] )
            .appendTo(div2);

        iright.html("+")
            .appendTo(div2)
            .click(function() {
                cartitem[0]++;
                
                localStorage.setItem( product.title, JSON.stringify( cartitem ));
                updatecart();
            });        

        cartcount += amount;
        totalprice += product.price*amount;

        $('#cart-count').html(cartcount);
     
    }

    $('#total-price').html("Totalpris: " + totalprice + " kr");     
}

function addtocart( product, amount ) {
   
    let cartitem = [];
    cartitem.push(amount);
    cartitem.push(product);
    
    $('#success-text').html(product.title + " har lagts till i varukorgen");
    $('#success-container').css("top", -30 + "px");
    
    setTimeout(function() {
        $('#success-container').css("top", -200 + "px");
    }, 2500);


    if ( localStorage.getItem( product.title ) != undefined ) {
        let cartitem = localStorage.getItem( product.title );
      
        cartitem = JSON.parse( cartitem );
        
        cartitem[0]++;
        
        localStorage.setItem( cartitem[1].title,JSON.stringify( cartitem ));
    }
    else {
        localStorage.setItem( product.title, JSON.stringify( cartitem ));
    } 

}

function videoapi( productlist ) {

    let actionlist = ["tt7975244", "tt0110413", "tt0060196", "tt0468569", "tt5463162", "tt1074638", "tt0090605", "tt0172495" ];

    for ( let i = 0; i < productlist.length; i++){
        let b = $.ajax("https://api.themoviedb.org/3/movie/"+actionlist[i] +"/videos?api_key=990c8bcf3ed6fe9927c44ba174b1574d&language=en-US", {
            method:'GET',
            async: false,
        });
        b.done(function( data ){
            productlist[i][1].trailerurl = data.results[0].key;
        })
 
    }
    createElements( productlist );

}

function createElements( productlist ) {

    $('.productcontent').remove();
    for (i = 0; i < productlist.length; i++) {
        //aktivering utav modal  
        let product = productlist[i][1];
        let amount = productlist[i][0];

        let productcontent = $('<div>');
        productcontent.attr("class", "productcontent")
                    .appendTo($('#product-container'));          
        
        let imgcontainer=$('<div>');
        imgcontainer.attr("class", "imgcontainer")
                    .appendTo($(productcontent))
                    .on("mousemove", function(event) {
                        let x = event.offsetX;
                        let y = event.offsetY;
                        let o = event.currentTarget.children[0];
                        console.log(o.height + " " + o.width);
                        //o.setAttribute("transform", "perspective(1000px) scaleZ(1) rotateX(" + x*0.5 + "deg) rotateY("+ y*0.5 + "deg)");
                        o.setAttribute("style", "transform: perspective(1000px) scaleZ(1.5) rotateX(" + -(y-(o.height/2))*0.05 + "deg) rotateY("+ (x-(o.width/2))*0.05 + "deg)");
                    })
                    .on("mouseout", function(event) {
                        let o = event.currentTarget.children[0];
                        o.setAttribute("style", "transform: perspective(1000px) scaleZ(1) rotateX(0deg) rotateY(0deg);  transition: all 0.9s;");
                    });     
                        
        let myImage=$('<img/>');
        myImage.attr("src", "http://image.tmdb.org/t/p/w500/"+product.imgurl)
                    .appendTo(imgcontainer)
                    .click( function() {
                        openModal(product, amount);
                        
                    });
                    
        let titletext = $('<span>');
        titletext.html(product.title)
            .appendTo(productcontent);


        let buybutton = $('<div>');
        buybutton.html("Köp " + " " + " " + product.price + " kr")
                .appendTo(productcontent)
                .addClass("addtocart")
                .on("click", function() {
                    addtocart( product, amount );
                    updatecart();
                });
        
    }
    
}

function openModal( product, amount ) {
    
    $("#iframe-trailer").attr("src", "https://www.youtube.com/embed/" + product.trailerurl + "?controls=0?&autoplay=1");
    $("#modal-title").html(product.title);
    $("#modal-year").html("(" + product.year.slice(0,4) + ")");
    $("#modal-overview").html(product.description);
    
    
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
                    addtocart( product, amount );
                    updatecart();
                    
                    $("#modal").css("display", "none");
                    $("#iframe-trailer").attr("src", "");
                });
}

