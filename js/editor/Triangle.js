class Triangle extends Tool {
    constructor(){
        super(...arguments);

        this.size = 30;
    }

    onmousedown(e){
        let [X, Y] = this.getXY(e);
        let x, y;

        this.ctx.lineWidth = this.app.lineWidth;
        this.ctx.strokeStyle = this.app.styleColor;
        this.ctx.beginPath();


        // 0
        x = X + Math.cos( Math.PI * -90 / 180 ) * this.size;
        y = Y + Math.sin( Math.PI * -90 / 180 ) * this.size;
        this.ctx.moveTo(x, y);

        // 120
        x = X + Math.cos( Math.PI * 30 / 180 ) * this.size;
        y = Y + Math.sin( Math.PI * 30 / 180 ) * this.size;
        this.ctx.lineTo(x, y);

        // 240
        x = X + Math.cos( Math.PI * 150 / 180 ) * this.size;
        y = Y + Math.sin( Math.PI * 150 / 180 ) * this.size;
        this.ctx.lineTo(x, y);

        // 0
        x = X + Math.cos( Math.PI * -90 / 180 ) * this.size;
        y = Y + Math.sin( Math.PI * -90 / 180 ) * this.size;
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
               
        this.ctx.stroke();
    }
}