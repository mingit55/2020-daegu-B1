class Page {
    constructor(app){
        this.app = app;
        this.canvas = document.createElement("canvas");
        this.canvas.width = app.canvas.width;
        this.canvas.height = app.canvas.height;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.media = null;
        this.removedrawList = [];
    }

    getHTML(){
        let src = this.canvas.toDataURL("image/jpeg");

        return `<div class="page">
                    <img src="${src}" alt="페이지">
                    ${ this.media ? this.media.getHTML() : "" }
                </div>`
    }

    setImage(image){
        this.media = new Image(image);
        $("#wrap > :not(canvas)").remove();
        $("#wrap").append(this.media.$root);
    }

    setVideo(video){
        this.media = new Video(video);
        $("#wrap > :not(canvas)").remove();
        $("#wrap").append(this.media.$root);
    }
}