import Tool from '/js/editor/Tool.js';

export default class Eraser extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousemove(e){
        let [x, y] = this.getXY(e);
        this.ctx.clearRect(x - this.app.lineWidth / 2, y - this.app.lineWidth / 2, this.app.lineWidth, this.app.lineWidth)
    }   
}