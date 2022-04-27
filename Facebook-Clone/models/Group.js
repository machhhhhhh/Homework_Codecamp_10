module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Group' , {
        name : {
            type : DataTypes.STRING(255)
        }
    }, {
        tableName : 'group',
        timestamps : false
    })

    model.associate = models => {
        model.belongsToMany(models.User, { through: 'group_id' })
        model.hasMany(models.GroupPost, {FOREIGNKEY : 'group_id'})
    }

    return model
}