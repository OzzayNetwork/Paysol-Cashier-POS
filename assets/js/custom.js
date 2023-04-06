var paymentMethod="",
activeSplitInput=$('.phone-split-input')
function removingCommass(amount){
    amount = parseFloat(amount.replace(/,/g, ''));
    return amount
}
function addingCommas(amount){
    amount=amount.toLocaleString("en")
    return amount
}

function clearBill(){
    $(".menu-checkout-items tbody tr").each(function(index) {
        $(this).remove()
    });

    $(".menu-slip-checkout .card-footer button").each(function(index) {
        $(this).addClass('disabled').prop('disabled', true).removeClass('active'); 
    });  
    $('.empty-cart').removeClass("d-none") 
    $('.menu-slip-checkout .card-header').addClass("d-none")
    $('.total-container').addClass("d-none")  
    $('.menu-checkout-items').addClass('d-none') 
    $(".menu-item").each(function(index) {
        $(this).removeClass('selected-item')
     }); 
     paymentMethod=""
     
}

var clickedItemIndex
var initialQty=0

// reducing item quantity function
function reduceQty(itemIndex,itemQty){
    var itemQtyAmt=parseFloat($('.menu-item').eq(itemIndex).find('.item-qty').text())
    var thevariance=parseInt(itemQty)+parseInt(initialQty)
    var newAmount=itemQtyAmt-thevariance
    $('.menu-item').eq(itemIndex).find('.item-qty').text(newAmount)
    initialQty=0
}

// inital item counts
let defaultItemValues=[]
for (var i = 0; i < $('.menu-item').length; i++){
   var itemCount=$('.menu-item').find('.item-qty').eq(i).text()
   var itemIndex=i
   defaultItemValues[i]=itemCount
}

function restoreCountVal(itemIndex){
    var itemQty=defaultItemValues[itemIndex]
    $('.menu-item').eq(itemIndex).find('.item-qty').text(itemQty)
}

$(window).on('load', function() {
    $('body').on('click', '.upload-the-contacts', function() {
        $('.selected-contacts-message').removeClass('d-none')

    })
    $('body').on('click', '.write-msg-btn', function() {
        $('.email-overlay').removeClass('d-none')
        setTimeout(function() {
            $('.the-message-maker').addClass('email-overlay-transform');
        }, 0)

    });
    $('body').on('click', '.close-message-maker', function() {
        $('.the-message-maker').removeClass('email-overlay-transform')
        setTimeout(function() {
            $('.email-overlay').addClass('d-none');
        }, 200);

    });

    
    $("body").on('change', '.contacts-table tbody input', function() {
        var theTable = $(this).parent().parent().parent().parent().parent();
        if ($(this).is(':checked')) {
            $('.delete-tool-bar').removeClass('d-none').prev().addClass('d-none');

            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                if (theColumn.is(':checked')) {
                    // alert('checked');
                    $('#selectAll').prop('checked', true);
                } else {
                    $('#selectAll').prop('checked', false);
                    return false
                }
            });
        } else {
            $('#selectAll').prop('checked', false);
        }
    })
    $('body').on('change', '#selectAll', function() {
        var theTable = $(this).parent().parent().parent().parent().siblings('tbody');

        if ($(this).is(':checked')) {
            $('.delete-tool-bar').removeClass('d-none').prev().addClass('d-none')
            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                theColumn.prop('checked', true)
            });

        } else {
            $('.delete-tool-bar').addClass('d-none').prev().removeClass('d-none');
            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                theColumn.prop('checked', false);
            });
        }
    })

    $('body').on('click', '.chat-list li', function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.chat-room-place-holder').addClass('d-none').siblings().removeClass('d-none')
    })

    $('.nav-yearly').on('click', function(){
        $('.vales-options-cont #annual-sales').removeClass('d-none').siblings().addClass('d-none')
        $('.select-week').addClass('d-none')
    })

    $('.nav-weekly').on('click', function(){
        $('.vales-options-cont #weekly-sales').removeClass('d-none').siblings().addClass('d-none');
        $('.select-week').removeClass('d-none')
    })



});

