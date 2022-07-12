const menuBtn = document.querySelector('.menu-mob-btn');
const icon = document.querySelector('.menu-mob-btn-line');
const menuBlock = document.querySelector('.menu-list');

icon.addEventListener('click', function () {
    if(this.classList.contains('is-active')){
        this.classList.remove('is-active');
        menuBlock.style.height = null;
        menuBlock.style.padding = null;
    } else {
        this.classList.add('is-active');
        menuBlock.style.height = '100%';
        menuBlock.style.paddingTop = '47px';
        menuBlock.style.paddingRight = '20px';
        menuBlock.style.paddingBottom= '0';
        menuBlock.style.paddingLeft = '20px';
    }
})

//popup

const popupBtn = document.querySelectorAll('.popup-btn');
const popupBlock = document.querySelector('.popup');
const popupWindow = popupBlock.querySelector('.popup-content');
const popupClose = document.querySelector('.popup-close');

popupBtn.forEach((item) => {
    item.addEventListener('click', () => {
        popupBlock.style.display = 'flex';
        popupWindow.style.display = 'block';
    })
})

popupClose.addEventListener('click', () => {
    popupBlock.style.display = 'none';
    popupWindow.style.display = 'none';
})

popupBlock.addEventListener('click', (e) => {
    if ( !e.target.classList.contains('popup-content') ) {
        popupBlock.style.display = 'none';
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


//form

const mainForm = document.querySelector('.contacts-form');
// const formPopup;
const inputs = document.querySelectorAll('.tel');

mainForm.addEventListener('submit', function(e) {
    const tel = mainForm.querySelector('.tel');
    const errorField = mainForm.querySelector('.error');
    if (tel.value == '' || tel.value.length < 12) {
        showError(errorField, 'Заполните поле');   
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
            contactModal.style.display = 'flex';
            showMassage('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');   
        })
        .then(()=> {
            const inputs = contactsForm.querySelectorAll('input');
            inputs.forEach((input) => {
                input.value = '';
            })
        })
        .catch(error => console.error("Error", error))
    }
})

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
    contactModalText.innerHTML = `
    <h2 class="modal-contact-title">${message}</h2>
    <p class="section-text" data='modal-reply-2'>Мы свяжемся с Вами в ближайшее время.</p>
    <button class="btn-orange modal-contact-back-btn" data='modal-back'>Вернуться на главную</button>`
    
    const contactModalBackBtn = document.querySelector('.modal-contact-back-btn');
    contactModalBackBtn.addEventListener('click', () => {
        location.href='index.php';
    })
}

inputs.forEach((input) => {
    input.addEventListener('input', function(e){
        e.preventDefault;
        removeError(e.target);
    })
})