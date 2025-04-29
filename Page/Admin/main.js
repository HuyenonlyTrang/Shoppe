import { loadSearchTopList, handleSave, editItem, deleteItem } from './modules/searchtop.js'; 
import { handleSaveLinkThree, loadLinkThree, editItemLinkThree, deleteItemLinkThree } from './modules/linkthree.js';
import { handleSaveLinkTwo, loadLinkTwo, editItemLinkTwo, deleteItemLinkTwo } from './modules/linktwo.js';
import { handleSaveUser, loadUsers, editItemUser, deleteItemUser } from './modules/user.js';
import { handleSaveProduct, loadProduct, editItemProduct, deleteItemProduct } from './modules/product.js';
import { loadListFashSale, handleSaveFashSale, deleteItemFashSlae, editItemFashSlae } from './modules/flashsale.js';
import { handleSaveDanhMuc, loadDanhMuc, editItemDanhMuc, deleteItemDanhMuc} from './modules/danhmuc.js';
import { handleSaveSize, loadSize, editItemSize,deleteItemSize} from './modules/size.js';
import { handleSavePhanLoai, loadPhanLoai, editItemPhanLoai, deleteItemPhanLoai} from './modules/phanloai.js'
import { handleSaveReduce, loadReduce,editItemReduce, deleteItemReduce } from './modules/reduce.js'
import {handleSaveStore, loadStore, editItemStore, deleteItemStore} from './modules/store.js'
 





// Đảm bảo sự kiện được gán khi phần tử đã có mặt trên DOM
document.addEventListener('DOMContentLoaded', () => {
  // Make sure the necessary elements exist before trying to modify them
  const productList = document.getElementById("productList");
  const userList = document.getElementById("userList");
  const liListLinkTwo = document.getElementById("liListLinkTwo");
  const liListLinkThree = document.getElementById("liListLinkThree");
  const liListFashSale = document.getElementById("liListFashSale");
  const danhmuc = document.getElementById("danhmuc");
  const size = document.getElementById("size");
  const phanloai = document.getElementById("Phanloai");
  const reduce = document.getElementById("Reduce");
  const store = document.getElementById("Store");
  const searchTop = document.getElementById('searchTopDisplay')


  // thêm đoạn này vào cuối bên trong DOMContentLoaded
  const btnSearchTop = document.getElementById("btnSaveSearchTop");
  const btnFashSale = document.getElementById("btnSaveFashSale");
  const btnUser = document.getElementById("btnSaveUser");
  const btnLinkTwo = document.getElementById("btnSaveLinkTwo");
  const btnLinkThree = document.getElementById("btnSaveLinkThree");
  const btnProduct = document.getElementById("btnSaveProduct");
  const btnDanhMuc = document.getElementById("btnSaveDanhMuc");
  const btnSize = document.getElementById("btnSaveSize");
  const btnPhanLoai = document.getElementById("btnSavePhanLoai");
  const btnReduce = document.getElementById("btnSaveReduce");
  const btnStore = document.getElementById("btnSaveStore");

  if(searchTop){
    loadSearchTopList();
    searchTop.addEventListener('click', () => {
        const btn = e.target;
          if (btn.classList.contains("btn_edit_searchtop")) {
              editItem(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_searchtop")) {
              deleteItem(btn.dataset.id);
          }
    })
    btnSearchTop.addEventListener("click", handleSave);
  }

  if (productList) {
      loadProduct();
      productList.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_product")) {
              editItemProduct(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_product")) {
              deleteItemProduct(btn.dataset.id);
          }
      });
      btnProduct.addEventListener("click", handleSaveProduct);
  }

  if (userList) {
      loadUsers();
      userList.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_user")) {
              editItemUser(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_user")) {
              deleteItemUser(btn.dataset.id);
          }
      });
      btnUser.addEventListener("click", handleSaveUser);
  }

  if (liListLinkTwo) {
      loadLinkTwo();
      liListLinkTwo.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_linktwo")) {
              editItemLinkTwo(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_linktwo")) {
              deleteItemLinkTwo(btn.dataset.id);
          }
      });
      btnLinkTwo.addEventListener("click", handleSaveLinkTwo);
  }

  if (liListLinkThree) {
      loadLinkThree();
      liListLinkThree.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_linkthree")) {
              editItemLinkThree(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_linkthree")) {
              deleteItemLinkThree(btn.dataset.id);
          }
      });
      btnLinkThree.addEventListener("click", handleSaveLinkThree);
  }

  if (liListFashSale) {
      loadListFashSale();
      liListFashSale.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_fashsale")) {
              const id = btn.dataset.id;
              editItemFashSlae(id);
          } else if (btn.classList.contains("btn_delete_fashsale")) {
              const id = btn.dataset.id;
              deleteItemFashSlae(id);
          }
      });
      btnFashSale.addEventListener("click", handleSaveFashSale);
  }

  if (danhmuc) {
      loadDanhMuc();
      danhmuc.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_phanloai")) {
              editItemDanhMuc(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_phanloai")) {
              deleteItemDanhMuc(btn.dataset.id);
          }
      });
      btnDanhMuc.addEventListener("click", handleSaveDanhMuc);
  }

  if (size) {
      loadSize();
      size.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_size")) {
              editItemSize(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_size")) {
              deleteItemSize(btn.dataset.id);
          }
      });
      btnSize.addEventListener("click", handleSaveSize);
  }

  if (phanloai) {
      loadPhanLoai();
      phanloai.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_phanloaii")) {
              editItemPhanLoai(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_phanloaii")) {
              deleteItemPhanLoai(btn.dataset.id);
          }
      });
      btnPhanLoai.addEventListener("click", handleSavePhanLoai);
  }

  if (reduce) {
      loadReduce();
      reduce.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_Reduce")) {
              editItemReduce(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_Reduce")) {
              deleteItemReduce(btn.dataset.id);
          }
      });
      btnReduce.addEventListener("click", handleSaveReduce);
  }

  if (store) {
      loadStore();
      store.addEventListener("click", (e) => {
          const btn = e.target;
          if (btn.classList.contains("btn_edit_Store")) {
              editItemStore(btn.dataset.id);
          }
          if (btn.classList.contains("btn_delete_Store")) {
              deleteItemStore(btn.dataset.id);
          }
      });
      btnStore.addEventListener("click", handleSaveStore);
  }
});


// contains kiem tra xem phan tu do co la phan tu con cua phan tu cha ko --> tra ve true/false
// // Dùng event delegation - lắng nghe từ thẻ cha
