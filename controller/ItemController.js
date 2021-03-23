$('#itemLink').click(function () {
    $('#ItemSection').fadeIn(1000);
});


$('#floatingInputItemID').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#floatingInputItemName').focus();
        }
        checkItemID();
    }
);

$('#floatingInputItemName').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#floatingInputUPrice').focus();
        }
        checkItemName();
    }
);

$('#floatingInputUPrice').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#floatingInputQty').focus();
        }
        checkUPrice();

    }
);

$('#floatingInputQty').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#formFile').focus();
        }
        checkQty();
    }
);

$('#formFile').on('keyup', function (event) {
        checkFileChoose();

        if (event.key == 'Enter') {
            event.preventDefault();
            $('.foodType').css('border-color', 'red');
            $('#rbtnMeal').focus();
        }
    }
);

$('#rbtnMeal,#rbtnDes').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#saveItem').focus();
        }
        // checkQty();
    }
);
function alertSsItm() {
    Swal.fire({
        position: 'top',
        icon: 'success',
        text:'Saved Item...!',
        title: 'Succsess',
        showConfirmButton: false,
        timer: 1500
    });
}

//key event to save
$('#saveItem').on('keyup', function (event) {

    if (event.key == 'Enter') {
        $('#floatingInputItemID').focus();
        let res = saveItem($('#floatingInputItemID').val(), $('#floatingInputItemName').val(), $('#floatingInputUPrice').val(), $('#floatingInputQty').val(), $('#formFile').val(), getSelectedRbtn(), imgsrc);
        if (res) {
            alertSsItm();
            clearAllItemText();
            $('#floatingInputItemID').focus();
            genatareItemID();
        }
    }

});

$('#txtSearchItem').on('keyup', function (event) {

        if (event.key == 'Enter') {
            $('#btnItemSearch').focus();
        }
    }
);
$('#btnItemSearch').click(function () {

    scrhItem();

});

$('#btnItemSearch').on('keyup', function (event) {

    if (event.key == 'Enter') {
        scrhItem();

    }
});

function scrhItem() {
    let item = searchItem($('#txtSearchItem').val());
    console.log(item)
    if (item == null) {
        alert("Can't Found Item ")
    } else {
        $('#floatingInputItemID').val(item.getItemID());
        $('#floatingInputItemName').val(item.getItemName());
        $('#floatingInputUPrice').val(item.getItemUPrice());
        $('#floatingInputQty').val(item.getItemQty());
        setFImage(item.getItemImg());
    }
}

$('#floatingInputItemID,#floatingInputItemName,#floatingInputUPrice,#floatingInputQty').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

let Ftype;
//Save item in click btn
$('#saveItem').click(function () {

    let res = saveItems($('#floatingInputItemID').val(), $('#floatingInputItemName').val(), $('#floatingInputUPrice').val(), $('#floatingInputQty').val(), $('#formFile').val(), Ftype);
    if (res) {
        clearAllItemText();
        alertSsItm();
        $('#floatingInputItemID').focus();
        genatareItemID();

    }

});

//update item in click btn
$('#updateItem').click(function () {
    let itemID = $("#floatingInputItemID").val();

    let option = confirm(`Do you want to Update ID:${itemID}`);
    if (option) {
        let res = updateItems($('#floatingInputItemID').val(), $('#floatingInputItemName').val(), $('#floatingInputUPrice').val(), $('#floatingInputQty').val());
        if (res) {
            clearAllItemText();
            alert("Item Updated");
        } else {
            alert("Update Failed")
        }
    }

});

//Delete item in click btn
$('#delItem').click(function () {
    let itemID = $("#floatingInputItemID").val();

    let option = confirm(`Do you want to Update ID:${itemID}`);
    if (option) {
        let res = deleteItems(itemID);
        if (res) {
            clearAllItemText();
            alert("Item Deleted");
        } else {
            alert("Delete Failed")
        }
    }

});

//Clear item
$('#clearItem').click(function () {
    clearAllItemText();
});

$('#ItemSection tr').css('cursor', 'pointer');

//.............CRUD......................

function checkRbtn() {
    let val = $(".foodType input[type='radio']:checked").val();
    if (val == null) {
        $('#rbtnMeal').focus();
        $('#lblRbtn').text('Please Select food type');
        return false;
    } else {
        $('.foodType').css('border-color', '#bababa');
        $('#lblRbtn').text('');

        Ftype = val;
        console.log(val);
        return true;
    }
}

$('#rbtnDes,#rbtnMeal').click(function () {
    $('#lblRbtn').text('');
    $('.foodType').css('border-color', '#bababa');

});

