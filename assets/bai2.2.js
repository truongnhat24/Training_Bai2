$(document).ready(function(){
    const noImgs =  $(".pic").length;
    const animationTime = 500;
    const imgW = 748;
    let currentIndex = 0;
    {
        let dots = "";
        for( let i = 0; i < noImgs; i++) {
            dots += "<button "+(currentIndex===i? "class='btn-active'": "")+"></button>";
        }
        $(".btn-row").html(dots);
    } 
    const effectImg = (newIndex, direction) => {
        let point = imgW + "px", count = 1;
        let i = currentIndex;
        while(i!==newIndex) {
            count = (currentIndex === noImgs -1 || currentIndex === 0) ? 1: Math.abs(currentIndex - newIndex); 
            if( direction === 1) {
                i = (currentIndex === noImgs -1)? 0: i+1;
                $(".box ul").append($(".box ul li[alt = "+i+"]").addClass("show"));
            } else {
                i = (currentIndex === 0) ? noImgs-1: i-1;
                $(".box ul").prepend($(".box ul li[alt = "+i+"]").addClass("show"));
            }
        }
        point =  (direction * count * imgW) + "px";
        if(direction !== 1)    $(".box ul").css("left", point);
        point = ( direction === 1)? point : 0;

        let range = ((-1) * direction * parseInt(point,10)) + "px";
        $(".box ul").animate({left: range }, animationTime, () => {
            $(".box ul li.show").removeClass("show");
            currentIndex = newIndex;
            $(".box ul li[alt = "+currentIndex+"]").addClass("show");
            $(".box ul").css("left", 0);
        }); 

        $(".btn-row button:eq("+currentIndex+")").removeClass("btn-active");
        $(".btn-row button:eq("+newIndex+")").addClass("btn-active");
    }

    const nextShow = () => {
        const newIndex = currentIndex < noImgs-1 ? currentIndex+1 : 0;
        effectImg(newIndex, 1); 
    }
    const preShow = () => {
        const newIndex = currentIndex > 0 ? currentIndex-1 : noImgs-1;
        effectImg(newIndex, -1);
    }
    const anyShow = function() {
        const newIndex = $(this).index();
        let direction = newIndex > currentIndex? 1: -1;
        if ( currentIndex != newIndex) {
            effectImg(newIndex, direction);
        }
    }

    $(".btn-right").click(nextShow);
    $(".btn-left").click(preShow);
    $(".btn-row button").on("click", anyShow);
})