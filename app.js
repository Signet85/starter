// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
 

})();

// Санхүүтэй ажиллах контреллер
var financeController = (function(){
    
})();

// Програмын холбогч контреллер
var appController = (function(uiController, financeController){
    
    var ctrlAddItem = function(){
        
            //1. Оруулах өгөгдлийг дэлгэцнээс олж авна.
            console.log('дэлгэцээс өгөгдлөө авах');
            //2. Олж авсан өгөгдлүүдээ санхүүгийн контреллерт дамжуулж тэнд хадгална.
    
            //3. Олж авсан өгөгдүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    
            //4.Төсвийг тооцоолно
    
            //5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
};
    

//Click дарахад үзүүлэх хариу үйлдэл
    document.querySelector(".add__btn").addEventListener('click',  function(){
    ctrlAddItem();
    });
    
//Товч дарахад хариу өгөх функц
    document.addEventListener('keypress', function(event){
        if(event.keyCode===13 || event.which === 13) {
        ctrlAddItem();    
        };
    });
})(uiController, financeController);
