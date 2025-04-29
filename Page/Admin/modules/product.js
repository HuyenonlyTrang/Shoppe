
// ====SearchTop======
const SERVER = 'http://localhost:3001';
function loadProduct() {
  fetch(`${SERVER}/products`)
  .then(res => res.json())
  .then(products => {
    const div = document.getElementById('productList');
    div.innerHTML = '';
    products.forEach(p => {
      const item = document.createElement('tr');
      console.log(p.is_checklike)
      item.innerHTML = `
      <td><img src="${SERVER}/${p.image}" alt="ảnh" class='w-25'></td>
      <td><img src="${SERVER}/${p.image_one}" alt="ảnh" class='w-25'></td>
      <td><img src="${SERVER}/${p.image_two}" alt="ảnh" class='w-25'></td>
      <td><img src="${SERVER}/${p.image_three}" alt="ảnh" class='w-25'></td>
      <td><img src="${SERVER}/${p.image_four}" alt="ảnh" class='w-25'></td>
      <td><img src="${SERVER}/${p.image_fire}" alt="ảnh" class='w-25'></td>
      <td>${p.name}</td>
      <p>Giá cũ: ${p.old_price} 
      <td>Giá khuyến mãi: ${p.sale_price}</td>
      <td>Số lượng bán: ${p.sold_quantity}</td>
      <td>Còn Hàng: ${p.new_price}</td>
      <td>${p.is_checklike == 1 ? 'checked' : 'Ko Check'}</td>
      <td>star: ${p.star}</td>
      <td>review: ${p.review}</td>
      <td>Xuất Xứ: ${p.noi}</td>
      <td>${p.name_store}</td>
      <td>loaisanpham: ${p.loaisanpham}</td>
      <td>mota: ${p.mota}</td>
      <td>href: ${p.href}</td>
      <td>
        <button class="btn_edit_product" data-id="${p.id}">Sửa</button>
        <button class="btn_delete_product" data-id="${p.id}">Xóa</button>
      </td>
        <hr>
      `;
      div.appendChild(item);
    });
  });
}
        
function handleSaveProduct() {
      const button = document.getElementById("btnSaveProduct");
      if (!button) {
        console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveSearchTop");
        return;
      }
    
      const itemId = button.dataset.id;
      if (itemId) {
        updateItemProduct(itemId); // Sửa
      } else {
        addItemProduct(); // Thêm mới
      }
}     

