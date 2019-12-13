$(document).ready(function() {
    updateInfo();
});

    function updateInfo() {
        $('.product-container').remove();
        totalprice = 0;

        for (var i = 0; i < localStorage.length; i++){
            let productdata = localStorage.getItem(localStorage.key(i));
            productdata = JSON.parse(productdata);
    
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
                productdata.amount--;
                if ( productdata.amount <= 0 ) {
                    localStorage.removeItem(productdata.title);
                }
                else {
                    localStorage.setItem(productdata.title, JSON.stringify(productdata));
                }
                updateInfo();
            });
    
            let antal = $('<p>');
            antal.html(productdata.amount);
            antal.addClass("antalFilmer");
            antal.appendTo(addRemove);
    
            //Nedan är + med följande click funktion
            let plus = $('<p>');
            plus.html("+");
            plus.addClass("plussa");
            plus.appendTo(addRemove);

            plus.click(function() {
                productdata.amount++;
                console.log(productdata.amount);
                localStorage.setItem(productdata.title, JSON.stringify(productdata));
                updateInfo();
            });

            let kryss = $('<div>');
            kryss.html("&times")
                .appendTo(div)
            .click(function() {
                localStorage.removeItem(productdata.title);
                updateInfo();
            });
    
            let moviePrice = $('<p>');
            moviePrice.text("Pris: " + productdata.price + "kr.");
            moviePrice.appendTo(div);

            totalprice += productdata.price*productdata.amount;
        }
        $('#totalPrice').html("Totalt pris: " + totalprice + " kr.");
        console.log(totalprice);
    };