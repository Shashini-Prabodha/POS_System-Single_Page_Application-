//set first order id

// genarate order id
$('#orderId').val("R1");

genarateOid();

function genarateOid() {
    //if (orderArr.length>0) {
        let orderID = orderArr[length - 1].getOrderID();
        let splitElement = orderID.split('R')[1];
        $('#orderId').val("R" + parseInt(splitElement) + 1);

   // } else {
        $('#orderId').val("R1");
    //}

}

$('#orderLink').on('click', function () {
    if (customerArr.length > 0) {
        loadAllCustomerID();
    }
});

//get selected customer id
$('#cmbCustID').on('change', function () {
    loadCustData($('#cmbCustID option:selected').text());

});

//load all cutomers id
function loadAllCustomerID() {
    $('#cmbCustID').empty();
    for (let i in customerArr) {
        let id = customerArr[i].getCustomerID();
        console.log(i)
        var option = `<option value=${i} id="option">${id}</option>`;
        $('#cmbCustID').append(option);
    }
}

//set customer details
function loadCustData(cid) {

    let customer = searchCustomer(cid);
    $('#custName').val(customer.getCustomerName());
    $('#custAddr').val(customer.getCustomerAddr());
    $('#TP').val(customer.getCustomerTP());

}

$('#')