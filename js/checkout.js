$(document).ready(function() {
    updateInfo();

    //Validering för radio knappar i formuläret
    $('#form').submit(function() {
        if ($('input:radio', this).is(':checked')) {
          
        } else {
            alert('Du måste välja ett betalsätt.');
            return false;
        }
    });

});

    function updateInfo() {
        $('.product-container').remove();
        totalprice = 0;

        for (var i = 0; i < localStorage.length; i++){
            let cartitem = localStorage.getItem(localStorage.key(i));
            cartitem = JSON.parse(cartitem);
    
            let productdata = cartitem[1];

            console.log(productdata);
            let div = $('<div>');
            div.addClass("product-container")
                .appendTo("#products");
            
            let img = $('<img/>');
            img.attr("src", "http://image.tmdb.org/t/p/w300/" + productdata.imgurl)
            .appendTo(div);
    
            let movieTitle = $('<h4>');
            movieTitle.text(productdata.title);
            movieTitle.appendTo(div);
    
    
            let addRemove = $('<div>');
            addRemove.addClass("mini");
            addRemove.appendTo(div);
    
            let minus = $('<p>');
            minus.html("-");
            minus.addClass("minuss");
            minus.appendTo(addRemove);

            minus.click(function() {
                cartitem[0]--;
                if ( cartitem[0] <= 0 ) {
                    localStorage.removeItem(productdata.title);
                }
                else {
                    localStorage.setItem(productdata.title, JSON.stringify(cartitem));
                }
                updateInfo();
            });
    
            let antal = $('<p>');
            antal.html(cartitem[0]);
            antal.addClass("antalFilmer");
            antal.appendTo(addRemove);
    
            //Nedan är + med följande click funktion
            let plus = $('<p>');
            plus.html("+");
            plus.addClass("plussa");
            plus.appendTo(addRemove);

            plus.click(function() {
                cartitem[0]++;
                console.log(cartitem[0]);
                localStorage.setItem(productdata.title, JSON.stringify(cartitem));
                updateInfo();
            });

            let kryss = $('<div>');
            kryss.html("&times")
                .appendTo(div)
                .addClass("x")
            .click(function() {
                localStorage.removeItem(productdata.title);
                updateInfo();
            });
    
            let moviePrice = $('<p>');
            moviePrice.text("Pris: " + productdata.price + "kr.");
            moviePrice.appendTo(div);

            totalprice += productdata.price*cartitem[0];
        }
        $('#totalPrice').html("Totalt pris: " + totalprice + " kr.");
        console.log(totalprice);
    };