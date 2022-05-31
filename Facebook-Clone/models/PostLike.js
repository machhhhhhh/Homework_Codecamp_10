module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('PostLike', {
        
    },{
        tableName : 'postLike',
        timestamps : false
    })

    model.associate = models => {
       model.belongsTo(models.User, {FOREIGNKEY : 'user_id'})
       model.belongsTo(models.Post, {FOREIGNKEY : 'post_id'})
    }

    return model
}