export default function LoginPageService() {

}

LoginPageService.prototype.logIn = function (user, storage, dbService, location) {
    if (user.name && user.password) {
        storage.user = user;

        dbService.connect(user)
            .then(function (result) {
                if (result.data) {
                    storage.isLogged = true;
                    storage.data = [];

                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem("user", JSON.stringify(user));
                    }

                    location.path("/home");
                } else {
                    alert("wrong username or password");
                }
            });
    }
};

LoginPageService.prototype.registration = function (user, checkPassword, storage, dbService, location) {
    if (user.name && user.password) {
        if (user.password === checkPassword) {
            dbService.register(user)
                .then(function (result) {
                    storage.isLogged = true;
                    storage.data = [];

                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem("user", JSON.stringify(user));
                    }

                    location.path("/home");
                });
        } else {
            throw Error("passwords not match")
        }
    } else {
        throw Error("parameters invalid");
    }
};
