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
      allTransfers:{
        chk:[],
        crd:[]
      },
      totals:{
        chk:0,
        crd:0
      }
    };
    return {
      addDeposit:function(deposit){
      return {
        deposits:{
          checkingDeposit:data.allTransfers.chk.push(new Credit(0,deposit)),
          creditDeposit: data.allTransfers.crd.push(new Debit(0,200))
        } }
      },

      addTransfer:function(acc,val){
        var newTransfer,ID;
        if(data.allTransfers[acc].length>1) {
          ID = data.allTransfers[acc][data.allTransfers[acc].length-1].id+1;
        } else {
          ID = 1;
        }
        
        if (acc==="chk") {
          newTransfer = new Credit(ID,val)
        } else if (acc ==="crd") {
          newTransfer = new Debit(ID,val)
        };
        data.allTransfers[acc].push(newTransfer);
        return newTransfer;
      },

      testing: function(){
        console.log(data);
      }
  };
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
    document.querySelector(DOM.transferBtn).addEventListener("click", ctrlAddtransfer);
    document.addEventListener('keypress', function(e){
      if (e.keyCode ===13) {
      makeTransfer();
      }
    });
    
  };
  //  Get deposit data and add it to the transaction controller
  var makeDeposit = function(){
    console.log("Deposit is:");
    var input;
    input = UIControl.getInput();
    console.log(input);
    startValue = transControl.addDeposit(input);
  };
  var ctrlAddtransfer = function(){
    console.log("Ready to transfer");
    
    var inputTransfer, newTransf;
 
    // 1.Get transfer data
    var inputTransfer = UIControl.getTransfer();
    console.log(inputTransfer);
 
    // 2. Add the transfer item to the transaction controller
    newTransf = transControl.addTransfer(inputTransfer.accountReceive,inputTransfer.amountTransfered);
  };

    // 3. Add input to UI
    // - create html

    // -replace placeholders with actual data

    // -add DOM element on the page

    
    // 4.Get data which will be transfered



     // 2.Add deposit to the budget controller

     //  3. Fetch the data to UI
     
  return {
        init:function(){
        console.log("Application started");
        setupEventListeners();
    }

  };
})(transactionController,UIController);

controller.init();
