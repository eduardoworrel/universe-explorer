import { Sun } from "./sun";
import { Planet } from "./planet";

export default class Universe{
  

    spacing = 3000/ 30 
    planets: Planet[] = []; 
    rockets = {};
    rocketCounter = 0; 
    launchAngle = 0;
    
    usePlanetGrav = false
    useCollisions = false
    planetScale = 2
    launchVel = 10
    sun: Sun;
    sunImg: HTMLImageElement;

    rocketImg: string;
    
    space: HTMLDivElement;
    innerWidth: number;
    innerHeight: number;
    constructor(space: HTMLDivElement){
        this.innerWidth = 3000;
        this.innerHeight = 3000;
    
        this.space = space;
        this.loadImages();
        this.drawStaticSun()
        


        let planet = new Planet("Earth",250,250, this.spacing*9, 0,this.sun.mass);
        this.planets.push(planet);
        this.space.append(planet.element);
        this.space.append(planet.moon.element);
        this.planets.push(planet);




    }

    drawStaticSun(){
        let widthFactor = 600;
        let heightFactor = 600;
        this.sun = new Sun(widthFactor,heightFactor,this.planetScale,this.sunImg);
        this.space.append(this.sun.element);
    }
    loadImages() {
        this.sunImg = document.createElement("img");
        this.sunImg.src = "assets/images/space-elements/estrela.gif";
    
      
        this.rocketImg =  "assets/images/rocket.png";
    
      
    }
}