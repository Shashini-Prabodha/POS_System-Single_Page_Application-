function Order(oid, cid, date, total) {
    var __oid=oid;
    var __cid=cid;
    var __date=date;
    var __total=total;

    this.getOrdoid=function (){
        return __oid;
    }
    this.setOrderoid=function (newOid) {
        __oid=newOid;
    }
    this.getCustId=function (){
        return __oid;
    }
    this.setCustId=function (newOid) {
        __oid=newOid;
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