
// TRANSACTION module
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
        // var newDepot;
        // if (acc==="chk") {
        //   newDepot = new Debit(0,val)
        // } else if (acc ==="crd") {
        //   newDepot = new Credit(0,200)
        // };
        // data.allTransfers[acc].push(newDepot);
        // return newDepot;
      

        return{
          deposits:{
            checkingDeposit:data.allTransfers.chk.push(new Credit(0,deposit)),
            creditDeposit: data.allTransfers.crd.push(new Debit(0,200))
          } 
        }
        
        
      
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

// UI module
var UIController = (function(){
    var DOMdata = {
        depositValue:".deposit-value",
        checkingValue:".chk",
        creditValue:".crd",
        transferValue:".transfer-value",
        fromAccount:"#from",
        toAccount:"#to",
        depositBtn:".btn-deposit",
        transferBtn:".btn-transfer",
        debitList:".debit-list",
        creditList:".credit-list"
    };
    return {
        getInput:function() {
            return parseInt(document.querySelector(DOMdata.depositValue).value);
        },
        // addDepositValue:function(obj){         
        // },

        getTransfer:function() {
            return {
              accountSend: document.querySelector(DOMdata.fromAccount).value,
              accountReceive: document.querySelector(DOMdata.toAccount).value,
              amountTransfered: parseInt(document.querySelector(DOMdata.transferValue).value)
            };
               },
        addTransferItem:function(obj,acc){
          var html, newHTML, element;
          // Create HTML string with placeholder text
          if (acc ==="chk"){
            element = DOMdata.debitList;
            html = '<div class = "transaction-fix" id = "debit-%id%"><div class = "transaction-description"><h4>from checking account to credit account</h4></div><div class="transaction-value">%value%</div></div>';
          } else if (acc = "crd") {
            element = DOMdata.creditList;
            html = '<div class = "transaction-fix" id = "credit-%id%"><div class = "transaction-description"><h4>from credit account to checking account</h4></div><div class="transaction-value">%value%</div></div>';
          }
          // REplace the placeholder text with actual data
          newHTML = html.replace('%id%', obj.id);
          newHTML = newHTML.replace('%value%', obj.value);
          // add DOM element on the page
          document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
        },
        getDOMdata: function() {
            return DOMdata;
    }
  };
    })();


//CONTROLLER Module 

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
    // 1. Ger deposit value
    input = UIControl.getInput();
    console.log(input);
    // 2. Add the input to the transaction controller
    startValue = transControl.addDeposit(input);
    // console.log(startValue);
    // 3.Add the deposit to UI
    
    // UIControl.addDepositValue(startValue);
  };
  
  var ctrlAddtransfer = function(){
    console.log("Ready to transfer");
    
    var inputTransfer, newTransf;
 
    // 1.Get transfer data
    var inputTransfer = UIControl.getTransfer();
    console.log(inputTransfer);
 
    // 2. Add the transfer item to the transaction controller
    newTransf = transControl.addTransfer(inputTransfer.accountReceive,inputTransfer.amountTransfered);
    
    // 3. Add input to UI 
    UIControl.addTransferItem(newTransf,inputTransfer.accountReceive);
  };  
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
