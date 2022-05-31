module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('CommentLike',{},{
        tableName : 'commentLike',
        timestamps : false
    })

    model.associate = models => {
       model.belongsTo(models.Comment, {FOREIGNKEY : 'comment_id'})
       model.belongsTo(models.User, {FOREIGNKEY : 'user_id'})
    }

    return model
}