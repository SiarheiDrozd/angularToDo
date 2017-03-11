export default function LoginPageCtrl($http, $location, globalStorage, dbService){
    this.isRegister = false;
    this.user = {
        name: "",
        password: ""
    };
    this.isLogged = false;
    this.checkPassword = "";
    this.globalStorage = globalStorage;
    this.location = $location;
    this.dbService = dbService;
}

LoginPageCtrl.prototype.logIn = function () {
    if(this.user.name && this.user.password) {

        this.globalStorage.user = this.user;

        let that = this;

        this.dbService.connect(this.user)
            .then(function(result){
                if(result.data){
                    that.globalStorage.isLogged = true;
                    that.globalStorage.data = [];
                    that.location.path("/home");
                } else {
                    alert("wrong username or password");
                }
            });
    }
};
LoginPageCtrl.prototype.registration = function () {
    console.log("registration");

    if(this.user.name && this.user.password) {
        if(this.user.password == this.checkPassword){
            let that = this;
            console.log(this.user);

            this.dbService.register(this.user)
                .then(function ( result ) {
                    console.log(result);
                    that.location.path("/home");
                });
        } else {
            throw Error("passwords not match")
        }
    } else {
        throw Error("parameters invalid");
    }
};
