define ("util/SessionStorage", ["util/Helper"], function (Helper) {

    function SessionStorage() {
        if (typeof(Storage) !== "undefined") {
            this.registeredSessions = new Map(); 
            this.helper = new Helper();
        } else {
            throw new Error ("Unable to create HTML 5 Sessions - please update your browser :) (like, seriously)");
        }
        
    }

    SessionStorage.prototype.setSession = function (name, value, date, type) {
        result = true;
        if (this.helper.isNotNull(value) && name && type) {
            if (this.helper.isNull(localStorage.getItem(name))) {
                switch (String(type).toLowerCase()) {
                    case "local":
                        localStorage.setItem(name, JSON.stringify({date: date, value: value}));
                        this.registeredSessions.set(name, value);
                        break;
                    case "session":
                        sessionStorage.setItem(name, JSON.stringify({date: date, value: value}));
                        this.registeredSessions.set(name, value);
                        break;
                    default:
                        console.error("Unable to save session");
                        result = false;
                        break;
                }
            } else {
                console.error("Session already registered under the same name");
                result = false;
            }
            
        }
        return result;
    }

    SessionStorage.prototype.getSession = function (name) {
        result = null;
        if (name) {
            if (localStorage.getItem(name)) {
                result = JSON.parse(localStorage.getItem(name));
            }
        }
        return result;
    }

    SessionStorage.prototype.getAllSessions = function () {
        return localStorage;
    }

    SessionStorage.prototype.removeSession = function (name) {
        var result = false;
        if (name) {
            if (this.registeredSessions.has(name)) {
                this.registeredSessions.delete(name);
                localStorage.removeItem(name);
                result = true;
            }
        }
        return result;
    }

    SessionStorage.prototype.removeAllSessions = function () {
        var result = false;
        if (localStorage) {
            localStorage.clear();
            result = true;
        }
        return result;
    }

    return SessionStorage;

});