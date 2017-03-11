export default function DataBaseService( $http ) {
    this.connected = false;

    this.isConnected = function () {
        return this.connected;
    };

    this.connect = function ( user ) {
        return $http.post( "/dbConnect", user )
            .catch(function (err) {
                console.log(err);
            });
    };

    this.register = function ( user ) {
        return $http.post( "/dbRegister", user )
            .catch(function (err) {
                console.log(err);
            });
    };

    this.getData = function ( user ) {
        return $http.get(`/data/${user.name}`)
            .then(function ( result ) {
                return result;
            });
    };

    this.setData = function ( dataToSet ) {
        return $http.post("/data", dataToSet)
            .then(function ( result ) {
                return result;
            });
    };

    this.updateData = function ( dataToUpdate ) {

    };

    this.deleteData = function ( dataForDelete ) {
        return $http.delete( `/data/${dataForDelete.user.name}/${dataForDelete.task._id}`)
            .catch(function (err) {
                console.log(err);
            });
    }
}