function setDef() {
    $('#rbtnMeal').attr("checked", false);
    console.log($('#rbtnMeal').attr("checked", false));
    $('#rbtnDes').attr("checked", false);
    imgsrc = 'assests/icon/nonamefood.png';
    $('#foodImg').attr('src', imgsrc);
    $('#formFile').val('');

}

//save customer
function saveItems(id, name, uprice, qty, img, type,) {
    if (checkItemID()) {
        if (checkItemName()) {
            if (checkUPrice()) {
                if (checkQty()) {
                    if (checkRbtn()) {
                        if (checkDuplicteItemID(id)) {
                            $('#floatingInputItemID').css('border', '2px solid red');
                            $("#lblItemID").text("Duplicate ID (I1)");
                        } else {

                            let item = new ItemDTO(id, name, uprice, qty, img, type);
                            itemArr.push(item);

                            inputFieldColor();
                            //load all item to table
                            loadItemtoTheTable();

                            $('#tblItem tbody tr').click(function () {
                                let id = $(this).children('td:eq(0)').text();
                                let name = $(this).children('td:eq(1)').text();
                                let uprice = $(this).children('td:eq(2)').text();
                                let qty = $(this).children('td:eq(3)').text();

                                $('#floatingInputItemID').val(id);
                                $('#floatingInputItemName').val(name);
                                $('#floatingInputUPrice').val(uprice);
                                $('#floatingInputQty').val(qty);
                                getSelectedRbtn();
                                setFImage(searchItem(id).getItemImg());
                            });
                            // $('#floatingInputCID').focus();
                            dblItemClick();
                            setDef();
                            return true;
                        }
                    } else {
                    }
                } else {
                    $('#floatingInputQty').css('border', '2px solid red').focus();
                }
            } else {
                $('#floatingInputUPrice').css('border', '2px solid red').focus();
            }
        } else {
            $('#floatingInputItemName').css('border', '2px solid red').focus();
        }
    } else {
        $('#floatingInputItemID').css('border', '2px solid red').focus();
    }
    return false;

}

//delete items
function deleteItems(id) {
    let item = searchItem(id);
    if (item != null) {
        let number = itemArr.indexOf(item);
        itemArr.splice(number, 1);
        //load all items to table
        loadItemtoTheTable();
        clearAllItemText();
        $('#floatingInputItemID').val(genatareItemID());

        return true;
    } else {
        return false;
    }

}

//update item
function updateItems(id, name, uprice, qty) {
    if (checkItemID()) {
        if (checkItemName()) {
            if (checkUPrice()) {
                if (checkQty()) {
                    if (checkFImg()) {
                        let item = searchItem(id);
                        if (item != null) {
                            item.setItemName(name);
                            item.setItemUPrice(uprice);
                            item.setItemQty(qty);

                            //load all item to table
                            loadItemtoTheTable();
                            inputFieldColor();

                            $('#tblItem tbody tr').click(function () {
                                let id = $(this).children('td:eq(0)').text();
                                let name = $(this).children('td:eq(1)').text();
                                let uprice = $(this).children('td:eq(2)').text();
                                let qty = $(this).children('td:eq(3)').text();


                                $('#floatingInputItemID').val(id);
                                $('#floatingInputItemName').val(name);
                                $('#floatingInputUPrice').val(uprice);
                                $('#floatingInputQty').val(qty);

                                // $('#floatingInputCID').attr('disabled', 'disabled');

                            });
                            dblItemClick();
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        $('#formFile').css('border', '2px solid red').focus();
                    }
                } else {
                    $('#floatingInputQty').css('border', '2px solid red').focus();
                }
            } else {
                $('#floatingInputUPrice').css('border', '2px solid red').focus();
            }
        } else {
            $('#floatingInputItemName').css('border', '2px solid red').focus();
        }
    }
    return false;

}

//get All items
function getAllItem() {
    return itemArr;
}

//search item
function searchItem(id) {
    for (let i in itemArr) {
        if (itemArr[i].getItemID() == id) return itemArr[i];
    }
    return null;
}

//load all items to table
function loadItemtoTheTable() {
    let allItems = getAllItem();
    $('#tblItem tbody tr').empty();
    for (let i in allItems) {
        let id = allItems[i].getItemID();
        let name = allItems[i].getItemName();
        let uprice = allItems[i].getItemUPrice();
        let qty = allItems[i].getItemQty();
        let img = allItems[i].getItemImg();

        var code = `<tr><td>${id}</td><td>${name}</td><td>${uprice}</td><td>${qty}</td></tr>`;
        $('#tblItem').append(code);

        $('#tblItem tbody tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let name = $(this).children('td:eq(1)').text();
            let uprice = $(this).children('td:eq(2)').text();
            let qty = $(this).children('td:eq(3)').text();

            $('#floatingInputItemID').val(id);
            $('#floatingInputItemName').val(name);
            $('#floatingInputUPrice').val(uprice);
            $('#floatingInputQty').val(qty);
            console.log(img);
            let text = img.split('\\').pop();
            $('#foodImg').attr('src', 'assests/icon/' + text);

            // $('#floatingInputCID').attr('disabled', 'disabled');

        });

    }
}

