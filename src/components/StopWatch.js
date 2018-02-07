define ("components/StopWatch", ["util/Helper", "util/DateHelper"], function (Helper, DateHelper) {
    //
        function StopWatch(params) {
            this.helper = new Helper();
            this.dateHelper = new DateHelper();
            this._startTime = 0;
            this._stopTime = 0;
            this._lapTime = 0;
            this._stopped = false;

            if (this.helper.isNotNull(params)) {
                this._setter(params);
            }
        }

        StopWatch.prototype.startClock = function (element) {
            this._stopped = false;
            if (!this._startTime) {
                this._startTime = this.dateHelper.currentTime();
            }
        }

        StopWatch.prototype.stopClock = function (element) {
            if (this._startTime) {
                this._lapTime = this._lapTime + this.dateHelper.currentTime() - this._startTime;
                this._stopTime = this._lapTime;
                this._stopped = true;
            } else {
                this._lapTime = 0;
            }
            this._startTime = 0;
        }

        StopWatch.prototype.resetClock = function () {
            this._lapTime = 0;
            this._stopTime = 0;
            this._startTime = 0;
        }

        StopWatch.prototype.getTime = function () {
            var result = -1;
            if (this.isStopped()) {
                result = this.getStopTime();
            } else {
                if (this._startTime) {
                    result = this._lapTime + (this.dateHelper.currentTime() - this._startTime);
                } else {
                    result = 0;
                }
            }
            return result;
        }

        StopWatch.prototype.getStopTime = function () {
            var result = -1;
            if (this._stopTime) {
                result = this._stopTime
            } else {
                result = 0;
            }
            return result;
        }

        StopWatch.prototype.formatTime = function (format) {
            var result = null;
            if (format) {
                result = this.dateHelper.formatDate(this.getTime(), format);
            }
            return result;
        }

        StopWatch.prototype.setter = function (params) {
            if (this.helper.isNotNull(params["startTime"])) {
                this._startTime = params["startTime"];
            }
        }

        StopWatch.prototype.isStopped = function () {
            return this._stopped;
        }

        return StopWatch;
    
    
})