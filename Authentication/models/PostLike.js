module.exports = (sequelize, Datatypes) => {
    const model = sequelize.define('PostLike', 
    {

    },
    {
        tableName : 'post_like',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.User, {FORIENGKEY : 'user_id'})
        model.belongsTo(models.Post, {FORIENGKEY : 'post_id'})
    }

    return model
}