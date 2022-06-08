module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Post', {
        description : {
            type : DataTypes.STRING(255),
            allowNull : false
        },
        photo : {
            type : DataTypes.STRING(255),
        },
        emotion : {
            type : DataTypes.STRING(255),
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            reference : {
                model : {
                    tableName : 'user'
                },
                key : 'id',
                onUpdate : 'RESTRICT',
                onDelete : 'RESTRICT'
            }
        }
    },{
        tableName : 'post',
        timestamps : true
    })

    // model.associate = models => {
    //     model.belongsTo(models.User, {FOREIGNKEY : 'user_id'})

    //     model.hasMany(models.PostLike , {FOREIGNKEY : 'post_id'})
    //     model.hasMany(models.Comment, {FOREIGNKEY: "post_id"})
    // }

    return model
}