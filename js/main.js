$(document).ready(function() {
    
 

    $(window).mousemove( function(event) {
        let x = event.clientX;
        let y = event.clientY;
        

        console.log(-(x-(innerWidth/2))*0.05 + "  " + -(y-(innerHeight/2))*0.05);
    })

    $(window).scroll( function() {
       
        let offset = window.pageYOffset;
        window.innerHeight;
        $('#main-header-img').css("backgroundPositionY", -offset * 0.3 + "px");
        $('#popcorn').css("top", 100-(offset * 0.1) + "vh" )
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
        
        

        console.log(offset);
    });
    
    $("#category-toggle").click(function(){
        if($(".category").css("opacity") == 0 ) {
            $(".category").css("opacity","1");
            $(".category").css("right","0");
        }
        else {
            $(".category").css("opacity","0"); 
            $(".category").css("right","50px");
        }
    });

    $("#tothetop").click(function() {

    
        $(window).scrollTop(0);
        
        
    });

});