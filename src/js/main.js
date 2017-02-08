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

$(() => {
    const emojiKeyboard = $('.emoji-keyboard').emojiKeyboard();

    // $('button.open').on('click', e => {
    //     e.preventDefault();
        emojiKeyboard.emojiKeyboard('open');
    // })
    //     .trigger('click');

    $('button.close').on('click', e => {
        e.preventDefault();
        emojiKeyboard.emojiKeyboard('close');
    });

    $('button.randomize').on('click', e => {
        e.preventDefault();
        emojiKeyboard.emojiKeyboard('randomize');
    });
    $('button.clear').on('click', e => {
        e.preventDefault();
        emojiKeyboard.emojiKeyboard('clear');
    });
    $('button.value').on('click', e => {
        e.preventDefault();
        const val = emojiKeyboard.emojiKeyboard('val');
        alert(JSON.stringify(val));
    });
});