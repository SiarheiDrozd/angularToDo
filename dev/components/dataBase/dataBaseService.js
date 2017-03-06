export default function DataBaseService( $http ) {
    this.connected = false;

    this.isConnected = function () {
        return this.connected;
    };
    this.connect = function ( user ) {
        $http.post( "/dbConnect", user )
            .then(function ( result ) {
                return result;
            }.bind(this))
            .catch(function (err) {
                // alert(err);
            });
    };
    this.getData = function ( query ) {
        return $http.get("/data")
            .then(function ( result ) {
                return result;
            }.bind(this));
    };
    this.createData = function ( dataToCreate ) {

    };
    this.updateData = function ( dataToUpdate ) {

    };
    this.deleteData = function ( dataToDelete ) {

    }
}
