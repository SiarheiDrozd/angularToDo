function Columns( $http ) {
    this.columns = [
        {
            name: "TODO",
            items: []
        },
        {
            name: "WIP",
            items: []
        },
        {
            name: "TEST",
            items: []
        },
        {
            name: "DONE",
            items: []
        }
    ];
    this.data = [];
    this.movingTask = {};

    $http.get("data/tasks.json")
        .then(function ( result ) {
            this.data = result.data;
        }.bind(this))
        .then(function () {
            this.data = this.data.map(function ( task, index ) {
                task.id = index;
                return task;
                // this.add(task);
            }.bind(this));
            // console.log(this.data);
        }.bind(this))
    ;
}
Columns.prototype.onDrop = function ( event, context, columnIndex ) {
    this.movingTask.stage = columnIndex;
    this.movingTask = {};
};
Columns.prototype.onStartDrag = function ( event, context, task ) {
    this.movingTask = task;
};

Columns.prototype.add = function ( task ) {
    task.id = this.columns[task.stage].items.length;
    this.columns[task.stage].items.push(task);
};
Columns.prototype.addNewTask = function ( task ) {
    this.data.push(Object.assign({
        stage: 0,
        id: this.data.length
    }, task));
};
Columns.prototype.remove = function ( task ) {
    this.columns[task.stage].items.splice(task.id, 1);
    this.columns[task.stage].items.forEach(function(item, index){item.id = index});
};

Columns.prototype.moveLeft = function ( task ) {
    if (task.stage > 0) {
        // this.remove(task);
        task.stage--;
        // this.add(task);
    }
};
Columns.prototype.moveRight = function ( task ) {
    if (task.stage < this.columns.length - 1) {
        // this.remove(task);
        task.stage++;
        // this.add(task);
    }
};