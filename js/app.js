// document.addEventListener('DOMContentLoaded', () => {   
// });


//панель навигации, подсветка активного пункта меню
let pageIdHeader = document.querySelector("[data-id-page-header]").getAttribute("data-id-page-header"),
    navItemHeader = document.querySelector(`[data-id-nav-header=${pageIdHeader}]`);
if (pageIdHeader == navItemHeader.getAttribute("data-id-nav-header")) {
    navItemHeader.classList.add("active");
}