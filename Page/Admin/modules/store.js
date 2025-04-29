const SERVER = 'http://localhost:3001';

// Hàm tải danh sách phân loại
function loadStore() {
  fetch(`${SERVER}/Store`)
    .then(res => res.json())
    .then(items => {
      const div = document.getElementById('Store');
      div.innerHTML = '';  // Xóa nội dung cũ
      items.forEach(p => {
        const item = document.createElement('div');
        item.innerHTML = `
          <ul>
            <img src="${SERVER}/${p.avatar}" />
            <li>${p.name_store}</li>
            <li>${p.follower}</li>
            <li>${p.join}</li>
            <li>${p.time_feedback}</li>
            <li>${p.ratio_feedback}</li>
            <li>${p.product}</li>
            <li>${p.review}</li>
          </ul>
          <button class="btn_edit_Store" data-id="${p.id}">Sửa</button>
          <button class="btn_delete_Store" data-id="${p.id}">Xóa</button>
          <hr>
        `;
        div.appendChild(item);
      });
    });
}

// Hàm xử lý lưu phân loại
function handleSaveStore() {
  const button = document.getElementById("btnSaveStore");
  if (!button) {
    console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveStore");
    return;
  }

  const itemId = button.dataset.id;
  if (itemId) {
    updateItemStore(itemId); // Sửa
  } else {
    addItemStore(); // Thêm mới
  }
}

// Hàm thêm mới phân loại
function addItemStore() {
  const data = getFormDataStore(); // Lấy các dữ liệu từ form (tên cửa hàng, người theo dõi, v.v.)
  const formData = new FormData(); // Tạo một đối tượng FormData để chứa dữ liệu

  // Kiểm tra xem tất cả trường dữ liệu đã được nhập đầy đủ chưa
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'avatar' && typeof value === 'string' && value.trim() === '') {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }
    formData.append(key, value); // Thêm tất cả dữ liệu vào FormData
  }

  // Nếu có ảnh, thêm ảnh vào FormData
  const fileInput = document.querySelector('#avatar'); // Lấy input ảnh từ form
  if (fileInput && fileInput.files.length > 0) {
    formData.append('avatar', fileInput.files[0]); // Thêm ảnh vào FormData
  }

  // Gửi dữ liệu FormData qua fetch (không cần set Content-Type, trình duyệt tự động làm việc này)
  fetch(`${SERVER}/add-Store`, {
    method: 'POST',
    body: formData // Gửi dữ liệu dưới dạng FormData
  })
  .then(res => res.text()) // Lấy kết quả trả về từ backend
  .then(msg => {
    alert(msg); // Hiển thị thông báo từ server
    clearFormStore(); // Làm sạch form
    loadStore(); // Tải lại danh sách cửa hàng
  });
}


// Hàm sửa phân loại
function editItemStore(id) {
  fetch(`${SERVER}/Store/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy phân loại");
      return res.json();
    })
    .then(data => {
        document.getElementById('nameStore').value = data.name_store
        document.getElementById('follower').value = data.follower
        document.getElementById('join').value = data.join
        document.getElementById('Time_feedback').value = data.time_feedback
        document.getElementById('Radio_feedback').value = data.ratio_feedback
        document.getElementById('ProductStore').value = data.product
        document.getElementById('reivewStore').value = data.review

        // Gán lại ảnh hiện có
      const preview = document.getElementById("ImageStore");
      if (preview) {
        preview.src = `${SERVER}/${data.avatar}`;
      }
      // Gán id cho nút lưu
      document.getElementById("btnSaveStore").dataset.id = id;
    })
    .catch(err => {
      console.error("Lỗi khi lấy phân loại:", err);
      alert("Phân loại không tồn tại hoặc đã bị xóa.");
    });
}

// Hàm cập nhật phân loại
function updateItemStore(id) {
    const avatar = document.getElementById('ImageStore').files[0]
    const name_store = document.getElementById('nameStore').value
    const follower = document.getElementById('follower').value
    const join = document.getElementById('join').value
    const time_feedback = document.getElementById('Time_feedback').value
    const ratio_feedback = document.getElementById('Radio_feedback').value
    const product = document.getElementById('ProductStore').value
    const review = document.getElementById('reivewStore').value
        
  const form = new FormData();
          form.append("avatar", avatar);
          form.append("name_store", name_store);
          form.append("follower", follower);
          form.append("join", join);
          form.append("time_feedback", time_feedback);
          form.append("ratio_feedback", ratio_feedback);
          form.append("product", product);
          form.append("review", review);
        
          fetch(`${SERVER}/update-Store/${id}`, {
            method: "PUT",
            body: form
          })
          .then(res => res.text())
          .then(msg => {
            alert(msg);
            clearFormStore();
            loadStore();
          });
}


// Hàm xóa phân loại
function deleteItemStore(id) {
  fetch(`${SERVER}/delete-Store/${id}`, {
    method: "DELETE"
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    loadStore();
  });
}

// Hàm lấy dữ liệu từ form
function getFormDataStore() {
  return {
    avatar: document.getElementById('ImageStore').files[0],
    name_store: document.getElementById('nameStore').value,
    follower: document.getElementById('follower').value,
    join: document.getElementById('join').value,
    time_feedback: document.getElementById('Time_feedback').value,
    ratio_feedback: document.getElementById('Radio_feedback').value,
    product: document.getElementById('ProductStore').value,
    review: document.getElementById('reivewStore').value
  };
}

// Hàm xóa form dữ liệu
function clearFormStore() {
  document.getElementById('nameStore').value = '';
  document.getElementById('follower').value = '';
  document.getElementById('join').value = '';
  document.getElementById('Time_feedback').value = '';
  document.getElementById('Radio_feedback').value = '';
  document.getElementById('ProductStore').value = '';
  document.getElementById('reivewStore').value = '';
  document.getElementById('ImageStore').value = '';  // Làm sạch trường avatar nếu cần
}

// Export các hàm
export {
  handleSaveStore,
  loadStore,
  editItemStore,
  deleteItemStore
};
