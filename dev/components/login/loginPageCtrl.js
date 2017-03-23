require("./LoginPage.css");

export default function LoginPageCtrl($http, $location, ToDoListService, dbService, loginPageService) {
    this.user = {
        name    : "",
        password: ""
    };
    this.checkPassword = "";

    this.location = $location;
    this.globalStorage = ToDoListService;
    this.dbService = dbService;
    this.loginPageService = loginPageService;

    this.logIn = function () {
        this.loginPageService.logIn(this.user,
            this.globalStorage,
            this.dbService,
            this.location);
    };
    this.registration = function () {
        this.loginPageService.registration(this.user,
            this.checkPassword,
            this.globalStorage,
            this.dbService,
            this.location);
    };
}

