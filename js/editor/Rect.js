import Tool from '/js/editor/Tool.js';

export default class Rect extends Tool {
    constructor(){
        super(...arguments);

        this.size = 50;
    }

    onmousedown(e){
        let [x, y] = this.getXY(e);

        this.ctx.fillStyle = this.app.fillStyle;
        this.ctx.fillRect(x - this.size / 2, y - this.size / 2, this.size, this.size);
    }
}