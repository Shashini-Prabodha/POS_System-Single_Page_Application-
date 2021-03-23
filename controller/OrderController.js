$('#orderLink').click(function () {
    $('#OrderSection').fadeIn(1000);

});

//set first order id

// genarate order id
$('#orderId').val("R1");

function genatareOID() {
    $('#orderId').val('');

    let arr = getOrder();
    let ord = arr[arr.length - 1];
    let LastId=ord.getOrdformId();
    $('#orderId').val('R' + (parseInt(LastId.split('R')[1]) + 1));
}

$('#orderLink').on('click', function () {
    if (customerArr.length > 0) {
        loadAllCustomersID();
    }
    if (itemArr.length > 0) {
        loadAllItemsID();
    }
});

//get selected customer id
$('#cmbCustID').on('change', function () {
    console.log('change cust cmb')
    loadCustomerData($('#cmbCustID option:selected').text());

});

//get selected item id
$('#cmbItem').on('change', function () {
    loadItemData($('#cmbItem option:selected').text());

});

$('#btnAddToCart').click(function () {
    addToCart();
});

//load all cutomers id
function loadAllCustomersID() {
    $('#cmbCustID').empty();
    $('#cmbCustID').append(`<option value=0 id="option">Select Customer</option>`);

    for (let i in customerArr) {
        let id = customerArr[i].getCustomerID();
        console.log(i)
        var option = `<option value=${i} id="option">${id}</option>`;
        $('#cmbCustID').append(option);
    }
}

//load all item id
function loadAllItemsID() {
    $('#cmbItem').empty();
    $('#cmbItem').append(`<option value=0 id="option">Select Item</option>`);

    for (let i in itemArr) {
        let id = itemArr[i].getItemID();
        console.log(i)
        var option = `<option value=${i} id="option">${id}</option>`;
        $('#cmbItem').append(option);
    }
}

//set customer details
function loadCustomerData(cid) {

    let customer = searchCustomer(cid);
    if (customer == null) {
    } else {
        $('#custName').val(customer.getCustomerName());
        $('#custAddr').val(customer.getCustomerAddr());
        $('#TP').val(customer.getCustomerTP());
    }

}

//set item details
function loadItemData(id) {

    let item = searchItem(id);
    if (item == null) {
    } else {
        console.log(item.getItemName() + 'load id t' + id)
        $('#itemName').val(item.getItemName());
        $('#available').val(item.getItemQty());
        $('#uprice').val(item.getItemUPrice());
    }
}

//get order detail
function getOrder() {
    return orderArr;
}

//add item to cart
function addToCart() {
    if (checkingOrderID) {
        if (checkItem()) {
            if (checkBQty($('#buyqty').val())) {
                let id = $('#cmbItem option:selected').text();
                if (duplicateItemsCheck(id)) {

                } else {
                    let oid = $('#orderId').val();
                    let item = searchItem(id);
                    let cart = new Cart(oid, id, item.getItemName(), item.getItemUPrice(), item.getItemQty(), $('#buyqty').val());
                    cartArr.push(cart);
                    addItemToTable(id);
                    deletecartItem(item);
                    clearCartItem();
                }
            } else {
            }
        } else {
        }
    } else {
    }
}

function checkCName() {
    if ($('#custName').val() == null) {
        return false;
    }
    return true;

}

function checkItem() {
    let item = searchItem($('#cmbItem option:selected').text());
    if (item == null) {
        $('#cmbItem').css('border', '2px solid red').focus();
        $("#lblOItemID").text("Choose Item");
        return false;
    }
    $('#cmbItem').css('border', '2px solid green').focus();
    $("#lblOItemID").text("");
    return true;
}

function checkCustomerFill() {
    let customer = searchCustomer($('#cmbCustID option:selected').text());
    if (customer == null) {
        $('#cmbCustID').css('border', '2px solid red').focus();
        $("#lblCustomerID").text("Select Customer ID");
        return false;
    }
    $('#cmbCustID').css('border', '2px solid green').focus();
    $("#lblCustomerID").text("");
    return true;
}

$('#buyqty').on('keyup', function () {
    checkBQty($('#buyqty').val());
});

function checkBQty(bqty) {
    if (/^[0-9]{1,}$/.test(bqty)) {//  ("^\\d{10}$")
        $('#buyqty').css('border', '2px solid green');
        $("#lblBuyQty").text(" ");
        return checkAvaQty(bqty);

    } else {
        $('#buyqty').css('border', '2px solid red');
        $("#lblBuyQty").text("Your Input Data Format is Wrong (10)");
    }
    return false;
}

