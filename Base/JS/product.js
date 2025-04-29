const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const SERVER = 'http://localhost:3001';

const $ = document.querySelector.bind(document)
const prduct_sp = $('.prduct_sp');
const box_img_one = $('.box_img_one');
const list_img_ul = $('.list_img_ul');
const product_danhmuc = $('.product_danhmuc');
const title_header = $('.title_header');
const star = $('.star');
const review = $('.review');
const sold = $('.sold');
const liststart = $('.liststart');
const oldPrice = $('.oldPrice')
const newPrice  = $('.newPrice')
const salePrice = $('.salePrice')
const date = $('.date')
const box_phanloai = $('.box_phanloai')
const texttext = $('.texttext')
const textsize =$('.textsize')
const tick = $('.tick')
const PayLoad = document.querySelectorAll('#PayLoad')
const soluong = $('.soluong')
const minus = $('.minus')
const push = $('.push')
const sum = $('.sum')
const cart = $('.cart')
const store_avatar = $('.store_avatar')
const store_nom = $('.store_nom')
const store_title = $('.store_title')
const text_product = $('.text_product')
const text_kho = $('.text_kho')
const text_where = $('.text_where')
const mota = $('.mota')
const Box_Products = $('.Box_Products')
const cartlist = $('.cartlist')

const today = new Date();
const day1 = today.getDate();
const month1 = today.getMonth() + 1;

const futureDate = new Date();
futureDate.setDate(today.getDate() + 4);
const day4 = futureDate.getDate();
const month4 = futureDate.getMonth() + 1;

const arrPushPay = [];
let m = 0;

const formatVND = (n) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
}

function createImageList(images) {
    return images.map(img => `
      <li class='col-2'>
        <img src="${SERVER}/${img}" onmouseover="changeMainImage(this.src)" />
      </li>
    `).join('');
  }
function UpdataArrPushPay({image, size}){
     const name = $('.prduct_sp').textContent
     const price =$('.newPrice').textContent
     const productIndex = arrPushPay.findIndex(i => i.name === name);
     const name_store = $('.name_store').textContent
     console.log(productIndex)
     if (productIndex !== -1){
             arrPushPay[productIndex] = {
                 ...arrPushPay[productIndex],
                 ...(image && { image }), //giai ... se bien mat obj , chi ghi de khi co du lieu moi 
                 ...(size && { size }),
             }
     }else{
         arrPushPay.push({name_store,name, price, image: image || null, size: size || null})
     }
     console.log(arrPushPay)
}
function handleClickPushImage(src, event) {
    UpdataArrPushPay({image: src})
    const spans = document.querySelectorAll('.texttext span')
    spans.forEach((item) => item.classList.remove('click'))
    event.target.classList.add('click')
    if(arrPushPay[0] && arrPushPay[0].image){
      texttext.classList.remove('check')
      spans.forEach((item) => item.classList.remove('checkcolor'))
      tick.style.display = 'none'
    }
}
  
function handleClickPushSize(size, event) {
  UpdataArrPushPay({ size })
  const spans = document.querySelectorAll('.textsize span')
  const spanss = document.querySelectorAll('.texttext span')
  spans.forEach((item) => item.classList.remove('click'))
  event.target.classList.add('click')
  if(arrPushPay[0] && !arrPushPay[0].image){
    texttext.classList.add('check')
    spanss.forEach(item => item.classList.add('checkcolor'))
    tick.style.display = 'block'
  }
}
  


