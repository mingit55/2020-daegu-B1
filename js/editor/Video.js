class Video {
    constructor(url){
        this.$root = $(`<div id="content-video">
                            <video src="${url}"></video>
                            <div class="controls">
                                <button class="play">재생</button>
                                <button class="repeat">반복 재생 중</button>
                                <input type="range">
                            </div>
                        </div>`);
        this.$play = this.$root.find(".play");
        this.$repeat = this.$root.find(".repeat");
        this.$range = this.$root.find(".range");
    }
}