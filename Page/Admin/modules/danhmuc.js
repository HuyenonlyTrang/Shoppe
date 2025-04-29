
// ====SearchTop======
const SERVER = 'http://localhost:3001';
function loadDanhMuc() {
  fetch(`${SERVER}/danhmuc`)
  .then(res => res.json())
  .then(products => {
    const div = document.getElementById('danhmuc');
    div.innerHTML = '';
    products.forEach(p => {
      const item = document.createElement('tr');
      item.innerHTML = `
        <td>${p.phanloai}</td>
        <td>
              <button class="btn_edit_phanloai" data-id="${p.id}">Sửa</button>
              <button class="btn_delete_phanloai" data-id="${p.id}">Xóa</button>
        </td>
      `;
      div.appendChild(item);
    });
  });
}
        
function handleSaveDanhMuc() {
      const button = document.getElementById("btnSaveDanhMuc");
      if (!button) {
        console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveSearchTop");
        return;
      }
    
      const itemId = button.dataset.id;
      if (itemId) {
        updateItemDanhMuc(itemId); // Sửa
      } else {
        addItemDanhMuc(); // Thêm mới
      }
}     

function addItemDanhMuc() {
        const phanloai = document.getElementById('phanloai').value;

        if (!phanloai) {
          return alert('Nhập đầy đủ thông tin và ảnh');
        }

        fetch(`${SERVER}/add-danhmuc`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phanloai })
        })
        
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          clearFormDanhMuc();
          loadDanhMuc();
        });
}
function editItemDanhMuc(id) {
  fetch(`${SERVER}/danhmuc/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
      return res.json();
    })
    .then(data => {
      document.getElementById('phanloai').value = data.phanloai;
      
      // Gán id cho nút lưu
      document.getElementById("btnSaveDanhMuc").dataset.id = id;
    })
    .catch(err => {
      console.error("Lỗi khi lấy sản phẩm:", err);
      alert("Sản phẩm không tồn tại hoặc đã bị xóa.");
    });
}
  
       
function updateItemDanhMuc(id) {
      const phanloai = document.getElementById('phanloai').value;

      if (!phanloai) {
        return alert('Nhập đầy đủ thông tin');
      }

      fetch(`${SERVER}/update-danhmuc/${id}`, {
        method: 'PUT', // <-- dùng PUT thay vì POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phanloai })
      })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        clearFormDanhMuc();
        loadDanhMuc();

        // Xóa id đang gán ở nút để tránh bị hiểu nhầm lần sau
        document.getElementById("btnSaveDanhMuc").removeAttribute('data-id');
      });
}

        
       
function deleteItemDanhMuc(id) {
      fetch(`${SERVER}/delete-danhmuc/${id}`, {
        method: "DELETE"
      })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadDanhMuc();
      });
}
function clearFormDanhMuc() {
  document.getElementById('phanloai').value = '';
  
}
        
        
export {
    handleSaveDanhMuc,
    loadDanhMuc,
    editItemDanhMuc,
    deleteItemDanhMuc
};
