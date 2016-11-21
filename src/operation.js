const delayms = 1;

function getCurrentCity(callback) {
    setTimeout(function () {

        const city = "New York, NY";
        callback(null, city);

    }, delayms)
}

function getWeather(city, callback) {
    setTimeout(function () {

        if (!city) {
            callback(new Error("City required to get weather"));
            return;
        }

        const weather = {
            temp: 50
        };

        callback(null, weather)

    }, delayms)
}

function getForecast(city, callback) {
    setTimeout(function () {

        if (!city) {
            callback(new Error("City required to get forecast"));
            return;
        }

        const fiveDay = {
            fiveDay: [60, 70, 80, 45, 50]
        };

        callback(null, fiveDay)

    }, delayms)
}


suite.only('operations');

function fetchCurrentCity() {
    const operation = {
        successReactions: [],
        errorReactions: []
    };
    getCurrentCity(function (error, result) {
        if (error) {
            operation.errorReactions.forEach(r => r(error));
            return;
        }
        operation.successReactions.forEach(r => r(result));
    });
    operation.setCallbacks = function setCallbacks(onSuccess, onError) {
        operation.successReactions.push(onSuccess);
        operation.errorReactions.push(onError);
    };
    return operation;
}

test("Pass multiple callbacks - all of them are called", function (done) {
    const operation = fetchCurrentCity();
    const multiDone = callDone(done).afterTwoCalls();

    operation.setCallbacks(result => multiDone());
    operation.setCallbacks(result => multiDone());
});

test("fetchCurrentCity pass the callbacks later on", function (done) {
    const operation = fetchCurrentCity();
    operation.setCallbacks(
        result => done(),
        error => done(error)
    );
});