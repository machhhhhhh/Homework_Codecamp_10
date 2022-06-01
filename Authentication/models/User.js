
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User' , {

        username : {
            type : DataTypes.STRING(255),
            unique : true
        },
        firstname : {
            type : DataTypes.STRING(255)
        },
        lastname : {
            type : DataTypes.STRING(255)
        },
        password : {
            type : DataTypes.STRING(255)
        },
        image : {
            type : DataTypes.STRING(255)
        },
        phone : {
            type : DataTypes.STRING(255 )
        }
    }, {
        tableName : 'user',
        timestamps : false
    })

    model.associate = models => {
        model.hasMany(models.Post, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.PostLike, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.Comment, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.CommentLike, {FOREIGNKEY : 'user_id'})
    }

    return model
}