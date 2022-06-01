module.exports = (sequelize, Datatypes) => {
    const model = sequelize.define('Comment', {
        description : {
            type : Datatypes.STRING(255)
        }
    }, {
        tableName : 'comment',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.User, {FORIENGKEY : 'user_id'})
        model.belongsTo(models.Post, {FORIENGKEY : 'post_id'})

        model.hasMany(models.CommentLike, { FORIENGKEY : 'comment_id'})
    }


    return model
}