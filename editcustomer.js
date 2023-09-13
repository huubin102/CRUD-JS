document.getElementById("formcustomers").addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn chặn việc tải lại trang
  const customerId = document.getElementById('idcustomers').value;
  getCustomerById(customerId);
});

function getCustomerById(customerId) {
  fetch(`http://localhost:3000/customer/${customerId}`)
    .then(response => response.json())
    .then(data => {
      // Kiểm tra nếu khách hàng tồn tại
      if (data) {
        // Hiển thị thông tin khách hàng trong giao diện
        document.querySelector('input[name="firstName"]').value = data.firstName;
        document.querySelector('input[name="lastName"]').value = data.lastName;
        document.querySelector('input[name="Username"]').value = data.Username;
        document.querySelector('input[name="Email"]').value = data.Email;
        document.querySelector('input[name="Address"]').value = data.Address;
        
        // Lắng nghe sự kiện submit form chỉnh sửa khách hàng
        document.getElementById("formcustomer").addEventListener("submit", function(event) {
          event.preventDefault(); // Ngăn chặn việc tải lại trang
          
          // Lấy dữ liệu từ các trường
          var firstName = document.querySelector('input[name="firstName"]').value;
          var lastName = document.querySelector('input[name="lastName"]').value;
          var Username = document.querySelector('input[name="Username"]').value;
          var Email = document.querySelector('input[name="Email"]').value;
          var Address = document.querySelector('input[name="Address"]').value;
          
          var updatedCustomer = {
            id: customerId,
            firstName: firstName,
            lastName: lastName,
            Username: Username,
            Email: Email,
            Address: Address
          };
          
          // Gọi hàm để cập nhật thông tin khách hàng
          updateCustomer(updatedCustomer);
        });
      } else {
        // Hiển thị thông báo nếu khách hàng không tồn tại
        alert("Khách hàng không tồn tại.");
      }
    })
    .catch(error => {
      // Xử lý lỗi ở đây
      console.error(error);
    });
}

function updateCustomer(customer) {
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  }
  fetch(`http://localhost:3000/customer/${customer.id}`, options)
    .then(response => {
      // Xử lý phản hồi từ API
      if (response.ok) {
        // Nếu thành công, chuyển đến trang danh sách khách hàng
        window.location.href = "index.html";
      } else {
        // Nếu không thành công, hiển thị thông báo lỗi
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    })
    .catch(error => {
      // Xử lý lỗi ở đây
      console.error(error);
    });
}
