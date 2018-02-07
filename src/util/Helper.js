define ("util/Helper", function () {

    function Helper() {}

    Helper.prototype.isNull = function (element) {
        var result = false;
        if (element === null || typeof element === "undefined") {
            result = true;
        }
        return result;
    }

    Helper.prototype.isNotNull = function (element) {
        return !this.isNull(element);
    }

    Helper.prototype.formatString = function (num, padding) {
        var result = num;
        if (num > -1 && padding > -1) {
            var string = "0" + num;
            result = string.substr(string.length - padding);
        } 
        return result;
    }

    //more methods

    return Helper;

});