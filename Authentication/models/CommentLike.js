module.exports = (sequelize, Datatypes) => {
    const model = sequelize.define('CommentLike', {

    },{
        tableName : 'comment_like',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.User, {FORIENGKEY : 'user_id'})
        model.belongsTo(models.Comment, {FORIENGKEY : 'comment_id'})

    }

    return model
}