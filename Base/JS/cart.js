// Khai báo ngoài vòng lặp để biến shopContainers có phạm vi toàn cục
const createdShops = new Set();
const shopContainers = {}; // Object lưu trữ container của từng shop
fetch('http://localhost:3001/pay')
    .then(res => res.json())
    .then(data => {
        const list_cart = document.querySelector('.list_cart');
        const checkall = document.querySelector('.checkall');
        const deleteAll = document.querySelector('.deleteAll')
        let arr = JSON.parse(localStorage.getItem('pay')) || [];

        // Lấy id của phần tử cuối cùng trong data
        const idend = data[data.length - 1]?.id;
        data.forEach((item) => {
            if (!createdShops.has(item.name_store)) {
                createdShops.add(item.name_store);
        
                const shopDiv = document.createElement('div');
                shopDiv.className = 'shop mb-4';
                shopDiv.innerHTML = `<h3 class="text-primary mb-3 name_store">${item.name_store}</h3>`;
        
                const productList = document.createElement('div');
                productList.className = 'product-list';
        
                shopDiv.appendChild(productList);
                list_cart.appendChild(shopDiv);
        
                shopContainers[item.name_store] = productList; // lưu thằng div chứa sản phẩm
            }
        
            // Tạo sản phẩm
            const ul = document.createElement('ul');
            ul.setAttribute('class', 'item row fs-4 d-flex align-items-center');
        
            const q = Number(item.quantity);
            const p = Number(item.price.replace(/\./g, '').replace('₫', '').trim());
            const s = p * q;
        
            ul.innerHTML = `
                <li class='col-1'><input type="checkbox" class="check"/></li>
                <li class="col-3 d-flex gap-3">
                    <img src='${item.image}' class='w-25 image_pay'/>
                    <div>
                        <p class='name' style="white-space: wrap;">${item.name}</p>
                        <p>Phân Loại Sản Phẩm: <span class='size'>${item.size}</span></p>
                    </div>
                </li>
                <li class='col-2 dongia'>${item.price}</li>
                <li class="col-2">
                    <span><i class="fa-solid fa-minus minus border border-white p-1"></i></span>
                    <span class="quantity">${item.quantity}</span>
                    <span><i class="fa-solid fa-plus plus border border-white p-1"></i></span>
                </li>
                <li class="price col-2">${s.toLocaleString('vi-VN') + ' ₫'}</li>
                <li class='btn_delete_cart col-1' data-id='${item.id}'>Xóa</li>
            `;
        
            // ✅ Thay vì append vào list_cart, bạn append vào đúng productList của shop
            shopContainers[item.name_store].appendChild(ul);
            
            const check = ul.querySelector('.check');
            const name = item.name;
            const quantity = item.quantity;
            const price = item.price;
            const size = item.size;
            const image = item.image;
            const id = item.id
            if(item.id === idend){
                check.checked = true
            }
            // ✅ Nếu đã có trong localStorage thì tự tick
            const isSaved = JSON.parse(localStorage.getItem('pay'))?.some(i => i.name === name && i.quantity === quantity && i.price === price && i.size === size && i.image === image && i.id === id);
            if (isSaved) {
                check.checked = true;
            }
            check.addEventListener('change', () => {
                return sum();
            });
            checkall.addEventListener('change', () => {
                if(checkall.checked === true){
                    check.checked = true
                }else{
                    check.checked = false
                }
                sum();
            })
            //
            const minus = ul.querySelector('.minus')
            const plus = ul.querySelector('.plus')
            const qtext = ul.querySelector('.quantity').textContent
            let qnumber = Number(qtext.replace(/\./g, '').replace('₫', '').trim());
            minus.addEventListener('click', () => {
                if(qnumber > 0) {
                    qnumber--;
                    const q = ul.querySelector('.quantity').textContent = qnumber
                    const p = Number(item.price.replace(/\./g, '').replace('₫', '').trim())
                    const s = p*q
                    ul.querySelector('.price').textContent = s.toLocaleString('vi-VN') + ' ₫'
                    sum();
                }
            })
            plus.addEventListener('click', () => {
                qnumber++;
                const q = ul.querySelector('.quantity').textContent = qnumber
                const p = Number(item.price.replace(/\./g, '').replace('₫', '').trim())
                const s = p*q
                ul.querySelector('.price').textContent = s.toLocaleString('vi-VN') + ' ₫'
                sum();
            })
            
        });

        //
        deleteAll.addEventListener('click', () => {
            if(confirm('Bạn có chắc muốn xóa tất cả sản phẩm không? '))
            fetch('http://localhost:3001/delete-all-Pay', {
                  method: 'DELETE'
            })
            .then(res => res.text())
            .then(data => {
                alert('Đã xóa tất cả sản phẩm!: ', data)
                list_cart.innerHTML = ''
                localStorage.removeItem('pay')
                sum();
            })
            .catch(err => alert(err))
            
        })

        // Cập nhật localStorage khi nhấn button
        const button = document.querySelector('.button');
        button.addEventListener('click', () => {
            const items = document.querySelectorAll('.item');
            items.forEach(item => {
                const check = item.querySelector('.check');
                const shopElement = item.closest('.shop');
                const name_store = shopElement.querySelector('.name_store').textContent;
                const name = item.querySelector('.name').textContent;
                const quantity = item.querySelector('.quantity').textContent;
                const price = item.querySelector('.price').textContent;
                const size = item.querySelector('.size').textContent;
                const image = item.querySelector('.image_pay').src;
                const dongia = item.querySelector('.dongia').textContent;
                const id = item.querySelector('.btn_delete_cart').getAttribute('data-id');
                
                console.log(size)
                if (check.checked) {
                    const list = arr.find(i => i.name === name && i.quantity === quantity && i.price === price && i.size === size && i.image === image && i.id === id && i.name_store === name_store && i.dongia === dongia);
                    if (!list) {
                        arr.push({id,name_store, name,dongia, quantity, price, size , image});
                    }
                } else {
                    const notinput = arr.findIndex(i => i.name === name && i.quantity === quantity && i.price === price && i.size === size && i.image === image && i.id === id && i.dongia === dongia);
                    if (notinput !== -1) {
                        arr.splice(notinput, 1);
                    }
                }
            });
            localStorage.setItem('pay', JSON.stringify(arr));
            sum();
            // Chuyển hướng sang trang 'pay.html'
           window.location.href = './pay.html'
        });
        
        
        // Xóa sản phẩm trong danh sách
        list_cart.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn_delete_cart')) {
                const dataId = event.target.dataset.id;
                fetch(`http://localhost:3001/delete-Pay/${dataId}`, {
                    method: 'DELETE'
                })
                .then(res => res.text())
                .then(data => {
                    alert('Bạn đã xóa thành công: ', data);
                    // Xóa sản phẩm trong giao diện
                    event.target.closest('ul').remove();
                    localStorage.removeItem('pay'); 
                    sum();
                })
                .catch(err => alert(err));
            }
        });

        function sum(){
            const sum = document.querySelector('.sum');
                let total = 0;
                const items = document.querySelectorAll('.item');
                items.forEach(item => {
                    const checkbox = item.querySelector('.check');
                    if (checkbox.checked) {
                        const priceText = item.querySelector('.price').textContent;
                        const price = Number(priceText.replace(/\./g, '').replace('₫', '').trim());
                        total += price;
                    }
                });
                sum.textContent ='Tổng Số Tiền : ' + total.toLocaleString('vi-VN') + ' ₫';
        }
        sum();

    });
