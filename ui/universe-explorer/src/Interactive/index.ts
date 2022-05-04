import { WatchMove } from "../Move/config/WatchMove";

export class Interactive{
    interactiveContext = document.getElementById('interactive-content') as HTMLElement;
    character: HTMLElement;
    visible: string = "";
    control: WatchMove;
    close = document.querySelector('.close') as HTMLElement;
    lastInterval: any;
    constructor(character: HTMLElement, control: WatchMove){
        this.control = control;
        this.character = character;
        this.close.addEventListener("click", () => {
            this.visible = "";
            Array.from(this.interactiveContext.querySelectorAll("div")).forEach((element: HTMLElement) => {
                element.style.display = "none";
            })
            this.interactiveContext.style.display = "none";
            this.interactiveContext.style.pointerEvents = "none";
        });
        setInterval(() => {
            window.focus()
            if(this.visible == ""){
                var BBoxA = this.character.getBoundingClientRect()
                const intersectables = document.querySelectorAll('.trigger');
                for(let element of Array.from(intersectables)){
                    var BBoxB = element.getBoundingClientRect()

                    if(this.rectIntersect(BBoxA, BBoxB)){
                        this.showThat(element as HTMLElement);
                    }
                }
            }
        },200);
       
    }
    showThat(triggerElement: HTMLElement){

            this.visible = triggerElement.getAttribute("show") as string;
            let element = document.getElementById(this.visible) as HTMLElement
            this.interactiveContext.style.display = "block";
            element.style.display = "block";
            this.interactiveContext.style.pointerEvents = "auto";
            this.watchOut(triggerElement);
            
        
    }
    watchOut(triggerElement: HTMLElement){
        this.close.style.display = "none";
        if(this.lastInterval){
            clearInterval(this.lastInterval);
        }
        this.lastInterval = setInterval(() => {
            if(this.visible != ""){
                var BBoxB = this.character.getBoundingClientRect()
                var BBoxA = triggerElement.getBoundingClientRect()
                if(!this.rectIntersect(BBoxA, BBoxB)){
                    this.close.style.display = "block";
                    setTimeout(() => {
                        Array.from(this.interactiveContext.querySelectorAll("div")).forEach((element: HTMLElement) => {
                            element.style.display = "none";
                        })
                        this.visible = ""
                        this.interactiveContext.style.display = "none";
                        this.interactiveContext.style.pointerEvents = "none";
                    },3000)
                    clearInterval(this.lastInterval);
                }else{
                    this.close.style.display = "none";
                }
            }
        },200);
    }
    rangeIntersect = function(min0: number, max0: number, min1: number, max1: number) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
    }
    rectIntersect = function (this: Interactive, r0, r1) {
        return this.rangeIntersect(r0.left, r0.right, r1.left, r1.right) 
            && this.rangeIntersect(r0.top, r0.bottom, r1.top, r1.bottom)
    }
    
}