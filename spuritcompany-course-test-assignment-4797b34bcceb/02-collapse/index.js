/* Я комментарий, который ждал тебя здесь. Удали меня и напиши хороший код! */

const SELECTORS = {
    COLLAPSIBLE_BUTTON: 'collapsible__button',
    COLLAPSIBLE_ACTION_HIDDEN: 'collapsible__action--hidden',
    COLLAPSIBLE_ACTION_VISIBLE: 'collapsible__action--visible',
    COLLAPSIBLE_CONTENT: '.collapsible__content',
    PREVIOUS_ELEMENT_SIBLING: 'previousElementSibling',
    NEXT_ELEMENT_SIBLING: 'nextElementSibling'

};

const Collapse = (elements) => {

    const selectors = {...SELECTORS, ...elements};
    const content = document.querySelector(selectors.COLLAPSIBLE_CONTENT);
    const showFrames = {opacity: [0,1]};
    const hideFrames = {opacity: [1,0]};


    const animateContent = (element, frames) => {
        return element.animate(frames,{
            duration: 300,
            easing: 'linear',
            fill: 'forwards'
        })
    };



    const collapsibleButtonClick = (e) => {
        let target = e.target;
        if(target.classList.contains(selectors.COLLAPSIBLE_BUTTON)) return;
        let isHiddenAction = target.classList.contains(selectors.COLLAPSIBLE_ACTION_HIDDEN);
        let siblingPrefix = isHiddenAction? selectors.PREVIOUS_ELEMENT_SIBLING : selectors.NEXT_ELEMENT_SIBLING;
        getComputedStyle(target).opacity == 0? target = target[siblingPrefix] : target;
        isHiddenAction= target.classList.contains(selectors.COLLAPSIBLE_ACTION_HIDDEN);
        siblingPrefix = isHiddenAction? selectors.PREVIOUS_ELEMENT_SIBLING : selectors.NEXT_ELEMENT_SIBLING;
        const siblingSpan = target[siblingPrefix];
        animateContent(target, hideFrames);
        animateContent(siblingSpan, showFrames);
        animateContent(content, isHiddenAction? showFrames : hideFrames );
    }

    const init = () => {
        document.querySelector(`.${SELECTORS.COLLAPSIBLE_BUTTON}`).addEventListener('click', collapsibleButtonClick);
        animateContent(content, hideFrames);
        animateContent(document.querySelector(`.${selectors.COLLAPSIBLE_ACTION_VISIBLE}`), hideFrames);
        animateContent(document.querySelector(`.${selectors.COLLAPSIBLE_ACTION_HIDDEN}`), showFrames);
    }

    const destroy = () => {
        document.querySelector(`.${SELECTORS.COLLAPSIBLE_BUTTON}`).removeEventListener('click', collapsibleButtonClick);
    }

    return {
        init,
        destroy
    }
}
document.addEventListener('DOMContentLoaded', (e)=> {
    const collapse = Collapse();
    collapse.init();
});