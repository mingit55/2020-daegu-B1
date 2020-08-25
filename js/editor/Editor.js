class Editor {
    constructor(book){
        this.book = book;

        this.canvas = document.querySelector("#viewport");
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

        this.init();
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

    async init(){
        this.pages[2].setVideo("./movie/ex.mp4");
        this.pages[1].setImage("./images/intro.jpg");
        this.pages[0].setImage("./images/books/" + this.book.image);
    }

    moveTo(pageIdx){
        if(pageIdx < 0 || pageIdx >= this.pages.length) return false;
        this.pageIdx = pageIdx;
        
        $("#wrap > :not(canvas)").remove();
        if(this.page.media){
            $("#wrap").append(this.page.media.$root);
            this.page.media.init();
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
                console.log(file);
                let url = await new Promise((res, rej) => {
                    let reader = new FileReader();
                    reader.onload = () => {
                        console.log(reader.readyState);
                        res(reader.result);
                    };
                    reader.onprogress = () => {
                        console.log(reader.readyState, reader.result);
                    }
                    reader.onerror = () => {
                        rej(reader.error);
                    }
                    reader.readAsDataURL(file);
                });
                console.log(url);
                this.page.media = new Video(url);

                $("#wrap > :not(canvas)").remove();
                $("#wrap").append(this.page.media.$root);
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

                this.page.setImage(url);
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


        // HTML 다운로드
        $("#download-html").on("click", this.downloadHTML);

        $(window).on("mousedown", e => {
            if(this.isContain(e) && this.tool && e.which == 1 && this.tool.onmousedown){
                e.preventDefault();
                this.tool.onmousedown(e, e.target === this.canvas);
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


    isContain({pageX, pageY}){
        let {left, top} = $(this.canvas).offset();
        let width = $(this.canvas).width();
        let height = $(this.canvas).height();
        
        return left <= pageX && pageX <= left + width && top <= pageY && pageY <= top + height;       
    }

    downloadHTML = e => {
        let text = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                        <style>
                            #wrap {
                                border: 1px solid #ddd;
                                margin: 1em auto;
                                overflow: hidden;
                                position: relative;
                                width: 1100px;
                                display: flex;
                                flex-direction: column;
                            }
                            
                            .page {
                                width: 100%;
                                margin: 1em 0;
                                position: relative;
                                background-color: #fff;
                                border: 1px solid #ddd;
                            }

                            .content-media {
                                position: absolute;
                                width: 1000px;
                                height: 1400px;
                                left: 50px; top: 50px;
                            }
                            .content-media > video,
                            .content-media > img {
                                object-fit: cover;
                                width: 100%; height: 100%;
                                user-select: none;
                            }
                            
                            .content-media__text {
                                position: absolute;
                                left: 50%; top: 50%;
                                transform: translate(-50%, -50%);
                            }
                            
                            .content-media > .controls {
                                position: absolute;
                                left: 0; bottom: 0;
                                width: 100%;
                                height: 3em;
                                background-color: #000a;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            }
                            .content-media .controls button{
                                background-color: transparent;
                                color: #fffd;
                                border: none;
                                margin-left: 1em;
                                font-size: 0.9em;
                                padding: 0.25em 0.5em;
                                width: 100px;
                            }
                            .content-media .controls input {
                                margin-left: 1em;
                                margin-right: 1em;
                                width: calc(100% - 200px);
                            }
                        </style>
                    </head>
                    <body>
                        ${this.pages.map(page => page.getHTML()).join()}
                    </body>
                    </html>`;

        let blob = new Blob([text], {type: "text/html"});
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = this.book.name + ".html";
        document.body.append(a);
        a.click();
        a.remove();
    };
}