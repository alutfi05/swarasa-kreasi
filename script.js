const hamburger = document.querySelector('.ri-menu-3-line');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('menu-active');
});

window.onscroll = () => {
  menu.classList.remove('menu-active');
};

const btnFilter = document.querySelectorAll('.produk-box ul li');
// Mengubah target selector ke .produk-card agar teks info ikut terfilter
const productItems = document.querySelectorAll('.produk-list .produk-card');

btnFilter.forEach((data) => {
  data.onclick = () => {
    btnFilter.forEach((item) => {
      item.className = '';
    });

    data.className = 'active';

    // Filter Card Produk
    const btnText = data.textContent;
    productItems.forEach((card) => {
      card.style.display = 'none';
      if (
        card.getAttribute('data-filter') == btnText.toLowerCase() ||
        btnText == 'All Product'
      ) {
        card.style.display = 'block'; // Ubah jadi 'flex' jika ingin card vertikal rapi
      }
    });
  };
});