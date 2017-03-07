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
    this.getData = function ( query ) {
        return $http.get("/data")
            .then(function ( result ) {
                return result;
            });
    };
    this.createData = function ( dataToCreate ) {

    };
    this.updateData = function ( dataToUpdate ) {

    };
    this.deleteData = function ( dataToDelete ) {

    }
}
