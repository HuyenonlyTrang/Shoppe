const imgBoxOne = document.querySelector('.img_box_one');
const iconCircle = document.querySelectorAll('.icon_ci');
const headerBoxLink = document.querySelector('.header_box_link')
const formatVND = (n) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
  }
console.log(iconCircle);
const ArrImgage = [
    '../Image/title/img_1.png',
    '../Image/title/img_2.jfif',
    '../Image/title/img_3.jfif', 
    '../Image/title/img_4.jfif',
    '../Image/title/img_5.jfif',
]
const arrHeaderBoxLink = [
    {
        img: '../Image/li/choice.png',
        title: 'Hàng Chọn Giá Hời',
        link:'#'
    },
    {
        img: '../Image/li/vnd.png',
        title: 'Mã Giảm Giá',
        link:'#'
    },
    {
        img: '../Image/li/shopee_style.png',
        title: 'Shopee Style Voucher 30%',
        link:'#'
    },
    {
        img: '../Image/li/voucher_xtra.png',
        title: 'Voucher Giảm Đến 1tr',
        link:'#'
    },
    {
        img: '../Image/li/zzz.png',
        title: 'Khung Giờ Săn Giá',
        link:'#'
    },
    {
        img: '../Image/li/world.png',
        title: 'Quốc Tế Giao Hàng Thần Tốc',
        link:'#'
    }
]
let n = 0;
setInterval(() => {
    n++;
    if(n > ArrImgage.length - 1){
        n = 0;
    }
    imgBoxOne.setAttribute('src', ArrImgage[n]);
    iconCircle.forEach((item, index) => {
        item.classList.remove('white');
        if(index === n){
            item.classList.add('white');
        }
    })
},3000)

arrHeaderBoxLink.map((item, index) => {
    const li_link = document.createElement('li');
    li_link.innerHTML = `<a href="${item.link}"><img src='${item.img}' alt=''/><span>${item.title}</span></a>`;
    headerBoxLink.appendChild(li_link);
})

const SERVER = 'http://localhost:3001';

function loading(get, box) {
    fetch(`${SERVER}/${get}`)
      .then(res => res.json())
      .then(products => {
        const headerBoxLinkLis = document.querySelector(box);
        headerBoxLinkLis.innerHTML = ''; // Clear old content
        products.forEach(l => {
          const li = document.createElement('li');
          const newPrice = Number(l.old_price) * (1 - Number(l.sale_price) / 100);

          if (get === 'liLinktwo') {
            li.setAttribute('class', 'col-1-of-14');
          }
          if (get === 'products') {
            li.setAttribute('class', 'col-2');
          }
          if(l.name){
            const arrName = l.name.split(' ')
            var newName = arrName.length > 6 ? arrName.slice(0, 6).join(' ') + '...' : arrName.join(' ')
            console.log(newName)
          }
  
          let html = '';
          if (get === 'liLinktwo' || get === 'fashsale' || get === 'searchTop' || get === 'products') {
            html += `<a href="${l.href}?id=${l.id}" class="boxboxbox">`;
            if (l.image) html += `<img src="${SERVER}/${l.image}" alt="ảnh" class='${get === 'fashsale' ? 'image_fashsale' : get === 'products' ? 'image_product' : ''}'>`;
            if (l.title) html += `<span class='${get === 'fashsale' ? 'title_fashsale' : ''}'>${l.title}</span>`;
            if (l.money) html += `<p class='money_fashsale'>${formatVND(l.money)}</p>`;
            if (l.sale) html += `<span class='sale'>-${l.sale}%</span>`;
            if (l.soluong) html += `<span class='searchTop_soluong'>Bán ${l.soluong}k+/tháng</span>`;
            if (get === 'fashsale') html += `<p class='hot-fashsale'>Đang bán chạy</p>`;
            if (get === 'fashsale') html += `<img src='../Image/mall.png' class='img_fashsale_one'/>`;
            if (l.date) html += `<span class='date_fashsale'>${l.date}</span>`;
            if (get === 'products') html += `
                   <div class='name_product'>
                      <span class='like'>${l.is_checklike == 1 ? 'Yêu thích' : ''}</span><span class='name'>${newName}</span>
                   </div>`;
            if (l.old_price && l.new_price) html += `<div><span class='old_product'>${formatVND(l.old_price)}</span><span class='new_product'>${formatVND(newPrice)}</span></div>`;
            if (l.sale_price) html += `<p class='sale_product'>${l.sale_price}%</p>`;
            if (l.sold_quantity) html += `<div class=''><span class='number_product'>Đã bán ${l.sold_quantity}k</span><i class="fa-solid fa-heart ${l.is_checklike == 1 ? 'check' : ''}"></i></div>`;
            html += `</a>`;
          }
  
          li.innerHTML = html;
          headerBoxLinkLis.appendChild(li);
        });
      })
      .catch(err => {
        alert('Error fetching data: ' + err);
      });
  }
  