$(document).ready(function(){
    $('body').on('click','.fullscreen', function(){
        // alert("Fullscreen clicked")
        $('.the-message-maker').toggleClass('email-fullscreen')
        $('.email-overlay').toggleClass('email-overlay-fullscreen')
        $('.email-overlay').removeClass('p-relative')
        $(this).parent().parent().parent().parent().siblings().removeClass('d-none');
        $(this).children('i').toggleClass("bx-exit-fullscreen")
        $(this).children('i').toggleClass("bx-fullscreen")
    })

    $('body').on('click', '.minimize', function() {
        $(this).parent().parent().parent().parent().siblings().toggleClass('d-none');
        $('.email-overlay').toggleClass('p-relative')
        $('.the-message-maker').removeClass('email-fullscreen')
        $('.email-overlay').removeClass('email-overlay-fullscreen')

        $(".fullscreen").children('i').removeClass("bx-exit-fullscreen")
        $(".fullscreen").children('i').addClass("bx-fullscreen")
    });

    $(".clone-contacts").on('click', function(){
        // alert("clone clicked")
        var itemtoclone=$('.contact-cont row')
        $(itemtoclone).eq(0).clone(true).appendTo(".contact-cont")
    })
})
$(document).ready(function(){
    // date range picker
    $(function() {

        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
            $('#reportrange .selected-date').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);

    });
    // date range picker
})
$(document).ready(function(){
    $(document).ready(function() {
        $('.selectpicker').selectpicker();
        $('.selectpicker').selectpicker('render')
    });
})

$(document).ready(function(){
    // alert("setting date")
    function getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
      
        if(dd<10) {
            dd = '0'+dd
        } 
      
        if(mm<10) {
            mm = '0'+mm
        } 
      
        today = yyyy + '-' + mm + '-' + dd;
        // today = 0+':'+dd+'/'+mm+'/'+yyyy;
        console.log(today);
        // document.getElementById("example-date-input").value = today;
        $('#example-date-input').val(today)
       
      }
      
      
      window.onload = function() {
        getDate();
      };
})

