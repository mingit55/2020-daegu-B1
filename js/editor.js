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

        let introImage = new Image();
        introImage.src = "./images/intro.jpg";

        this.pages = [ new Page(this, introImage), new Page(this), new Page(this) ];
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

    moveTo(pageIdx){
        if(pageIdx < 0 || pageIdx >= this.pages.length) return false;
        this.pageIdx = pageIdx;
        
        $("#wrap > :not(canvas)").remove();
        if(this.page.video){
            $("#wrap").append(this.page.video.$root);
        }

        $("#page-current").text(`페이지 ${this.pageIdx + 1}/${this.pages.length}`);
    }


    render(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.page){
            this.ctx.drawImage(this.page.canvas, 0, 0);
        }

        requestAnimationFrame(() => this.render());
    }

    setEvents(){
        // 비디오 선택
        $("#file-video").on("change", async e => {
            if(e.target.files.length == 0) return false;
            let file = e.target.files[0];

            if(file.type.substr(0, 5) === "video"){
                let url = await new Promise(res => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        res(reader.result);
                    };
                });

                this.page.setVideo(url);
            }
        });

        // 이미지 선택
        $("#file-image").on("change", async e => {
            if(e.target.files.length == 0) return false;
            let file = e.target.files[0];

            if(file.type.substr(0, 5) === "image"){
                let url = await new Promise(res => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        res(reader.result);
                    };
                });

                let image = await new Promise(res => {
                    let img = new Image();
                    img.src = url;
                    img.onload = () => res(img);
                });

                this.page.setImage(image);
            }
        });
    

        // 페이지 생성
        $("#page-create").on("click", e => {
            this.pages.push(new Page(this));

            this.moveTo(this.pageIdx);
        });


        // 페이지 이동
        $("#page-prev").on("click", e => {
            this.moveTo(this.pageIdx - 1);
        });
        $("#page-next").on("click", e => {
            this.moveTo(this.pageIdx + 1);
        });

        // 도구 선택
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
            if(e.target === this.canvas && this.tool && e.which == 1 && this.tool.onmousedown){
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