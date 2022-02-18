# Application Insights for web pages with custom events

This demo demonstrates the usage of Application Insights on web pages, what metrics it captures, and how custom events can be used to track the usage of certain features on a web page. This can be helpful when tracking client-side features that cannot be monitored on the server. This can be quite useful for Jamstack sites as well.

![Screenshot of Web Application built for the demo](./images/2022-02-17-23-22-28.png)


## How it works

![Client application writes to Azure Application Insights](./images/small_graph.png)

Using the [Javascript library](https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript), we can send telemetry directly from our web page Javascript. This lets us receive data such as page visits, page visit time, visit path, errors in Javascript, etc. It also allows us to send custom events that could be used to track features.

## How to run this repository

1. Clone the repository locally
2. Enter your instrumentation key in the script in the head tag of both `index.html` and `page2.html`.
3. Start a local server in the root folder of the repository (In my case, I used Python3 by running the following command: `python -m http.server`) (You could also navigate to the file directly, although the link from page2.html to home will fail.)
4. Navigate to the web page and click the buttons. Notice that the tracking events are aggregated so they will be sent off 5-10 seconds later.
5. Consult your Application Insights dashboard, looking at the Logs and the Events tab. The events will take a while to load (5-10 minutes).

## How to use Application Insights in your own web page

