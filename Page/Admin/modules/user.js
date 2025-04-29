const SERVER = 'http://localhost:3001';

// 👉 Hàm hiển thị danh sách người dùng
function loadUsers() {
  fetch(`${SERVER}/users`)
    .then(res => res.json())
    .then(data => {
      const display = document.getElementById("userList");
      display.innerHTML = ""; // Xóa nội dung cũ
      data.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p>Name: ${item.name}</p>
          <p>Email: ${item.email}</p>
          <p>Phone: ${item.phone}</p>
          <p>Birth Year: ${item.birth_year}</p>
          <button class="btn_edit_user" data-id="${item.id}">Sửa</button>
          <button class="btn_delete_user" data-id="${item.id}">Xóa</button>
          <hr/>
        `;
        display.appendChild(div);
      });
    })
    .catch(err => console.error('Lỗi khi tải danh sách người dùng:', err));
}

// 👉 Khi nhấn nút Lưu
function handleSaveUser() {
  const button = document.getElementById("btnSaveUser");
  if (!button) {
    console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveUser");
    return;
  }

  const itemId = button.dataset.id;
  if (itemId) {
    updateItemUser(itemId); // Sửa
  } else {
    addItemUser(); // Thêm mới
  }
}

// 👉 Thêm mới User
function addItemUser() {
  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;
  const email = document.getElementById('userEmail').value;
  const birth_year = document.getElementById('userBirthYear').value;

  fetch(`${SERVER}/add-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Đảm bảo gửi đúng định dạng
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      birth_year: birth_year
    })
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    clearFormUser();
    loadUsers(); // Reload lại danh sách người dùng
  });
}

// 👉 Chuẩn bị sửa
function editItemUser(id) {
  fetch(`${SERVER}/users/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Không tìm thấy người dùng');
      }
      return res.json();
    })
    .then(data => {
      // Hiển thị data vào form để chỉnh sửa
      document.getElementById('userName').value = data.name;
      document.getElementById('userPhone').value = data.phone;
      document.getElementById('userEmail').value = data.email;
      document.getElementById('userBirthYear').value = data.birth_year;
      // gán id cho nút lưu
      document.getElementById("btnSaveUser").dataset.id = id;
    })
    .catch(err => {
      console.error("Lỗi khi lấy dữ liệu người dùng:", err);
      alert(err.message); // Thông báo lỗi cho người dùng
    });
}

// 👉 Cập nhật User
function updateItemUser(id) {
  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;
  const email = document.getElementById('userEmail').value;
  const birth_year = document.getElementById('userBirthYear').value;

  fetch(`${SERVER}/update-user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Đảm bảo gửi đúng định dạng
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      birth_year: birth_year
    })
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    clearFormUser();
    loadUsers(); // Reload lại danh sách người dùng
  });
}

// 👉 Xóa User
function deleteItemUser(id) {
  fetch(`${SERVER}/delete-user/${id}`, {
    method: "DELETE"
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    loadUsers(); // Reload lại danh sách người dùng
  });
}

// 👉 Xóa nội dung form
function clearFormUser() {
  document.getElementById('userName').value = "";
  document.getElementById('userPhone').value = "";
  document.getElementById('userEmail').value = "";
  document.getElementById('userBirthYear').value = "";
}

export {
  handleSaveUser,
  loadUsers,
  editItemUser,
  deleteItemUser
};
