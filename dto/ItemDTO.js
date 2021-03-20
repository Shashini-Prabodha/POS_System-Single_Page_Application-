function ItemDTO(id, name, unitPrice, qty,img,type) {
    var __id=id;
    var __name=name;
    var __unitPrice=unitPrice;
    var __qty=qty;
    var __img=img;
    var __type=type;

    this.getItemID=function (){
        return __id;
    }
    this.setItemID=function (newID) {
        __id=newID;
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
    this.getItemType=function (){
        return __type;
    }
    this.setItemType=function (newType) {
        __type=newType;
    }

}