1. Add the following snippet to your frontend web page at the top of the head of your HTML ([best to take from the Azure docs for the most updated version](https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript#snippet-based-setup)):
    <details>
    <summary>Snippet</summary>

    ```javascript
    <script type="text/javascript">
    !function(T,l,y){var S=T.location,k="script",D="instrumentationKey",C="ingestionendpoint",I="disableExceptionTracking",E="ai.device.",b="toLowerCase",w="crossOrigin",N="POST",e="appInsightsSDK",t=y.name||"appInsights";(y.name||T[e])&&(T[e]=t);var n=T[t]||function(d){var g=!1,f=!1,m={initialize:!0,queue:[],sv:"5",version:2,config:d};function v(e,t){var n={},a="Browser";return n[E+"id"]=a[b](),n[E+"type"]=a,n["ai.operation.name"]=S&&S.pathname||"_unknown_",n["ai.internal.sdkVersion"]="javascript:snippet_"+(m.sv||m.version),{time:function(){var e=new Date;function t(e){var t=""+e;return 1===t.length&&(t="0"+t),t}return e.getUTCFullYear()+"-"+t(1+e.getUTCMonth())+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())+"."+((e.getUTCMilliseconds()/1e3).toFixed(3)+"").slice(2,5)+"Z"}(),iKey:e,name:"Microsoft.ApplicationInsights."+e.replace(/-/g,"")+"."+t,sampleRate:100,tags:n,data:{baseData:{ver:2}}}}var h=d.url||y.src;if(h){function a(e){var t,n,a,i,r,o,s,c,u,p,l;g=!0,m.queue=[],f||(f=!0,t=h,s=function(){var e={},t=d.connectionString;if(t)for(var n=t.split(";"),a=0;a<n.length;a++){var i=n[a].split("=");2===i.length&&(e[i[0][b]()]=i[1])}if(!e[C]){var r=e.endpointsuffix,o=r?e.location:null;e[C]="https://"+(o?o+".":"")+"dc."+(r||"services.visualstudio.com")}return e}(),c=s[D]||d[D]||"",u=s[C],p=u?u+"/v2/track":d.endpointUrl,(l=[]).push((n="SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details)",a=t,i=p,(o=(r=v(c,"Exception")).data).baseType="ExceptionData",o.baseData.exceptions=[{typeName:"SDKLoadFailed",message:n.replace(/\./g,"-"),hasFullStack:!1,stack:n+"\nSnippet failed to load ["+a+"] -- Telemetry is disabled\nHelp Link: https://go.microsoft.com/fwlink/?linkid=2128109\nHost: "+(S&&S.pathname||"_unknown_")+"\nEndpoint: "+i,parsedStack:[]}],r)),l.push(function(e,t,n,a){var i=v(c,"Message"),r=i.data;r.baseType="MessageData";var o=r.baseData;return o.message='AI (Internal): 99 message:"'+("SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details) ("+n+")").replace(/\"/g,"")+'"',o.properties={endpoint:a},i}(0,0,t,p)),function(e,t){if(JSON){var n=T.fetch;if(n&&!y.useXhr)n(t,{method:N,body:JSON.stringify(e),mode:"cors"});else if(XMLHttpRequest){var a=new XMLHttpRequest;a.open(N,t),a.setRequestHeader("Content-type","application/json"),a.send(JSON.stringify(e))}}}(l,p))}function i(e,t){f||setTimeout(function(){!t&&m.core||a()},500)}var e=function(){var n=l.createElement(k);n.src=h;var e=y[w];return!e&&""!==e||"undefined"==n[w]||(n[w]=e),n.onload=i,n.onerror=a,n.onreadystatechange=function(e,t){"loaded"!==n.readyState&&"complete"!==n.readyState||i(0,t)},n}();y.ld<0?l.getElementsByTagName("head")[0].appendChild(e):setTimeout(function(){l.getElementsByTagName(k)[0].parentNode.appendChild(e)},y.ld||0)}try{m.cookie=l.cookie}catch(p){}function t(e){for(;e.length;)!function(t){m[t]=function(){var e=arguments;g||m.queue.push(function(){m[t].apply(m,e)})}}(e.pop())}var n="track",r="TrackPage",o="TrackEvent";t([n+"Event",n+"PageView",n+"Exception",n+"Trace",n+"DependencyData",n+"Metric",n+"PageViewPerformance","start"+r,"stop"+r,"start"+o,"stop"+o,"addTelemetryInitializer","setAuthenticatedUserContext","clearAuthenticatedUserContext","flush"]),m.SeverityLevel={Verbose:0,Information:1,Warning:2,Error:3,Critical:4};var s=(d.extensionConfig||{}).ApplicationInsightsAnalytics||{};if(!0!==d[I]&&!0!==s[I]){var c="onerror";t(["_"+c]);var u=T[c];T[c]=function(e,t,n,a,i){var r=u&&u(e,t,n,a,i);return!0!==r&&m["_"+c]({message:e,url:t,lineNumber:n,columnNumber:a,error:i}),r},d.autoExceptionInstrumented=!0}return m}(y.cfg);function a(){y.onInit&&y.onInit(n)}(T[t]=n).queue&&0===n.queue.length?(n.queue.push(a),n.trackPageView({})):a()}(window,document,{
    src: "https://js.monitor.azure.com/scripts/b/ai.2.min.js", // The SDK URL Source
    // name: "appInsights", // Global SDK Instance name defaults to "appInsights" when not supplied
    // ld: 0, // Defines the load delay (in ms) before attempting to load the sdk. -1 = block page load and add to head. (default) = 0ms load after timeout,
    // useXhr: 1, // Use XHR instead of fetch to report failures (if available),
    crossOrigin: "anonymous", // When supplied this will add the provided value as the cross origin attribute on the script tag
    // onInit: null, // Once the application insights instance has loaded and initialized this callback function will be called with 1 argument -- the sdk instance (DO NOT ADD anything to the sdk.queue -- As they won't get called)
    cfg: { // Application Insights Configuration
        instrumentationKey: "INSTRUMENTATION_KEY_HERE", // Replace with your instrumentation key
        /* ...Other Configuration Options... */
    }});
    </script>
    ```
    </details>

2. Call TrackEvent for Custom Events as [documented here](https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics#trackevent):

    ```javascript
    appInsights.trackEvent({name: "incrementCount"});
    ```
3. Disable any adblocker. Wait 5-10 minutes to see the events in the Application Insights resource in the Azure Portal.

## Advanced Screenshots 

| | | 
| --- | --- | 
| ![Screenshot of Events tab](./images/2022-02-17-23-35-23.png) | ![Screenshot of Events tab with more details of the custom events](./images/2022-02-17-23-35-49.png) | 
![Kusto Query Screenshot](./images/2022-02-17-23-45-11.png) |

## Security

Regarding the security of the connection string, or in this case the instrumentation key, it is ok to store it in the Javascript code. Usually, this is not recommended because it grants access to the resource, but in this case the instrumentation key only grants write access to the logs. If a malicious actor were to push garbage data to your Application Insights resource, this would hinder your monitoring. However, the privacy and security of your Application Insights resource would be ensured, and they would not be able to read the logs. Note that this is a shortcoming of web page based analytics and this is common of other frontend web analytics solutions.

As noted in [this blog post](https://devblogs.microsoft.com/premier-developer/alternative-way-to-protect-your-application-insights-instrumentation-key-in-javascript/) and supported by [this StackOverflow post](https://stackoverflow.com/questions/27816528/application-insights-security-and-spoofing), this is a limitation of frontend javascript based analytics.

This is the explanation [within the Azure Docs Github discussion](https://github.com/MicrosoftDocs/azure-docs/issues/24287#issuecomment-460831368).

## Resources

This demo was built with the help of [the official Azure documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript). Documentation for the appInsights API is found here https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics#trackevent. The usage overview is documented here https://docs.microsoft.com/en-us/azure/azure-monitor/app/usage-overview.