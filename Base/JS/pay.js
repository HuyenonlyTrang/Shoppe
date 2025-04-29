const getArr = JSON.parse(localStorage.getItem('pay'));
const product_list = document.querySelector('#product_list');
const set = new Set();
const obj = {};

// Duyệt qua từng item
getArr.forEach(item => {
    // Nếu chưa có cửa hàng này thì tạo tiêu đề và tbody riêng
    if (!set.has(item.name_store)) {
        set.add(item.name_store);

        // Tiêu đề cửa hàng
        const shopTitleRow = document.createElement('tr');
        shopTitleRow.innerHTML = `<td colspan="4"><h5 class="text-primary mt-4">${item.name_store}</h5></td>`;
        product_list.appendChild(shopTitleRow);
    }

    // Tính toán giá
    const q = Number(item.quantity);
    const p = Number(item.dongia.replace(/\./g, '').replace('₫', '').trim());
    const s = p * q;

    // Dòng sản phẩm
    const productRow = document.createElement('tr');
    productRow.innerHTML = `
        <td>
            <img src="${item.image}" class="rounded" style="width: 80px; height: 80px; object-fit: cover;" />
            <span>${item.name}</span>
        </td>
        <td>${item.dongia}</td>
        <td>${item.quantity}</td>
        <td><strong>${s.toLocaleString('vi-VN')} ₫</strong></td>
    `;

    product_list.appendChild(productRow);
});





document.querySelector('button').addEventListener('click', (() => {
    getArr.forEach(item => {
        fetch(`http://localhost:3001/delete-Pay/${Number(item.id)}`, {
            method: 'DELETE'
        })
        .then(res => res.text())
        .then(data => {})
        .catch(err => alert(err));
    })
    alert("Đặt hàng thành công!");
    //window.location.href = './thank_you.html'; 
    localStorage.removeItem('pay'); 
}))