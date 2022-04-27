module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User' , {
        username : {
            type : DataTypes.STRING(255),
            unique : true
        },
        password : {
            type : DataTypes.STRING(255)
        },
        email : {
            type : DataTypes.STRING(255)
        },
        birthdate : {
            type : DataTypes.INTEGER(255)
        },
        gender : {
            type : DataTypes.STRING(255)
        }
    }, {
        tableName : 'user',
        timestamps : false
    })

    model.associate = models => {
        model.hasMany(models.Post, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.GroupPost, {FOREIGNKEY : 'user_id'})
        model.belongsToMany(models.Group, { through: 'group_id' })
    }

    return model
}