// the scripts for the pos index section
$(document).ready(function(){

    function removingCommass(amount){
        amount = parseFloat(amount.replace(/,/g, ''));
        return amount
    }

    function gettingOrderTot(){
        // Getting totals
        var totalAmount=0
        $(".menu-checkout-items tbody tr").each(function(index) {
            var theAmount=removingCommass($(this).find('.checkout-item-price').text())
            console.log(theAmount)
            totalAmount=totalAmount+theAmount
        }); 
        
        $(".total-amount").text(addingCommas(totalAmount)+".00") 
        $(".totAMount").text(addingCommas(totalAmount)+".00") 
    }

    function gettingNumOfItems(){
        var menuItems=0
        $(".menu-checkout-items tbody tr").each(function(index) {
            var totalItems=parseInt($(this).find('.qty-count-txt').text())
            menuItems=menuItems+totalItems
        });
        $('.total-items').text(menuItems) 
        $('#items-cart span').text(menuItems) 
        $('#items-cart span').removeClass('d-none')
    }

    function addingCommas(amount){
        amount=amount.toLocaleString("en")
        return amount
    }

    $.fn.digits = function(){ 
        return this.each(function(){ 
            $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
        })
    }

    // calculator start
    var clickedNumber = document.querySelectorAll('[data-number]'), 
    resultDisplayed = false,
    clear = document.querySelectorAll('[data-clear]'),
    del=document.querySelectorAll('[data-delete]'),
    changeResults=$('#calc-count'),
    unitPrice=$('#calc-unit-price').text(),
    menuItemCounterCont,
    totalPriceCont,
    totalPrice,
    newString

    //adding the characters
    for (var i = 0; i < clickedNumber.length; i++){
        clickedNumber[i].addEventListener("click", function(e){
            unitPrice=$('#calc-unit-price').text()
           // storing current input string and its last character in variables - used later
            var currentString = $('#calc-count').text(); 
            var lastChar = currentString[currentString.length - 1];
           //alert(resultDisplayed)
           console.log(clear.html)

            // if result is not diplayed, just keep adding
            if(resultDisplayed===false){
                if(currentString=="0"){
                    currentString=""
                }                
                newString=currentString+$(this).text()
                $('#calc-count').text(newString)
                $(".calc-count-2").text(newString)
                
                totalPrice=parseInt(newString)*parseFloat(removingCommass(unitPrice))
                $('.calc-total').text(addingCommas(totalPrice)+".00")
            }

        })
    }

    //clearing the calc

    $('.calc-clear').on('click', function(){
        newString = "0";
        $('#calc-count').text(newString)
    })

    // deleting characters on the calculator
    $(del).on('click', function(){
        var currentString=changeResults.text()
        unitPrice=$('#calc-unit-price').text()
        //alert(unitPrice)
        if(currentString.length>1){
            newString=currentString.substr(0,currentString.length-1)
            changeResults.text(newString)
            $(".calc-count-2").text(newString)

            
        }
        else{
            newString=0
            changeResults.text(0)
            $(".calc-count-2").text(0)
           
        }

        totalPrice=parseInt(newString)*parseFloat(removingCommass(unitPrice))
        $('.calc-total').text(addingCommas(totalPrice))
    })

    //getting calc totals
    $('#calc-total').on('click', function(){
        menuItemCounterCont.find('.qty-count-txt').text(newString) 

        $('#the-calculator').find('.close').click()
        totalPriceCont.text(addingCommas(totalPrice)+".00")

        if(parseInt(newString)==0){
            totalPriceCont.parent().parent().find('.remove-checkout-item').click()
        }

        gettingOrderTot()
        gettingNumOfItems() 
        reduceQty(clickedItemIndex,newString)
           
    })

    //function that runs when the calc modal is closed
    $('#the-calculator').on('hidden.bs.modal', function () {
        unitPrice="0.00",
        menuItemCounterCont=""
        totalPriceCont="0.00"
        totalPrice="0.00"
        newString="0"

        $('#calc-count').text('0')
        $('.calc-count-2').text('0')
        $('#calc-unit-price').text('0.00')
        $('.calc-total').text(0.00)
    });

    


    // the calculator functioning end

    $("body").on('click','.add-qty', function(){
       var itemQuantity=parseFloat($(this).siblings('.qty-count').find('span').text())
       itemQuantity=itemQuantity+1

       $(this).siblings('.qty-count').find('.qty-count-txt').text(itemQuantity)

       var theMenuItem=parseFloat($(this).parent().parent().parent().find('.the-item-index').text())
        var itemPrice=$('.menu-items-options-cont>div').eq(theMenuItem).find('.menu-item').find('.menu-item-amount').text()
        $(this).parent().parent().parent().find('.checkout-item-price').text(addingCommas(itemPrice*itemQuantity)+".00")

       gettingOrderTot()
        gettingNumOfItems()
        reduceQty(theMenuItem,1)  
       
       
    })

    $("body").on('click','.minus-qty', function(){
        var itemQuantity=parseFloat($(this).siblings('.qty-count').find('span').text())
        
        
        if(itemQuantity==1){
            var theMenuItem=parseFloat($(this).parent().parent().parent().find('.the-item-index').text())
            $('.menu-items-options-cont>div').eq(theMenuItem).find('.menu-item').removeClass('selected-item')
            var theIndex=parseFloat($(this).parent().siblings('.checkout-num-cont').children('span').text())
            var theNumberOfItems=$('.menu-checkout-items').find("tbody").find("tr").length
            // alert(theIndex)
            $(this).parent().parent().parent().remove()

            $(".menu-checkout-items tbody tr").each(function(index) {
                $(this).find('.checkout-num').text(index+1)
            });  

            if(theNumberOfItems==1){
                $(".menu-slip-checkout .card-footer button").each(function(index) {
                    $(this).addClass('disabled').prop('disabled', true); 
                });  
                $('.empty-cart').removeClass("d-none") 
                $('.menu-slip-checkout .card-header').addClass("d-none")
                $('.total-container').addClass("d-none")  
                $('.menu-checkout-items').addClass('d-none') 
                $(".menu-item").each(function(index) {
                    $(this).removeClass('selected-item')
                }); 
            }
        }

        if(itemQuantity!=1){
            itemQuantity=itemQuantity-1
        }
        
        $(this).siblings('.qty-count').find('.qty-count-txt').text(itemQuantity)
        var theMenuItem=parseFloat($(this).parent().parent().parent().find('.the-item-index').text())
        var itemPrice=$('.menu-items-options-cont>div').eq(theMenuItem).find('.menu-item').find('.menu-item-amount').text()
        $(this).parent().parent().parent().find('.checkout-item-price').text(itemPrice*itemQuantity+".00")
        gettingOrderTot()
        gettingNumOfItems()  
        reduceQty(theMenuItem,-1)    
        
     })

    
    $("body").on('dblclick','.menu-item', function(){
        var itemIndex=$(this).parent().index()

        $('.menu-checkout-items table tbody tr').each(function(index){
            var itemIndexTr=$(this).find('.the-item-index').text()
            if(itemIndex==itemIndexTr){
                menuItemCounterCont=$(this).find('.qty-count')
                totalPriceCont=$(this).find('.checkout-item-price')
                newString=parseInt($(this).find('.qty-count').text())
                //alert(newString.toString())
            }
        })
        $('#calc-count').text(newString)
        $('.calc-count-2').text(newString)
        

        //alert(itemIndex)
        $("#the-calculator").modal('show')
        unitPrice=$(this).find('.menu-item-amount').text()
        var itemName=$(this).find('.menu-item-name').text()
        $('.selected-item-calc').text(itemName)
        $('#calc-unit-price').text(unitPrice)
        unitPrice=parseFloat(removingCommass(unitPrice))

        $('.calc-total').text(parseInt(newString)*unitPrice+".00")

        var defaultQty=parseInt(defaultItemValues[itemIndex])
        var cartQty=parseInt($(this).find('.item-qty').text())
        
       
        // alert("double clicked").dblclick()
        gettingOrderTot()
        gettingNumOfItems()
        clickedItemIndex=itemIndex
        initialQty=parseInt(defaultQty-cartQty)
    })

    //mouse hold event starts here
    $("body").on('contextmenu','.menu-item', function(e){
        e.preventDefault()
        var itemIndex=$(this).parent().index()

        $('.menu-checkout-items table tbody tr').each(function(index){
            var itemIndexTr=$(this).find('.the-item-index').text()
            if(itemIndex==itemIndexTr){
                menuItemCounterCont=$(this).find('.qty-count')
                totalPriceCont=$(this).find('.checkout-item-price')
                newString=parseInt($(this).find('.qty-count').text())
                //alert(newString.toString())
            }
        })
        $('#calc-count').text(newString)
        $('.calc-count-2').text(newString)
        

        //alert(itemIndex)
        $("#the-calculator").modal('show')
        unitPrice=$(this).find('.menu-item-amount').text()
        var itemName=$(this).find('.menu-item-name').text()
        $('.selected-item-calc').text(itemName)
        $('#calc-unit-price').text(unitPrice)
        unitPrice=parseFloat(removingCommass(unitPrice))

        $('.calc-total').text(parseInt(newString)*unitPrice+".00")

        var defaultQty=parseInt(defaultItemValues[itemIndex])
        var cartQty=parseInt($(this).find('.item-qty').text())
        
       
        // alert("double clicked").dblclick()
        gettingOrderTot()
        gettingNumOfItems()
        clickedItemIndex=itemIndex
        initialQty=parseInt(defaultQty-cartQty)
    })

    $("body").on('click','.menu-item', function(){
        $('.empty-cart').addClass("d-none") 
        $('.menu-slip-checkout .card-header').removeClass("d-none")
        $('.total-container').removeClass("d-none")  
        $('.menu-checkout-items').removeClass('d-none')  
        
        $(".menu-slip-checkout .card-footer button").each(function(index) {
           $(this).removeClass('disabled').prop('disabled', false);
        });  
        
        // getting the clicked item details
       var itemName=$(this).find('.menu-item-name').text()
       var itemPrice=removingCommass($(this).find('.menu-item-amount').text())
       var theNumberOfItems=parseFloat($('.menu-checkout-items').find("tbody").find("tr").length)
       var clickedIndex=$(this).parent().index()
       var classToFind="selected-item-index"+clickedIndex
    //    alert(clickedIndex)
       if ($(this).hasClass("selected-item")) {
            var itemQty=parseFloat($(".menu-checkout-items tbody").find("."+classToFind).find(".qty-count-txt").text())
            //var totalItemPrice=parseFloat($(".menu-checkout-items tbody").find("."+classToFind).find(".checkout-item-price").text())
            $(".menu-checkout-items tbody").find("."+classToFind).find(".qty-count-txt").text(itemQty+1);
            $(".menu-checkout-items tbody").find("."+classToFind).find(".checkout-item-price").text(((itemQty+1)*itemPrice).toLocaleString("en")+".00");
            // $('.add-qty').find('span').click()
        }
        else{
            $('.menu-checkout-items tbody').append(`
            <tr class="selected-item-index`+clickedIndex+`">
                 <td class="checkout-num-cont">
                     <span class="pl-2 checkout-num">`+(theNumberOfItems+1)+`.</span>
                     <div class="the-item-index d-none">`+clickedIndex+`</div>
                 </td>
                 <td class="checkout-item-name">`
                     +itemName+
                     
                 `</td>
                 <td>
                     <div class="d-flex">
                         <a href="javascript: void(0);" class="d-inline-block minus-qty">
                             <div class="avatar-xs">
                                 <span class="avatar-title rounded-circle bg-dark bg-soft text-white font-size-16 waves-effect">
                                     <i class="bx bx-minus"></i>
                                 </span>
                             </div>
                         </a>
     
                         <a href="javascript: void(0);" class="d-inline-block mx-2 qty-count"  data-toggle="modal" data-target="#the-calculator">
                             <div class="avatar-xs">
                                 <span class="avatar-title rounded-circle bg-secondary bg-soft text-white qty-count-txt">
                                     1
                                 </span>
                             </div>
                         </a>
     
                         <a href="javascript: void(0);" class="d-inline-block add-qty">
                             <div class="avatar-xs">
                                 <span class="avatar-title rounded-circle bg-dark bg-soft text-white font-size-16 waves-effect">
                                     <i class="bx bx-plus"></i>
                                 </span>
                             </div>
                         </a>
                     </div>
                 </td>
                 <td class="text-right">KES <span class="checkout-item-price">`
                     +addingCommas(itemPrice)+
                 `.00</span></td>
                 <td>
                     <a href="javascript: void(0);" class="d-inline-block remove-checkout-item">
                         <div class="avatar-xs">
                             <span class="avatar-title rounded-circle bg-dark bg-soft text-white font-size-16 waves-effect">
                                 <i class="bx bx-x"></i>
                             </span>
                         </div>
                     </a>
                 </td>
            </tr>
            `)
        }

        $(this).addClass("selected-item")
        gettingOrderTot()
        gettingNumOfItems()

        if(paymentMethod===""){
            $('.place-order').addClass('disabled').prop('disabled', true);
        }

        reduceQty(clickedIndex,1)

      
    })

    $("body").on('click','.the-slip-btns button',function(){
        $(this).addClass("active").siblings().removeClass("active")
    })

    $("body").on("click",'.remove-checkout-item', function(){
        var theMenuItem=parseFloat($(this).parent().parent().find('.the-item-index').text())
        //alert(theMenuItem)
        $('.menu-items-options-cont>div').eq(theMenuItem).find('.menu-item').removeClass('selected-item')
        var theIndex=parseFloat($(this).parent().siblings('.checkout-num-cont').children('span').text())
        var theNumberOfItems=$('.menu-checkout-items').find("tbody").find("tr").length
        // alert(theIndex)
        $(this).parent().parent().remove()

        $(".menu-checkout-items tbody tr").each(function(index) {
            $(this).find('.checkout-num').text(index+1)
        });  

        if(theNumberOfItems==1){
        $(".menu-slip-checkout .card-footer button").each(function(index) {
            $(this).addClass('disabled').prop('disabled', true); 
        });  
        $('.empty-cart').removeClass("d-none") 
        $('.menu-slip-checkout .card-header').addClass("d-none")
        $('.total-container').addClass("d-none")  
        $('.menu-checkout-items').addClass('d-none') 
        $(".menu-item").each(function(index) {
            $(this).removeClass('selected-item')
         }); 
        }
        gettingOrderTot()
        gettingNumOfItems()   
        restoreCountVal(theMenuItem)    
    })

    $("body").on("click",".qty-count", function(){
        // alert("clicked")
        unitPrice=$('#calc-unit-price').text()
        menuItemCounterCont=$(this)
        totalPriceCont=$(this).parent().parent().siblings('td').find('.checkout-item-price')
        
        var currentQuantity=parseInt($(this).text())
        var theMenuItem=parseFloat($(this).parent().parent().parent().find('.the-item-index').text())
        var itemPrice=$('.menu-items-options-cont>div').eq(theMenuItem).find('.menu-item').find('.menu-item-amount').text()

        var selectedItemName=$('.menu-items-options-cont>div').eq(theMenuItem).find('.menu-item').find('.menu-item-name').text()
        var totalItemPrice=itemPrice*currentQuantity
        // alert(itemPrice)
        $(".calc-count-2").text(currentQuantity)
        $("#calc-count").text(currentQuantity)
        $("#calc-unit-price").text(itemPrice)
        $(".calc-total").text(addingCommas(parseFloat(totalItemPrice))+".00")
        $('.selected-item-calc').text(selectedItemName)
        clickedItemIndex= theMenuItem
        initialQty=parseInt($(this).text())
    })
    
})
// end of the pos scripts section

