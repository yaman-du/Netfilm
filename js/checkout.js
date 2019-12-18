$(document).ready(function() {
    updateInfo();
});

    function updateInfo() {
        $('.product-container').remove();
        totalprice = 0;

        for ( var i = 0; i < localStorage.length; i++ ) {
            let productdata = localStorage.getItem(localStorage.key(i));
            productdata = JSON.parse(productdata);
            console.log("Hej");
            console.log(productdata[0]);
            let div = $('<div>');
            div.addClass("product-container")
                .appendTo("#products");
            
            let img = $('<img/>');
            img.attr("src", "http://image.tmdb.org/t/p/w300/" + productdata[1].imgurl)
            .appendTo(div);
    
            let movieTitle = $('<h4>');
            movieTitle.text(productdata[1].title);
            movieTitle.appendTo(div);
    
    
            let addRemove = $('<div>');
            addRemove.addClass("mini");
            addRemove.appendTo(div);
    
            let minus = $('<p>');
            minus.html("-");
            minus.addClass("minuss");
            minus.appendTo(addRemove);

            minus.click(function() {
                productdata[0]--;
                if ( productdata[0] <= 0 ) {
                    localStorage.removeItem(productdata[1].title);
                }
                else {
                    localStorage.setItem(productdata[1].title, JSON.stringify(productdata));
                }
                updateInfo();
            });
    
            let antal = $('<p>');
            antal.html(productdata[0]);
            antal.addClass("antalFilmer");
            antal.appendTo(addRemove);
    
            //Nedan är + med följande click funktion
            let plus = $('<p>');
            plus.html("+");
            plus.addClass("plussa");
            plus.appendTo(addRemove);

            plus.click(function() {
                productdata[0]++;
                localStorage.setItem(productdata[1].title, JSON.stringify(productdata));
                updateInfo();
            });

            let kryss = $('<div>');
            kryss.html("&times")
                .appendTo(div)
            .click(function() {
                localStorage.removeItem(productdata[1].title);
                updateInfo();
            });
    
            let moviePrice = $('<p>');
            moviePrice.text("Pris: " + productdata[1].price + "kr.");
            moviePrice.appendTo(div);

            totalprice += productdata[1].price*productdata[0];
        }
        $('#totalPrice').html("Totalt pris: " + totalprice + " kr.");
        console.log(totalprice);
    };