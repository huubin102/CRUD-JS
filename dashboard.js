function start() {
  //lay ra khach hang va render de hien thi
  getCustomers(renderCustomers);
  handleCt();
}
start();
//ham de lay ra khach hang
function getCustomers(callback) {
  fetch('http://localhost:3000/customer')
    .then((response) =>  response.json())
    .then(callback)
    .catch((error) => console.error(error));
}
function createCustomers(data,callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/customer',options)
        .then((response)=> response.json())
        .then(callback);
}

function deleteCustomer(id, callback) {
  let options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`http://localhost:3000/customer/${id}`, options)
    .then((response) => response.json())
    .then(callback);
  }
      

function renderCustomers(customer){
  var listcustomersBlock =
  document.querySelector('#list-customers');
  let htmls = customer.map((customers) =>{
    return `<tr>
    <td>${customers.id}</td>
    <td>${customers.firstName}</td>
    <td>${customers.lastName}</td>
    <td>${customers.Username}</td>
    <td>${customers.Email}</td>
    <td>${customers.Address}</td>
    <td>
    <a class="btn btn-danger btn-sm delete-btn" onclick="deleteCustomer(${customers.id})"">xóa</a>
  </td>
  </tr> `

  });
  
  listcustomersBlock.innerHTML = htmls.join('');

  
}
function searchCustomers() {
  // Lấy giá trị từ ô input tìm kiếm
  var searchValue = document.getElementById('search-input').value.toLowerCase();

  // Gọi API để lấy danh sách khách hàng
  getCustomers(function(customers) {
    // Lọc danh sách khách hàng dựa trên giá trị tìm kiếm
    var filteredCustomers = customers.filter(function(customer) {
      // Kiểm tra xem từ khóa tìm kiếm có xuất hiện trong thông tin khách hàng không
      var customerFirstName = customer.firstName.toLowerCase();
      var customerLastName = customer.lastName.toLowerCase();
      var customerUsername = customer.Username.toLowerCase();
      var customerEmail = customer.Email.toLowerCase();
      var customerAddress = customer.Address.toLowerCase();

      return (
        customerFirstName.includes(searchValue) ||
        customerLastName.includes(searchValue) ||
        customerUsername.includes(searchValue) ||
        customerEmail.includes(searchValue) ||
        customerAddress.includes(searchValue)
      );
    });

    // Hiển thị danh sách khách hàng sau khi lọc
    renderCustomers(filteredCustomers);
  });
}

function handleCt(){
  document.getElementById("addcustomer").addEventListener("click", function() {
    // Chuyển đến trang khách hàng
    window.location.href = "addcustomers.html";
  });
  document.getElementById("editcustomer").addEventListener("click", function() {
    // Chuyển đến trang khách hàng
    window.location.href = "editcustomer.html";
  });
}



  


   
