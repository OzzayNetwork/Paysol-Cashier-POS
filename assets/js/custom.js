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
                $('.calc-total').text(addingCommas(totalPrice))
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
        gettingOrderTot()
        gettingNumOfItems()      
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
        
     })

    
    $("body").on('dblclick','.menu-item', function(){
        $("#the-calculator").modal('show')
        // alert("double clicked").dblclick()
        gettingOrderTot()
        gettingNumOfItems()
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
    })

    
   

     
    
})
// end of the pos scripts section