//the script for keying in the phone number
$(document).ready(function(){
    var phoneNum="",
    newPhone = document.querySelectorAll('[phone-number]'),
    totalAmount=$('.totAMount').text(),
    PhoneDel=document.querySelectorAll('[phone-delete]')

    //adding the characters
    for (var i = 0; i < newPhone.length; i++){
        newPhone[i].addEventListener("click", function(e){
           // storing current input string and its last character in variables - used later
            var currentString = $('.phone-input').val(); 
            var lastChar = currentString[currentString.length - 1];
            phoneNum=currentString+$(this).text()
            $('.phone-input').val(phoneNum)
        })
    }

    //clearing the phone input
    $('.phone-clear').on('click', function(){
        phoneNum = "";
        $('.phone-input').val(phoneNum)
    })
    // deleting
    $(PhoneDel).on('click', function(){
        var currentString=phoneNum
        phoneNum=currentString.substr(0,currentString.length-1)
        $('.phone-input').val(phoneNum) 
    })

    //This should run everytime a modal is open
    $('#the-phone-num').on('show.bs.modal', function () {
        totalAmount=$('.totAMount').text()
        $('.transaction-amount').text("KES "+totalAmount)
    });

    //closing the phone modal
    $('#the-phone-num').on('hidden.bs.modal', function () {
        phoneNum=""
        $('.phone-input').val(phoneNum) 
        $('#the-phone-num .mpesa-inputs').removeClass('d-none').siblings('.results-cont').addClass('d-none')
        $('#the-phone-num .modal-content .modal-header').removeClass('d-none')

        $('.mpesa-inputs').removeClass('d-none').siblings('.results-cont').addClass('d-none')
        //$('.change-amount').text("KES "+addingCommas(cashChange)+".00")
        $('#the-phone-num').find('.modal-header').removeClass('d-none')
    });

    //clicking okay on the phone
    $('#phone-total').on('click', function(){
       // $('#the-phone-num').find('.close').click()
       $('#the-phone-num .mpesa-inputs').addClass('d-none').siblings('.results-cont').removeClass('d-none')
        $('#the-phone-num .modal-content .modal-header').addClass('d-none')
        clearBill()
    })
})

