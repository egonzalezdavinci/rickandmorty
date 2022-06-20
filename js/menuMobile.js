let btn_movile_open = document.getElementById('menu-open');
let btn_movile_closed = document.getElementById('menu-closed');

let menu_mobile = document.querySelector('.content_nav');
let menu_mobile_li = menu_mobile.querySelectorAll('ul li');
let tagBody = document.getElementsByTagName('body')[0];
let tagHtml = document.getElementsByTagName('html')[0];

let div_overlay = document.createElement('div');
    div_overlay.className = 'overlay';


btn_movile_open.onclick = function(){
    btn_movile_closed.style.display = 'block';
    btn_movile_open.style.display = 'none';
    menu_mobile.className = 'content_nav openmenu';
    tagBody.style.overflow = 'hidden';
    tagBody.appendChild(div_overlay);
}

btn_movile_closed.onclick = function(){
    btn_movile_closed.style.display = '';
    menu_mobile.className = 'content_nav closedmenu';
    btn_movile_open.style.display = 'block';
    tagBody.style.overflow = '';
    tagBody.removeChild(div_overlay);
}