function checkAvaQty(bqty) {
    let availableQty = parseInt($('#available').val());
    if (bqty > availableQty) {
        $('#available').css('border', '2px solid red');
        $('#buyqty').css('border', '2px solid red').focus();
        $("#lblBuyQty").text("Out of Stock. (available qty : " + availableQty + " )");
        return false;
    } else {
        $('#buyqty').css('border', '2px solid green');
        $('#available').css('border', '2px solid white');
        $("#lblBuyQty").text(" ");
        return true;
    }

}

//load all items to table
function addItemToTable(itemid) {
    let allItems = cartArr;
    $('#tblOrderItem tbody tr').empty();
    for (let i in allItems) {

        let id = allItems[i].getItemID();
        let name = allItems[i].getItemName();
        let uprice = allItems[i].getItemUPrice();
        let qty = allItems[i].getItemQty();
        let buy = allItems[i].getItemBQty();


        var code = `<tr><td>${id}</td><td>${name}</td><td>${uprice}</td><td>${qty}</td><td>${buy}</td></tr>`;
        $('#tblOrderItem').append(code);

        let subTot = parseFloat(parseFloat(uprice) * parseFloat(buy));
        $('#subTot').val(subTot);
        calcTotal();

        $('#tblOrderItem tbody tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let name = $(this).children('td:eq(1)').text();
            let uprice = $(this).children('td:eq(2)').text();
            let qty = $(this).children('td:eq(3)').text();
            let buy = $(this).children('td:eq(4)').text();


            // $('#cmbItem').
            $('#hiddnitemID').val(id);
            $('#itemName').val(name);
            $('#uprice').val(uprice);
            $('#available').val(qty);
            $('#buyqty').val(buy);
        });
        dblCartItemClick();
    }
}

function dblCartItemClick() {
    //dbl click event to delete
    $('#tblOrderItem tbody tr').on('dblclick', function () {
        let itemID = $('#hiddnitemID').val();
        let option = confirm(`Do you want to Deletd ID:${itemID}`);
        if (option) {
            console.log(itemID);
            let res = deletecartItem(itemID);
            if (res) {
                $(this).remove();
                alert("Item Removed in cart");
                clearCartItem();
            } else {
                alert("Remove Failed")
            }
        }
    });
}

//search item in cart
function searchItemCart(id) {
    for (let i in cartArr) {
        if (cartArr[i].getItemID() == id) return cartArr[i];
    }
    return null;
}

//delete dbl click
function deletecartItem(id) {
    let item = searchItemCart(id);
    if (item != null) {
        let number = cartArr.indexOf(item);

        cartArr.splice(number, 1);
        //load all items to table
        calcTotal();
        addItemToTable();
        clearCartItem();
        return true;
    } else {
        return false;
    }
}

//calc tot
function calcTotal() {
    let total = parseFloat(0.0);
    for (let i in cartArr) {
        let uprice = parseFloat(cartArr[i].getItemUPrice());
        let bqty = parseFloat(cartArr[i].getItemBQty());
        total = total + (uprice * bqty);
    }


    $('#total').val(total);
    return total;
}

function clearCartItem() {
    loadAllItemsID();

    $('#itemName').val('');
    $('#available').val('');
    $('#uprice').val('');
    $('#buyqty').val('');
}

//delete item in click
$('#btnCartItemRemove').click(function () {
    dblClickDel();
});

function duplicateItemsCheck(id) {

    for (let i in cartArr) {
        if (cartArr[i].getItemID() == id) {
            let bqty = parseInt($('#buyqty').val()) + parseInt(cartArr[i].getItemBQty());
            console.log('bqty' + bqty);
            if (checkBQty(bqty)) {
                cartArr[i].setItemBQty(bqty);
                addItemToTable();
            } else {
                $('#buyqty').css('border', '2px solid green');
                $('#available').css('border', '2px solid white');
                $("#lblBuyQty").text("Out of Stock");
            }
            return true;

        }
    }
    return false;
}

