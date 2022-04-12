module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Todolist', {
        task : {
            type : DataTypes.STRING(255)
        }
    },{
        tableName : 'todolist',
        timestamps : false
    })

    model.associate = models => {
        model.belongsTo(models.User, {FOREIGNKEY : 'user_id'})
    }

    return model
}