//selecting payment method
$(document).ready(function(){
    var totalAmount,
    totalItems,
    paymentMethodsOptions=$('.the-slip-btns button')

    $('.create-bill-btn').on('click', function(){
        clearBill()
    })
   
    if(paymentMethod===""){
        $('.place-order').addClass('disabled').prop('disabled', true);
    }

    //selecting payment method
    for (var i = 0; i < paymentMethodsOptions.length; i++){
        paymentMethodsOptions[i].addEventListener("click", function(e){
           paymentMethod=$(this).text()

           $('.place-order').removeClass('disabled').prop('disabled', false);
           if(paymentMethod==="MPESA"){
            $('.place-order').attr('data-bs-target', "#the-phone-num");
           }

           if(paymentMethod==="Cash"){
            $('.place-order').attr('data-bs-target', "#the-cash-pay");
           }

           if(paymentMethod==="Split"){
            $('.place-order').attr('data-bs-target', "#the-split-pay")
           }

           if(paymentMethod==="BILL"){
            $('.place-order').attr('data-bs-target', "#the-bill-pay");
            //alert("sfsdf")
           }
           
        })
    }

})

//cash payment method modal
$(document).ready(function(){
    var totalAmount=$('.totAMount').text(),
    totalItems,
    amountReceived,
    keyPressed=document.querySelectorAll('[cash-number]'),
    cashDel=document.querySelectorAll('[cash-delete]'),
    cashChange

    //adding the characters
    for (var i = 0; i < keyPressed.length; i++){
        keyPressed[i].addEventListener("click", function(e){
            totalAmount=$('.totAMount').text()
            $('.transaction-amount').text("KES "+totalAmount)
           // storing current input string and its last character in variables - used later
            var currentString = $('.cash-input').val(); 
            var lastChar = currentString[currentString.length - 1];
           
            if(currentString=="0"){
                amountReceived=""
            }  

            if(currentString=="00"){
                amountReceived=""
            } 

            amountReceived=currentString+$(this).text()
            cashChange=parseFloat(amountReceived)-parseFloat(removingCommass(totalAmount))

            $('.cash-input').val(amountReceived)
            $('.change-input').val(addingCommas(cashChange))
        })
    }

    // deleting
    $(cashDel).on('click', function(){
        var currentString=amountReceived
        amountReceived=currentString.substr(0,currentString.length-1)
        
        cashChange=parseFloat(amountReceived)-parseFloat(removingCommass(totalAmount))

        $('.cash-input').val(amountReceived)
        $('.change-input').val(addingCommas(cashChange))
    })

    $('#the-cash-pay').on('show.bs.modal', function () {
        totalAmount=$('.totAMount').text()
        $('.transaction-amount').text("KES "+totalAmount)
    });

     //clearing the cash input
     $('.cash-clear').on('click', function(){
        amountReceived=""
        cashChange = "";
        $('.cash-input').val(amountReceived)
        $('.change-input').val("")
    })

    //clicking okay on the phone
    $('#cash-total').on('click', function(){
        //$('#the-cash-pay').find('.close').click()
        $('.input-cont').addClass('d-none').siblings('.results-cont').removeClass('d-none')
        $('.change-amount').text("KES "+addingCommas(cashChange)+".00")
        $('#the-cash-pay .modal-header').addClass('d-none')
        clearBill()
    })

    //closing the cash modal
    $('#the-cash-pay').on('hidden.bs.modal', function () {
        amountReceived=""
        cashChange = ""
        $('.cash-input').val(amountReceived)
        $('.change-input').val("") 
        $('#the-cash-pay').find('.modal-header').removeClass('d-none')
        $('.input-cont').removeClass('d-none').siblings('.results-cont').addClass('d-none')
    });

    $('.delete-list').on('click', function(){
        clearBill()
       $('.menu-item').each(function(index){
            $(this).find('.item-qty').text(defaultItemValues[index])
       })
    })
})

