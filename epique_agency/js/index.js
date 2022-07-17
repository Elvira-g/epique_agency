const menuBtn = document.querySelector('.menu-mob-btn');
const menuIcons = document.querySelectorAll('.menu-mob-item');
const icon = document.querySelector('.menu-mob-btn-line');
const menuBlock = document.querySelector('.menu-list');
const sections = document.querySelectorAll('section');

icon.addEventListener('click', function () {
    if(icon.classList.contains('is-active')){
        closeMobMenu();
    } else {
        openMobMenu();
    }
})

menuIcons.forEach((item) => {
    item.addEventListener('click', (e) => {
        // e.preventDefault();
        const clickedItem = e.target;
        const clickedLink = clickedItem.attributes.href.value;
        if (screen.width <= 1024) {
            if(menuBtn.classList.contains('opened')){
                closeMobMenu();
            } else {
                openMobMenu();
            }  
        }
        // sections.forEach((section) => {
        //     if( section.id === clickedLink ) {
        //         const height = section.offsetTop - 60;
        //         window.scroll(0, height);
        //     }
        // })
    })
})

//popup

const popupBtn = document.querySelectorAll('.popup-btn');
const popupBlock = document.querySelector('.popup');
const popupWindow = popupBlock.querySelector('.popup-content');
const popupClose = document.querySelector('.popup-close');

popupBtn.forEach((item) => {
    item.addEventListener('click', () => {
        popupWindow.style.animationName = 'modal';
        popupBlock.style.display = 'flex';
        popupWindow.style.display = 'block';
    })
})

popupClose.addEventListener('click', () => {
    // popupBlock.style.display = 'none';
    // popupWindow.style.display = 'none';
    popupWindow.style.animationName = 'modal-close';
    setTimeout(() => popupBlock.style.display = 'none', 400);
})

popupBlock.addEventListener('click', (e) => {
    if ( e.target.classList.contains('popup') ) {
        // popupBlock.style.display = 'none';
        // formPopupWindow.style.display = 'none';
        // popupWindow.style.display = 'none';
        formPopupWindow.style.animationName = 'modal-close';
        popupWindow.style.animationName = 'modal-close';
        setTimeout(() => popupBlock.style.display = 'none', 400);
    }
})

//types

const typeItem = document.querySelectorAll('.types-item');

typeItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        const typesText = item.querySelector('.types-item-text');
        const textHeight = typesText.scrollHeight;
        let typesBtn;
        let typeTitle;
        if (e.target.classList.contains('types-item-btn-horiz') || e.target.classList.contains('types-item-btn-vert') ) {
            typesBtn = e.target.parentNode;
            typeTitle = e.target.parentNode.parentNode.querySelector('.types-item-title');
        } else {
            typesBtn = e.target.querySelector('.types-item-btn') ? e.target.querySelector('.types-item-btn') : e.target.parentNode.querySelector('.types-item-btn');
            typeTitle = e.target.querySelector('.types-item-title') ? e.target.querySelector('.types-item-title') : e.target.parentNode.querySelector('.types-item-title');
        }
       const typesBtnVert = typesBtn.querySelector('.types-item-btn-vert');
        if ( item.classList.contains('opened') ) {
            typesText.style.height = null;
            typesText.style.paddingTop = 0;
            item.classList.remove('opened');
            typesBtnVert.style.display = 'block';
            typeTitle.style.color = '#101010';
            typesBtn.style.stroke = '#101010';
        } else {
            typesText.style.height = (textHeight + 15) + 'px';
            typesText.style.paddingTop = '15px';
            item.classList.add('opened'); 
            typesBtnVert.style.display = 'none';
            typeTitle.style.color = '#ffa800';
            typesBtn.style.stroke = '#ffa800';
        }
        
    })
})


//principles

const principlesItem = document.querySelectorAll('.principles-item');

principlesItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        const principlesText = item.querySelector('.principles-item-text');
        const textHeight = principlesText.scrollHeight;
        let principlesBtn;
        let principlesTitle;
        if (e.target.classList.contains('principles-item-btn-horiz') || e.target.classList.contains('principles-item-btn-vert') ) {
            principlesBtn = e.target.parentNode;
            principlesTitle = e.target.parentNode.parentNode.querySelector('.principles-item-title');
        } else {
            principlesBtn = e.target.querySelector('.principles-item-btn') ? e.target.querySelector('.principles-item-btn') : e.target.parentNode.querySelector('.principles-item-btn');
            principlesTitle = e.target.querySelector('.principles-item-title') ? e.target.querySelector('.principles-item-title') : e.target.parentNode.querySelector('.principles-item-title');
        }
       const principlesBtnVert = principlesBtn.querySelector('.principles-item-btn-vert');
        if ( item.classList.contains('opened') ) {
            principlesText.style.height = null;
            principlesText.style.paddingTop = 0;
            item.classList.remove('opened');
            principlesBtnVert.style.display = 'block';
            principlesTitle.style.color = '#ffffff';
            principlesBtn.style.stroke = '#ffffff';
        } else {
            principlesText.style.height = (textHeight + 15) + 'px';
            principlesText.style.paddingTop = '15px';
            item.classList.add('opened'); 
            principlesBtnVert.style.display = 'none';
            principlesTitle.style.color = '#ffa800';
            principlesBtn.style.stroke = '#ffa800';
        }
        
    })
})


//main form

const mainForm = document.querySelector('.contacts-main-form');
const formPopupWindow = popupBlock.querySelector('.form-popup-content');
const formPopupClose = formPopupWindow.querySelector('.form-popup-close');
const formPopupText = formPopupWindow.querySelector('.form-popup-text');
const inputs = document.querySelectorAll('.tel');

mainForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const tel = mainForm.querySelector('.tel');
    const errorField = mainForm.querySelector('.error');
    if (tel.value == '' || tel.value.length < 12 ) {
        showError(errorField, 'Номер телефона указан неверно');   
    } else {
        const formData = new FormData(mainForm);
        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        fetch('send_mail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        })
        .then((result) => result.ok === true ? result.json() : false)
        .then((data) => {
            console.log("Success", data);
            popupBlock.style.display = 'flex';
            formPopupWindow.style.display = 'block';
            showMassage('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');   
        })
        .then(()=> {
            const inputs = mainForm.querySelectorAll('input');
            inputs.forEach((input) => {
                input.value = '';
            })
        })
        .catch(error => console.error("Error", error))
    }
})

formPopupClose.addEventListener('click', () => {
    popupBlock.style.display = 'none';
    formPopupWindow.style.display = 'none';
})


//popup form

const popupForm = document.querySelector('.contacts-popup-form');
popupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const tel = popupForm.querySelector('.tel');
    const errorField = popupForm.querySelector('.error');
    if (tel.value == '' || tel.value.length < 12 ) {
        showError(errorField, 'Номер телефона указан неверно');   
    } else {
        const formData = new FormData(popupForm);
        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        fetch('send_mail.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        })
        .then((result) => result.ok === true ? result.json() : false)
        .then((data) => {
            console.log("Success", data);
            popupWindow.style.animationName = 'modal-close';
            setTimeout(() => formPopupWindow.style.animationName = 'modal-close', 400);
            // popupBlock.style.display = 'flex';
            // formPopupWindow.style.display = 'block';
            showMassage('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');   
        })
        .then(()=> {
            const inputs = mainForm.querySelectorAll('input');
            inputs.forEach((input) => {
                input.value = '';
            })
        })
        .catch(error => console.error("Error", error))
    }
})



function openMobMenu() {
    icon.classList.add('is-active');
    menuBtn.classList.add('opened');
    menuBlock.style.height = '100%';
    menuBlock.style.paddingTop = '47px';
    menuBlock.style.paddingRight = '20px';
    menuBlock.style.paddingBottom= '0';
    menuBlock.style.paddingLeft = '20px';
}

function closeMobMenu() {
    icon.classList.remove('is-active');
    menuBtn.classList.remove('opened');
    menuBlock.style.height = null;
    menuBlock.style.padding = null;
}

function showError (field, message) {
    field.innerHTML = message;
}

function removeError () {
    const errors = document.querySelectorAll('.error');
    errors.forEach((item) => {
        item.innerHTML = '';
    })
}

function showMassage(message) {
    formPopupText.innerHTML = message;
}

inputs.forEach((input) => {
    input.addEventListener('input', function(e){
        e.preventDefault;
        removeError(e.target);
    })
})

const phone_inputs = document.querySelectorAll('.tel');
for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
    }
}

function eventCalllback (e) {
    let el = e.target,
    clearVal = el.dataset.phoneClear,
    pattern = el.dataset.phonePattern,
    matrix_def = "+7(___)___-__-__",
    matrix = pattern ? pattern : matrix_def,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = e.target.value.replace(/\D/g, "");
     
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
}