import Tool from '/js/editor/Tool.js';

export default class Line extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousedown(e){
        if(e.target !== this.viewport) return false;

        let [x, y] = this.getXY(e);
        this.ctx.lineWidth = this.app.lineWidth;
        this.ctx.strokeStyle = this.app.styleColor;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.drawing = true;
    }

    onmousemove(e){
        if(!this.drawing) return false;

        let [x, y] = this.getXY(e);

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    onmouseup(e){
        this.drawing = false;
    }
}