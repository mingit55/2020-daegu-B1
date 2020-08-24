import Line from "/js/editor/Line.js";
import Rect from "/js/editor/Rect.js";
import Circle from "/js/editor/Circle.js";
import Triangle from "/js/editor/Triangle.js";
import Text from "/js/editor/Text.js";
import Eraser from "/js/editor/Eraser.js";

class App {
    constructor(){
        this.canvas = document.querySelector("#content");
        this.ctx = this.getContext("2d");

        this.selectd = null;
        this.tools = {
            line: new Line(this),
            rect: new Rect(this),
            circle: new Circle(this),
            triangle: new Triangle(this),
            text: new Text(this),
            eraser: new Eraser(this),
        };

        this.setEvents();
    }
    get tool(){
        return this.tools[this.selectd];
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

        $(window).on("mousedown", e => {
            if(this.selected && e.which == 1 && this.selected.onmousedown){
                e.preventDefault();
                this.selected.onmousedown(e);
            }
        });
        $(window).on("mousemove", e => {
            if(this.selected && e.which == 1 && this.selected.onmousemove){
                e.preventDefault();
                this.selected.onmousemove(e);
            }
        });
        $(window).on("mouseup", e => {
            if(this.selected && e.which == 1 && this.selected.onmouseup){
                e.preventDefault();
                this.selected.onmouseup(e);
            }
        });
    }
}

$(function(){
    let app = new App();
});