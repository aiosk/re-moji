const shuffle = (array)=> {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
};

function hideAddressBar() {
    if (!window.location.hash) {
        if (document.height < window.outerHeight) {
            document.body.style.height = (window.outerHeight + 50) + 'px';
        }

        setTimeout(function () {
            window.scrollTo(0, 1);
        }, 50);
    }
}

window.addEventListener("load", function () {
    if (!window.pageYOffset) {
        hideAddressBar();
    }
});
window.addEventListener("orientationchange", hideAddressBar);

$(() => {
    const emojiKeyboard = $('.emoji-keyboard').emojiKeyboard().emojiKeyboard('open');

    $(document)
        .on('click', e => {
            if (emojiKeyboard.emojiKeyboard('isOpen')) {
                emojiKeyboard.emojiKeyboard('close');
            } else if (emojiKeyboard.emojiKeyboard('isClose')) {
                emojiKeyboard.emojiKeyboard('open');
            }
        })
        .foundation();
});