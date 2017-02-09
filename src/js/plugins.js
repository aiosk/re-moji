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
    _toggleSendButton() {
        const button = this.element.find('i:contains(send)');
        if (emojiListValue.length > 0) {
            button.addClass('is-active');
        } else {
            button.removeClass('is-active');
        }
    },
    _render() {
        const $select = this.element.find('select');
        const $options = $select.find('option');

        let htmlLi = $options.map((i, n) => {
            return `<li>
  <a href="#" data-val="${$(n).val()}" >${emojione.shortnameToImage($(n).val())}</a>
</li>`
        }).get();

        htmlLi = `<div class="emoji-keyboard__board">
    <div class="emoji-keyboard__answers">
        <div class="emoji-keyboard__answer">&nbsp;</div>
        <div class="emoji-keyboard__send">
            <i class="material-icons">send</i>        
        </div>
    </div>
    <ul class="">${htmlLi.join('')}</ul>
</div>`;

        const updateAnswer = ()=> {
            const html = emojione.shortnameToImage(this.val().join(''));
            this.element.find('.emoji-keyboard__answer').empty().append(html);
        };

        this.element
            .find('.emoji-keyboard__board').remove().end()
            .append(htmlLi);
        this.element.off('click', 'a')
            .on('click', 'a', e => {
                e.preventDefault();
                e.stopPropagation();
                const $this = $(e.target).closest('a');
                const $option = $select.find(`option[value="${$this.data('val')}"]`);

                $this.removeClass().addClass('animated tada');
                $option.prop('selected', true);
                emojiListValue.push($option.val());

                this._toggleSendButton();
                updateAnswer()
            })
            .on('click', '.emoji-keyboard__answer', e=> {
                e.preventDefault();
                e.stopPropagation();
            })
            .off('click', '.emoji-keyboard__answer img')
            .on('click', '.emoji-keyboard__answer img', e => {
                e.preventDefault();
                e.stopPropagation();

                const $this = $(e.target);
                const $option = $select.find(`option[value="${$this.attr('title')}"]`);

                $this.removeClass().addClass('animated fadeOut')
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', e=> $this.remove());
                $option.prop('selected', false);
                var index = emojiListValue.indexOf($option.val());
                if (index !== -1) emojiListValue.splice(index, 1);
                this._toggleSendButton();
            })
            .off('click', 'i:contains(send)')
            .on('click', 'i:contains(send)', e => {
                e.preventDefault();
                e.stopPropagation();
            })
    },
    clear() {
        const $select = this.element.find('select');
        const $ul = this.element.find('ul');
        const $answer = this.element.find('.emoji-keyboard__answer');
        const $options = $select.find('option');

        emojiListValue = [];
        $options.prop('selected', false);
        $ul.find('a').removeClass();
        $answer.empty();
        console.log($answer);
        this._toggleSendButton();
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
    isOpen() {
        return this.element.find('.emoji-keyboard__board').hasClass(this._getEffectIn());
    },
    open() {
        this.element.find('.emoji-keyboard__board')
            .removeClass(`animated ${this._getEffectIn()} ${this._getEffectOut()}`)
            .addClass(`animated ${this._getEffectIn()}`);
    },
    isClose() {
        return this.element.find('.emoji-keyboard__board').hasClass(this._getEffectOut());
    },
    close() {
        this.element.find('.emoji-keyboard__board')
            .removeClass(`animated ${this._getEffectIn()} ${this._getEffectOut()}`)
            .addClass(`animated ${this._getEffectOut()}`);
    },
    randomize() {
        const $select = this.element.find('select');
        const $options = $select.find('option');
        const oldArr = $options.map((i, n)=>$(n).val()).get();
        const newArr = shuffle(oldArr);

        this.clear();
        const html = this._arrToOption(newArr);
        $select.empty().append(html);
        this._create();
        // this.open()
    }
});