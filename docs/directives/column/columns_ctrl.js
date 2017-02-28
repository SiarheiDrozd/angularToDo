function Column() {
}
Column.prototype.onDrop = function ( event, context, columnIndex ) {
    this.movingTask.stage = columnIndex;
    this.movingTask = {};
};