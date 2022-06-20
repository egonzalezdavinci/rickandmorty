let btn_movile_open = document.getElementById('menu-open');
let btn_movile_closed = document.getElementById('menu-closed');

let menu_mobile = document.querySelector('.content_nav');
let menu_mobile_li = menu_mobile.querySelectorAll('ul li');
let tagBody = document.getElementsByTagName('body')[0];
let tagHtml = document.getElementsByTagName('html')[0];

btn_movile_open.onclick = function(){
    btn_movile_closed.style.display = 'block';
    btn_movile_open.style.display = 'none';
    menu_mobile.style.top = '0';
    menu_mobile.style.visibility= 'visible';
    tagBody.style.overflow = 'hidden';
}

btn_movile_closed.onclick = function(){
    btn_movile_closed.style.display = '';
    menu_mobile.style.visibility= 'hidden';
    menu_mobile.style.top = '-100vh';
    btn_movile_open.style.display = 'block';
    tagBody.style.overflow = '';
}