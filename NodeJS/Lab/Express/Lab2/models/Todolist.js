module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Todolist', {
        task : {
            type : DataTypes.STRING(255)
        }
    },{
        tableName : 'todolist',
        timestamps : false
    })


    return model
}