// split payment method
$(document).ready(function(){
    var phoneNum="",
    mpesaAmount,
    totalAmount,
    cashAmount,
    splitDialPad=document.querySelectorAll('[split-number]'),
    splitDel=document.querySelectorAll('[split-delete]')

    $('.phone-split-input').on('click', function(){
        activeSplitInput=$(this)
        console.log(activeSplitInput)
    })

    $('.amount-split-input').on('click', function(){
        activeSplitInput=$(this)
        console.log(activeSplitInput)
    })

    $('#the-split-pay').on('show.bs.modal', function () {
        totalAmount=$('.totAMount').text()
        totalAmount=removingCommass(totalAmount)
        totalAmount=parseFloat(totalAmount)
    });
    

    //adding the characters
    for (var i = 0; i < splitDialPad.length; i++){
        splitDialPad[i].addEventListener("click", function(e){
           // storing current input string and its last character in variables - used later
            var currentString = activeSplitInput.val(); 
            var lastChar = currentString[currentString.length - 1];
            phoneNum=currentString+$(this).text()
            activeSplitInput.val(phoneNum)
            mpesaAmount=parseFloat($('.amount-split-input').val())
            mpesaAmount=parseFloat(mpesaAmount)
            
            cashAmount=totalAmount-mpesaAmount
            $('.split-cash-amount').text(addingCommas(cashAmount)+".00")
        })
    }

     // deleting
     $(splitDel).on('click', function(){
        var currentString=activeSplitInput.val()
        currentString=currentString.substr(0,currentString.length-1)
        activeSplitInput.val(currentString)

        mpesaAmount=parseFloat($('.amount-split-input').val())
        mpesaAmount=parseFloat(mpesaAmount)

        cashAmount=totalAmount-mpesaAmount
        $('.split-cash-amount').text(addingCommas(cashAmount)+".00")
    })

    //clear inputs
    $('.cash-clear').on('click', function(){
        phoneNum=""
        mpesaAmount = "";
        $('.phone-split-input').val("")
        $('.amount-split-input').val("")

        mpesaAmount=parseFloat($('.amount-split-input').val())
         mpesaAmount=parseFloat(mpesaAmount)

        cashAmount=totalAmount-mpesaAmount
        $('.split-cash-amount').text(addingCommas(cashAmount)+".00")
    })

    //pressing okay for split payment
    $('body').on('click','#split-total', function(){
        $('#the-split-pay .input-cont').addClass('d-none')
        $('#the-split-pay .results-cont').removeClass('d-none')
        $('#the-split-pay .modal-header').addClass('d-none')

        $('.split-mpesa-amount').text("KES "+addingCommas(mpesaAmount)+".00")
        $('.split-cash-amount').text("KES "+addingCommas(cashAmount)+".00")
        clearBill()
    })

    //closing the cash modal
    $('#the-split-pay').on('hidden.bs.modal', function () {
        mpesaAmount=""
        cashAmount = ""
        $('.amount-split-input').val("")
        $('.phone-split-input').val("") 
        $('#the-split-pay').find('.modal-header').removeClass('d-none')
        $('#the-split-pay .input-cont').removeClass('d-none').siblings('.results-cont').addClass('d-none')
    });
})

