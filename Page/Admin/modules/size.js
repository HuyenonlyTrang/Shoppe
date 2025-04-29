const SERVER = 'http://localhost:3001';

function loadSize() {
  fetch(`${SERVER}/size`)
    .then(res => res.json())
    .then(products => {
      const div = document.getElementById('size');
      div.innerHTML = '';
      products.forEach(p => {
        const item = document.createElement('div');
        item.innerHTML = `
          <p>size-s : ${p.size_s === 1 ? 'check' : 'ko check'}</p>
          <p>size-m : ${p.size_m === 1 ? 'check' : 'ko check'}</p>
          <p>size-l : ${p.size_l === 1 ? 'check' : 'ko check'}</p>
          <p>size-xl : ${p.size_xl === 1 ? 'check' : 'ko check'}</p>
          <p>size-xxl : ${p.size_xxl === 1 ? 'check' : 'ko check'}</p>
          <p>size-xxxl : ${p.size_xxxl === 1 ? 'check' : 'ko check'}</p>
          <button class="btn_edit_size" data-id="${p.id}">Sửa</button>
          <button class="btn_delete_size" data-id="${p.id}">Xóa</button>
          <hr>
        `;
        div.appendChild(item);
      });
    });
}

function handleSaveSize() {
  const button = document.getElementById("btnSaveSize");
  if (!button) {
    console.error("Không tìm thấy nút Save. Đảm bảo bạn đặt đúng ID: btnSaveSearchTop");
    return;
  }

  const itemId = button.dataset.id;
  if (itemId) {
    updateItemSize(itemId); // Sửa
  } else {
    addItemSize(); // Thêm mới
  }
}

function addItemSize() {
  const size_s = document.getElementById('size_s').checked ? 1 : 0;
  const size_m = document.getElementById('size_m').checked ? 1 : 0;
  const size_l = document.getElementById('size_l').checked ? 1 : 0;
  const size_xl = document.getElementById('size_xl').checked ? 1 : 0;
  const size_xxl = document.getElementById('size_xxl').checked ? 1 : 0;
  const size_xxxl = document.getElementById('size_xxxl').checked ? 1 : 0;

  const data = {
    size_s,
    size_m,
    size_l,
    size_xl,
    size_xxl,
    size_xxxl
  };

  fetch(`${SERVER}/add-size`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      clearFormSize();
      loadSize();
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Lỗi khi thêm dữ liệu');
    });
}

function editItemSize(id) {
  fetch(`${SERVER}/size/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
      return res.json();
    })
    .then(data => {
      document.getElementById('size_s').checked = data.size_s === 1;
      document.getElementById('size_m').checked = data.size_m === 1;
      document.getElementById('size_l').checked = data.size_l === 1;
      document.getElementById('size_xl').checked = data.size_xl === 1;
      document.getElementById('size_xxl').checked = data.size_xxl === 1;
      document.getElementById('size_xxxl').checked = data.size_xxxl === 1;

      // Gán id cho nút lưu
      document.getElementById("btnSaveSize").dataset.id = id;
    })
    .catch(err => {
      console.error("Lỗi khi lấy sản phẩm:", err);
      alert("Sản phẩm không tồn tại hoặc đã bị xóa.");
    });
}

function updateItemSize(id) {
  const size_s = document.getElementById('size_s').checked ? 1 : 0;
  const size_m = document.getElementById('size_m').checked ? 1 : 0;
  const size_l = document.getElementById('size_l').checked ? 1 : 0;
  const size_xl = document.getElementById('size_xl').checked ? 1 : 0;
  const size_xxl = document.getElementById('size_xxl').checked ? 1 : 0;
  const size_xxxl = document.getElementById('size_xxxl').checked ? 1 : 0;

  const data = {
    size_s,
    size_m,
    size_l,
    size_xl,
    size_xxl,
    size_xxxl
  };

  fetch(`${SERVER}/update-size/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      clearFormSize();
      loadSize();

      // Xóa id đang gán ở nút để tránh bị hiểu nhầm lần sau
      document.getElementById("btnSaveSize").removeAttribute('data-id');
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Lỗi khi cập nhật dữ liệu');
    });
}

function deleteItemSize(id) {
  fetch(`${SERVER}/delete-size/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      loadSize();
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Lỗi khi xóa dữ liệu');
    });
}

function clearFormSize() {
  document.getElementById('size_s').checked = false;
  document.getElementById('size_m').checked = false;
  document.getElementById('size_l').checked = false;
  document.getElementById('size_xl').checked = false;
  document.getElementById('size_xxl').checked = false;
  document.getElementById('size_xxxl').checked = false;
}

     
export {
    handleSaveSize,
    loadSize,
    editItemSize,
    deleteItemSize
};
