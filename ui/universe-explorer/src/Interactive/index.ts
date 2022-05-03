import Character from '../Character';
export class Interactive{
    interactiveContext = document.getElementById('interactive-content') as HTMLElement;
    character: Character;
    visible: string = "";
    constructor(character: Character){
        this.character = character;
        this.interactiveContext.addEventListener("click",()=>{
            window.focus()
        })
        setInterval(() => {
            if(this.visible == ""){
                var BBoxA = this.character.character.getBoundingClientRect()
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
        if(this.visible != triggerElement.getAttribute("show") as string){
            this.visible = triggerElement.getAttribute("show") as string;
            let element = document.getElementById(this.visible) as HTMLElement
            this.interactiveContext.style.display = "block";
            element.style.display = "block";
            this.interactiveContext.style.pointerEvents = "auto";
            this.watchOut(triggerElement, element);
            
        }
    }
    watchOut(triggerElement: HTMLElement,targetElement: HTMLElement){
        setInterval(() => {
            if(this.visible != ""){
                var BBoxB = this.character.character.getBoundingClientRect()
                var BBoxA = triggerElement.getBoundingClientRect()
                console.log(this.rectIntersect(BBoxA, BBoxB))
                if(!this.rectIntersect(BBoxA, BBoxB)){
                    this.visible = "";
                    targetElement.style.display = "none";
                    this.interactiveContext.style.display = "none";
                    this.interactiveContext.style.pointerEvents = "none";
                   
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