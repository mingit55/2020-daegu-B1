class Text extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousedown(e){
        let [x, y] = this.getXY(e);
        let text = prompt("삽입할 텍스트를 입력하세요");

        this.ctx.fillStyle = this.app.styleColor;
        this.ctx.font = `${this.app.fontSize}px '맑은 고딕', sans-serif`;
        
        this.ctx.fillText( text, x, y );
    }
}