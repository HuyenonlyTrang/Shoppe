function main() {
    
    function headertop(){
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const headerTop = document.querySelector('.header_top');
        const headerTopDivLeft = document.createElement('ul');
        const headerTopDivRight = document.createElement('ul');
    
        headerTopDivLeft.setAttribute('class', 'header_top_div_left');
        headerTopDivRight.setAttribute('class', 'header_top_div_right');
        
        const arrUlLeft = ['Kênh Người Bán', 'Tải ứng dụng', 'Kết nối','fa-solid fa-trash-can' , 'fa-solid fa-user'];
        const arrUlRight = [
            {
                icon: 'fa-solid fa-bell',
                text: 'Thông báo'
            },
            {
                icon: 'fa-solid fa-comment',
                text: 'Hỗ Trợ'
            },
            {
                icon: 'fa-solid fa-user',
                text: 'Tiếng việt'
            }
        ];
        arrUlLeft.map((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = item;
            if( index === 0 || index === 1){
                const a = document.createElement('a');
                const div = document.createElement('div');
                a.setAttribute('href', '#');
                div.setAttribute('class','line')
                li.innerHTML = '';
                a.innerHTML = item;
                li.prepend(a)
                li.appendChild(div)
            }
            if(item === 'fa-solid fa-user' || item === 'fa-solid fa-trash-can'){
                const icon = document.createElement('i');
                icon.setAttribute('class', item);
                li.innerHTML = '';
                li.appendChild(icon);
            }
            if(index === 1){
                li.setAttribute('class', 'boxOne');
                const divBoxOne = document.createElement('div');
                divBoxOne.setAttribute('class', 'box_one');
                divBoxOne.innerHTML = '<img src="../Image/QR.png" /><div class="box_img"><img src="../Image/app_store.png" /><img src="../Image/google_play.png" /><img src="../Image/app_geli.png" /></div>'
                li.appendChild(divBoxOne);
            }
            
            headerTopDivLeft.appendChild(li);
        })
        if(!currentUser || currentUser.name === 'Admin'){
            arrUlRight.push({ icon: '', text: 'Đăng kí' });
            arrUlRight.push({ icon: '', text: 'Đăng nhập' });
        }else if(currentUser.name !== 'Admin'){
            arrUlRight.push({
                icon: 'fa-solid fa-user',
                text: currentUser.name  // 👤 Hiển thị tên người dùng
            });
            arrUlRight.push({
                icon: 'fa-solid fa-right-from-bracket',
                text: 'Đăng xuất'
            });
        }

        arrUlRight.map((item, index) => {
            const li = document.createElement('li');
            const i = document.createElement('i');
            const a = document.createElement('a');
            li.innerHTML = item.text;
            i.setAttribute('class',item.icon);
            if(index === 0 || index === 2){
                a.setAttribute('href', '#');
                a.innerHTML = item.text;
                li.innerHTML = '';
                li.appendChild(a);
            }
            if (item.text === 'Đăng nhập') {
                a.setAttribute('href', 'Login.html');
                a.innerHTML = item.text;
                li.innerHTML = '';
                li.appendChild(a);
            } else if (item.text === 'Đăng kí') {
                a.setAttribute('href', 'register.html');
                a.innerHTML = item.text;
                li.innerHTML = '';
                li.appendChild(a);
            } else if (item.text === 'Đăng xuất') {
                li.addEventListener('click', () => {
                    localStorage.removeItem('currentUser');
                    location.reload(); // 🔄 Reload lại để cập nhật header
                });
            }
            li.prepend(i);
            headerTopDivRight.appendChild(li)
        })
        headerTop.appendChild(headerTopDivLeft);
        headerTop.appendChild(headerTopDivRight);
    }
    headertop();
    function headercenter(){
        const headerCenter = document.querySelector('.header_center');
        const headerCenterDivLeft = document.createElement('div');
        const headerCenterDivCenter = document.createElement('div');
        const headerCenterDivRight = document.createElement('div');
        headerCenterDivLeft.setAttribute('class', 'header_center_div_left');
        headerCenterDivCenter.setAttribute('class', 'header_center_div_center');
        headerCenterDivRight.setAttribute('class', 'header_center_div_right');
        
        headerCenterDivLeft.innerHTML = '<img src="../Image/logo.png" alt="">';
        headerCenterDivCenter.innerHTML = '<input type="text" placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu bạn muốn mua"><div>Search</div>';
        headerCenterDivRight.innerHTML = '<a href="#"><i class="fa-solid fa-cart-shopping"></i></a>'
        headerCenter.appendChild(headerCenterDivLeft);
        headerCenter.appendChild(headerCenterDivCenter);
        headerCenter.appendChild(headerCenterDivRight);
    }
    headercenter();
    function headerbottom(){
         const arrBottom = ['Thời trang nam', 'Thời trang nữ', 'Điện thoại', 'Máy tính bảng', 'Laptop', 'Phụ kiện điện thoại', 'Thiết bị điện tử', 'Đồng hồ', 'Giày dép', 'Túi xách', 'Sức khỏe và sắc đẹp', 'Mẹ và bé', 'Nhà cửa đời sống', 'Thể thao ngoài trời', 'Xe máy, ô tô, xe đạp'];
         const headerBottom = document.querySelector('.header_bottom');
         const headerBottomUl = document.createElement('ul')
         arrBottom.map((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#">${item}</a>`;
            headerBottomUl.appendChild(li);
         })
         headerBottom.appendChild(headerBottomUl);
    }
    headerbottom();
  }
  main();
  