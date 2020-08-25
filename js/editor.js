import Line from "/js/editor/Line.js";
import Rect from "/js/editor/Rect.js";
import Circle from "/js/editor/Circle.js";
import Triangle from "/js/editor/Triangle.js";
import Text from "/js/editor/Text.js";
import Eraser from "/js/editor/Eraser.js";
import Page from "./editor/Page.js";

class App {
    constructor(){
        this.canvas = document.querySelector("#content");
        this.ctx = this.canvas.getContext("2d");
        this.selected = null;

        this.tools = {
            line: new Line(this),
            rect: new Rect(this),
            circle: new Circle(this),
            triangle: new Triangle(this),
            text: new Text(this),
            eraser: new Eraser(this),
        };

        this.pages = [ new Page(this), new Page(this), new Page(this) ];
        this.pageIdx = 0;

        this.render();
        this.setEvents();
    }
    get tool(){
        return this.tools[this.selected];
    }
    get page(){
        return this.pages[this.pageIdx];
    }
    get styleColor() {
        return document.querySelector("#style-color").value;
    }
    get lineWidth() {
        return document.querySelector("#line-width").value;
    }
    get fontSize() {
        return document.querySelector("#font-size").value;
    }


    render(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.page){
            this.ctx.drawImage(this.page.canvas, 0, 0);
        }

        requestAnimationFrame(() => this.render());
    }

    setEvents(){
        $(".tool").on("click", e => {
            $(".tool").removeClass("active");
            let name = e.currentTarget.dataset.name;
            
            if(this.selected === name) {
                this.selected = null;
                e.currentTarget.classList.remove("active");
            } else {
                this.selected = name;
                e.currentTarget.classList.add("active");
            }
        });

        $(this.canvas).on("mousedown", e => {
            if(this.tool && e.which == 1 && this.tool.onmousedown){
                e.preventDefault();
                this.tool.onmousedown(e);
            }
        });
        $(window).on("mousemove", e => {
            if(this.tool && e.which == 1 && this.tool.onmousemove){
                e.preventDefault();
                this.tool.onmousemove(e);
            }
        });
        $(window).on("mouseup", e => {
            if(this.tool && e.which == 1 && this.tool.onmouseup){
                e.preventDefault();
                this.tool.onmouseup(e);
            }
        });
    }
}

$(function(){
    let app = new App();
});