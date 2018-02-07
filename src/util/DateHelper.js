define ("util/DateHelper", ["util/Helper"], function (Helper) {
    
        function DateHelper() {
            this.helper = new Helper();
        }

        DateHelper.prototype.currentTime = function () {
            return (new Date().getTime());
        }

        DateHelper.prototype.currentDateToString = function () {
            return (new Date().toLocaleDateString());
        }
    
        DateHelper.prototype.formatDate = function (dateTime, format) {
            var result = 0;
            if (this.helper.isNotNull(dateTime) && this.helper.isNotNull(format)) {
                date = new Date(dateTime);
                switch (String(format).toLowerCase()) {
                    case "hours":
                        result = date.getHours();
                        break;
                    case "minutes":
                        result = date.getMinutes();
                        break;
                    case "seconds":
                        result = date.getSeconds();
                        break;
                    case "milliseconds":
                        result = date.getMilliseconds();
                        break;
                    case "fulltime":
                        result = this.dateToString(date, 2, true);
                        break;
                    default:
                        console.error("Wrong time format");
                        break;

                }
            }
            return result;

        }

        DateHelper.prototype.dateToString = function (date, padding, isPadded) {
            var result = null;
            var formatDate = new Date(date);

            if (isPadded) {
                result = this.helper.formatString(date.getHours(), padding) + ":" + this.helper.formatString(date.getMinutes(), padding) + ":" +
                 this.helper.formatString(date.getSeconds(), padding) + ":" + this.helper.formatString(date.getMilliseconds(), padding);
            }

            return result;
        }

        
    
        //more methods
    
        return DateHelper;
    
    });