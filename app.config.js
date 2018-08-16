window.mySAISD = $.extend(true, window.mySAISD, {
    "config": {
        //"layoutSet": "navbar",
        "navigation": [
          {
              "id": "Login",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Iniciar sesión" : "Login"), //"Login",
              "onExecute": "#Login",
              "icon": "fa fa-key",
              "visible": true,
          },
          {
              "id": "Language",
              "title": "Language/Idioma",
              "onExecute": "#Language",
              "icon": "fa fa-language",
              "visible": true

          },
          {
              "id": "About",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Sobre mySAISD Parent Access" : "About"), //"About",
              "onExecute": "#about",
              "icon": "fa fa-info",
              "visible": true
          },
          {
              "id": "HelpPreLogin",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Ayuda" : "Help"), //"Help",
              "onExecute": "#HelpPreLogin",
              "icon": "fa fa-question",
              "visible": true
          },
          {
              "id": "Students",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Estudiantes" : "Students"), //"Students",
              "onExecute": function () {
                  mySAISD.app.viewCache.clear(); // remove all views from cache when selecting the Students view
                  mySAISD.app.navigate('Students', { root: true });
              },
              "icon": "fa fa-users",
              "visible": true//false
          },
          {
              "id": "Student Dashboard",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Tablero de estudiantes" : "Student Dashboard"), //"mySAISD Dashboard",
              "onExecute": function () {
                  mySAISD.app.viewCache.clear();
                  mySAISD.app.navigate('StudentDashboard', { root: true });
              },
              "icon": "fa fa-tachometer",
              "visible": true//false
          },
          {
              "id": "Settings",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Configuraciones" : "Settings"), //"Settings",
              "onExecute": "#Settings",
              "icon": "fa fa-gear",
              "visible": true//false
          },
          {
              "id": "HelpPostLogin",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Ayuda" : "Help"), //"Help",
              "onExecute": "#HelpPostLogin",
              "icon": "fa fa-question",
              "visible": true//false
          },
          {
              "id": "Feedback",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Opinion" : "Feedback"), //"Feedback",
              "onExecute": "#Feedback",
              "icon": "fa fa-comments-o",
              "visible": true//false
          },
          {
              "id": "Exit",
              "title": (window.localStorage.getItem("mySAISDLang") != null && window.localStorage.getItem("mySAISDLang") == "es" ? "Cerrar sesión" : "Exit"), //"Exit",
              "onExecute": function () {
                  // make a call to the WCF data service to record logout
                  var context = new DevExpress.data.ODataContext({
                      url: mySAISD.app.WCFDataServiceURL,
                      errorHandler: function (error) {
                          if (error.httpStatus == 401)
                              mySAISD.app.navigate('Login', { root: true });
                          else
                              alert('ERROR: ' + error.message);
                      },
                      beforeSend: function (request) {
                          activity = 'Logout';
                          request.headers["Authorization"] = "Basic " + DevExpress.data.base64_encode([mySAISD.UserName, mySAISD.Password, activity, 'app.config.js'].join(":"));
                      }
                  });

                  context.get("SchoolYearSemesterCycle");

                  mySAISD.app.viewCache.clear();
                  mySAISD.app.navigate('Login', { root: true });
              },
              "icon": "fa fa-close",
              "visible": true//false
          }
        ]
    }
});
