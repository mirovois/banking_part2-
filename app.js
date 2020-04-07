var transactionController = (function(){

    var Debit = function(id,value) {
      this.id = id;
      this.value = value;
    };
    var Credit = function(id,value) {
      this.id = id;
      this.value = value;
    };
    var data = {
      allTrans:{
        chk:[],
        crd:[]
      },
      totals:{
        chk:500,
        crd:500
      }
    };
    return {
      addDeposit:function(deposit){
      return {
        deposits:{
          checkingDeposit:data.allTrans.chk.push(deposit),
          creditDeposit: data.allTrans.crd.push(200)
        } }
      },
      addTransfer:function(acc,value){
        var newTransfer;
        if (acc==="chk") {
          newTransfer = new Credit(value)
        } else if (acc ==="crd") {
          newTransfer = new Debit(value)
        };
        data.allTrans[acc].push(newTransfer);
        return newTransfer;
      },

      testing: function(){
        console.log(data);
      }
  }
})();

var UIController = (function(){
    var DOMdata = {
        depositValue:".deposit-value",
        transferValue:".transfer-value",
        fromAccount:"#from",
        toAccount:"#to",
        depositBtn:".btn-deposit",
        transferBtn:".btn-transfer"
    };
    return {
        getInput:function() {
            return parseInt(document.querySelector(DOMdata.depositValue).value);
        },
        getTransfer:function() {
            return {
              accountSend: document.querySelector(DOMdata.fromAccount).value,
              accountReceive: document.querySelector(DOMdata.toAccount).value,
              amountTransfered: parseInt(document.querySelector(DOMdata.transferValue).value)
            };
               },
        getDOMdata: function() {
            return DOMdata;
    }
  };
    })();



var controller = (function(transControl,UIControl){
  
  var setupEventListeners = function(){
    var DOM = UIControl.getDOMdata();
    document.querySelector(DOM.depositBtn).addEventListener("click",makeDeposit); 
    document.querySelector(".btn-transfer").addEventListener("click", makeTransfer);
    document.addEventListener('keypress', function(e){
      if (e.keyCode ===13) {
      makeTransfer();
      }
    });
    
  };
  var makeDeposit = function(){
    var input;
    input = UIControl.getInput();
    console.log(input);
  };
  
  var makeTransfer = function() {
    console.log("Ready to transfer")
    var transfer = UIControl.getTransfer();
    console.log(transfer);
    // var transf = transControl.makeTransfer(addTransfer);
  };
  

  


    // 1. Get input data

      //   startValue = transControl.addDeposit(input);


      // 2. Add input data to the transaction controller

    // 3. Add input to UI

    // 4.Get data which will be transfered



     // 2.Add deposit to the budget controller

     //  3. Fetch the data to UI
    //  
  return {
        init:function(){
        console.log("Application started");
        setupEventListeners();
    }

  };
})(transactionController,UIController);

controller.init();
