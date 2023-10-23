// function test(){
//     let elem="document.getElementById('main-nav').getElementsByTagName('a')[2]";
//     setTimeout(`elementMove(${elem},0,500)`,0);
//     setTimeout(`elementSpin(${elem},-360)`,0);
//     setTimeout(`transparencyChange(${elem},0.5)`,0);
//     setTimeout(`colorChange(${elem},255,100,100,1)`,0);
//     setTimeout(`backgroundColorChange(${elem},155,150,50,1)`,0);
//     setTimeout(`backgroundImageChange(${elem},239, 159, 159, 0.433)`,0);
// }
function mainNavAnimation(){
    let mainNav=document.getElementById("main-nav");
    let links=mainNav.getElementsByTagName("a");
    let linkBackgroundColors=[[239, 159, 159, 0.433],[134, 224, 206, 0.433],[229, 180, 65, 0.433],[94, 161, 219, 0.433],[201, 113, 235, 0.433]];
    for (const key in links){
        if(typeof links[key]!="object"){
            break;
        }
        let img=links[key].getElementsByTagName("img")[0];
        links[key].addEventListener("mouseover",
            function(){
                elementMove(links[key],0,10);
                backgroundImageChange(mainNav,linkBackgroundColors[key][0],linkBackgroundColors[key][1],linkBackgroundColors[key][2],0.2);
                colorChange(links[key],linkBackgroundColors[key][0],linkBackgroundColors[key][1],linkBackgroundColors[key][2],1,300);
        });
        links[key].addEventListener("mouseover",
            function(){
                if(img.src.indexOf("-white")!=-1){
                    img.src=img.src.substring(0,img.src.indexOf("-white"))+".svg";
                };
        });
        links[key].addEventListener("mouseout",
            function(){
                elementMove(links[key],0,0,500);
                backgroundImageChange(mainNav,0, 0, 0, 0.741);
                colorChange(links[key],255,255,255,1,300);
        });
        links[key].addEventListener("mouseout",
            function(){
                if(img.src.indexOf("-white")==-1){
                    img.src=img.src.substring(0,img.src.indexOf(".svg"))+"-white.svg";
                };
        });
    };
}
function secondNavAnimation(){
    let secondNav=document.getElementById("second-nav");
    let sideButton=secondNav.getElementsByTagName("img")[0];
    let links=secondNav.getElementsByTagName("a");
    sideButton.foldFlag=false;
    sideButton.addEventListener("click",function(){
        if(!sideButton.foldFlag){
            elementSpin(sideButton,180,500);
            elementMove(secondNav,103,5,1000);
            elementMove(sideButton,-50,0,1000);
            sideButton.foldFlag=true;
        }else{
            elementSpin(sideButton,0,500); 
            elementMove(secondNav,98,5,1000);
            elementMove(sideButton,0,0,1000);
            sideButton.foldFlag=false;
        }
    });
    for(const key in links){
        if(typeof links[key]!="object"){
            break;
        }
        links[key].addEventListener("mouseover",function(){
            elementMove(links[key],-120,0,1000);
            //links[key].getElementsByTagName("p")[0].style.display="block";
        });
        links[key].addEventListener("mouseout",function(){
            elementMove(links[key],0,0);
            //links[key].getElementsByTagName("p")[0].style.display="none";
        });
        if(key==0){
            links[key].addEventListener("click",function(){
                let currentImgPath=links[key].getElementsByTagName("img")[0].src;
                let coverVideo=document.getElementById("cover-video");
                if(currentImgPath.indexOf("-have")!=-1){
                    links[key].getElementsByTagName("img")[0].src=currentImgPath.replace("-have","-none");
                    coverVideo.volume=0;
                }else{
                    links[key].getElementsByTagName("img")[0].src=currentImgPath.replace("-none","-have");
                    coverVideo.volume=1;
                }
            });
        }
        if(key==1){
            links[key].addEventListener("click",function(){
                let imgs=links[key].getElementsByTagName("img");
                if(imgs[1].style.display!="block"){
                    imgs[1].style.display="block";
                }else{
                    imgs[1].style.display="none";
                }
            });
        }
    }
}
function heightChange(elem,targetHeight,initialHeight,isFirstFlag=true){
    if(isFirstFlag){
        elem.changeValue=parseFloat(((targetHeight-parseFloat(initialHeight))/30).toFixed(2));
        elem.style.height=initialHeight;
        elem.tempFrame=0;
        isFirstFlag=false;
    }
    if(elem.widthChangeFlag){
        clearTimeout(elem.widthChangeFlag);
    }
    if(elem.tempFrame>=30){
        elem.style.height=targetHeight+"vh";
        delete elem.tempFrame;
        return;
    }
    elem.style.height=(parseFloat(elem.style.height)+elem.changeValue)+"vh";
    elem.tempFrame++;
    elem.widthChangeFlag=setTimeout(heightChange,16.6,elem,targetHeight,initialHeight,isFirstFlag);
}
function introducingBackgroundAnimation(){
    let gameShoot=document.getElementById("game-introducing").getElementsByTagName("img")[0];
    let steamShoot=document.getElementById("game-introducing").getElementsByTagName("img")[1];
    let xboxShoot=document.getElementById("game-introducing").getElementsByTagName("img")[2];
    let steamButton=document.getElementById("download-links").getElementsByTagName("a")[0];
    let xboxButton=document.getElementById("download-links").getElementsByTagName("a")[1];
    steamButton.addEventListener("mouseover",function(){
        transparencyChange(gameShoot,0,700);
        transparencyChange(steamShoot,1,700);
    });
    steamButton.addEventListener("mouseout",function(){
        transparencyChange(gameShoot,1,700);
        transparencyChange(steamShoot,0,700);
    });
    xboxButton.addEventListener("mouseover",function(){
        transparencyChange(gameShoot,0,700);
        transparencyChange(xboxShoot,1,700);
    });
    xboxButton.addEventListener("mouseout",function(){
        transparencyChange(gameShoot,1,700);
        transparencyChange(xboxShoot,0,700);
    });
}
function illustrationsShowAnimation(){
    let keywords=document.getElementById("game-introducing").getElementsByTagName("span");
    let imgs=document.getElementById("illustrations-show").getElementsByTagName("img");
    for(const key in keywords){
        if(typeof keywords[key]!="object"){
            return;
        }
        keywords[key].addEventListener("mouseover",function(){
            imgs[3-key].style.zIndex=3;
        });
        keywords[key].addEventListener("mouseout",function(){
            imgs[3-key].style.zIndex=2;
        });
    }
}
function scrollAnimation(){
    window.firstFlag=true;
    window.onscroll = function () {
        if(window.firstFlag){
            window.coverUnfold=true;
            window.firstFold=false;
            window.lastScrollTop=scroll().top;
        }
        let scrollDirection;//向上false 向下true
        if(scroll().top-window.lastScrollTop<=0){
            scrollDirection=false;
        }else{
            scrollDirection=true;
        }
        let mainNav=document.getElementById("main-nav");
        if(scrollDirection){
            elementMove(mainNav,0,0,2000,"vh");
        }else{
            elementMove(mainNav,0,-10,2000,"vh");
        }
        let coverAll=document.getElementById("cover");
        let coverVideo=document.getElementById("cover-video");
        let coverLogo=document.getElementById("cover-logo-image");
        let coverH1=coverAll.getElementsByTagName("h1")[0];
        let secondNav=document.getElementById("second-nav");
        let sideButton=secondNav.getElementsByTagName("img")[0];
        if(window.coverUnfold&&scrollDirection){
            coverVideo.pause();
            transparencyChange(coverVideo,0);
            heightChange(coverAll,50,"100vh");//上拉
            elementMove(coverH1,0,65);
            transparencyChange(coverH1,1);
            elementMove(coverLogo,0,50);
            transparencyChange(coverLogo,0);
            setTimeout(elementMove,100,mainNav,0,0,2000,"vh");
            elementSpin(sideButton,180,500);
            elementMove(secondNav,103,5,1000);
            elementMove(sideButton,-50,0,1000);
            window.coverUnfold=false;
        }else if(!window.coverUnfold&&!window.scrollDirection&&scroll().top==0){
            coverVideo.play();
            transparencyChange(coverVideo,1);
            heightChange(coverAll,100,"50vh");//下拉
            elementMove(coverH1,0,78);
            transparencyChange(coverH1,0);
            elementMove(coverLogo,0,0);
            transparencyChange(coverLogo,1);
            elementMove(mainNav,0,-10,2000,"vh");
            elementSpin(sideButton,0,500);
            elementMove(secondNav,98,5,1000);
            elementMove(sideButton,0,0,1000);
            window.coverUnfold=true;
        }
        //下方的两图相对滑动动画//2042
        if(scroll().top>=1393&&scroll().top<=2691){
            let upImg=document.getElementById("up-image");
            let downImg=document.getElementById("down-image");
            let upImgTop,downImgTop;
            if(upImg.style.top.length==0){
                upImg.style.position="absolute";
                upImgTop=51;
            }else{
                upImgTop=parseInt(upImg.style.top);
            }
            if(downImg.style.top.length==0){
                downImg.style.position="absolute";
                downImgTop=81;
            }else{
                downImgTop=parseInt(downImg.style.top);
            }
            upImg.style.top=parseInt(0+scroll().top-2042)+"px";
            downImg.style.top=parseInt(-324+scroll().top-2042)+"px";
        }
        //函数参数设置
        window.firstFlag=false;
        window.lastScrollTop=scroll().top;
    }
}
function coinSpinAnimation(){
    let introducingBackgroundCoin=document.getElementById("game-introducing").getElementsByTagName("img")[3];
    let preformanceBackgroundCoin=document.getElementById("computer-preformance-recommanding-background");
    let newsBackgroundCoin=document.getElementById("spain-ico");
    elementSpin(introducingBackgroundCoin,360,10000);
    elementSpin(preformanceBackgroundCoin,-360,10000);
    elementSpin(newsBackgroundCoin,360,10000);
    window.spinCircle=2;
    setInterval(function(){
        elementSpin(introducingBackgroundCoin,window.spinCircle*360,10000);
        elementSpin(preformanceBackgroundCoin,window.spinCircle*-360,10000);
        elementSpin(newsBackgroundCoin,window.spinCircle*360,10000);
        window.spinCircle++;
    },10000);
}
addLoadEvent(mainNavAnimation);
addLoadEvent(secondNavAnimation);
addLoadEvent(introducingBackgroundAnimation);
addLoadEvent(illustrationsShowAnimation);
addLoadEvent(scrollAnimation);
addLoadEvent(coinSpinAnimation);
