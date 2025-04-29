const SERVER = 'http://localhost:3001';

// Hàm tải danh sách phân loại
function loadReduce() {
  fetch(`${SERVER}/Reduce`)
    .then(res => res.json())
    .then(items => {
      const div = document.getElementById('Reduce');
      div.innerHTML = '';  // Xóa nội dung cũ
      items.forEach(p => {
        const item = document.createElement('div');
        item.innerHTML = `
          <ul>
            <li>${p.one}</li>
            <li>${p.two}</li>
            <li>${p.three}</li>
            <li>${p.four}</li>
            <li>${p.fire}</li>
          </ul>
          <button class="btn_edit_Reduce" data-id="${p.id}">Sửa</button>
          <button class="btn_delete_Reduce" data-id="${p.id}">Xóa</button>
          <hr>
        `;
        div.appendChild(item);
      });
    });
}

// Hàm xử lý lưu phân loại
function handleSaveReduce() {
  const button = document.getElementById("btnSaveReduce");
  if (!button) {
    console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveReduce");
    return;
  }

  const itemId = button.dataset.id;
  if (itemId) {
    updateItemReduce(itemId); // Sửa
  } else {
    addItemReduce(); // Thêm mới
  }
}

// Hàm thêm mới phân loại
function addItemReduce() {
  const data = getFormDataReduce();
  console.log("Dữ liệu đang gửi:", data); 
  if (Object.values(data).some(value => value.trim() === '')) {
    return alert('Vui lòng nhập đầy đủ thông tin');
  }
  

  fetch(`${SERVER}/add-Reduce`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    clearFormReduce();
    loadReduce();
  });
}

// Hàm sửa phân loại
function editItemReduce(id) {
  fetch(`${SERVER}/Reduce/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy phân loại");
      return res.json();
    })
    .then(data => {
      document.getElementById('reduce_one').value = data.one;
      document.getElementById('reduce_two').value = data.two;
      document.getElementById('reduce_three').value = data.three;
      document.getElementById('reduce_four').value = data.four;
      document.getElementById('reduce_fire').value = data.fire;

      // Gán id cho nút lưu
      document.getElementById("btnSaveReduce").dataset.id = id;
    })
    .catch(err => {
      console.error("Lỗi khi lấy phân loại:", err);
      alert("Phân loại không tồn tại hoặc đã bị xóa.");
    });
}

// Hàm cập nhật phân loại
function updateItemReduce(id) {
  const data = getFormDataReduce();
  if (Object.values(data).some(value => !value)) {
    return alert('Vui lòng nhập đầy đủ thông tin');
  }

  fetch(`${SERVER}/update-Reduce/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    clearFormReduce();
    loadReduce();
    document.getElementById("btnSaveReduce").removeAttribute('data-id');
  });
}

// Hàm xóa phân loại
function deleteItemReduce(id) {
  fetch(`${SERVER}/delete-Reduce/${id}`, {
    method: "DELETE"
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    loadReduce();
  });
}

// Hàm lấy dữ liệu từ form
function getFormDataReduce() {
  return {
    one: document.getElementById('reduce_one').value,
    two: document.getElementById('reduce_two').value,
    three: document.getElementById('reduce_three').value,
    four: document.getElementById('reduce_four').value,
    fire: document.getElementById('reduce_fire').value
  };
}

// Hàm xóa form dữ liệu
function clearFormReduce() {
  document.getElementById('reduce_one').value = '';
  document.getElementById('reduce_two').value = '';
  document.getElementById('reduce_three').value = '';
  document.getElementById('reduce_four').value = '';
  document.getElementById('reduce_fire').value = '';
}

// Export các hàm
export {
  handleSaveReduce,
  loadReduce,
  editItemReduce,
  deleteItemReduce
};
