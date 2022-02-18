//function incrementCount increments count from value inside div
function incrementCount() {
    var x = document.getElementById("demo");
    x.value = parseInt(x.value) + 1;

    appInsights.trackEvent({name: "incrementCount"});
}

function causeError() {
    try{
        throw new Error("This is an error");
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
