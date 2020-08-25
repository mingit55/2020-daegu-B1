import Tool from '/js/editor/Tool.js';

export default class Line extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousedown(e){
        let [x, y] = this.getXY(e);

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    onmousemove(e){
        let [x, y] = this.getXY(e);

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}