loading('liLinktwo','.header_box_link_2')
loading('fashsale','.header_box_fashsale_sale')
loading('searchTop','.header_box_searchTop')
loading('products', '.Box_Products')


function loadLinkThree() {
   fetch(`${SERVER}/liLinkthree`)
  .then(res => res.json())
  .then(products => {
    const div = document.querySelector('.header_box_ShopeeMall');
    div.innerHTML = '';
    products.forEach(p => {
      const item = document.createElement('li');
      item.setAttribute('class', 'col-1-3')
      item.innerHTML = 
        `<a href="${p.href}">
        <img src="${SERVER}/${p.image_one}" alt="ảnh" class='image_one_linkthree'>
        <p class='title_linkThree'>${p.title}</p>
        </a>
        ` 
       div.appendChild(item);
     });
     div.innerHTML += `<li class='col-1-3 box-bottom'><a>Xem tất cả <i class="fa-solid fa-angle-right"></i></a></li>`
   })
 }
 loadLinkThree()



function setupScroll(boxSelector, leftBtnSelector, rightBtnSelector){
    const box = document.querySelector(boxSelector);
    const leftBtn = document.querySelector(leftBtnSelector);
    const rightBtn = document.querySelector(rightBtnSelector);

    if (box && leftBtn && rightBtn) {
        const scrollWidth = box.scrollWidth;

        leftBtn.addEventListener('click', () => {
            box.scrollBy({ behavior: 'smooth', left: -scrollWidth });
        });

        rightBtn.addEventListener('click', () => {
            box.scrollBy({ behavior: 'smooth', left: scrollWidth });
        });
    }
}
setupScroll('.box_link_2', '.icon_left', '.icon_right');
setupScroll('.box_fashsale_sale', '.icon_left_fashsale', '.icon_right_fashsale');
setupScroll('.box_ShopeeMall', '.icon_left_ShopeeMall', '.icon_right_ShopeeMall')


const Date_Time = document.querySelector('.Date')
console.log(Date_Time)
function DateTime(secound){
   const h = String(Math.floor(secound / 3600));
   const m = String(Math.floor((secound % 3600) / 60))
   const s = String(Math.floor(secound % 60))
   return `<span>${h}</span>:<span>${m}</span>:<span>${s}</span>`
}
const Ducation = 12 * 60 * 60 ;
let loadDucation = Ducation;
Date_Time.innerHTML = DateTime(loadDucation)
setInterval(() => {
    loadDucation--;
    if(loadDucation <= 0){
        loadDucation = Ducation
    }
    Date_Time.innerHTML = DateTime(loadDucation)
}, 1000)



const arrShopeeMall = [
    {
        icon: 'fa-solid fa-arrow-left',
        title: 'Trả Hàng Miễn Phí 15 Ngày'
    },
    {
        icon: 'fa-solid fa-shield-halved',
        title: 'Hàng Chính Hãng 100%'
    },
    {
        icon: 'fa-solid fa-truck-moving',
        title: 'Miễn Phí Vận Chuyển'
    },
]
const shopeeMallHeader = document.querySelector('.ShopeeMall_header')
arrShopeeMall.map((item, index) => {
    return shopeeMallHeader.innerHTML += `
                                          <i class="${item.icon}"></i>
                                          <span>${item.title}</span>
                                          `
})


const BoxToday = document.querySelector('.Box_Today')
const Top = BoxToday.offsetTop + BoxToday.offsetHeight
console.log(Top)
window.addEventListener("scroll", () =>{
  if(window.scrollY >= 2200){
    BoxToday.classList.add("Top");
  }else{
    BoxToday.classList.remove("Top");
  }
})
