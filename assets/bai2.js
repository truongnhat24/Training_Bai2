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

        if( direction === 1) {
            if( currentIndex === noImgs -1) {
                $(".box ul").append($(".box ul li[alt = 0]").addClass("show"));
            }  else {
                for( let i = currentIndex + 1; i <= newIndex; i++){
                    $(".box ul").append($(".box ul li[alt = "+i+"]").addClass("show"));
                }
                count = Math.abs(newIndex - currentIndex);
            }
            point = (count * imgW) + "px";
        } else {
            if( currentIndex === 0) {
                $(".box ul").prepend($(".box ul li[alt = "+(noImgs-1)+"]").addClass("show"));
                point = (direction * imgW) + "px";
            } else {
                for( let i = currentIndex - 1; i >= newIndex; i--){
                    $(".box ul").prepend($(".box ul li[alt = "+i+"]").addClass("show"));
                }
                count = Math.abs(currentIndex - newIndex);
                point = (direction * count * imgW) + "px";
            }
            $(".box ul").css("left", point);
            point = 0;
        }   
        
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
    // $(".btn-show button").on("click", startShow).on("dblclick", stopShow);
    
    // {
    //     let myInterval;
    //     startShow = () => {
    //         if(!myInterval) myInterval = setInterval(nextShow, 1000);
    //     }
    //     stopShow = () => {
    //         clearInterval(myInterval); 
    //         myInterval = null;
    //     }
    // }
})
