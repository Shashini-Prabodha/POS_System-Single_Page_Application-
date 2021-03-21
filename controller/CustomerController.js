$('#custLink').click(function () {
    $('#customerSection').fadeIn(1000);
});

$('#floatingInputCID').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#floatingInputCName').focus();
        }
        checkCID();
    }
);

$('#floatingInputCName').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#floatingInputAddr').focus();
        }
        checkName();
    }
);

$('#floatingInputAddr').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#floatingInputTP').focus();
        }
        checkAddr();

    }
);

$('#floatingInputTP').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#saveCust').focus();
        }
        checkTp();
    }
);

//key event to save
$('#saveCust').on('keyup', function (event) {

    if (event.key == 'Enter') {
        $('#floatingInputCID').focus();
        let res = saveCustomer($('#floatingInputCID').val(), $('#floatingInputCName').val(), $('#floatingInputAddr').val(), $('#floatingInputTP').val());
        if (res) {
            clearAllCustomerText();
            // $('#floatingInputCID').focus();
            genatareCID();
        }
    }

});


$('#txtSearchCust').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#btnCustomerSearch').focus();
        }
    }
);

$('#btnCustomerSearch').on('keyup', function (event) {

        if (event.key == 'Enter') {

            let cust = searchCustomer($('#txtSearchCust').val());
            if (cust == null) {
                alert("Can't Found Customer")
            } else {
                $('#floatingInputCID').val(cust.getCustomerID());
                $('#floatingInputCName').val(cust.getCustomerName());
                $('#floatingInputAddr').val(cust.getCustomerAddr());
                $('#floatingInputTP').val(cust.getCustomerTP());
            }
        }
    }
);

$('#floatingInputCID,#floatingInputCName,#floatingInputAddr,#floatingInputTP').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


//Save customer in click btn
$('#saveCust').click(function () {

    let res = saveCustomer($('#floatingInputCID').val(), $('#floatingInputCName').val(), $('#floatingInputAddr').val(), $('#floatingInputTP').val());
    if (res) {
        clearAllCustomerText();
        $('#floatingInputCID').focus();
        genatareCID();

    }

});

//update customer in click btn
$('#updateCust').click(function () {
    let cusID = $("#floatingInputCID").val();

    let option = confirm(`Do you want to Update ID:${cusID}`);
    if (option) {
        let res = updateCustomer($('#floatingInputCID').val(), $('#floatingInputCName').val(), $('#floatingInputAddr').val(), $('#floatingInputTP').val());

        if (res) {
            clearAllCustomerText();
            alert("Customer Updated");
        } else {
            alert("Update Failed")
        }

    }

});

//Delete customer in click btn
$('#delCust').click(function () {
    let cusID = $("#floatingInputCID").val();

    let option = confirm(`Do you want to Update ID:${cusID}`);
    if (option) {
        let res = deleteCustomer(cusID);
        if (res) {
            alert("Customer Deleted");
            clearAllCustomerText();
        } else {
            alert("Delete Failed")
        }
    }

});

//Clear Customer
$('#clearCust').click(function () {
    clearAllCustomerText();
});

$('#customerSection tr').css('cursor', 'pointer');

//.............CRUD......................

//save customer
function saveCustomer(cid, cname, addr, tp) {
    if (checkCID()) {
        if (checkName()) {
            if (checkAddr()) {
                if (checkTp()) {
                    if (checkDuplicteID(cid)) {
                        $('#floatingInputCID').css('border', '2px solid red');
                        $("#lblcustId").text("Duplicate ID (C1)");
                    } else {

                        let customer = new CustomerDTO(cid, cname, addr, tp);
                        customerArr.push(customer);

                        inputFieldColor();
                        //load all customers to table
                        loadCustomertoTheTable();

                        $('#custTable tbody tr').click(function () {
                            let id = $(this).children('td:eq(0)').text();
                            let name = $(this).children('td:eq(1)').text();
                            let address = $(this).children('td:eq(2)').text();
                            let tp = $(this).children('td:eq(3)').text();

                            $('#floatingInputCID').val(id);
                            $('#floatingInputCName').val(name);
                            $('#floatingInputAddr').val(address);
                            $('#floatingInputTP').val(tp);

                            // $('#floatingInputCID').attr('disabled', 'disabled');

                        })
                        dblclickEvent();


                        return true;
                    }
                } else {
                    $('#floatingInputTP').focus();
                    $('#floatingInputTP').css('border', '2px solid red').focus();
                }
            } else {
                $('#floatingInputAddr').focus();
                $('#floatingInputAddr').css('border', '2px solid red');
            }
        } else {
            $('#floatingInputCName').focus();
            $('#floatingInputCName').css('border', '2px solid red');
        }

    } else {
        $('#floatingInputCID').focus();
        $('#floatingInputCID').css('border', '2px solid red');
    }
    return false;

}

//delete customer
function deleteCustomer(cid) {
    let customer = searchCustomer(cid);
    if (customer != null) {
        let number = customerArr.indexOf(customer);
        customerArr.splice(number, 1);

        //load all customers to table
        loadCustomertoTheTable();

        return true;
    } else {
        return false;
    }

}

