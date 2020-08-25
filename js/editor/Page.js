export default class Page {
    constructor(app){
        this.app = app;
        this.canvas = document.createElement("canvas");
        this.canvas.width = app.canvas.width;
        this.canvas.height = app.canvas.height;

        this.ctx = this.canvas.getContext("2d");
    }
}