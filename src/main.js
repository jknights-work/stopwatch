//constants
const defaultTime = "00:00:00:00";
const fullDateStringName = "fullTime";
const registerEvents = ["startClock", "stopClock", "resetClock", "saveLap", "deleteAllLaps"];
const timeDisplayElement = "timeStamp";
const saveLapNameElement = "saveLapName";
const lapTableName = "lapTable";
const sessionType = "local";

(function () {

    var pageState = setInterval(function(){
        if (document.readyState === 'complete') {
            clearInterval(pageState);
            _init();
        }
    })

}());


function _init () {

    requirejs(["util/Helper", "util/DateHelper", "util/SessionStorage", "components/StopWatch"], function(Helper, DateHelper, SessionStorage, StopWatch) {
        
        
        helper = new Helper();
        watch = new StopWatch();
        sessions = new SessionStorage();
        dateHelper = new DateHelper();
        timer = null;

        try {
            registerEvents.forEach (function (id){
                var el = document.getElementById(id);
                if (el !== null) {
                    el.addEventListener("click", eval(id));
                }
            });
            _populateLapTable();
        } catch (e) {
            console.error("Unable to register Elements", e);
        }

        function _update() {
            try {
                document.getElementById(timeDisplayElement).innerHTML = watch.formatTime(fullDateStringName);
            } catch (e) {
                console.error("Unable to update clock", e);
            }
        }
    
        function _start() {
            timer = setInterval(_update, 1);
            watch.startClock();
        }

        function _stop() {
            clearInterval(timer);
            watch.stopClock();
        }

        function _reset() {
            clearInterval(timer);
            document.getElementById(timeDisplayElement).innerHTML = defaultTime;
            watch.resetClock();
        }

        function _save (name, value) {
            var result = false;
            try { 
                result = sessions.setSession(name, value,  dateHelper.currentDateToString(), sessionType);
                if (result) {
                    _updateLapTable(name);
                }
            } catch (e) {
                console.error("Unable to save lap", e);
            }
            return result;
        }

        function _updateLapTable (name, date) {
            try { 

                var table = document.getElementById(lapTableName).getElementsByTagName('tbody')[0];
                var session = sessions.getSession(name);

                var row = table.insertRow(0);
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(0);

                cell2.innerHTML = name;
                cell1.innerHTML = session.value;
                cell0.innerHTML = session.date;

            } catch (e) {
                console.error("Unable to update table", e);
            }
        }

        function _populateLapTable () {

            try { 

                var table = document.getElementById(lapTableName).getElementsByTagName('tbody')[0];
                var sessionList = sessions.getAllSessions();

                Object.keys(sessionList).forEach(function (key) {

                    var data = JSON.parse(sessionList[key]);
                    var row = table.insertRow(0);
                    var cell0 = row.insertCell(0);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(0);
    
                    cell2.innerHTML = key;
                    cell1.innerHTML = data.value;
                    cell0.innerHTML = data.date;

                 });

            } catch (e) {
                console.error("Unable to update table", e);
            }
        }

        function _clearTable () {
            var table = document.getElementById(lapTableName).getElementsByTagName('tbody')[0];
            for(var i = 0; i < table.rows.length;)
            {   
                table.deleteRow(i);
            }
        }

        function _deleteLaps  () {
            if (sessions.removeAllSessions()) {
                _clearTable();
            }
        }

        //Public Methods
    
        function startClock () {
            if (helper.isNotNull(watch)) {
                _start();
            }
        }

        function stopClock () {
            if (helper.isNotNull(watch)) {
                _stop();
            }
        }

        function resetClock () {
            if (helper.isNotNull(watch)) {
                _reset();
            }
        }

        function saveLap () {
            var result = false;
            if (helper.isNotNull(sessions)) {
                try {
                    result = _save(document.getElementById(saveLapNameElement).value, watch.formatTime(fullDateStringName));
                } catch (e) {
                    console.error("Unable to get Elements, or current time", e);
                }
            }
            return result;
        }

        function deleteAllLaps () {
            if (helper.isNotNull(sessions)) {
                try {
                    result = _deleteLaps();
                } catch (e) {
                    console.error("Unable to delete laps", e);
                }
            }
        }
    
    });

}


