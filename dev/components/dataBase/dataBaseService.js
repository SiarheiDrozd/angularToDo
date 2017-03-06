export default function DataBaseService( $http ) {
    this.connected = false;

    this.isConnected = function () {
        return this.connected;
    };
    this.connect = function ( user ) {
        $http.post( "/dbConnect", user )
            .then(function ( result ) {
                console.log(result);
                return result;
            }.bind(this));
    };
    this.getData = function ( query ) {

    };
    this.createData = function ( dataToCreate ) {

    };
    this.updateData = function ( dataToUpdate ) {

    };
    this.deleteData = function ( dataToDelete ) {

    }
}