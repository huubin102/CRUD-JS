


document.getElementById("formcustomer").addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn chặn việc tải lại trang
  // Lấy dữ liệu từ các trường
//   var idcustomers = document.querySelector('input[name="idcustomers"]').value;
  var firstName = document.querySelector('input[name="firstName"]').value;

  var lastName = document.querySelector('input[name="lastName"]').value;
  var Username = document.querySelector('input[name="Username"]').value;
  var Email = document.querySelector('input[name="Email"]').value;
  var Address = document.querySelector('input[name="Address"]').value;
  var fromData= {
    // idcustomers:idcustomers,
  firstName: firstName,
  lastName: lastName,
  Username:Username,
  Email:Email,
  Address:Address
  };

 createCustomers(fromData);



function createCustomers(data) {
  let options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  }
  fetch('http://localhost:3000/customer',options)
  .then((response)=> {
    // Xử lý phản hồi từ API
    if (response.ok) {
      // Nếu thành công, chuyển đến trang danh sách khách hàng
      window.location.href = "index.html";
    } else {
      // Nếu không thành công, hiển thị thông báo lỗi
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  })
  .catch((error) => console.error(error));
}
});


