module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Post', {
        content : {
            type : DataTypes.STRING(255)
        }
    },{
        tableName : 'post',
        timestamps : false
    })

    model.associate = models => {
       model.belongsTo(models.User, {FOREIGNKEY : 'user)id'})
       model.hasMany(models.PostLike ,{FOREIGNKEY : 'post_id'})
       model.hasMany(models.Comment ,{FOREIGNKEY : 'post_id'})
    }

    return model
}