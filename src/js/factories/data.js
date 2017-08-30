module.exports = angular.module('app').factory('Data', (Rest, Session, __api) => {
	return {
		delSession: (sessionId) => {
			return Rest.delete(__api.user.sessions + '/' + sessionId);
		},

		saveUserInfo: (userInfo) => {
			return Rest.patch(__api.user.data, {
				name: userInfo.name,
				birthday: userInfo.birthday
			});
		},
		saveTodo: (todoData) => {
            return Rest.put(__api.user.todo, todoData);
        },
        changeStatusTodo: (todo) => {
            return Rest.patch(__api.user.todo, {todo: todo});
        },
        deleteTodo: (todoId) => {
            return Rest.delete(__api.user.todo + '/' + todoId);
        },
        addAvatar: (avatar) => {
        	return Rest.patch(__api.user.avatar, {data: avatar});
        }
    };
});