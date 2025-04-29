 // ===FashSale======
 const SERVER = 'http://localhost:3001';
      // 👉 Hàm hiển thị danh sách SearchTop
      function loadListFashSale() {
        fetch(`${SERVER}/fashsale`)
          .then(res => res.json())
          .then(data => {
            const display = document.getElementById("liListFashSale");
            display.innerHTML = ""; // Xóa nội dung cũ
            data.forEach(item => {
              const div = document.createElement("div");
              div.innerHTML = `
                <img src="${SERVER}/${item.image}" width="100" />
                <p>Tiêu đề: ${item.title}</p>
                <p>gia tien: ${item.money}</p>
                <p>sale: ${item.sale}</p>
                <p>href: ${item.href}</p>
                <button class="btn_edit_fashsale" data-id="${item.id}">Sửa</button>
                <button class="btn_delete_fashsale" data-id="${item.id}">Xóa</button>
                <hr/>
              `;
              display.appendChild(div);
            });
          });
      }
      
      // 👉 Khi nhấn nút Lưu
      function handleSaveFashSale() {
        const button = document.getElementById("btnSaveFashSale");
        if (!button) {
          console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveSearchTop");
          return;
        }
      
        const itemId = button.dataset.id;
        if (itemId) {
          updateItemFashSlae(itemId); // Sửa
        } else {
          addItemFashSlae(); // Thêm mới
        }
      }     
      // 👉 Thêm mới
      function addItemFashSlae() {
        const image = document.getElementById("ImageFalse").files[0];
        const price = document.getElementById("price").value;
        const sale = document.getElementById("sale").value;
        const title = document.getElementById("title_fashsale").value;
        const href = document.getElementById("sale_href").value;
      
        const form = new FormData();
        if (image) form.append("image", image);
        form.append("title", title);
        form.append("href", href);
        form.append("money", price);
        form.append('sale', sale);
      
        fetch(`${SERVER}/add-fashsale`, {
          method: "POST",
          body: form
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          clearForm();
          loadSearchTopList();
        });
      }
      
      // 👉 Chuẩn bị sửa
      function editItemFashSlae(id) {
        fetch(`${SERVER}/fashsale/${id}`)
          .then(res => res.json())
          .then(data => {
            // Hiển thị data vào form để chỉnh sửa
            document.getElementById('ImageFalse').src =`${SERVER}/${data.image}`
            document.getElementById("title_fashsale").value = data.title;
            document.getElementById("sale_href").value = data.href;
            document.getElementById("price").value = data.money;
            document.getElementById("sale").value = data.sale;
            // gán id cho nút lưu
            document.getElementById("btnSaveSearchTop").dataset.id = id;
          })
          .catch(err => {
            console.error("Lỗi khi lấy sản phẩm:", err);
          });
      }
      
      // 👉 Cập nhật
      function updateItemFashSlae(id) {
        const image = document.getElementById("ImageFalse").files[0];
        const price = document.getElementById("price").value;
        const sale = document.getElementById("sale").value;
        const title = document.getElementById("title_fashsale").value;
        const href = document.getElementById("sale_href").value;
      
        const form = new FormData();
        if (image) form.append("image", image);
        form.append("title", title);
        form.append("href", href);
        form.append("money", price);
        form.append('sale', sale);
      
        fetch(`${SERVER}/update-fashsale/${id}`, {
          method: "PUT",
          body: form
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          clearFormFashSale();
          loadListFashSale();
        });
      }
      
      // 👉 Xóa
      function deleteItemFashSlae(id) {
        fetch(`${SERVER}/delete-fashsale/${id}`, {
          method: "DELETE"
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          loadListFashSale();
        });
      }
      
      // 👉 Xóa nội dung form
      function clearFormFashSale() {
        document.getElementById("sale_href").value = "";
        document.getElementById("price").value = "";
        document.getElementById("sale").value = "";
        document.getElementById("title_fashsale").value = "";
        delete document.getElementById("ImageFalse").dataset.editingId;
      }
      
    // ✅ Export tất cả 1 lần ở cuối
export {
  loadListFashSale,
  handleSaveFashSale,
  deleteItemFashSlae,
  editItemFashSlae
};
