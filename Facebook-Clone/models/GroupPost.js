module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('GroupPost' , {
        description : {
            type : DataTypes.STRING(255)
        }
    }, {
        tableName : 'grouppost',
        timestamps : false
    })

    model.associate = models => {
        model.belongsTo(models.Group, {FOREIGNKEY : 'group_id'})
        model.belongsTo(models.User, {FOREIGNKEY : 'user_id'})
    }

    return model
}