//cash event
$('#cash').on('keyup', function () {
    if (/^[0-9.]{1,}$/.test($('#cash').val())) {
        $('#cash').css('border', '2px solid green');
        $("#lblCash").text("");
        let bal = parseFloat(parseFloat($('#cash').val()) - calcTotal());
        $('#balance').val(bal);
    } else {
        $('#cash').css('border', '2px solid red');
        $("#lblCash").text("Your Input Data Format is Wrong (95.50)");
    }
});

//discount event
$('#discount').on('keyup', function () {
    if (/^[0-9.]{1,}$/.test($('#discount').val())) {
        $('#discount').css('border', '2px solid green');
        $("#lblDis").text("");

        let newBal = parseFloat(calcTotal() - (calcTotal() * (parseFloat($('#discount').val()) / 100)));
        $('#balance').val(newBal);
    } else {
        $('#discount').css('border', '2px solid red');
        $("#lblDis").text("Your Input Data Format is Wrong (5.5)");
    }
});

function checkingCart() {
    if (cartArr.length > 0) {
        return true;
    } else {
        return false;
    }
}

function checkingOrderID() {
    if ($('#orderId').val() != null) {
        return true
    }
    return false;
}

//place order
function placeOrderAction(oid, cid, detail, tot, date) {
    if (checkingOrderID()) {
        console.log('chck ');

        if (checkingDate()) {
            console.log('chck 1');
            if (checkCustomerFill()) {
                console.log('chck 2');

                if (checkingCart()) {
                    console.log('chck 3');

                    if (checkCash()) {
                        console.log('chck 4');

                        if (checkBalnce()) {
                            console.log('chck 5');

                            let ord = new OrderDTO(oid, cid, detail, tot, date);
                            orderArr.push(ord);
                            return true;
                        } else {
                        }
                    } else {
                        $('#cash').css('border', '2px solid red');
                        $("#lblCash").text("Your Input Data Format is Wrong (95.50)");
                    }
                } else {
                    $('#cmbItem').css('border', '2px solid red');
                    $("#lblOItemID").text("Add Items to cart");
                }
            } else {
                $('#cmbCustID').css('border', '2px solid red');
                $("#lblCustomerID").text("Select Customer ID");
            }
        } else {
            $('#orderDate').css('border', '2px solid red');
            $("#lblOrdDate").text("Choose Date");
        }
    } else {

    }
    return false;
}

//Recipt
function printReciept(oid, cid, detail, tot, date) {
    let totle = $('#total').val();
    let cash = $('#cash').val();
    let balance = $('#balance').val();
    Swal.fire({
        position: 'center',
        icon: 'success',
        html: "Order ID : <br />" + oid + "<br />Date : " + date + "<br />Customer ID : " +cid+ "<br />No of Item : " + cartArr.length + "<br />Total(Rs.) : " + totle + "<br /><br/>Cash(Rs.) : " + cash + "<br />Balanace(Rs.) : " + balance,
        title: 'SP cafe - Receipt',
        footer: 'Happy Customer....! Come Back...!',
        confirmButtonText: 'Ok',

    });

    cartArr.splice(0, cartArr.length);
}

function printError() {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops, Failed Place Order',
        text: 'Try Again...!',
        showConfirmButton: false,
        timer: 1500
    });
}


//plase order btn event
$('#btnPlaceOrder').click(function () {


    let res = placeOrderAction($('#orderId').val(), $('#cmbCustID option:selected').text(), cartArr, $('#total').val(), $('#orderDate').val());
    if (res) {
        printReciept($('#orderId').val(), $('#cmbCustID option:selected').text(), cartArr, $('#total').val(), $('#orderDate').val());

        genatareOID();
        clearForm();
    } else {
        printError();

    }

});

//check date
function checkingDate() {
    $('#orderDate').val();
    return true;
}

function checkCash() {
    let cash = parseFloat($('#cash').val());
    if (cash > 0) {
        return true;
    } else {
        $('#balance').css('border', '2px solid red');
        $('#lblBalance').text("");
        return false;
    }

}

function checkBalnce() {
    let bal = parseFloat($('#balance').val());
    if (bal > 0) {
        return true;
    } else {
        $('#balance').css('border', '2px solid red');
        $('#lblBalance').text("");
        return false;

    }
}

//clear form

function clearForm() {
    loadAllCustomersID();
    $('#tblOrderItem tbody tr').empty();
    $('#cash').val('0.0');
    $('#subTot').val('0.0');
    $('#total').val('0.0');
    $('#balance').val('0.0');
    $('#discount').val('0.0');
    $('#cmbCustID').focus();
}