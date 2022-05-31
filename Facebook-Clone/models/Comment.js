module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Comment', {
        content : {
            type : DataTypes.STRING(255)
        }
    },{
        tableName : 'comment',
        timestamps : false
    })

    model.associate = models => {
       model.belongsTo(models.User, {FOREIGNKEY : 'user_id'})
       model.belongsTo(models.Post, {FOREIGNKEY : 'post_id'})
       model.hasMany(models.CommentLike, {FOREIGNKEY : 'comment_id'})
    }

    return model
}