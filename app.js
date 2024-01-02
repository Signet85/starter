var uiController = (function(){
    var x=100;
    function add(y) {
        return x+y;
    }
    return {
            publicAdd: function(a){
            a=add(a);
            console.log('боловсруулсан утга '+a);
        }
    }

})();

var financeController = (function(){

})();

var appController = (function(uiController, financeController){
    uiController.publicAdd(150);
})(uiController, financeController);