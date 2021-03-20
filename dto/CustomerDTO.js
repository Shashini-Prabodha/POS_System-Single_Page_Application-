function CustomerDTO(cid, name, address, tp) {
    var __cid=cid;
    var __name=name;
    var __address=address;
    var __tp=tp;

    this.getCustomerID=function (){
        return __cid;
    }
    this.setCustomerID=function (newID) {
        __cid=newID;
    }
    this.getCustomerName=function (){
        return __name;
    }
    this.setCustomerName=function (newName) {
        __name=newName;
    }
    this.getCustomerAddr=function (){
        return __address;
    }
    this.setCustomerAddr=function (newAddr) {
        __address=newAddr;
    }
    this.getCustomerTP=function (){
        return __tp;
    }
    this.setCustomerTP=function (newTp) {
        __tp=newTp;
    }
}