let emojiListValue = [];
$.widget('pls.emojiKeyboard', {
    options: {
        emojiList: [
            ":grinning:", ":grin:", ":joy:", ":rofl:", ":smiley:", ":smile:", ":sweat_smile:", ":laughing:", ":wink:",
            ":blush:", ":yum:", ":sunglasses:", ":heart_eyes:", ":kissing_heart:", ":kissing:", ":kissing_smiling_eyes:",
            ":kissing_closed_eyes:", ":relaxed:", ":slight_smile:", ":hugging:", ":thinking:", ":neutral_face:",
            ":expressionless:", ":no_mouth:", ":rolling_eyes:", ":smirk:", ":persevere:", ":disappointed_relieved:",
            ":open_mouth:", ":zipper_mouth:", ":hushed:", ":sleepy:", ":tired_face:", ":sleeping:", ":relieved:",
            ":nerd:", ":stuck_out_tongue:", ":stuck_out_tongue_winking_eye:", ":stuck_out_tongue_closed_eyes:",
            ":drooling_face:", ":unamused:", ":sweat:", ":pensive:", ":confused:", ":upside_down:", ":money_mouth:",
            ":astonished:", ":frowning2:", ":slight_frown:", ":confounded:", ":disappointed:", ":worried:", ":triumph:",
            ":cry:", ":sob:", ":frowning:", ":anguished:", ":fearful:", ":weary:", ":grimacing:", ":cold_sweat:",
            ":scream:", ":flushed:", ":dizzy_face:", ":rage:", ":angry:", ":innocent:", ":cowboy:", ":clown:",
            ":lying_face:", ":mask:", ":thermometer_face:", ":head_bandage:", ":nauseated_face:", ":sneezing_face:",
            ":smiling_imp:", ":imp:"
        ]
    },
    _create() {
        const $select = this.element.find('select');
        const $options = $select.find('option');
        if (!$options.length) {
            const newArr = shuffle(this.options.emojiList);
            const html = this._arrToOption(newArr);
            $select.empty().append(html);
        } else {
            console.info('option exist');
        }
        this._render();
    },
    _arrToOption(arr){
        return arr.map((v, i) => `<option value="${v}">${v}</option>`)
    },
    _render() {
        const $select = this.element.find('select');
        const $options = $select.find('option');

        let htmlLi = $options.map((i, n) => {
            return `<li>
  <a href="#" data-val="${$(n).val()}" >${emojione.shortnameToImage($(n).val())}</a>
</li>`
        }).get();
        htmlLi = `<ul class="">${htmlLi.join('')}</ul>`;
        this.element
            .find('ul').remove().end().append(htmlLi)
            .off('click', 'a')
            .on('click', 'a', e => {
                e.preventDefault();
                const $this = $(e.target).closest('a');
                const $option = $select.find(`option[value="${$this.data('val')}"]`);

                if ($option.prop('selected')) {
                    $this.removeClass().addClass('animated wobble');
                    $option.prop('selected', false);
                    var index = emojiListValue.indexOf($option.val());
                    if (index !== -1) emojiListValue.splice(index, 1);
                } else {
                    $this.removeClass().addClass('is-active animated tada');
                    $option.prop('selected', true);
                    emojiListValue.push($option.val());
                }

            })
    },
    clear() {
        const $select = this.element.find('select');
        const $ul = this.element.find('ul');
        const $options = $select.find('option');
        $options.prop('selected', false);
        $ul.find('a').removeClass();
        emojiListValue = [];
    },
    val() {
        return emojiListValue;
    },
    _getEffectIn(){
        return ['xlarge', 'xxlarge'].indexOf(Foundation.MediaQuery.current) > -1 ? 'slideInRight' : 'slideInUp';
    },
    _getEffectOut(){
        return ['xlarge', 'xxlarge'].indexOf(Foundation.MediaQuery.current) > -1 ? 'slideOutRight' : 'slideOutDown';
    },
    open() {
        this.element.find('ul').removeClass()
            .addClass(`animated ${this._getEffectIn()}`);
    },
    close() {
        this.element.find('ul').removeClass()
            .addClass(`animated ${this._getEffectOut()}`);
    },
    randomize() {
        const $select = this.element.find('select');
        const $options = $select.find('option');
        const oldArr = $options.map((i, n)=>$(n).val()).get();
        const newArr = shuffle(oldArr);

        const html = this._arrToOption(newArr);
        $select.empty().append(html);
        this._create();
        // this.open()
    }
});