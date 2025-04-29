document.addEventListener('DOMContentLoaded', function () {
    const $ = document.createElement.bind(document);
    const $$ = document.querySelector.bind(document);
    const pathname = window.location.pathname;

    // Tạo phần tiêu đề
    const hearder_title = $('div');
    hearder_title.setAttribute('class', 'hearder_title d-flex align-items-center justify-content-center');
    hearder_title.innerHTML = `<h1 class="text_title"></h1>`;

    // Tạo phần container
    const content_bottom = $('div');
    content_bottom.setAttribute('class', 'content_bottom d-flex');
    content_bottom.innerHTML = `
        <div class="menu_left ">
            <ul class="menu_nav"></ul>
        </div>
        <div class="content_right d-flex justify-content-center"></div>
    `;

    const wrapper = $$('.wrapper');
    if (wrapper) {
        wrapper.prepend(hearder_title);
        wrapper.appendChild(content_bottom);
    }
    const menu_nav = $$('.menu_nav');
    const text_title = $$('.text_title');
    const content_right = $$('.content_right');

    const listLi = ['Trang Chủ','Danh Mục', 'FashSale', 'ShopeeMall', 'SearchTop','Phân Loại','Product','Reduce','Store', 'Tài Khoản'];
    const linkLi = ['home.html','danhmuc.html', 'fashsale.html', 'shopeemall.html', 'searchTop.html', 'phanloai.html', 'listproduct.html', 'reduce.html','store.html'];
    const iconLi = ['fa-house', 'fa-list', 'fa-bolt', 'fa-store', 'fa-magnifying-glass', 'fa-layer-group', 'fa-box-open', 'fa-tags', 'fa-warehouse', 'fa-user'];

    listLi.forEach((item, index) => {
        const icon = `<i class="fa-solid ${iconLi[index]} icon"></i>`;
        if (menu_nav) {
            menu_nav.innerHTML += item === 'Tài Khoản' ?
                `<li class='account'>
                    <a href='#'>${icon}${item}</a>
                    <ul class="manage">
                        <li><a href='#'><i class="fa-solid fa-user-tie"></i>Quản lí tài khoản Admin</a></li>
                        <li><a href='#'><i class="fa-solid fa-user-pen"></i>Quản lí tài khoản Người Dùng</a></li>
                    </ul>
                </li>` :
                `<li><a href='${linkLi[index] ?? '#'}'>${icon}${item}</a></li>`;
        }
    });

    const Title = 'Chào Mừng Đến Trang Admin'.split('');
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function typeEffect() {
        if (!text_title) return;
        while (true) {
            text_title.textContent = '';
            for (let i = 0; i < Title.length; i++) {
                text_title.textContent += Title[i];
                await sleep(100);
            }
            await sleep(1500);
        }
    }
    typeEffect();

    // Phần riêng cho từng trang
    if (pathname.includes('danhmuc.html') && content_right) {
        content_right.innerHTML = `
            <div class="section">
                <h2>Danh Mục</h2>
                <input type="text" id="phanloai" placeholder="Phan Loai">
                <button id="btnSaveDanhMuc">Gửi Sản phẩm</button>
                <h3>Danh Sách Danh Mục</h3>
                <table class='table-bordered text-center'>
                    <thead>
                        <tr>
                            <th>Phân loại</th> 
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="danhmuc"></tbody>
                </table>
            </div>
        `;
    } else if(pathname.includes('fashsale.html') && content_right){
        content_right.innerHTML = `
        <div class="section">
            <h2>Thêm LinkTwo</h2>
            <input type="file" id="litImage"><br>
            <input type="text" id="liTitle" placeholder="Tên title"><br>
            <input type="text" id="liHref" placeholder="href"><br>
            <button id="btnSaveLinkTwo">Gửi Sản phẩm</button>
            <h3>Danh sách Sản phẩm</h3>
            <table class='table-bordered text-center'>
              <thead>
                 <tr>
                    <th>Ảnh</th>
                    <th>Title</th>
                    <th>Href</th>
                    <th>Action</th>
                 </tr>
              </thead>
              <tbody id="liListLinkTwo"></tbody>
            </table>
        </div>
        `
    } else if(pathname.includes('shopeemall.html') && content_right){
        content_right.innerHTML = `
        <div class="section">
            <h2>Thêm LinkThree</h2>
            <input type="file" id="litImage_one" name="image_one" /> <!-- Đảm bảo tên trường là image_one -->
            <input type="file" id="litImage_two" name="image_two" /> <!-- Đảm bảo tên trường là image_two -->
            <input type="text" id="liTitle_one" placeholder="Tên title"><br>
            <input type="text" id="liHref_one" placeholder="href"><br>
            <button id="btnSaveLinkThree">Gửi Sản phẩm</button>
            <h3>Danh sách Sản phẩm</h3>
            <table class='table-bordered text-center'>
              <thead>
                <tr>
                     <th>Image One</th>
                     <th>Image TWo</th>
                     <th>Title</th>
                     <th>Href</th>
                     <th>Action</th>
                </tr>
              </thead>
              <tbody id='liListLinkThree'></tbody>
            </table>
        </div>
        `
    }else if(pathname.includes('searchTop.html') && content_right){
        content_right.innerHTML = `
        <div class="section">
            <h2>Thêm SearchTop</h2>
            <input type="file" id="ImageSearchTop"  /> <!-- Đảm bảo tên trường là image_one -->
            <input type="number" id="soluong" placeholder="soluong"><br>
            <input type="text" id="title_searchTop" placeholder="title_searchTop">
            <input type="text" id="title_href" placeholder="href"><br>
            <button id="btnSaveSearchTop">Lưu</button>
            <h3>Danh sách Sản phẩm</h3>
            <table class='table-bordered text-center'>
               <thead>
                  <tr>
                    <th>Image</th>
                    <th>Số Lượng</th>
                    <th>Title</th>
                    <th>Href</th>
                  </tr>
               </thead>
               <tbody id="searchTopDisplay"></tbody>
            </table>
        </div>
        `
    }else if(pathname.includes('listproduct.html') && content_right){
        content_right.innerHTML = `
        <div class="section">
            <h2>Thêm Sản phẩm</h2>
            <div class='d-flex'>
                <input type="file" id="productImage" ><br>
                <input type="file" id="productImageOne">
                <input type="file" id="productImageTwo">
                <input type="file" id="productImageThree">
                <input type="file" id="productImageFour">
                <input type="file" id="productImageFire">
            </div>
            <input type="text" placeholder="href" id="href_product"> 
            <input type="text" id="productName" placeholder="Tên sản phẩm"><br>
            <input type="number" id="oldPrice" placeholder="Giá cũ"><br>
            <input type="number" id="newPrice" placeholder="còn hàng"><br>
            <input type="number" id="salePrice" placeholder="Giá khuyến mãi"><br>
            <input type="number" id="soldQuantity" placeholder="Số lượng bán"><br>
            <input type="checkbox"  id="check_like">
            <input type="number" id="star" placeholder="star">
            <input type="number" id="review" placeholder="review">
            <input type="text" id="where" placeholder="where">
            <input type="text" id="mota" placeholder="mota">
            <input type="text" id="name_store" placeholder="name_store">
            <input type="text" id="loaisanpham" placeholder="loaisanpham">
            <button id="btnSaveProduct">Gửi Sản phẩm</button>
            <h3>Danh sách Sản phẩm</h3>
            <table class='table-bordered text-center w-100'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Image_one</th>
                  <th>Image_two</th>
                  <th>Image_three</th>
                  <th>Image_four</th>
                  <th>Image_fire</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Giá Cũ</th>
                  <th>Giá Khuyến Mãi</th>
                  <th>Số Lượng Bán</th>
                  <th>Còn Hàng</th>
                  <th>Check</th>
                  <th>Star</th>
                  <th>Review</th>
                  <th>Xuất Xứ</th>
                  <th>Name_store</th>
                  <th>Loại Sản Phẩm</th>
                  <th>Mô tả</th>
                  <th>Href</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="productList"></tbody>
            </table>
        </div>
        `
    }
});
