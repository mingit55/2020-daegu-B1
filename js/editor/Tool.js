export default class Tool {
    constructor(app){
        this.app = app;
        this.canvas = this.app.canvas;
        this.ctx = this.app.ctx;
    }

    getXY({pageX, pageY}){
        let {left, top} = $(this.canvas).offset();
        let width = $(this.canvas).width();
        let height = $(this.canvas).height();

        let x = pageX - left < 0 ? 0 : pageX - left > width ? width : pageX - left;
        let y = pageY - top < 0 ? 0 : pageY - top > height ? height : pageY - top;

        return [x, y];
    }
}