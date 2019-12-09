$(document).ready(function() {
    let h = $.ajax({
    //  url:"https://api.themoviedb.org/3/find/tt0499549?api_key=990c8bcf3ed6fe9927c44ba174b1574d&language=en-US&external_source=imdb_id",
    //  url:"https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=990c8bcf3ed6fe9927c44ba174b1574d",
    //  url:"https://api.themoviedb.org/3/search/movie?api_key=990c8bcf3ed6fe9927c44ba174b1574d&query=28"
        url:"https://api.themoviedb.org/3/movie/tt0499549/videos?api_key=990c8bcf3ed6fe9927c44ba174b1574d&language=en-US"
    });
    
    

    $(window).scroll( function() {
       
        let offset = window.pageYOffset;
        window.innerHeight;
        $('#main-header-img').css("backgroundPositionY", -offset * 0.3 + "px");
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
            $('#offer-text').css("top", 75 + "%");
        }
        if ( offset >= window.innerHeight*3.6) {
            $("#header").css("top", -20 + "%");
        }
        if ( offset <= window.innerHeight*3.5) {
            $("#header").css("top", 0 + "%");
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


});