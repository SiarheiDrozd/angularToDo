export default function LoginPageCtrl($http, $location, globalStorage, dbService){
    this.isRegister = false;
    this.user = {
        Login: "",
        Password: ""
    };
    this.checkPassword = "";
    this.globalStorage = globalStorage;
    this.location = $location;
}

LoginPageCtrl.prototype.logIn = function () {
    if(this.isRegister){
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
    } else {
        if(this.user.Login && this.user.Password) {
            this.globalStorage.user = this.user;
            alert("login successful");
            if(true){
                this.location.path("/home");
            }
        }
    }
};