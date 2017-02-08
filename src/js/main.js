$(() => {
    $('.eocon').each((i, n)=> {
        const $this = $(n);
        $this.html(emojione.shortnameToImage($this.text()))
    })
});