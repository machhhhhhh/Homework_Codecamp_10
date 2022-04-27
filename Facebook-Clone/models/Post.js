module.exports = (sequelize, Datatype) => {
    const model = sequelize.define('Post', {
        description : {
            type : Datatype.STRING(255)
        }
    }, {
        tableName : 'post',
    })

    model.associate = models => {
        model.belongsTo(models.User, {FOREIGNKEY : 'user_id'})
    }

    return model
}