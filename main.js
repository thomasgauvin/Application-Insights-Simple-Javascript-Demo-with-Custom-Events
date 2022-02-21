//function incrementCount increments count from value inside div
function incrementCount() {
    var x = document.getElementById("demo");
    x.value = parseInt(x.value) + 1;

    var y = parseInt(x.value);

    appInsights.trackEvent({name: "incrementCount", properties: {
        value: y
    }});

    //the second parameter is average, not value
    //as documented here https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics#single-values
    //read documentation here https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics#trackmetric
    //the documentation explains that metrics should be aggregated since individual metrics are rarely valuable
    appInsights.trackMetric({name: "incrementCount", average: y});
}

function causeError() {
    try{
        throw new Error("This is an error");
    }
    //catch error and send to appInsights
    catch(error){
        appInsights.trackException(error);
        throw error;
    }
    finally{
        appInsights.trackEvent({name:"manualError"});
    }
}

//function to call a public api
function callApi() {
    var apiResponse = null;
    try{
        fetch("https://api.github.com/users/microsoft/repos")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            apiResponse = data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    finally{
        appInsights.trackEvent({name: "callApi"});
    }

}

//function to failed network request
function failedNetworkRequest() {
    try{
        fetch("https://urlthatdoesnotexist.com/43543")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    finally{
        appInsights.trackEvent({name:"failedNetworkRequest"});
    }
}
