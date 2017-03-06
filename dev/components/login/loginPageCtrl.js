export default function LoginPageCtrl($http, $location, globalStorage, dbService){
    this.isRegister = false;
    this.user = {
        Login: "",
        Password: ""
    };
    this.checkPassword = "";
    this.globalStorage = globalStorage;
    this.location = $location;
    this.dbService = dbService;
}

LoginPageCtrl.prototype.logIn = function () {
    if(this.user.Login && this.user.Password) {
        this.globalStorage.user = this.user;
        console.log(this.user);
        this.dbService.connect(this.user);
        // this.globalStorage.data =
        // alert("login successful");
        // if(true){
        //     this.location.path("/home");
        // }
    }
};
LoginPageCtrl.prototype.registration = function () {
    if(this.user.Login && this.user.Password) {
        if(this.user.Password == this.checkPassword){
            this.globalStorage.user = this.user;
            alert("user created");
            this.location.path("/home");
        } else {
            throw Error("passwords not match")
        }
    } else {
        throw Error("parameters invalid");
    }
};