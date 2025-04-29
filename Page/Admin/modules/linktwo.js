// ====SearchTop======
const SERVER = 'http://localhost:3001';
function loadLinkTwo() {
      fetch(`${SERVER}/liLinktwo`)
      .then(res => res.json())
      .then(products => {
        const div = document.getElementById('liListLinkTwo');
        div.innerHTML = '';
        products.forEach(p => {
          const item = document.createElement('tr');
          item.innerHTML = `
            <td><img src="${SERVER}/${p.image}" alt="ảnh" class='w-25'></td>
            <td>${p.title}</td>
            <td>href: ${p.href}</td>
            <td>
              <button class="btn_edit_linktwo" data-id="${p.id}">Sửa</button>
              <button class="btn_delete_linktwo" data-id="${p.id}">Xóa</button>
            </td>
          `;
          div.appendChild(item);
        });
      });
}
        
function handleSaveLinkTwo() {
      const button = document.getElementById("btnSaveLinkTwo");
      if (!button) {
        console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveSearchTop");
        return;
      }
    
      const itemId = button.dataset.id;
      if (itemId) {
        updateItemLinkTwo(itemId); // Sửa
      } else {
        addItemLinkTwo(); // Thêm mới
      }
}     

function addItemLinkTwo() {
        const imageFileLink = document.getElementById('litImage').files[0];
        const title = document.getElementById('liTitle').value;
        const href = document.getElementById('liHref').value;

        if (!title || !href || !imageFileLink) {
          return alert('Nhập đầy đủ thông tin và ảnh');
        }
        const formData = new FormData();
        formData.append('image', imageFileLink);
        formData.append('title', title);
        formData.append('href', href);
              
        fetch(`${SERVER}/add-liLinktwo`, {
                  method: "POST",
                  body: formData
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          clearFormLinkTwo();
          loadLinkTwo();
        });
}
function editItemLinkTwo(id) {
      fetch(`${SERVER}/liLinktwo/${id}`)
            .then(res => res.json())
            .then(data => {
              // Hiển thị data vào form để chỉnh sửa
              document.getElementById('litImage').src =`${SERVER}/${data.image}`
              document.getElementById('liHref').value = data.href;
              document.getElementById('liTitle').value = data.title;
              // gán id cho nút lưu
              document.getElementById("btnSaveLinkTwo").dataset.id = id;
            })
            .catch(err => {
              console.error("Lỗi khi lấy sản phẩm:", err);
            });
    }
        
       
function updateItemLinkTwo(id) {
      const imageFileLink = document.getElementById('litImage').files[0];
      const title = document.getElementById('liTitle').value;
      const href = document.getElementById('liHref').value;

      if (!title || !href || !imageFileLink) {
        return alert('Nhập đầy đủ thông tin và ảnh');
      }
      const formData = new FormData();
      formData.append('image', imageFileLink);
      formData.append('title', title);
      formData.append('href', href);

      fetch(`${SERVER}/update-liLinktwo/${id}`, {
        method: "PUT",
        body: formData
      })
      .then(res => res.text())
      .then(msg => {
      alert(msg);
      clearFormLinkTwo();
      loadLinkTwo();
      });
}
        
       
function deleteItemLinkTwo(id) {
      fetch(`${SERVER}/delete-liLinktwo/${id}`, {
        method: "DELETE"
      })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadLinkTwo();
      });
}
function clearFormLinkTwo() {
      document.getElementById('litImage').value = "";
      document.getElementById('liTitle').value = "";
      document.getElementById('liHref').value.value = "";
      delete document.getElementById("litImage").dataset.editingId;
}
        
        
export {
    handleSaveLinkTwo,
    loadLinkTwo,
    editItemLinkTwo,
    deleteItemLinkTwo
};
