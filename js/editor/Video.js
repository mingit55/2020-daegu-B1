class Video {
    constructor(url){
        this.id = "video-" + new Date().getTime()
        this.$root = $(`<div id="${this.id}" class="content-media">
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
        
        this.init();
    }

    init(){
        this.video.currentTime = 0;
        this.$play.text("재생");

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
            this.$play.text("재생");
        });

        $(this.range).on("input", e => {
            this.video.currentTime = parseFloat(this.range.value);
        });
    }

    getHTML(){
        let texts = Array.from(this.$root.find(".content-media__text"));
        return `<div id="${this.id}" class="content-media">
                    <video src="${this.video.src}"></video>
                    <div class="controls">
                        <button class="play">재생</button>
                        <button class="repeat">반복 안함</button>
                        <input type="range" min="0" value="0" max="${this.video.duration}" step="0.1">
                    </div>
                    ${ texts.map(text => text.outerHTML).join("") }
                </div>
                <script>
                    window.addEventListener("load", function(){
                        let box = document.querySelector("#${this.id}");
                        let video = box.querySelector("video");
                        let range = box.querySelector("input");
                        let play = box.querySelector(".play")
                        let repeat = box.querySelector(".repeat");
                
                        play.addEventListener("click", e => {
                            console.log(video);
                            if(video.paused) {
                                video.play();
                                play.innerText = "일시정지";
                            }
                            else {
                                video.pause();
                                play.innerText = "재생";
                            }
                        });
                
                        repeat.addEventListener("click", e => {
                            video.loop = ! video.loop;
                
                            if(video.loop) repeat.innerText = "반복 재생중";
                            else repeat.innerText = "반복 안함";
                        });
                
                
                        video.addEventListener("timeupdate", e => {
                            range.value = video.currentTime.toFixed(2);
                        });
                
                        video.addEventListener("ended", e => {
                            video.currentTime = 0;
                            play.innerText = "재생";
                        });
                
                        range.addEventListener("input", e => {
                            video.currentTime = parseFloat(range.value);
                        });
                    });
                </script>`;
    }
}