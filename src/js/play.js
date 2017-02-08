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

    $(document).foundation()
	    .on('click', e => {
			if(emojiKeyboard.emojiKeyboard('isOpen')){
			    emojiKeyboard.emojiKeyboard('close');
			} else if(emojiKeyboard.emojiKeyboard('isClose')){
			    emojiKeyboard.emojiKeyboard('open');
			}
		});
    
    emojiKeyboard.emojiKeyboard('open');

    $('button.randomize').on('click', e => {
        e.preventDefault();
		e.stopPropagation();
        emojiKeyboard.emojiKeyboard('randomize');
    });
    $('button.clear').on('click', e => {
        e.preventDefault();
		e.stopPropagation();
        emojiKeyboard.emojiKeyboard('clear');
    });
    $('button.value').on('click', e => {
        e.preventDefault();
		e.stopPropagation();
        const val = emojiKeyboard.emojiKeyboard('val');
        alert(JSON.stringify(val));
    });
});