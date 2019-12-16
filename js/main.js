$(document).ready(function() {
    
    updatecart();

    $(window).mousemove( function(event) {
        let x = event.clientX;
        let y = event.clientY;
        

        //console.log(-(x-(innerWidth/2))*0.05 + "  " + -(y-(innerHeight/2))*0.05);
    })

    $(window).scroll( function() {
       
        let offset = window.pageYOffset;
        window.innerHeight;
        $('#main-header-img').css("backgroundPositionY", -offset * 0.3 + "px");
        $('#popcorn1').css("top", 100-(offset * 0.1) + "vh" )
                        .css("transform", "translate(-50%,0) rotate(" + -offset * 0.015 + "deg)");
        $('#popcorn2').css("top", 100-(offset * 0.08) + "vh" )
                        .css("transform", "translate(-50%,0) rotate(" + offset * 0.015 + "deg)");
        $('#popcorn3').css("top", 100-(offset * 0.15) + "vh")
                        .css("transform", "translate(-50%,0) rotate(" + offset * 0.015 + "deg)");
        
        if ( offset >= window.innerHeight/2 ) {
            $('#main-text').css("top", 40 + "%");
        }
        if ( offset >= window.innerHeight ) {
            $('#other-text').css("left", 50 + "%");
        }
        if ( offset >= window.innerHeight*3 ) {
            $('#offer-text').css("opacity", 1);
        }
        if ( offset >= window.innerHeight*3.4 ) {
            $('#offer-text').css("top", 60 + "%");
        }
        if ( offset >= window.innerHeight*3.6) {
            $("#header").css("top", -20 + "%");
        }
        if ( offset <= window.innerHeight*3.5) {
            $("#header").css("top", 0 + "%");
        }
        if ( offset >= window.innerHeight*3.8 ) {
            $('#goto-offer').css("opacity", 1 );
        }
        
        

        //console.log(offset);
    });
    
    $("#category-toggle").click(function(){
        if($(".category").css("opacity") == 0 ) {
            $(".category").css("opacity","1");
            $(".category").css("right","0");
            $(".category-link").css("pointer-events", "all");
            $(".category").css("cursor", "pointer");
        }
        else {
            $(".category").css("opacity","0"); 
            $(".category").css("right","50px");
            $(".category-link").css("pointer-events", "none");
            $(".category").css("cursor", "default");
        }
    });

    $("#tothetop").click(function() {

    
        $(window).scrollTop(0);
        
        
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