//clear all items text
function clearAllItemText() {
    genatareItemID();
    $('#floatingInputItemName').val('');
    $('#floatingInputUPrice').val('');
    $('#floatingInputQty').val('');
    $('#txtSearchItem').val('');
    setDef();
}

//key events add to input fields
function checkItemID() {
    if (/^(I)[0-9]{1,3}$/.test($('#floatingInputItemID').val())) {


        $('#floatingInputItemID').css('border', '2px solid green');
        $("#lblItemID").text(" ");
        return true;

    } else {
        $('#floatingInputItemID').css('border', '2px solid red');
        $("#lblItemID").text("Your Input Data Format is Wrong (T1)");
    }
    return false;

}

function checkItemName() {
    if (/^[A-z,0-9. ]{1,}$/.test($('#floatingInputItemName').val())) {
        $('#floatingInputItemName').css('border', '2px solid green');
        $("#lblItemName").text(" ");
        return true;
    } else {
        $('#floatingInputItemName').css('border', '2px solid red');
        $("#lblItemName").text("Your Input Data Format is Wrong (Lux)");
    }
    return false;

}

function checkUPrice() {
    if (/^[0-9.]{1,}$/.test($('#floatingInputUPrice').val())) {
        $('#floatingInputUPrice').css('border', '2px solid green');
        $("#lblUPrice").text(" ");
        return true;
    } else {
        $('#floatingInputUPrice').css('border', '2px solid red');
        $("#lblUPrice").text("Your Input Data Format is Wrong (95.50)");
    }
    return false;
}

function checkQty() {
    if (/^[0-9]{1,}$/.test($('#floatingInputQty').val())) {//  ("^\\d{10}$")
        $('#floatingInputQty').css('border', '2px solid green');
        $("#lblItemQty").text(" ");
        return true;
    } else {
        $('#floatingInputQty').css('border', '2px solid red');
        $("#lblItemQty").text("Your Input Data Format is Wrong (10)");

    }
    return false;
}

function checkFImg() {
    if ($('#formFile').text() != null)
        return true;

    return false;
}

function checkDuplicteItemID(id) {
    let allItems = getAllItem();
    for (let i in allItems) {
        if (id == allItems[i].getItemID()) {
            return true;
        }
        return false;
    }
}

function inputFieldColor() {
    $('#floatingInputItemID').css('border', '1px solid white');
    $('#floatingInputItemName').css('border', '1px solid white');
    $('#floatingInputUPrice').css('border', '1px solid white');
    $('#floatingInputQty').css('border', '1px solid white');

}

function genatareItemID() {
    let LastId = itemArr[itemArr.length - 1].getItemID();
    $('#floatingInputItemID').val('I' + (parseInt(LastId.split('I')[1]) + 1));
}

$('#floatingInputItemID').val('I1');

let imgsrc;
$('#formFile').on('change', function () {
    setFImage($('#formFile').val());

});

function setFImage(img) {
    let text = img.split('\\').pop();
    imgsrc = 'assests/icon/' + text;
    $('#foodImg').attr('src', imgsrc);
}

function getSelectedRbtn(value) {
    return value;
}

function dblItemClick() {
    //dbl click event to delete
    $('#tblItem tr').on('dblclick', function () {
        let itemID = $("#floatingInputItemID").val();

        let option = confirm(`Do you want to Deletd ID:${itemID}`);
        if (option) {
            $(this).remove();

            let res = deleteItems(itemID);
            if (res) {
                alert("Item Deleted");
                clearAllItemText();
            } else {
                alert("Delete Failed")
            }
        }
    });
}


function checkFileChoose() {

    if ($('#formFile').val() == '') {
        imgsrc = 'assests/icon/nonamefood.png';
        $('#foodImg').attr('src', imgsrc);

    } else {

    }
    return true;
}