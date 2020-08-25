class Video {
    constructor(url){
        this.$root = $(`<div id="content-video">
                            <video src="${url}"></video>
                            <div class="controls">
                                <button class="play">재생</button>
                                <button class="repeat">반복 안함</button>
                                <input type="range" min="0" value="0" step="0.1">
                            </div>
                        </div>`);
        this.video = this.$root.find("video")[0];
        this.range = this.$root.find("input")[0];
        this.$play = this.$root.find(".play");
        this.$repeat = this.$root.find(".repeat");
        
        this.setEvents();
    }

    setEvents(){
        $(this.video).on("loadedmetadata", e => {
            this.range.max = this.video.duration.toFixed(2);
        });

        this.$play.on("click", e => {
            
            if(this.video.paused) {
                this.video.play();
                this.$play.text("일시정지");
            }
            else {
                this.video.pause();
                this.$play.text("재생");
            }
        });

        this.$repeat.on("click", e => {
            this.video.loop = ! this.video.loop;

            if(this.video.loop) this.$repeat.text("반복 재생중")
            else this.$repeat.text("반복 안함")
        });


        $(this.video).on("timeupdate", e => {
            this.range.value = this.video.currentTime.toFixed(2);
        });

        $(this.video).on("ended", e => {
            this.video.currentTime = 0;
            this.video.paused = true;
            this.$play.text("재생");
        });

        $(this.range).on("input", e => {
            this.video.currentTime = parseFloat(this.range.value);
        });
    }
}