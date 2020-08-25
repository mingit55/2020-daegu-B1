class Image {
    constructor(url){
        this.$root = $(`<div class="content-media">
                            <img src="${url}">
                        </div>`);
    }

    init(){
        
    }

    getHTML(){
        let texts = Array.from(this.$root.find(".content-media__text"));

        return `<div class="content-media">
                    <img src="${this.$root.find("img")[0].src}">
                    ${ texts.map(text => text.outerHTML).join("") }
                </div>`
    }
}