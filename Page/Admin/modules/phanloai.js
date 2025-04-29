const SERVER = 'http://localhost:3001';

// Hàm tải danh sách phân loại
function loadPhanLoai() {
  fetch(`${SERVER}/phanloai`)
    .then(res => res.json())
    .then(items => {
      const div = document.getElementById('Phanloai');
      div.innerHTML = '';  // Xóa nội dung cũ
      items.forEach(p => {
        const item = document.createElement('div');
        item.innerHTML = `
          <p><strong>${p.loai}</strong></p>
          <ul>
            <li>${p.tensp_one}</li>
            <li>${p.tensp_two}</li>
            <li>${p.tensp_three}</li>
            <li>${p.tensp_four}</li>
          </ul>
          <button class="btn_edit_phanloaii" data-id="${p.id}">Sửa</button>
          <button class="btn_delete_phanloaii" data-id="${p.id}">Xóa</button>
          <hr>
        `;
        div.appendChild(item);
      });
    });
}

// Hàm xử lý lưu phân loại
function handleSavePhanLoai() {
  const button = document.getElementById("btnSavePhanLoai");
  if (!button) {
    console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSavePhanLoai");
    return;
  }

  const itemId = button.dataset.id;
  if (itemId) {
    updateItemPhanLoai(itemId); // Sửa
  } else {
    addItemPhanLoai(); // Thêm mới
  }
}

// Hàm thêm mới phân loại
function addItemPhanLoai() {
  const data = getFormDataPhanLoai();
  console.log("Dữ liệu đang gửi:", data); 
  if (Object.values(data).some(value => value.trim() === '')) {
    return alert('Vui lòng nhập đầy đủ thông tin');
  }
  

  fetch(`${SERVER}/add-phanloai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    clearFormPhanLoai();
    loadPhanLoai();
  });
}

// Hàm sửa phân loại
function editItemPhanLoai(id) {
  fetch(`${SERVER}/phanloai/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy phân loại");
      return res.json();
    })
    .then(data => {
      document.getElementById('phanloaii').value = data.loai;
      document.getElementById('tensp_one').value = data.tensp_one;
      document.getElementById('tensp_two').value = data.tensp_two;
      document.getElementById('tensp_three').value = data.tensp_three;
      document.getElementById('tensp_four').value = data.tensp_four;

      // Gán id cho nút lưu
      document.getElementById("btnSavePhanLoai").dataset.id = id;
    })
    .catch(err => {
      console.error("Lỗi khi lấy phân loại:", err);
      alert("Phân loại không tồn tại hoặc đã bị xóa.");
    });
}

// Hàm cập nhật phân loại
function updateItemPhanLoai(id) {
  const data = getFormDataPhanLoai();
  if (Object.values(data).some(value => !value)) {
    return alert('Vui lòng nhập đầy đủ thông tin');
  }

  fetch(`${SERVER}/update-phanloai/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    clearFormPhanLoai();
    loadPhanLoai();
    document.getElementById("btnSavePhanLoai").removeAttribute('data-id');
  });
}

// Hàm xóa phân loại
function deleteItemPhanLoai(id) {
  fetch(`${SERVER}/delete-phanloai/${id}`, {
    method: "DELETE"
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    loadPhanLoai();
  });
}

// Hàm lấy dữ liệu từ form
function getFormDataPhanLoai() {
  const loai = document.getElementById('phanloaii').value.trim();
  console.log("Giá trị loai:", loai); // Kiểm tra giá trị
  return {
    loai: loai,
    tensp_one: document.getElementById('tensp_one').value,
    tensp_two: document.getElementById('tensp_two').value,
    tensp_three: document.getElementById('tensp_three').value,
    tensp_four: document.getElementById('tensp_four').value,
  };
}

// Hàm xóa form dữ liệu
function clearFormPhanLoai() {
  document.getElementById('phanloaii').value = '';
  document.getElementById('tensp_one').value = '';
  document.getElementById('tensp_two').value = '';
  document.getElementById('tensp_three').value = '';
  document.getElementById('tensp_four').value = '';
}

// Export các hàm
export {
  handleSavePhanLoai,
  loadPhanLoai,
  editItemPhanLoai,
  deleteItemPhanLoai
};
