export default function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/todo-list");
    $stateProvider
        .state('todoList', {
            url: "/todo-list",
            template: "<todo-list></todo-list>"
        })
        .state('login', {
            url: "/login",
            template: "<login-page></login-page>"
        });
}