import Tool from '/js/editor/Tool.js';

export default class Rect extends Tool {
    constructor(){
        super(...arguments);

        this.size = 50;
    }

    onmousedown(e){
        let [x, y] = this.getXY(e);

        this.ctx.lineWidth = this.app.lineWidth;
        this.ctx.strokeStyle = this.app.styleColor;
        this.ctx.strokeRect(x - this.size / 2, y - this.size / 2, this.size, this.size);
    }
}