function addItemProduct() {
        const name = document.getElementById('productName').value;
        const name_store = document.getElementById('name_store').value;
        const old_price = document.getElementById('oldPrice').value;
        const new_price = document.getElementById('newPrice').value;
        const sale_price = document.getElementById('salePrice').value;
        const sold_quantity = document.getElementById('soldQuantity').value;
        const imageFile = document.getElementById('productImage').files[0];
        const hrefProduct = document.getElementById('href_product').value
        const is_checklike = document.getElementById('check_like').checked; // true hoặc false
        const star = document.getElementById('star').value;
        const review = document.getElementById('review').value;
        const noi = document.getElementById('where').value;
        const mota = document.getElementById('mota').value;
        const loaisanpham = document.getElementById('loaisanpham').value;
        const imageFileOne = document.getElementById('productImageOne').files[0];
        const imageFileTwo = document.getElementById('productImageTwo').files[0];
        const imageFileThree = document.getElementById('productImageThree').files[0];
        const imageFileFour = document.getElementById('productImageFour').files[0];
        const imageFileFire = document.getElementById('productImageFire').files[0];

        if (!name || !old_price || !new_price || !sale_price || !sold_quantity || !imageFile) {
          return alert('Nhập đầy đủ thông tin và ảnh');
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('name_store', name_store);
        formData.append('old_price', old_price);
        formData.append('new_price', new_price);
        formData.append('sale_price', sale_price);
        formData.append('sold_quantity', sold_quantity);
        formData.append('image', imageFile);
        formData.append('href', hrefProduct)
        formData.append('is_checklike', is_checklike);
        formData.append('star', star);
        formData.append('review', review);
        formData.append('noi', noi);
        formData.append('mota', mota);
        formData.append('loaisanpham', loaisanpham);
        formData.append('image_one', imageFileOne);
        formData.append('image_two', imageFileTwo);
        formData.append('image_three', imageFileThree);
        formData.append('image_four', imageFileFour);
        formData.append('image_fire', imageFileFire);

        fetch(`${SERVER}/add-product`, {
          method: 'POST',
          body: formData
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          clearFormProduct();
          loadProduct();
        });
}
function editItemProduct(id) {
  fetch(`${SERVER}/products/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
      return res.json();
    })
    .then(data => {
      document.getElementById('productName').value = data.name;
      document.getElementById('name_store').value = data.name_store;
      document.getElementById('oldPrice').value = data.old_price;
      document.getElementById('newPrice').value = data.new_price;
      document.getElementById('salePrice').value = data.sale_price;
      document.getElementById('soldQuantity').value = data.sold_quantity;
      document.getElementById('href_product').value = data.href;
      document.getElementById('check_like').checked = data.is_checklike;
      document.getElementById('star').value = data.star;
      document.getElementById('review').value = data.review;
      document.getElementById('where').value = data.noi;
      document.getElementById('mota').value = data.mota;
      document.getElementById('loaisanpham').value = data.loaisanpham;
      
      // Gán id cho nút lưu
      document.getElementById("btnSaveProduct").dataset.id = id;
    })
    .catch(err => {
      console.error("Lỗi khi lấy sản phẩm:", err);
      alert("Sản phẩm không tồn tại hoặc đã bị xóa.");
    });
}
  
       
function updateItemProduct(id) {
      const name = document.getElementById('productName').value;
      const name_store = document.getElementById('name_store').value;
      const old_price = document.getElementById('oldPrice').value;
      const new_price = document.getElementById('newPrice').value;
      const sale_price = document.getElementById('salePrice').value;
      const sold_quantity = document.getElementById('soldQuantity').value;
      const imageFile = document.getElementById('productImage').files[0];
      const hrefProduct = document.getElementById('href_product').value
      const is_checklike = document.getElementById('check_like').checked; // true hoặc false
      const star = document.getElementById('star').value;
      const review = document.getElementById('review').value;
      const noi = document.getElementById('where').value;
      const mota = document.getElementById('mota').value;
      const loaisanpham = document.getElementById('loaisanpham').value;
      const imageFileOne = document.getElementById('productImageOne').files[0];
      const imageFileTwo = document.getElementById('productImageTwo').files[0];
      const imageFileThree = document.getElementById('productImageThree').files[0];
      const imageFileFour = document.getElementById('productImageFour').files[0];
      const imageFileFire = document.getElementById('productImageFire').files[0];

      if (!name || !old_price || !new_price || !sale_price || !sold_quantity || !imageFile || !hrefProduct || !name_store) {
        return alert('Nhập đầy đủ thông tin và ảnh');
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('name_store', name_store)
      formData.append('old_price', old_price);
      formData.append('new_price', new_price);
      formData.append('sale_price', sale_price);
      formData.append('sold_quantity', sold_quantity);
      formData.append('image', imageFile);
      formData.append('href', hrefProduct)
      formData.append('is_checklike', is_checklike);
      formData.append('star', star);
      formData.append('review', review);
      formData.append('noi', noi);
      formData.append('mota', mota);
      formData.append('loaisanpham', loaisanpham);
      formData.append('image_one', imageFileOne);
      formData.append('image_two', imageFileTwo);
      formData.append('image_three', imageFileThree);
      formData.append('image_four', imageFileFour);
      formData.append('image_fire', imageFileFire);
      fetch(`${SERVER}/update-products/${id}`, {
        method: "PUT",
        body: formData
      })
      .then(res => res.text())
      .then(msg => {
      alert(msg);
      clearFormProduct();
      loadProduct();
      });
}
        
       
function deleteItemProduct(id) {
      fetch(`${SERVER}/delete-products/${id}`, {
        method: "DELETE"
      })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadProduct();
      });
}
function clearFormProduct() {
  document.getElementById('productName').value = '';
  document.getElementById('oldPrice').value = '';
  document.getElementById('newPrice').value = '';
  document.getElementById('salePrice').value = '';
  document.getElementById('soldQuantity').value = '';
  document.getElementById('href_product').value = '';
  document.getElementById('check_like').checked = false;
  document.getElementById('productImage').value = "";
  document.getElementById('productImageOne').value = "";
  document.getElementById('productImageTwo').value = "";
  document.getElementById('productImageThree').value = "";
  document.getElementById('productImageFour').value = "";
  document.getElementById('productImageFire').value = "";
  document.getElementById('star').value = "";
  document.getElementById('review').value = "";
  document.getElementById('where').value = "";
  document.getElementById('mota').value = "";
  document.getElementById('loaisanpham').value = "";
}
        
        
export {
    handleSaveProduct,
    loadProduct,
    editItemProduct,
    deleteItemProduct
};
