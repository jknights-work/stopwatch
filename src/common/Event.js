define ("common/Event", ["util/Helper"], function (Helper) {

    function Event(params) {
        this.helper = new Helper();
        this.event = null;
        if (this.helper.isNotNull(params)) {
            try {
                this.event = new CustomEvent(name);
            } catch (e) {

            }
        }
    }

    Event.prototype.getEvent = function (name) {
        var result = null;
        if (this.helper.isNotNull(this.event)) {
            result = this.event
        }
        return result;
    }

    Event.prototype.createListener = function (name, element, func) {
        if (this.helper.isNotNull(element)) {
            element.addEventListener(name, func);
        }
    }

    return Event;

});