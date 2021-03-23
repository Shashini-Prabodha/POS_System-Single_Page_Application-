function OrderDTO(oid, cid, detail,tot, date) {
    var __oid=oid;
    var __cid=cid;
    var __detail=detail;
    var __tot=tot;
    var __date=date;


    this.getOrdformId=function (){
        return __oid;
    }
    this.setOrdFormId=function (newOid) {
        __oid=newOid;
    }
    this.getCustId=function (){
        return __cid;
    }
    this.setCustId=function (newCid) {
        __cid=newCid;
    }
    this.getIDetail=function (){
        return __detail;
    }
    this.setIDetail=function (newIDetail) {
        __detail=newIDetail;
    }
       this.getTotalAmount=function (){
        return __tot;
    }
    this.setTotalAmount=function (newTot) {
        __tot=newTot;
    }
    this.getDate=function (){
        return __date;
    }
    this.setDate=function (newDate) {
        __date=newDate;
    }


}