//update customer
function updateCustomer(cid, cname, addr, tp) {
    if (checkCID()) {
        if (checkName()) {
            if (checkAddr()) {
                if (checkTp()) {
                    let customer = searchCustomer(cid);
                    if (customer != null) {
                        customer.setCustomerName(cname);
                        customer.setCustomerAddr(addr);
                        customer.setCustomerTP(tp);

                        //load all customers to table
                        loadCustomertoTheTable();
                        inputFieldColor();

                        $('#custTable tbody tr').click(function () {
                            let id = $(this).children('td:eq(0)').text();
                            let name = $(this).children('td:eq(1)').text();
                            let address = $(this).children('td:eq(2)').text();
                            let tp = $(this).children('td:eq(3)').text();

                            $('#floatingInputCID').val(id);
                            $('#floatingInputCName').val(name);
                            $('#floatingInputAddr').val(address);
                            $('#floatingInputTP').val(tp);

                            // $('#floatingInputCID').attr('disabled', 'disabled');

                        });

                        //dbl click event to delete
                        $('#custTable tr').on('dblclick', function () {
                            let cusID = $("#floatingInputCID").val();

                            let option = confirm(`Do you want to Deletd ID:${cusID}`);
                            if (option) {
                                $(this).remove();

                                let res = deleteCustomer(cusID);
                                if (res) {
                                    alert("Customer Deleted");
                                    clearAllCustomerText();
                                } else {
                                    alert("Delete Failed")
                                }
                            }
                        });
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    $('#floatingInputTP').focus();
                    $('#floatingInputTP').css('border', '2px solid red');
                }
            } else {
                $('#floatingInputAddr').focus();
                $('#floatingInputAddr').css('border', '2px solid red');
            }
        } else {
            $('#floatingInputCName').focus();
            $('#floatingInputCName').css('border', '2px solid red');
        }
    }
    return false;

}

//get All customers
function getAllCustomers() {
    return customerArr;
}

//search customer
function searchCustomer(id) {
    for (let i in customerArr) {
        if (customerArr[i].getCustomerID() == id) return customerArr[i];
    }
    return null;
}

//load all customers to table
function loadCustomertoTheTable() {
    let allCustomers = getAllCustomers();
    $('#custTable tbody tr').empty();
    for (let i in allCustomers) {
        let cid = allCustomers[i].getCustomerID();
        let cname = allCustomers[i].getCustomerName();
        let addr = allCustomers[i].getCustomerAddr();
        let tp = allCustomers[i].getCustomerTP();

        var code = `<tr><td>${cid}</td><td>${cname}</td><td>${addr}</td><td>${tp}</td></tr>`;
        $('#custTable').append(code);

        $('#custTable tbody tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let name = $(this).children('td:eq(1)').text();
            let address = $(this).children('td:eq(2)').text();
            let tp = $(this).children('td:eq(3)').text();

            $('#floatingInputCID').val(id);
            $('#floatingInputCName').val(name);
            $('#floatingInputAddr').val(address);
            $('#floatingInputTP').val(tp);

            // $('#floatingInputCID').attr('disabled', 'disabled');

        });

    }
}

//clear all customers text
function clearAllCustomerText() {
    $('#floatingInputCID').val(genatareCID());
    $('#floatingInputCName').val('');
    $('#floatingInputAddr').val('');
    $('#floatingInputTP').val('');
    $('#txtSearchCust').val('');
}

//key events add to input fields
function checkCID() {
    if (/^(C)[0-9]{1,3}$/.test($('#floatingInputCID').val())) {

        $('#floatingInputCID').css('border', '2px solid green');
        $("#lblcustId").text(" ");
        return true;

    } else {
        $('#floatingInputCID').css('border', '2px solid red');
        $("#lblcustId").text("Your Input Data Format is Wrong (C1)");
    }
    return false;

}

function checkName() {
    if (/^[A-z ]{1,}$/.test($('#floatingInputCName').val())) {
        $('#floatingInputCName').css('border', '2px solid green');
        $("#lblcustName").text(" ");
        return true;
    } else {
        $('#floatingInputCName').css('border', '2px solid red');
        $("#lblcustName").text("Your Input Data Format is Wrong (Kamal)");
    }
    return false;

}

function checkAddr() {
    if (/^[A-z, |0-9:./]*\b$/.test($('#floatingInputAddr').val())) {
        $('#floatingInputAddr').css('border', '2px solid green');
        $("#lblcustAddr").text(" ");
        return true;
    } else {
        $('#floatingInputAddr').css('border', '2px solid red');
        $("#lblcustAddr").text("Your Input Data Format is Wrong (No9:Matara)");
    }
    return false;
}

function checkTp() {
    if (/^[0-9]{10}$/.test($('#floatingInputTP').val())) {//  ("^\\d{10}$")
        $('#floatingInputTP').css('border', '2px solid green');
        $("#lblcustTp").text(" ");
        return true;
    } else {
        $('#floatingInputTP').css('border', '2px solid red');
        $("#lblcustTp").text("Your Input Data Format is Wrong (0712345678)");

    }
    return false;
}

function checkDuplicteID(id) {
    let allCustomers = getAllCustomers();
    for (let i in allCustomers) {
        if (id == allCustomers[i].getCustomerID()) {
            return true;
        }
        return false;
    }
}

function inputFieldColor() {
    $('#floatingInputCID').css('border', '1px solid white');
    $('#floatingInputCName').css('border', '1px solid white');
    $('#floatingInputAddr').css('border', '1px solid white');
    $('#floatingInputTP').css('border', '1px solid white');

}

function genatareCID() {
    let LastId = customerArr[customerArr.length - 1].getCustomerID();
    $('#floatingInputCID').val('C' + (parseInt(LastId.split('C')[1]) + 1));
}

$('#floatingInputCID').val('C1');

function dblclickEvent() {
    //dbl click event to delete
    $('#custTable tr').on('dblclick', function () {
        let cusID = $("#floatingInputCID").val();

        let option = confirm(`Do you want to Deletd ID:${cusID}`);
        if (option) {
            $(this).remove();

            let res = deleteCustomer(cusID);
            if (res) {
                alert("Customer Deleted");
                clearAllCustomerText();
            } else {
                alert("Delete Failed")
            }
        }
    });
}