//changing item pricing
$(document).ready(function(){
    $('.edit-price').on('click', function(){
        var itemName=$(this).parent().siblings('td').eq(0).text()
        var itemPrice=$(this).parent().siblings('td').eq(4).text()
        var itemMSL=$(this).parent().siblings('td').eq(2).text()
        $('.item-price-name').text(itemName)
        $('.item-price').val(itemPrice)
        $('.item-msl').val(itemMSL)
    })
})

//displaying the cart on medium screens
$(document).ready(function(){

    $('#items-cart').on('click', function(){
        $('.medium-menu-container').toggleClass('d-block')
    })

    $('.close-cart').on('click', function(){
        $('.medium-menu-container').removeClass('d-block')  
    })

})

//login keypad
$(document).ready(function(){
    var otalItems,
    amountReceived,
    keyPressed=document.querySelectorAll('[login-number]'),
    loginDel=document.querySelectorAll('[login-delete]'),
    cashChange

    //adding the characters
    for (var i = 0; i < keyPressed.length; i++){
        keyPressed[i].addEventListener("click", function(e){
           // storing current input string and its last character in variables - used later
            var currentString = $('.login-input').val(); 
            var lastChar = currentString[currentString.length - 1];

            currentString=currentString+$(this).text()

            $('.login-input').val(currentString)
        })
    }

    $('.login-clear').on('click', function(){
        $('.login-input').val("")
    })

    $(loginDel).on('click', function(){
        //alert('clicked')

        var currentString=$('.login-input').val(); 
        currentString=currentString.substr(0,currentString.length-1)
        $('.login-input').val(currentString)
    })
})

