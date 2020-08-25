import Tool from '/js/editor/Tool.js';

export default class Text extends Tool {
    constructor(){
        super(...arguments);

        this.$input = $(`<input type="text">`);
        this.$input.on("input", e => {
            this.$input.css({
                width: e.target.scrollWidth + "px"
            });
        });
    }

    onmousedown(e){
        let [x, y] = this.getXY(e);

        this.ctx.fillStyle = this.app.styleColor;
        this.ctx.font = `${this.app.fontSize}px '맑은 고딕', sans-serif`;

        $(this.viewport).after(this.$input);
        
        this.$input.val("");
        this.$input.css({
            left: x + "px",
            top: y + "px",
            fontSize: this.app.fontSize + "px",
            color: this.app.styleColor + "px"
        });

        this.$input.focus();
    }
}