setVisibility('block', 'none', 'none', 'none');

let navItem = document.getElementsByTagName('h6');
navItem[0].style.cursor = 'pointer';
navItem[2].style.cursor = 'pointer';
navItem[3].style.cursor = 'pointer';
navItem[4].style.cursor = 'pointer';

navItem[0].addEventListener('click', function () {
    setVisibility('block', 'none', 'none', 'none');

});
navItem[2].addEventListener('click', function () {
    setVisibility('none', 'block', 'none', 'none');

});
navItem[3].addEventListener('click', function () {
    setVisibility('none', 'none', 'block', 'none');

});
navItem[4].addEventListener('click', function () {
    setVisibility('none', 'none', 'none', 'block');

});

function setVisibility(hv, ov, iv, cv) {
    document.getElementById('foodSection').style.display = hv;
    document.getElementById('OrderSection').style.display = ov;
    document.getElementById('ItemSection').style.display = iv;
    document.getElementById('customerSection').style.display = cv;
}


//cart View
$('.cartSection').click(function () {
    alert('cart');
});