class App {
    constructor(){
        this.$search = $("#search");
        this.$content = $("#content");

        this.keyword = "";
        this.books = JSON.parse(JSON.stringify(books));
        
        this.render();
        this.setEvents();
    }

    get searchType(){
        return this.$search.find("select").val();
    }
    get searchText(){
        return this.$search.find("input").val();
    }

    render(){
        let viewList = this.books;
        
        if(this.keyword !== ""){
            let regex = new RegExp(this.keyword);
            viewList = viewList.filter(item => regex.test(item[this.searchType]));
        }

        this.$content.html(viewList.map(item => `<div class="col-lg-3 mb-4" data-toggle="modal" data-target="#edit-modal">
                <div class="bg-white border">
                    <img src="/images/books/${item.image}" alt="책 이미지" class="fit-contain hx-300 p-3">
                    <div class="p-3">
                        <div>
                            <strong>${item.name}</strong>
                            <span class="badge badge-primary ml-2">${item.category}</span>
                        </div>
                        <div class="mt-2">
                            <small>작가</small>
                            <span class="ml-2">${item.writer}</span>
                        </div>
                        <div class="mt-2">
                            <small>출판사</small>
                            <span class="ml-2">${item.company}</span>
                        </div>
                    </div>
                </div>
            </div>`).join(''));
    }

    setEvents(){
        this.$search.find("button").on("click", e => {
            this.keyword = this.searchText
                .replace(/([.*+?^$\[\]\(\)\\\\\\/])/g ,"\\$1")
                .replace(/ㄱ/, "[가-깋]")
                .replace(/ㄴ/, "[나-닣]")
                .replace(/ㄷ/, "[다-딯]")
                .replace(/ㄹ/, "[라-맇]")
                .replace(/ㅁ/, "[마-밓]")
                .replace(/ㅂ/, "[바-빟]")
                .replace(/ㅅ/, "[사-싷]")
                .replace(/ㅇ/, "[아-잏]")
                .replace(/ㅈ/, "[자-짛]")
                .replace(/ㅊ/, "[차-칳]")
                .replace(/ㅋ/, "[카-킿]")
                .replace(/ㅌ/, "[타-팋]")
                .replace(/ㅍ/, "[파-핗]")
                .replace(/ㅎ/, "[하-힣]");
            this.render();
        });
    }
}

$(function(){
    let app = new App();
});