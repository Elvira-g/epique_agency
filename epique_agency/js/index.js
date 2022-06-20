const menuBtn = document.querySelector('.menu-mob-btn');
const icon = document.querySelector('.menu-mob-btn-line');

icon.addEventListener('click', function () {
    if(this.classList.contains('is-active')){
        this.classList.remove('is-active');
    } else {
        this.classList.add('is-active');
    }
})