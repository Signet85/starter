// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList : ".expenses__list",
        tusuvLabel : ".budget__value",
        incomeLabel : ".budget__income--value",
        expeseLabel : ".budget__expenses--value",
        persentageLabel : ".budget__expenses--percentage"

    };

    return{
        getInput: function(){
            return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMstrings: function(){
        return DOMstrings;
        },

        clearField: function(){
            var fields = document.querySelectorAll(DOMstrings.inputDescription+ ", " + DOMstrings.inputValue);
            // Convert list to array
            var fieldsArr = Array.prototype.slice.call(fields);
            fields.forEach(function(el, index, array){
                el.value = "";
            });

            fieldsArr[0].focus();
            // for(var i=0; i< fieldsArr. length; i++){
            //     fieldsArr[i].value = '';
            // }
        },
        tusuviigUzuuleh: function(tusuv){
        document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
        document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
        document.querySelector(DOMstrings.expeseLabel).textContent = tusuv.totalExp;
        if (tusuv.huvi !== 0){
            document.querySelector(DOMstrings.persentageLabel).textContent = tusuv.huvi + '%';
        } else {
            document.querySelector(DOMstrings.persentageLabel).textContent = tusuv.huvi;
        }
        
        },
        addListItem: function(item, type) {
            //Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ. 
            var html, list;
            if (type === 'inc') {
                list = DOMstrings.incomeList;
                html =
                    '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList;
                html = 
                    '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">- $$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            };
            //Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчлө өгнө
            html = html.replace('%id%', item.id);
            html = html.replace('$$DESCRIPTION$$', item.description);
            html = html.replace('$$VALUE$$', item.value);
            // Бэлтгэсэн html-ээ DOM-руу хийж өгнө. 
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        }
    };
})();

// Санхүүтэй ажиллах контреллер
var financeController = (function(){
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expence = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data ={
        items :{
            inc: [],
            exp: []
        },
        totals:{
            inc:0,
            exp:0
        },
        tusuv: 0,

        huvi: 0
    };
    var calculateTotal = function(type){
        var sum=0;
        data.items[type].forEach(function(el){
            sum = sum+el.value;
        });
        data.totals[type] = sum;
    };
    return {
        tusuvTootsooloh: function(){
        calculateTotal('inc');
        calculateTotal('exp');
        //Төсөвиийг шинээр тооцоолно
        data.tusuv = data.totals.inc - data.totals.exp;
        //Орлого зарлагын хувийг тооцоолно
        data.huvi = Math.round((data.totals.exp/data.totals.inc)*100);
        },
        tusuviigAvah: function(){
        return{
            tusuv: data.tusuv,
            huvi: data.huvi,
            totalInc:data.totals.inc,
            totalExp: data.totals.exp
        }
        },
        addItem: function(type, desc, val){
            var  item, id;
            if (data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length-1].id+1;
            }

            if(type === 'inc') {
                item = new Income(id, desc, val);
            } else {
                item = new Expence(id, desc, val);
            }
            data.items[type].push(item);

            return item;
        },
        seedata: function(){ return data;},
    }
})();

// Програмын холбогч контреллер
var appController = (function(uiController, financeController){
    
    var ctrlAddItem = function(){
        
            //1. Оруулах өгөгдлийг дэлгэцнээс олж авна.
            var input = uiController.getInput();
            
            if(input.description !== "" && input.value !== ""){
            //2. Олж авсан өгөгдлүүдээ санхүүгийн контреллерт дамжуулж тэнд хадгална.
            var item = financeController.addItem(
                input.type, 
                input.description, 
                input.value);
    
            //3. Олж авсан өгөгдүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
            uiController.addListItem(item,input.type);
            uiController.clearField();
           

            //4.Төсвийг тооцоолно
            financeController.tusuvTootsooloh();
            //5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
            var tusuv = financeController.tusuviigAvah();

            //төсвийн тооцоог дэлгэцэнд гаргана.
            uiController.tusuviigUzuuleh(tusuv);  
            }
    };
    

//Click дарахад үзүүлэх хариу үйлдэл
    var setupEventListeners = function(){

        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener('click',  function(){
            ctrlAddItem();
        });
        
        //Товч дарахад хариу өгөх функц
        document.addEventListener('keypress', function(event){
            if(event.keyCode===13 || event.which === 13) {
            ctrlAddItem();    
            };
        });
    }
    return {
        init:function(){
            console.log('application started...');
            uiController.tusuviigUzuuleh({
                    tusuv: 0,
                    huvi: 0,
                    totalInc:0,
                    totalExp: 0
                
            })
            setupEventListeners();
        }
    }
})(uiController, financeController);

appController.init();