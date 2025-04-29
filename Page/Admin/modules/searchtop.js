// ====SearchTop======

const SERVER = 'http://localhost:3001';
      // 👉 Hàm hiển thị danh sách SearchTop
      function loadSearchTopList() {
        fetch(`${SERVER}/searchTop`)
          .then(res => res.json())
          .then(data => {
            const display = document.getElementById("searchTopDisplay");
            display.innerHTML = ""; // Xóa nội dung cũ
      
            data.forEach(item => {
              const div = document.createElement("tr");
              div.innerHTML = `
                <td> <img src="${SERVER}/${item.image}" class='w-25' /></td>
                <td>Số lượng: ${item.soluong}</td>
                <td>Tiêu đề: ${item.title}</td>
                <td>Link: ${item.href}</td>
                <td>
                  <button class="btn_edit_searchtop" data-id="${item.id}">Sửa</button>
                  <button class="btn_delete_searchtop" data-id="${item.id}">Xóa</button>
                </td>
              `;
              display.appendChild(div);
            });            
          });
      }
      
      // 👉 Khi nhấn nút Lưu
      function handleSave() {
        const button = document.getElementById("btnSaveSearchTop");
        if (!button) {
          console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveSearchTop");
          return;
        }
      
        const itemId = button.dataset.id;
        if (itemId) {
          updateItem(itemId); // Sửa
        } else {
          addItem(); // Thêm mới
        }
      }     
      // 👉 Thêm mới
      function addItem() {
        const image = document.getElementById("ImageSearchTop").files[0];
        const soluong = document.getElementById("soluong").value;
        const href = document.getElementById("title_href").value;
        const title = document.getElementById("title_searchTop").value;
      
        const form = new FormData();
        form.append("image", image);
        form.append("title", title);
        form.append("href", href);
        form.append("soluong", soluong);
      
        fetch(`${SERVER}/add-searchTop`, {
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
      function editItem(id) {
        fetch(`${SERVER}/searchTop/${id}`)
          .then(res => res.json())
          .then(data => {
            // Hiển thị data vào form để chỉnh sửa
            document.getElementById('ImageSearchTop').src =`${SERVER}/${data.image}`
            document.getElementById("title_searchTop").value = data.title;
            document.getElementById("title_href").value = data.href;
            document.getElementById("soluong").value = data.soluong;
            // gán id cho nút lưu
            document.getElementById("btnSaveSearchTop").dataset.id = id;
          })
          .catch(err => {
            console.error("Lỗi khi lấy sản phẩm:", err);
          });
      }
      
      // 👉 Cập nhật
      function updateItem(id) {
        const image = document.getElementById("ImageSearchTop").files[0];
        const title = document.getElementById("title_searchTop").value;
        const href = document.getElementById("title_href").value;
        const soluong = document.getElementById("soluong").value;
      
        const form = new FormData();
        if (image) form.append("image", image);
        form.append("title", title);
        form.append("href", href);
        form.append("soluong", soluong);
      
        fetch(`${SERVER}/update-searchTop/${id}`, {
          method: "PUT",
          body: form
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          clearForm();
          loadSearchTopList();
        });
      }
      
      // 👉 Xóa
      function deleteItem(id) {
        fetch(`${SERVER}/delete-searchTop/${id}`, {
          method: "DELETE"
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          loadSearchTopList();
        });
      }
      
      // 👉 Xóa nội dung form
      function clearForm() {
        document.getElementById("ImageSearchTop").value = "";
        document.getElementById("title_searchTop").value = "";
        document.getElementById("soluong").value = "";
        document.getElementById("title_href").value = "";
        delete document.getElementById("ImageSearchTop").dataset.editingId;
      }
      
      
export {
        handleSave,
        loadSearchTopList,
        editItem,
        deleteItem
};