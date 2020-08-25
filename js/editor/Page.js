class Page {
    constructor(app, init = null){
        this.app = app;
        this.canvas = document.createElement("canvas");
        this.canvas.width = app.canvas.width;
        this.canvas.height = app.canvas.height;

        this.ctx = this.canvas.getContext("2d");
        this.video = null;

        if(init instanceof Image){
            init.onload = () => {
                this.setImage(init);
            };
        }
    }

    setImage(image){
        const padding = 50;
        let wantW = this.canvas.width - padding * 2;
        let wantH = this.canvas.height - padding * 2;

        let w, h, x, y;
        if(image.width > image.height){
            w = image.height * wantW / wantH;
            h = image.height;
            x = (image.width - w) / 2;
            y = 0;
        } else {
            w = image.width;
            h = image.width * wantH / wantW;
            x = 0;
            y = (image.height - h) / 2;   
        }

        this.ctx.drawImage(image, x, y, w, h, padding, padding, wantW, wantH);
    }

    setVideo(video){
        this.video = new Video(video);

        $("#wrap > :not(canvas)").remove();
        $("#wrap").append(this.video.$root);
    }
}