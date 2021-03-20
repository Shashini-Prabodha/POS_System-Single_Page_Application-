function Cart(ordID,itemID, name, unitPrice, qty,img) {
    var __ordID=ordID;
    var __itemID=itemID;
    var __name=name;
    var __unitPrice=unitPrice;
    var __qty=qty;
    var __img=img;

    this.getOrderID=function (){
        return __itemID;
    }
    this.setOrderID=function (newOrdID) {
        __ordID=newOrdID;
    }
    this.getItemID=function (){
        return __itemID;
    }
    this.setItemID=function (newitemID) {
        __itemID=newitemID;
    }
    this.getItemName=function (){
        return __name;
    }
    this.setItemName=function (newName) {
        __name=newName;
    }
    this.getItemUPrice=function (){
        return __unitPrice;
    }
    this.setItemUPrice=function (newPrice) {
        __unitPrice=newPrice;
    }
    this.getItemQty=function (){
        return __qty;
    }
    this.setItemQty=function (newQty) {
        __qty=newQty;
    }
    this.getItemImg=function (){
        return __img;
    }
    this.setItemUImg=function (newImg) {
        __img=newImg;
    }

}