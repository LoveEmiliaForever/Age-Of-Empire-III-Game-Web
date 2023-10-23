function addLoadEvent(func){
    let oldOnLoad=window.onload;
    if(typeof oldOnLoad !="function"){
        window.onload=func;
    }else{
        window.onload=function(){
            oldOnLoad();
            func();
        }
    }
}
function addNewClass(elem,newClassName){
    if(elem.className.length==0){
        elem.className=newClassName;
    }else{
        elem.className+=(" "+newClassName);
    }
}
function deletExistingClass(elem,deletedClassName){
    if(elem.className==deletedClassName){
        elem.className="";
        //console.log("------------ALL DOWN-------------")
    }else{
        let classNameArray=elem.className.split(" ");
        for (const key in classNameArray){
            if(classNameArray[key]==deletedClassName){
                classNameArray.splice(key,1);
                break;
            }
        }
        //console.log(`${typeof classNameArray.join(" ")}`);
        //elem.className=elem.className.substring(0,elem.className.search(deletedClassName)-1);
        elem.className=classNameArray.join(" ");
        //console.log(`-------------DELET ONE------------       CLASS LEFT:${elem.className}`);
    }
}
function scroll() {
    return { //此函数的返回值是对象
    top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
    left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
    }
}
function elementMove(formalElem,targetX,targetY,timeSpend=1000,measure='%',refreshRate=60,elemClass=null,firstFlag=true){
    if(firstFlag){
        if(elemClass!=null){
            var elem=document.getElementsByClassName(elemClass)[0];
            deletExistingClass(elem,elemClass);
            //console.log("move::first and class:"+elemClass);
        }else{
            var elem=formalElem;
            //console.log("move::first and not class:"+elem);
        }
        if(elem.moveAnimationPlay){
            let newClassName="moveAnimation";
            let newClassNameNum=1;
            while(true){
                let tempClassName=newClassName+newClassNameNum;
                if(document.getElementsByClassName(tempClassName).length==0){
                    addNewClass(elem,tempClassName);
                    elemClass=tempClassName;
                    break;
                }else{
                    newClassNameNum++;
                }
            }
            let repeat="elementMove("+null+","+targetX+","+targetY+","+timeSpend+",'"+measure+"',"+refreshRate+",'"+elemClass+"',"+firstFlag+")";
            //console.log("move::first and play:"+elemClass+"    "+repeat);
            setTimeout(repeat,elem.nextMoveFrameTime*(elem.moveAnimationFrameNum-elem.moveFrame+1));
            return;
        }
        //console.log("move::first and notplay:"+elem);
        var viewHeight=window.innerHeight;
        var viewWidth=window.innerWidth;
        elem.moveFrame=0;
        elem.moveAnimationPlay=false;
        elem.nextMoveFrameTime=parseFloat((1000/refreshRate).toFixed(2));
        elem.trueMoveRefreshRate=parseFloat((1000/elem.nextMoveFrameTime).toFixed(2));
        elem.moveAnimationFrameNum=parseInt(elem.trueMoveRefreshRate*timeSpend/1000);
        let newClassName="moveAnimation";
        let newClassNameNum=1;
        while(true){
            let tempClassName=newClassName+newClassNameNum;
            if(document.getElementsByClassName(tempClassName).length==0){
                addNewClass(elem,tempClassName);
                elemClass=tempClassName;
                break;
            }else{
                newClassNameNum++;
            }
        }
        firstFlag=false;
    }else{
        var elem=document.getElementsByClassName(elemClass)[0];
    }
    if(elem.movement){
        clearTimeout(elem.movement);
        //console.log(`clear movement event ${elemClass} ${elem.moveFrame}`);
    }
    if(elem.style.left.length==0){
        let elemStyle=window.getComputedStyle(elem);
        let positionMethod=elemStyle.position;
        if(positionMethod=="static"){
            elem.style.position="relative";
            elem.style.left=0+measure;
            elem.style.top=0+measure;
        }else{
            //console.log("left and top:"+elem.style.left+" "+elem.style.top);
            elem.style.position=positionMethod;
            elem.style.left=100*parseInt(elemStyle.left)/viewWidth+measure;
            elem.style.top=100*parseInt(elemStyle.top)/viewHeight+measure;
            //console.log("left and top:"+elemStyle.left+" "+elemStyle.top);
            //console.log("left and top:"+elem.style.left+" "+elem.style.top);
        }
    }
    if(elem.moveFrame>=(elem.trueMoveRefreshRate*timeSpend/1000)){
        deletExistingClass(elem,elemClass);
        delete elem.moveFrame;
        delete elem.nextMoveFrameTime;
        delete elem.trueMoveRefreshRate;
        delete elem.movement;
        delete elem.moveAnimationPlay;
        //console.log("move exit!");
        return;
    }
    let positionX=parseFloat(elem.style.left);
    let positionY=parseFloat(elem.style.top);
    let distanceX=parseFloat((targetX-positionX).toFixed(4));
    let distanceY=parseFloat((targetY-positionY).toFixed(4));
    //console.log(`distance x and y:${distanceX}  ${distanceY}`);
    elem.style.left=(positionX+(distanceX/(elem.trueMoveRefreshRate*timeSpend/5000)))+measure;
    elem.style.top=(positionY+(distanceY/(elem.trueMoveRefreshRate*timeSpend/5000)))+measure;
    //console.log(`elem x and y:${elem.style.left}  ${elem.style.top}`);
    elem.moveFrame+=1;
    //console.log(`Move:${elemClass} moveFrame:${elem.moveFrame} positionX:${positionX} positionY:${positionY}`);
    let repeat="elementMove("+null+","+targetX+","+targetY+","+timeSpend+",'"+measure+"',"+refreshRate+",'"+elemClass+"',"+firstFlag+")";
    elem.movement=setTimeout(repeat,elem.nextMoveFrameTime);
}
function elementSpin(formalElem,targetDegree,timeSpend=1000,refreshRate=60,elemClass=null,firstFlag=true){
    if(firstFlag){
        if(elemClass!=null){
            var elem=document.getElementsByClassName(elemClass)[0];
            deletExistingClass(elem,elemClass);
            //console.log("spin::first and class:"+elemClass);
        }else{
            var elem=formalElem;
            //console.log("spin::first and not class:"+elem);
        }
        if(elem.spinAnimationPlay){
            let newClassName="spinAnimation";
            let newClassNameNum=1;
            while(true){
                let tempClassName=newClassName+newClassNameNum;
                if(document.getElementsByClassName(tempClassName).length==0){
                    addNewClass(elem,tempClassName);
                    elemClass=tempClassName;
                    break;
                }else{
                    newClassNameNum++;
                }
            }
            let repeat=`elementSpin(${null},${targetDegree},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
            //console.log("spin::first and play:"+elemClass+"    "+repeat);
            setTimeout(repeat,elem.nextSpinFrameTime*(elem.spinAnimationFrameNum-elem.spinFrame+1));
            return;
        }
        //console.log("spin::first and notplay:"+elem);
        elem.spinFrame=0;
        elem.spinAnimationPlay=false;
        elem.nextSpinFrameTime=parseFloat((1000/refreshRate).toFixed(2));
        elem.trueSpinRefreshRate=parseFloat((1000/elem.nextSpinFrameTime).toFixed(2));
        elem.spinAnimationFrameNum=parseInt(elem.trueSpinRefreshRate*timeSpend/1000);
        let newClassName="spinAnimation";
        let newClassNameNum=1;
        while(true){
            let tempClassName=newClassName+newClassNameNum;
            if(document.getElementsByClassName(tempClassName).length==0){
                addNewClass(elem,tempClassName);
                elemClass=tempClassName;
                break;
            }else{
                newClassNameNum++;
            }
        }
        if(elem.style.transform.length==0){
            let elemStyle=window.getComputedStyle(elem);
            let transformMethod=elemStyle.transform;
            if(transformMethod=="none"){
                elem.style.transform="rotate(0deg)";
            }else{
                elem.style.transform=transformMethod;
            }
        }
        let distanceAngle=targetDegree-parseFloat(elem.style.transform.substring(7));
        elem.angleChangeValue=parseFloat((distanceAngle/(elem.trueSpinRefreshRate*(timeSpend/1000))).toFixed(2));
        firstFlag=false;
    }else{
        var elem=document.getElementsByClassName(elemClass)[0];
    }
    //console.log(elem.trueSpinRefreshRate);
    //console.log(timeSpend);
    //console.log(elem.trueSpinRefreshRate*timeSpend/1000);
    //console.log(`Pre:::: Spin:${elemClass} spinFrame:${elem.spinFrame} change:${elem.angleChangeValue} objectAngle:${parseFloat(elem.style.transform.substring(7))}deg`);
    if(elem.spinFrame>=(elem.trueSpinRefreshRate*timeSpend/1000)){
        elem.style.transform=`rotate(${targetDegree}deg)`;
        deletExistingClass(elem,elemClass);
        delete elem.spinFrame;
        delete elem.nextSpinFrameTime;
        delete elem.trueSpinRefreshRate;
        delete elem.spinning;
        delete elem.spinAnimationPlay;
        //console.log("spin exit!");
        return;
    }
    if(elem.spinning){
        clearTimeout(elem.spinning);
    }
    let objectAngle=parseFloat(elem.style.transform.substring(7));
    elem.style.transform=`rotate(${objectAngle+elem.angleChangeValue}deg)`;
    elem.spinFrame+=1;
    //console.log(`Over:::: Spin:${elemClass} spinFrame:${elem.spinFrame} change:${elem.angleChangeValue} objectAngle:${parseFloat(elem.style.transform.substring(7))}deg`);
    let repeat=`elementSpin(${null},${targetDegree},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
    elem.spinning=setTimeout(repeat,elem.nextSpinFrameTime);
}
function transparencyChange(formalElem,targetAlpha,timeSpend=1000,refreshRate=60,elemClass=null,firstFlag=true){
    if(firstFlag){
        if(elemClass!=null){
            var elem=document.getElementsByClassName(elemClass)[0];
            deletExistingClass(elem,elemClass);
            //console.log("spin::first and class:"+elemClass);
        }else{
            var elem=formalElem;
            //console.log("spin::first and not class:"+elem);
        }
        if(elem.transparencyAnimationPlay){
            let newClassName="alphaAnimation";
            let newClassNameNum=1;
            while(true){
                let tempClassName=newClassName+newClassNameNum;
                if(document.getElementsByClassName(tempClassName).length==0){
                    addNewClass(elem,tempClassName);
                    elemClass=tempClassName;
                    break;
                }else{
                    newClassNameNum++;
                }
            }
            let repeat=`transparencyChange(${null},${targetAlpha},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
            //console.log("spin::first and play:"+elemClass+"    "+repeat);
            setTimeout(repeat,elem.nextAlphaFrameTime*(elem.transparencyAnimationFrameNum-elem.alphaFrame+1));
            return;
        }
        //console.log("spin::first and notplay:"+elem);
        elem.alphaFrame=0;
        elem.transparencyAnimationPlay=false;
        elem.nextAlphaFrameTime=parseFloat((1000/refreshRate).toFixed(2));
        elem.trueAlphaRefreshRate=parseFloat((1000/elem.nextAlphaFrameTime).toFixed(2));
        elem.transparencyAnimationFrameNum=parseInt(elem.trueAlaphaRefreshRate*timeSpend/1000);
        let newClassName="alphaAnimation";
        let newClassNameNum=1;
        while(true){
            let tempClassName=newClassName+newClassNameNum;
            if(document.getElementsByClassName(tempClassName).length==0){
                addNewClass(elem,tempClassName);
                elemClass=tempClassName;
                break;
            }else{
                newClassNameNum++;
            }
        }
        if(elem.style.opacity.length==0){
            let elemStyle=window.getComputedStyle(elem);
            let alphaformMethod=elemStyle.opacity;
            elem.style.opacity=alphaformMethod;
        }
        let distanceAlpha=targetAlpha-parseFloat(elem.style.opacity);
        elem.alphaChangeValue=parseFloat((distanceAlpha/(elem.trueAlphaRefreshRate*(timeSpend/1000))).toFixed(6));
        firstFlag=false;
    }else{
        var elem=document.getElementsByClassName(elemClass)[0];
    }
    if(elem.transparency){
        clearTimeout(elem.transparency);
    }
    if(elem.alphaFrame>=(elem.trueAlphaRefreshRate*timeSpend/1000)){
        elem.style.opacity=`${targetAlpha}`;
        deletExistingClass(elem,elemClass);
        delete elem.alphaFrame;
        delete elem.nextAlphaFrameTime;
        delete elem.trueAlphaRefreshRate;
        delete elem.transparency;
        delete elem.transparencyAnimationPlay;
        //console.log("transparency exit!")
        return;
    }
    let objectAlpha=parseFloat(elem.style.opacity);
    elem.style.opacity=`${objectAlpha+elem.alphaChangeValue}`;
    elem.alphaFrame+=1;
    //console.log(`Transparency:${elemClass} alphaFrame:${elem.alphaFrame} change:${elem.alphaChangeValue} objectAlpha:${elem.style.opacity}`)
    let repeat=`transparencyChange(${null},${targetAlpha},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
    elem.transparency=setTimeout(repeat,elem.nextAlphaFrameTime);
}
function colorChange(formalElem,targetColorR,targetColorG,targetColorB,targetColorA,timeSpend=1000,refreshRate=60,elemClass=null,firstFlag=true){
    if(firstFlag){
        if(elemClass!=null){
            var elem=document.getElementsByClassName(elemClass)[0];
            deletExistingClass(elem,elemClass);
            //console.log("color::first and class:"+elemClass);
        }else{
            var elem=formalElem;
            //console.log("color::first and not class:"+elem);
        }
        if(elem.colorAnimationPlay){
            let newClassName="colorAnimation";
            let newClassNameNum=1;
            while(true){
                let tempClassName=newClassName+newClassNameNum;
                if(document.getElementsByClassName(tempClassName).length==0){
                    addNewClass(elem,tempClassName);
                    elemClass=tempClassName;
                    break;
                }else{
                    newClassNameNum++;
                }
            }
            let repeat=`colorChange(${null},${targetColorR},${targetColorG},${targetColorB},${targetColorA},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
            //console.log("color::first and play:"+elemClass+"    "+repeat);
            setTimeout(repeat,elem.nextColorFrameTime*(elem.colorAnimationFrameNum-elem.colorFrame+1));
            return;
        }
        //console.log("color::first and notplay:"+elem);
        elem.colorFrame=0;
        elem.colorAnimationPlay=false;
        elem.nextColorFrameTime=parseFloat((1000/refreshRate).toFixed(2));
        elem.trueColorRefreshRate=parseFloat((1000/elem.nextColorFrameTime).toFixed(2));
        elem.colorAnimationFrameNum=parseInt(elem.trueColorRefreshRate*timeSpend/1000);
        let newClassName="colorAnimation";
        let newClassNameNum=1;
        while(true){
            let tempClassName=newClassName+newClassNameNum;
            if(document.getElementsByClassName(tempClassName).length==0){
                addNewClass(elem,tempClassName);
                elemClass=tempClassName;
                break;
            }else{
                newClassNameNum++;
            }
        }
        if(elem.style.color.length==0){
            let elemStyle=window.getComputedStyle(elem);
            let colorformMethod=elemStyle.color;
            let objectColor=colorformMethod.replace("(",",").replace(")","").split(",");
            objectColor.splice(0,1);
            if(!objectColor[3]){
                objectColor.push(1);
            }
            elem.style.color=`rgba(${objectColor.join(",")})`;
        }
        let objectColor=elem.style.color.replace("(",",").replace(")","").split(",");
        objectColor.splice(0,1);
        if(!objectColor[3]){
            objectColor.push(1);
        }
        firstFlag=false;
    }else{
        var elem=document.getElementsByClassName(elemClass)[0];
    }
    if(elem.colorAnimation){
        clearTimeout(elem.colorAnimation);
    }
    if(elem.colorFrame>=(elem.trueColorRefreshRate*timeSpend/1000)){
        elem.style.color=`rgba(${targetColorR},${targetColorG},${targetColorB},${targetColorA})`;
        deletExistingClass(elem,elemClass);
        delete elem.colorFrame;
        delete elem.nextColorFrameTime;
        delete elem.trueColorRefreshRate;
        delete elem.colorAnimation;
        delete elem.colorAnimationPlay;
        //console.log("colorChange exit!")
        return;
    }
    let objectColor=elem.style.color.replace("(",",").replace(")","").split(",");
    objectColor.splice(0,1);
    if(!objectColor[3]){
        objectColor.push(1);
    }
    let distanceColorR=targetColorR-parseFloat(objectColor[0]);
    let distanceColorG=targetColorG-parseFloat(objectColor[1]);
    let distanceColorB=targetColorB-parseFloat(objectColor[2]);
    let distanceColorA=targetColorA-parseFloat(objectColor[3]);
    elem.colorRChangeValue=parseFloat((distanceColorR/(elem.trueColorRefreshRate*(timeSpend/1000)-elem.colorFrame+1)).toFixed(2));
    elem.colorGChangeValue=parseFloat((distanceColorG/(elem.trueColorRefreshRate*(timeSpend/1000)-elem.colorFrame+1)).toFixed(2));
    elem.colorBChangeValue=parseFloat((distanceColorB/(elem.trueColorRefreshRate*(timeSpend/1000)-elem.colorFrame+1)).toFixed(2));
    elem.colorAChangeValue=parseFloat((distanceColorA/(elem.trueColorRefreshRate*(timeSpend/1000)-elem.colorFrame+1)).toFixed(6));
    objectColor[0]=parseFloat(objectColor[0])+elem.colorRChangeValue;
    objectColor[1]=parseFloat(objectColor[1])+elem.colorGChangeValue;
    objectColor[2]=parseFloat(objectColor[2])+elem.colorBChangeValue;
    objectColor[3]=parseFloat(objectColor[3])+elem.colorAChangeValue;
    elem.style.color=`rgba(${objectColor.join(",")})`;
    //console.log(`objectColor:${objectColor}`);
    //console.log(`ChangeValue:${elem.colorRChangeValue},${elem.colorGChangeValue},${elem.colorBChangeValue},${elem.colorAChangeValue}`);
    elem.colorFrame+=1;
    //console.log(`ColorChange:${elemClass} alphaFrame:${elem.alphaFrame} change:${elem.alphaChangeValue} objectAlpha:${elem.style.opacity}`)
    let repeat=`colorChange(${null},${targetColorR},${targetColorG},${targetColorB},${targetColorA},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
    elem.colorAnimation=setTimeout(repeat,elem.nextColorFrameTime);
}
function backgroundColorChange(formalElem,targetBackgroundColorR,targetBackgroundColorG,targetBackgroundColorB,targetBackgroundColorA,timeSpend=1000,refreshRate=60,elemClass=null,firstFlag=true){
    if(firstFlag){
        if(elemClass!=null){
            var elem=document.getElementsByClassName(elemClass)[0];
            deletExistingClass(elem,elemClass);
            //console.log("backgroundColor::first and class:"+elemClass);
        }else{
            var elem=formalElem;
            //console.log("backgroundColor::first and not class:"+elem);
        }
        if(elem.backgroundColorAnimationPlay){
            let newClassName="backgroundColorAnimation";
            let newClassNameNum=1;
            while(true){
                let tempClassName=newClassName+newClassNameNum;
                if(document.getElementsByClassName(tempClassName).length==0){
                    addNewClass(elem,tempClassName);
                    elemClass=tempClassName;
                    break;
                }else{
                    newClassNameNum++;
                }
            }
            let repeat=`backgroundColorChange(${null},${targetBackgroundColorR},${targetBackgroundColorG},${targetBackgroundColorB},${targetBackgroundColorA},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
            //console.log("backgroundColor::first and play:"+elemClass+"    "+repeat);
            setTimeout(repeat,elem.nextBackgroundColorFrameTime*(elem.backgroundColorAnimationFrameNum-elem.backgroundColorFrame+1));
            return;
        }
        //console.log("backgroundColor::first and notplay:"+elem);
        elem.backgroundColorFrame=0;
        elem.backgroundColorAnimationPlay=false;
        elem.nextBackgroundColorFrameTime=parseFloat((1000/refreshRate).toFixed(2));
        elem.trueBackgroundColorRefreshRate=parseFloat((1000/elem.nextBackgroundColorFrameTime).toFixed(2));
        elem.backgroundColorAnimationFrameNum=parseInt(elem.trueBackgroundColorRefreshRate*timeSpend/1000);
        let newClassName="backgroundColorAnimation";
        let newClassNameNum=1;
        while(true){
            let tempClassName=newClassName+newClassNameNum;
            if(document.getElementsByClassName(tempClassName).length==0){
                addNewClass(elem,tempClassName);
                elemClass=tempClassName;
                break;
            }else{
                newClassNameNum++;
            }
        }
        if(elem.style.backgroundColor.length==0){
            let elemStyle=window.getComputedStyle(elem);
            let backgroundColorformMethod=elemStyle.backgroundColor;
            let objectBackgroundColor=backgroundColorformMethod.replace("(",",").replace(")","").split(",");
            objectBackgroundColor.splice(0,1);
            //console.log(objectBackgroundColor);
            if(!objectBackgroundColor[3]){
                objectBackgroundColor.push(1);
            }
            elem.style.backgroundColor=`rgba(${objectBackgroundColor.join(",")})`;
        }
        let objectBackgroundColor=elem.style.backgroundColor.replace("(",",").replace(")","").split(",");
        objectBackgroundColor.splice(0,1);
        if(!objectBackgroundColor[3]){
            objectBackgroundColor.push(1);
        }
        firstFlag=false;
    }else{
        var elem=document.getElementsByClassName(elemClass)[0];
    }
    if(elem.backgroundColorAnimation){
        clearTimeout(elem.backgroundColorAnimation);
    }
    if(elem.backgroundColorFrame>=(elem.trueBackgroundColorRefreshRate*timeSpend/1000)){
        elem.style.backgroundColor=`rgba(${targetBackgroundColorR},${targetBackgroundColorG},${targetBackgroundColorB},${targetBackgroundColorA})`;
        deletExistingClass(elem,elemClass);
        delete elem.backgroundColorFrame;
        delete elem.nextBackgroundColorFrameTime;
        delete elem.trueBackgroundColorRefreshRate;
        delete elem.backgroundColorAnimation;
        delete elem.backgroundColorAnimationPlay;
        //console.log("backgroundColorChange exit!")
        return;
    }
    let objectBackgroundColor=elem.style.backgroundColor.replace("(",",").replace(")","").split(",");
    objectBackgroundColor.splice(0,1);
    if(!objectBackgroundColor[3]){
        objectBackgroundColor.push(1);
    }
    let distanceBackgroundColorR=targetBackgroundColorR-parseFloat(objectBackgroundColor[0]);
    let distanceBackgroundColorG=targetBackgroundColorG-parseFloat(objectBackgroundColor[1]);
    let distanceBackgroundColorB=targetBackgroundColorB-parseFloat(objectBackgroundColor[2]);
    let distanceBackgroundColorA=targetBackgroundColorA-parseFloat(objectBackgroundColor[3]);
    elem.backgroundColorRChangeValue=parseFloat((distanceBackgroundColorR/(elem.trueBackgroundColorRefreshRate*(timeSpend/1000)-elem.backgroundColorFrame+1)).toFixed(2));
    elem.backgroundColorGChangeValue=parseFloat((distanceBackgroundColorG/(elem.trueBackgroundColorRefreshRate*(timeSpend/1000)-elem.backgroundColorFrame+1)).toFixed(2));
    elem.backgroundColorBChangeValue=parseFloat((distanceBackgroundColorB/(elem.trueBackgroundColorRefreshRate*(timeSpend/1000)-elem.backgroundColorFrame+1)).toFixed(2));
    elem.backgroundColorAChangeValue=parseFloat((distanceBackgroundColorA/(elem.trueBackgroundColorRefreshRate*(timeSpend/1000)-elem.backgroundColorFrame+1)).toFixed(6));
    objectBackgroundColor[0]=parseFloat(objectBackgroundColor[0])+elem.backgroundColorRChangeValue;
    objectBackgroundColor[1]=parseFloat(objectBackgroundColor[1])+elem.backgroundColorGChangeValue;
    objectBackgroundColor[2]=parseFloat(objectBackgroundColor[2])+elem.backgroundColorBChangeValue;
    objectBackgroundColor[3]=parseFloat(objectBackgroundColor[3])+elem.backgroundColorAChangeValue;
    elem.style.backgroundColor=`rgba(${objectBackgroundColor.join(",")})`;
    //console.log(`objectBackgroundColor:${objectBackgroundColor}`);
    //console.log(`ChangeValue:${elem.backgroundColorRChangeValue},${elem.backgroundColorGChangeValue},${elem.backgroundColorBChangeValue},${elem.backgroundColorAChangeValue}`);
    elem.backgroundColorFrame+=1;
    //console.log(`BackgroundColorChange:${elemClass} alphaFrame:${elem.alphaFrame} change:${elem.alphaChangeValue} objectAlpha:${elem.style.opacity}`)
    let repeat=`backgroundColorChange(${null},${targetBackgroundColorR},${targetBackgroundColorG},${targetBackgroundColorB},${targetBackgroundColorA},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
    elem.backgroundColorAnimation=setTimeout(repeat,elem.nextBackgroundColorFrameTime);
}
function backgroundImageChange(formalElem,targetBackgroundImageR,targetBackgroundImageG,targetBackgroundImageB,targetBackgroundImageA,timeSpend=500,refreshRate=60,elemClass=null,firstFlag=true){
    if(firstFlag){
        if(elemClass!=null){
            var elem=document.getElementsByClassName(elemClass)[0];
            deletExistingClass(elem,elemClass);
            //console.log("backgroundImage::first and class:"+elemClass);
        }else{
            var elem=formalElem;
            //console.log("backgroundImage::first and not class:"+elem);
        }
        if(elem.backgroundImageAnimationPlay){
            let newClassName="backgroundImageAnimation";
            let newClassNameNum=1;
            while(true){
                let tempClassName=newClassName+newClassNameNum;
                if(document.getElementsByClassName(tempClassName).length==0){
                    addNewClass(elem,tempClassName);
                    elemClass=tempClassName;
                    break;
                }else{
                    newClassNameNum++;
                }
            }
            let repeat=`backgroundImageChange(${null},${targetBackgroundImageR},${targetBackgroundImageG},${targetBackgroundImageB},${targetBackgroundImageA},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
            //console.log("backgroundImage::first and play:"+elemClass+"    "+repeat);
            setTimeout(repeat,elem.nextBackgroundImageFrameTime*(elem.backgroundImageAnimationFrameNum-elem.backgroundImageFrame+1));
            return;
        }
        //console.log("backgroundImage::first and notplay:"+elem);
        elem.backgroundImageFrame=0;
        elem.backgroundImageAnimationPlay=false;
        elem.nextBackgroundImageFrameTime=parseFloat((1000/refreshRate).toFixed(2));
        elem.trueBackgroundImageRefreshRate=parseFloat((1000/elem.nextBackgroundImageFrameTime).toFixed(2));
        elem.backgroundImageAnimationFrameNum=parseInt(elem.trueBackgroundImageRefreshRate*timeSpend/1000);
        let newClassName="backgroundImageAnimation";
        let newClassNameNum=1;
        while(true){
            let tempClassName=newClassName+newClassNameNum;
            if(document.getElementsByClassName(tempClassName).length==0){
                addNewClass(elem,tempClassName);
                elemClass=tempClassName;
                break;
            }else{
                newClassNameNum++;
            }
        }
        if(elem.style.backgroundImage.length==0){
            let elemStyle=window.getComputedStyle(elem);
            let backgroundImageformMethod=elemStyle.backgroundImage;
            if(backgroundImageformMethod=="none"){
                elem.style.backgroundImage="linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0))";
            }else{
                elem.style.backgroundImage=backgroundImageformMethod;
            }
        }
        firstFlag=false;
    }else{
        var elem=document.getElementsByClassName(elemClass)[0];
    }
    if(elem.backgroundImageAnimation){
        clearTimeout(elem.backgroundImageAnimation);
    }
    if(elem.backgroundImageFrame>=(elem.trueBackgroundImageRefreshRate*timeSpend/1000)){
        let backgroundImageformMethod=elem.style.backgroundImage;
        let allBackgroundImage=backgroundImageformMethod.replace(RegExp(" ","g"),"").replace(RegExp("\\(","g"),",").replace(RegExp("\\)","g"),"").split(",");
        let styleStringArray=new Array();
        if(backgroundImageformMethod.indexOf("to")!=-1){
            styleStringArray.push(backgroundImageformMethod.split(",")[0]);
        }
        let objectBackgroundImage=new Array();
        let frequenceNum=0;
        let subArrayNum=0;
        for (const key in allBackgroundImage){
            if(!isNaN(allBackgroundImage[key])){
                if(frequenceNum%4<=2){
                    objectBackgroundImage.push(parseInt(allBackgroundImage[key]));
                }else{
                    if(allBackgroundImage[key]<=1){
                        objectBackgroundImage.push(parseFloat(allBackgroundImage[key]));
                    }else{
                        objectBackgroundImage.push(1);
                    }
                    if(subArrayNum==0){
                        objectBackgroundImage[0]=targetBackgroundImageR;
                        objectBackgroundImage[1]=targetBackgroundImageG;
                        objectBackgroundImage[2]=targetBackgroundImageB;
                        objectBackgroundImage[3]=targetBackgroundImageA;
                    }
                    styleStringArray.push(`rgba(${(objectBackgroundImage.slice(subArrayNum*4,subArrayNum*4+4).join(","))})`);
                    subArrayNum++;
                }
                frequenceNum++;
            }
        }
        if(objectBackgroundImage.length%4!=0){
            subArrayNum++;
            objectBackgroundImage.push(1);
            styleStringArray.push(`rgba(${(objectBackgroundImage.slice(subArrayNum*4,subArrayNum*4+4).join(","))})`);
        }
        //console.log(styleStringArray.join(","));
        if(backgroundImageformMethod.indexOf("to")!=-1){
            elem.style.backgroundImage=`${styleStringArray.join(",")})`;
        }else{
            elem.style.backgroundImage=`linear-gradient(${styleStringArray.join(",")})`;
        }
        deletExistingClass(elem,elemClass);
        delete elem.backgroundImageFrame;
        delete elem.nextBackgroundImageFrameTime;
        delete elem.trueBackgroundImageRefreshRate;
        delete elem.backgroundImageAnimation;
        delete elem.backgroundImageAnimationPlay;
        //console.log("backgroundImageChange exit!")
        return;
    }
    let backgroundImageformMethod=elem.style.backgroundImage;
    let allBackgroundImage=backgroundImageformMethod.replace(RegExp(" ","g"),"").replace(RegExp("\\(","g"),",").replace(RegExp("\\)","g"),"").split(",");
    //console.log(backgroundImageformMethod);
    //console.log(allBackgroundImage);
    let objectBackgroundImage=new Array();
    let frequenceNum=0;
    let subArrayNum=0;
    for (const key in allBackgroundImage){
        if(!isNaN(allBackgroundImage[key])){
            if(frequenceNum%4<=2){
                objectBackgroundImage.push(parseInt(allBackgroundImage[key]));
            }else{
                if(allBackgroundImage[key]<=1){
                    objectBackgroundImage.push(parseFloat(allBackgroundImage[key]));
                }else{
                    objectBackgroundImage.push(1);
                }
            }
            frequenceNum++;
        }
    }
    if(objectBackgroundImage.length%4!=0){
        objectBackgroundImage.push(1);
    }
    let distanceBackgroundImageR=targetBackgroundImageR-parseFloat(objectBackgroundImage[0]);
    let distanceBackgroundImageG=targetBackgroundImageG-parseFloat(objectBackgroundImage[1]);
    let distanceBackgroundImageB=targetBackgroundImageB-parseFloat(objectBackgroundImage[2]);
    let distanceBackgroundImageA=targetBackgroundImageA-parseFloat(objectBackgroundImage[3]);
    elem.backgroundImageRChangeValue=parseFloat((distanceBackgroundImageR/(elem.trueBackgroundImageRefreshRate*(timeSpend/1000)-elem.backgroundImageFrame+1)).toFixed(2));
    elem.backgroundImageGChangeValue=parseFloat((distanceBackgroundImageG/(elem.trueBackgroundImageRefreshRate*(timeSpend/1000)-elem.backgroundImageFrame+1)).toFixed(2));
    elem.backgroundImageBChangeValue=parseFloat((distanceBackgroundImageB/(elem.trueBackgroundImageRefreshRate*(timeSpend/1000)-elem.backgroundImageFrame+1)).toFixed(2));
    elem.backgroundImageAChangeValue=parseFloat((distanceBackgroundImageA/(elem.trueBackgroundImageRefreshRate*(timeSpend/1000)-elem.backgroundImageFrame+1)).toFixed(6));
    objectBackgroundImage[0]=parseFloat(objectBackgroundImage[0])+elem.backgroundImageRChangeValue;
    objectBackgroundImage[1]=parseFloat(objectBackgroundImage[1])+elem.backgroundImageGChangeValue;
    objectBackgroundImage[2]=parseFloat(objectBackgroundImage[2])+elem.backgroundImageBChangeValue;
    objectBackgroundImage[3]=parseFloat(objectBackgroundImage[3])+elem.backgroundImageAChangeValue;

    let styleStringArray=new Array();
    if(backgroundImageformMethod.indexOf("to")!=-1){
        styleStringArray.push(backgroundImageformMethod.split(",")[0]);
    }
    frequenceNum=0;
    subArrayNum=0;
    for (const key in allBackgroundImage){
        if(!isNaN(allBackgroundImage[key])){
            if(frequenceNum%4==3){
                styleStringArray.push(`rgba(${(objectBackgroundImage.slice(subArrayNum*4,subArrayNum*4+4).join(","))})`);
                subArrayNum++;
            }
            frequenceNum++;
        }
    }
    //console.log(styleStringArray.join(","));
    if(backgroundImageformMethod.indexOf("to")!=-1){
        elem.style.backgroundImage=`${styleStringArray.join(",")})`;
    }else{
        elem.style.backgroundImage=`linear-gradient(${styleStringArray.join(",")})`;
    }
    //console.log(`objectBackgroundImage:${objectBackgroundImage}`);
    //console.log(`ChangeValue:${elem.backgroundImageRChangeValue},${elem.backgroundImageGChangeValue},${elem.backgroundImageBChangeValue},${elem.backgroundImageAChangeValue}`);
    elem.backgroundImageFrame+=1;
    //console.log(`BackgroundImageChange:${elemClass} alphaFrame:${elem.alphaFrame} change:${elem.alphaChangeValue} objectAlpha:${elem.style.opacity}`)
    let repeat=`backgroundImageChange(${null},${targetBackgroundImageR},${targetBackgroundImageG},${targetBackgroundImageB},${targetBackgroundImageA},${timeSpend},${refreshRate},'${elemClass}',${firstFlag})`;
    elem.backgroundImageAnimation=setTimeout(repeat,elem.nextBackgroundImageFrameTime);
}
