class Text extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousedown(e, isCanvas){
        let [x, y] = this.getXY(e);
        let text = prompt("삽입할 텍스트를 입력하세요");
        if(!text) return;

        if(isCanvas){
            this.ctx.fillStyle = this.app.styleColor;
            this.ctx.font = `${this.app.fontSize}px '맑은 고딕', sans-serif`;
            
            this.ctx.fillText( text, x, y );
        } else {
            let $parent = $(e.target).closest(".content-media");
            $parent.find(".content-media__text").remove();
            $parent.append(`<div class="content-media__text" style="font-size: ${this.app.fontSize}px; color: ${this.app.styleColor};">${text}</div>`);
        }
    }
}