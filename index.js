/// <reference path="js/localization/dx.messages.es.js" />
/// <reference path="js/localization/dx.messages.es.js" />
window.mySAISD = window.mySAISD || {};

function onDeviceReady() {
    navigator["splashscreen"].hide();
    document.addEventListener("backbutton", onBackKeyDown, false);
    mySAISD.app.navigatingBack.add(function () {
        if (!mySAISD.app.canBack() && window.external) {
            window.external.Notify("DevExpress.ExitApp");
        }
    });
}

document.addEventListener("deviceready", onDeviceReady, false);

$(function () {

    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });
    // To customize the Generic theme, use the DevExtreme Theme Builder (http://js.devexpress.com/ThemeBuilder)
    // For details on how to use themes and the Theme Builder, refer to the http://js.devexpress.com/Documentation/Howto/Themes article

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if (window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });
    });

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !mySAISD.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        if (confirm("Are you sure you want to exit?")) {
            switch (DevExpress.devices.real().platform) {
                case "tizen":
                    tizen.application.getCurrentApplication().exit();
                    break;
                case "android":
                    navigator.app.exitApp();
                    break;
                case "win8":
                    window.external.Notify("DevExpress.ExitApp");
                    break;
            }
        }
    }

    mySAISD.app = new DevExpress.framework.html.HtmlApplication({
        namespace: mySAISD,
        layoutSet: [
                { controller: new DevExpress.framework.html.SlideOutController() }
        ],
        navigation: mySAISD.config.navigation,
        commandMapping: mySAISD.config.commandMapping
    });
    mySAISD.app.router.register(":view/:id/:id2/:id3/:id4/:id5/:id6/:id7/:id8/:id9/:id10/:id11/:id12/:id13/:id14/:id15/:id16/:id17", { view: "Login", id: undefined, id2: undefined, id3: undefined, id4: undefined, id5: undefined, id6: undefined, id7: undefined, id8: undefined, id9: undefined, id10: undefined, id11: undefined, id12: undefined, id13: undefined, id14: undefined, id15: undefined, id16: undefined, id17: undefined });
    mySAISD.app.on("navigatingBack", onNavigatingBack);

    // redirect to login page if current URI is undefined
    mySAISD.app.on("navigating", function (e) {
        if (typeof e.currentUri === 'undefined')
            e.uri = 'Login';
    });

    // Dev OData Service URL
    //mySAISD.app.WCFDataServiceURL = "http://localhost:14285/DataService.svc";
    ////mySAISD.app.StudentPhotosURL = "http://localhost:50885/Images/Students/";

    // Test OData Service URL
    mySAISD.app.WCFDataServiceURL = "http://dwapptest.saisd.net/mySAISDODataService/DataService.svc";    
    //mySAISD.app.StudentPhotosURL = "http://dwapptest.saisd.net/mySAISD/Images/Students/";
    mySAISD.app.StudentPhotosURL = "https://dw.saisd.net/mySAISD/StudentImages/"; //Share

    // Prod OData Service URL
    //mySAISD.app.WCFDataServiceURL = "https://dw.saisd.net/mySAISDODataService/DataService.svc";
    //mySAISD.app.StudentPhotosURL = "https://dw.saisd.net/mySAISD/Images/Students/"; // need to create a share
    //mySAISD.app.StudentPhotosURL = "https://dw.saisd.net/mySAISD/StudentImages/"; // New share 2/7/18


    mySAISD.app.switchState = ko.observable(false).extend({ notify: 'always' });

    // idle times for auto logout
    mySAISD.app.MAX_IDLE_TIME = 30; // 30 minutes
    mySAISD.app.IDLE_TIME_WARNING = 29; // 29 minutes

    // Color used throughout views on icons and some text
    mySAISD.app.APP_COLOR = ko.observable('#0099ff');

    mySAISD.app.navigate();


});
