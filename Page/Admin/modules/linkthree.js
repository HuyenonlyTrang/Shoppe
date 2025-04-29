// ====SearchTop======
const SERVER = 'http://localhost:3001';
function loadLinkThree() {
   fetch(`${SERVER}/liLinkthree`)
  .then(res => res.json())
  .then(products => {
    const div = document.getElementById('liListLinkThree');
    div.innerHTML = '';
    products.forEach(p => {
      const item = document.createElement('tr');
      item.innerHTML = `
        <td><img src="${SERVER}/${p.image_one}" alt="ảnh" class='w-25'></td>
        <td><img src="${SERVER}/${p.image_two}" alt="ảnh" class='w-25'></td>
        <td>${p.title}</td>
        <td>href: ${p.href}</td>
        <td>
          <button class="btn_edit_linkthree" data-id="${p.id}">Sửa</button>
          <button class="btn_delete_linkthree" data-id="${p.id}">Xóa</button>
        </td>
      `;
      div.appendChild(item);
    });
  })
}
        
function handleSaveLinkThree() {
      const button = document.getElementById("btnSaveLinkThree");
      if (!button) {
        console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveSearchTop");
        return;
      }
    
      const itemId = button.dataset.id;
      if (itemId) {
        updateItemLinkThree(itemId); // Sửa
      } else {
        addItemLinkThree(); // Thêm mới
      }
}     

function addItemLinkThree() {
        const imageFileLinkone = document.getElementById('litImage_one').files[0];
        const imageFileLinkTwo = document.getElementById('litImage_two').files[0];
        const title = document.getElementById('liTitle_one').value;
        const href = document.getElementById('liHref_one').value;

        // Kiểm tra nếu có thiếu dữ liệu
        if (!title || !href || !imageFileLinkone || !imageFileLinkTwo) {
          return alert('Nhập đầy đủ thông tin và ảnh');
        }

        // Tạo đối tượng FormData và thêm các trường vào
        const formData = new FormData();
        formData.append('image_one', imageFileLinkone);
        formData.append('image_two', imageFileLinkTwo);
        formData.append('title', title);
        formData.append('href', href);
              
        fetch(`${SERVER}/add-liLinkthree`, {
                  method: "POST",
                  body: formData
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          clearFormLinkThree();
          loadLinkThree();
        });
}
function editItemLinkThree(id) {
      fetch(`${SERVER}/liLinkthree/${id}`)
            .then(res => res.json())
            .then(data => {
              // Hiển thị data vào form để chỉnh sửa
              document.getElementById('litImage_one').src = `${SERVER}/${data.image_one}`;
              document.getElementById('litImage_two').src = `${SERVER}/${data.image_two}`;
              document.getElementById('liTitle_one').value = data.title;
              document.getElementById('liHref_one').value = data.href;
              // gán id cho nút lưu
              document.getElementById("btnSaveLinkThree").dataset.id = id;
            })
            .catch(err => {
              console.error("Lỗi khi lấy sản phẩm:", err);
            });
    }
        
       
function updateItemLinkThree(id) {
      const imageFileLinkone = document.getElementById('litImage_one').files[0];
      const imageFileLinkTwo = document.getElementById('litImage_two').files[0];
      const title = document.getElementById('liTitle_one').value;
      const href = document.getElementById('liHref_one').value;

      // Kiểm tra nếu có thiếu dữ liệu
      if (!title || !href || !imageFileLinkone || !imageFileLinkTwo) {
        return alert('Nhập đầy đủ thông tin và ảnh');
      }

      // Tạo đối tượng FormData và thêm các trường vào
      const formData = new FormData();
      formData.append('image_one', imageFileLinkone);
      formData.append('image_two', imageFileLinkTwo);
      formData.append('title', title);
      formData.append('href', href);

      fetch(`${SERVER}/update-liLinkthree/${id}`, {
        method: "PUT",
        body: formData
      })
      .then(res => res.text())
      .then(msg => {
      alert(msg);
      clearFormLinkThree();
      loadLinkThree();
      });
}
        
       
function deleteItemLinkThree(id) {
      fetch(`${SERVER}/delete-liLinkthree/${id}`, {
        method: "DELETE"
      })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadLinkThree();
      });
}
function clearFormLinkThree() {
      document.getElementById('liTitle_one').value = '';
      document.getElementById('liHref_one').value = '';
      document.getElementById('litImage_one').value = '';
      document.getElementById('litImage_two').value = '';
      delete document.getElementById("litImage_one").dataset.editingId;
      delete document.getElementById("litImage_two").dataset.editingId;
}
        
        
export {
    handleSaveLinkThree,
    loadLinkThree,
    editItemLinkThree,
    deleteItemLinkThree
};
