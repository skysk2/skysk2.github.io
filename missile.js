
class Missile{
    constructor(){
        this.x = width;
        this.y = 300;
        this.x2 = -width;
        this.y2 = 136;
    }
    move() {
        this.x -= 4;
        this.x2 += 4; 
        push();
        noStroke();
        fill(150);
        ellipse(this.x-20,this.y,20);
        rect(this.x,this.y,40,20);
        pop();
        push();
        noStroke();
        fill(150);
        ellipse(this.x2+20,this.y2,20);
        rect(this.x2,this.y2,40,20);
        pop();
    }
    show() {
        let b = false;
        return b = (px-20>=this.x-20&&px-20<=this.x+20&&py-30<=this.y+10&&py+30>=this.y-10||px+20>=this.x-20&&px+20<=this.x+20
            &&py-30<=this.y+10&&py+30>=this.y-10);
    }
    
    show2() {
        let b2 = false;
        return b2 = (px-20>=this.x2-20&&px-20<=this.x2+20&&py-30<=this.y2+10&&py+30>=this.y2-10||px+20>=this.x2-20&&px+20<=this.x2+20
            &&py-30<=this.y2+10&&py+30>=this.y2-10);
    }
}