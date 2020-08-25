import Tool from '/js/editor/Tool.js';

export default class Circle extends Tool {
    constructor(){
        super(...arguments);
        this.radius = 50;
    }

    onmousedown(e){
        let [x, y] = this.getXY(e);

        this.ctx.lineWidth = this.app.lineWidth;
        this.ctx.strokeStyle = this.app.styleColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.radius / 2, 0, Math.PI * 2);
        this.ctx.stroke();
    }
}