Promise.all([
  fetch(`${SERVER}/products`).then(res => res.json()),
  fetch(`${SERVER}/danhmuc`).then(res => res.json()),
  fetch(`${SERVER}/phanloai`).then(res => res.json()),
  fetch(`${SERVER}/size`).then(res => res.json()),
  fetch(`${SERVER}/Store`).then(res => res.json()),
]).then(([product, danhmucs, phanloais, size, stores]) => {
    const i = product.find(i => i.id === Number(productId)) || {};
    console.log(size)
    //product
    const calculatedPrice = Number(i.old_price) * (1 - Number(i.sale_price) / 100);
    prduct_sp.textContent = i.name;
    box_img_one.src = `${SERVER}/${i.image}`;
    const images = [
      i.image,
      i.image_one,
      i.image_two,
      i.image_three,
      i.image_four,
      i.image_fire,
    ];
    list_img_ul.innerHTML = createImageList(images);
    title_header.textContent = i.name;
    star.textContent = i.star;
    review.textContent = i.review + ' Đánh giá';
    sold.textContent = i.sold_quantity + ' Sold';
    newPrice.textContent = formatVND(calculatedPrice);
    oldPrice.textContent = formatVND(i.old_price);
    salePrice.textContent = '-' + i.sale_price + '%';
    date.innerHTML = `
      <p>Nhận từ ${day1} ${month1}th - ${day4} ${month4}th <i class="fa-solid fa-angle-right fs-5"></i></p> 
      <p>Miễn phí vận chuyển</p>
      <p class='fs-5 text-secondary'>Tặng Voucher ${formatVND(15000)} nếu đơn hàng giao sau thời gian trên</p>
    `;
    soluong.textContent = `${i.new_price} sản phẩm có sẵn`;
    sum.textContent = m
    push.addEventListener('click', () => {
      if(m < Number(i.new_price) && arrPushPay[0] && arrPushPay[0].size && arrPushPay[0].image){
         m++;
         arrPushPay[0].quantity = m;
         sum.textContent = m
      }
    })
    minus.addEventListener('click', () => {
      if(m > 0 && arrPushPay[0] && arrPushPay[0].size && arrPushPay[0].image){
        m--;
        arrPushPay[0].quantity = m;
        sum.textContent = m
      }
    })
    text_kho.textContent = i.new_price
    text_where.textContent = i.noi
    mota.textContent = i.mota

  
    danhmucs.forEach(dm => {
      phanloais.forEach(pl => {
        if (dm.phanloai.trim().toLowerCase() === pl.loai.trim().toLowerCase() && pl.loai.trim().toLowerCase() === i.loaisanpham.trim().toLowerCase()) {
          if(product_danhmuc){
            product_danhmuc.textContent = pl.loai;
            text_product.textContent = pl.loai
          }
          if (box_phanloai) {
            if (pl.loai === 'Thời Trang') {
              box_phanloai.textContent = 'Màu Sắc';
            } else if (pl.loai === 'Giày Dép') {
              box_phanloai.textContent = 'Kích Thước';
            } else {
              box_phanloai.textContent = '';
            }
          }
          if (texttext) {
              const pltext = [
                pl.tensp_one,
                pl.tensp_two,
                pl.tensp_three,
                pl.tensp_four
              ]
              pltext.forEach((item, index) => {
                texttext.innerHTML += `<span onmouseover="changeMainImage('${SERVER}/${images[index]}')" onclick="handleClickPushImage('${SERVER}/${images[index]}', event)">${item}</span>`
              })
          }
          
        }
      });
    });
    
    const sz = size.filter(s => s.loai);
    console.log(sz)
    sz.forEach(s => {
      if (s.loai.trim().toLowerCase() === i.loaisanpham.trim().toLowerCase()) {
         const arrSize = [
          s.size_s,
          s.size_m,
          s.size_l,
          s.size_xl,
          s.size_xxl,
          s.size_xxxl
         ] // giup loai bo false .filter(Boolen)
         const arrtextsize = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
         console.log(arrSize)
         arrSize.forEach((item, index) => {
          if (item && item !== 0) {
            textsize.innerHTML += `<span onclick="handleClickPushSize('${String(item).replace('1', arrtextsize[index])}',event)">${String(item).replace('1', arrtextsize[index])}</span>`;
          }
         })
      }
    });
    const ii = product.filter(item => item.loaisanpham === i.loaisanpham)
    console.log(ii)
    ii.forEach((item, index) => {
      Box_Products.innerHTML += `<li class='col-2'>
                                  <a href='${item.href}?id=${item.id}' style="position: relative" class='boxboxbox'>
                                     <img src="${SERVER}/${item.image}">
                                     <p class='text-wrap p-2'>${item.name.split(' ').slice(0, 7).join(' ') + '...'}</p>  
                                     <div class='d-flex justify-content-start gap-1 p-2'>
                                        <span class='fs-5'>Rẻ Vô Định</span>
                                        <span class='d-flex align-items-center'><i class="fa-solid fa-star fs-6"></i><span class='fs-6'>${item.star}</span></span>
                                     </div>
                                     <div class='d-flex justify-content-between p-2'>
                                       <span>${formatVND(Number(item.old_price) * (1 - Number(item.sale_price) / 100))}</span>
                                       <span>Đã bán ${item.sold_quantity}k</span>
                                     </div>
                                     <span style="position: absolute; right: 0px; color: #df9898;background-color: #fe4603; padding: 0 10px; font-weight: 600;;">${item.sale_price}%</span>
                                   </a>
                                 </li>`
    })


    
    const st = stores.find(item => item.name_store.trim().toLowerCase() === i.name_store.trim().toLowerCase())
    store_avatar.innerHTML = `<img src="${SERVER}/${st.avatar}" />`
    store_nom.innerHTML = `
                       <p class='fs-3 name_store'>${st.name_store.toUpperCase()}</p>
                       <p class='fs-5 text-secondary'>Online 1 Giờ Trước</p>
                       <div><span class='chat fs-5'>Chat ngay</span><span class='shop fs-5'>Xem Shop</span></div>`
    
    const arrTitleStore = [
      st.review,
      st.ratio_feedback,
      st.join,
      st.product,
      st.time_feedback,
      st.follower
    ]
    console.log(arrTitleStore[3])
    const titleStore = [
      'Đánh giá',
      'Tỉ lệ Phản Hồi',
      'Tham gia',
      'Sản phẩm',
      'Thời Gian Phản Hồi',
      'Người theo dõi'
    ]
    arrTitleStore.forEach((item, index) => {
      store_title.innerHTML += `<div class='d-flex gap-5 col-4'>
                                  <span class='fs-4'>${titleStore[index]}</span>
                                  <span class='fs-4 text-secondary'>
                                          ${st.review === item ? item + 'k' : 
                                            st.ratio_feedback === item ? item + '%' : 
                                            st.join === item ? item + ' ' + 'năm trước' : 
                                            st.follower === item ? item + 'k' : 
                                            st.product === item ? item : 
                                            st.time_feedback === item ? item : ''
                                          }
                                  </span>
                                </div>`
    })
});
  
  
  

  document.querySelector('.btn_left').addEventListener('click',() => {
    document.querySelector('.list_img_ul').scrollBy({
        left : -200,
        behavior: 'smooth'
    })
  })
  document.querySelector('.btn_right').addEventListener('click',() => {
    document.querySelector('.list_img_ul').scrollBy({
        left : 200,
        behavior: 'smooth'
    })
  })
  function changeMainImage(src) {
    document.querySelector('.box_img_one').src = src;
  }

  for (var n = 1; n <=5 ; n++){
    const i = document.createElement('i');
    i.setAttribute('class' , 'fa-solid fa-star fs-5 text-warning ')
    liststart.appendChild(i)
  }

  


  
  PayLoad.forEach(item => {
    item.addEventListener('click', () => {
      if (!arrPushPay.length || !arrPushPay[0].name || !arrPushPay[0].price || !arrPushPay[0].image || !arrPushPay[0].size) {
        alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
        return;
      }  
      fetch(`${SERVER}/add-pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arrPushPay[0])
      })
      .then(res => res.text())
      .then(data => {
        if(item.classList.contains('cart')){
          document.querySelector('.cart-item').style.display = 'block';
          setTimeout(() =>{
            document.querySelector('.cart-item').style.display = 'none';
          }, 3000)
        }   
        if(cartlist){

          window.location.href = './cart.html';  
        }
        
        console.log(data)
      })
  
    })
  
  
  })
  cart.innerHTML += `<div class='cart-item'>Đã thêm vào giỏ hàng thành công</div>`