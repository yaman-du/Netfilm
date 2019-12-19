$(document).ready(function() {
    
    // let j = 1;
    // for ( i = 0; i < 50; i++ ) {
        
    //     if ( j == 5) {
    //         j = 1;
    //     }

    //     let pop = $('<img>');

    //     pop.attr({
    //         src:"../Images/popcorn-" + j + ".png", 
    //         id: "popcorn" + i
    //     })
    //         .addClass("popcorn-right")
    //         .appendTo(".tacksida-container");
    //     j++;    
    // }
    // setTimeout(function() {
    //     for ( i = 0; i < 50; i++ ) {
    //         $("#popcorn" + i ).css({
    //             bottom: 300 - Math.floor((Math.random() * 300) + 1) + "vh",
    //             right:100 +"vw",
    //             transform: "rotate(" + (Math.random() * (360 - 0) + 0) + "deg)",
    //             transition: "all " + (Math.random() * (3 - 1) + 1) + "s " + "ease-out " + (Math.random() * (1.5 - 0) + 0) + "s "
    //         });
    //     }
    // }, 1000)
    let j = 1;
    for ( i = 0; i < 50; i++ ) {
        
        if ( j == 5) {
            j = 1;
        }

        let pop = $('<img>');

        pop.attr({
            src:"../Images/popcorn-" + j + ".png", 
            id: "popcorn" +i
        })
            .addClass("popcorn")
            .css("bottom", -(Math.random() * (10 - 0) + 0)+ "vh")
            .css("right",-(Math.random() * (10 - 0) + 0)+ "vw" )
            .appendTo(".tacksida-container");
        j++;    
    }
    setTimeout(function() {
        for ( i = 0; i < 50; i++ ) {
            $("#popcorn" + i ).css("bottom",500 - (Math.random() * (400 - 0) + 0) + "vh" )
                                .css("right", "100vw")
                                .css("transition-duration", (Math.random() * (5 - 3) + 3) + "s ")
                                .css("transition-delay", "0s")
                                .css("transform", "rotate(" + (Math.random() * (360 - 0) + 0) + "deg)");
            Update(i);
        }
        
    }, 1000)
    
    function Update(i) {

        let initialDuration = $("#popcorn" + i )[0].style.transitionDuration;
        initialDuration = initialDuration.slice(0, -1);
        

        let iteration  = 0;
        let popcornInterval = setInterval(function() {
            
            let currentDuration = $("#popcorn" + i )[0].style.transitionDuration;
            
            iteration = iteration  + 0.1;
            
            currentDuration = currentDuration.slice(0,-1);
            
            console.log(iteration);
            if (iteration < initialDuration/2 ) {
                currentDuration = currentDuration + 0.5;
                console.log("he");
            }
            else {
                currentDuration = currentDuration - 0.1;
            }

            let path = $("#popcorn" + i )[0].style.bottom;
            let pathInt = 0;
            pathInt = path.slice(0,-2);
            pathInt = pathInt - 20;

            
            
            $("#popcorn" + i ).css("bottom", pathInt + "vh")
           
            $("#popcorn" + i )[0].style.transitionDuration = currentDuration + "s";

        }, 100);
    }
    let h = 1;
    for ( i = 50; i < 100; i++ ) {
        
        if ( h == 5) {
            h = 1;
        }

        let pop = $('<img>');

        pop.attr({
            src:"../Images/popcorn-" + h + ".png", 
            id: "popcorn" +i
        })
            .addClass("popcorn")
            .css("bottom", -(Math.random() * (10 - 0) + 0)+ "vh")
            .css("left",-(Math.random() * (10 - 0) + 0)+ "vw" )
            .appendTo(".tacksida-container");
        h++;    
    }
    setTimeout(function() {
        for ( i = 50; i < 100; i++ ) {
            $("#popcorn" + i ).css("bottom",500 - (Math.random() * (400 - 0) + 0) + "vh" )
                                .css("left", "100vw")
                                .css("transition-duration", (Math.random() * (5 - 3) + 3) + "s ")
                                .css("transition-delay",  "0s ")
                                .css("transform", "rotate(" + (Math.random() * (360 - 0) + 0) + "deg)");
            Update(i);
        }
        
    }, 1000)
    
    function Update(i) {

        let initialDuration = $("#popcorn" + i )[0].style.transitionDuration;
        initialDuration = initialDuration.slice(0, -1);
        

        let iteration  = 0;
        let popcornInterval = setInterval(function() {
            
            let currentDuration = $("#popcorn" + i )[0].style.transitionDuration;
            
            iteration = iteration  + 0.1;
            
            currentDuration = currentDuration.slice(0,-1);
            
            console.log(iteration);
            if (iteration < initialDuration/2 ) {
                currentDuration = currentDuration + 0.5;
                console.log("he");
            }
            else {
                currentDuration = currentDuration - 0.1;
            }

            let path = $("#popcorn" + i )[0].style.bottom;
            let pathInt = 0;
            pathInt = path.slice(0,-2);
            pathInt = pathInt - 20;

            
            
            $("#popcorn" + i ).css("bottom", pathInt + "vh")
           
            $("#popcorn" + i )[0].style.transitionDuration = currentDuration + "s";

        }, 100);
    }
    
    // setTimeout(function() {
    //     setInterval(() => {
    //         for ( i = 50; i < 51; i++ ) {
    //             let durationString = $("#popcorn" + i ).css("transition-duration");
    //             let durationInt = durationString.slice(0,-1);
            
    //             durationInt = durationInt + 0.5;

    //             let path = $("#popcorn" + i ).css("bottom");
    //             console.log(i + " " + path);
    //             let pathInt = path.slice(0,-2);
                
    //             console.log(i + "före: "+pathInt);
    //             pathInt = pathInt - 1;
        
    //             if (pathInt < 0){
    //                 pathInt = 0;
    //             }
    //             console.log(i + "efter: " +pathInt);
    //             $("#popcorn" + i ).css( {
                    
    //                 left:100 +"vw",
    //                 'transition-duration': durationInt + "s ",
    //                 'transition-delay':  "0s"
    //             }); 
    //             $("#popcorn" + i ).css("bottom", pathInt+ "px");
    //         }
    //     }, 100);
    // }, 1020)
    // setTimeout(function() {
    //     for ( i = 0; i < 100; i++ ) {
    //         $("#popcorn" + i ).remove();
    //     }

    // },5000)
    
});