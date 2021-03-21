function OrderDTO(oid, cid,itmid,qty, date, total) {
    var __oid=oid;
    var __cid=cid;
    var __itmid=itmid;
    var __qty=qty;
    var __date=date;
    var __total=total;

    this.getOrderid=function (){
        return __oid;
    }
    this.setOrderoid=function (newOid) {
        __oid=newOid;
    }
    this.getCustId=function (){
        return __cid;
    }
    this.setCustId=function (newCid) {
        __cid=newCid;
    }
    this.getItemId=function (){
        return __itmid;
    }
    this.setItemtId=function (newIid) {
        __itmid=newIid;
    }
       this.getQty=function (){
        return __qty;
    }
    this.setQty=function (newQty) {
        __qty=newQty;
    }
    this.getDate=function (){
        return __date;
    }
    this.setDate=function (newDate) {
        __date=newDate;
    }
    this.getTotal=function (){
            return __total;
    }
    this.setTotal=function (newTot) {
        __total=newTot;
    }

}