module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User', {
        firstname : {
            type : DataTypes.STRING(255)
        },
        lastname : {
            type : DataTypes.STRING(255)
        },
        email : 
        {
            type: DataTypes.STRING(255)
        }
        // {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //       isEmail: {
        //         msg: "Must be a valid email address",
        //       }
        //     }
        // }
        ,
        birthday : {
            type : DataTypes.STRING(255)
        },
        image : {
            type : DataTypes.STRING(255)
        },
        password : {
            type : DataTypes.STRING(255)
        },
        phone : {
            type : DataTypes.STRING(255)
        }
    },{
        tableName : 'user',
        timestamps : false
    })

    model.associate = models => {
        model.hasMany(models.Post, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.PostLike, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.Comment, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.CommentLike, {FOREIGNKEY : 'user_id'})
        model.hasMany(models.Friendship, {FOREIGNKEY : 'user_id'})
        // model.hasMany(models.Friendship, {FOREIGNKEY : 'sender_id'})
        // model.hasMany(models.Friendship, {FOREIGNKEY : 'receiver_id'})
        // model.belongsToMany(models.Friendship, {through : 'user_id'})
    }

    return model
}