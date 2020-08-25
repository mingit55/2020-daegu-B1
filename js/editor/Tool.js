export default class Tool {
    constructor(app){
        this.app = app;
        this.viewport = this.app.canvas;
    }

    get canvas(){
        return this.app.page ? this.app.page.canvas : null;
    }
    get ctx(){
        return this.app.page ? this.app.page.ctx : null;
    }

    getXY({pageX, pageY}){
        let {left, top} = $(this.viewport).offset();
        let width = $(this.viewport).width();
        let height = $(this.viewport).height();

        let x = pageX - left < 0 ? 0 : pageX - left > width ? width : pageX - left;
        let y = pageY - top < 0 ? 0 : pageY - top > height ? height : pageY - top;

        return [x, y];
    }
}