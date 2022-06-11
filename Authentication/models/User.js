
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User' , {

        username : {
            type : DataTypes.STRING(255),
            unique : true,
            allowNull : false,
            validate : {
                isEmail : true
            }
        },
        firstname : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        lastname : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        password : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        image : {
            type : DataTypes.STRING(255),
            // allowNull : false,
            // validate : {
            //     notEmpty : true
            // }
        },
        phone : {
            type : DataTypes.STRING(255 ),
            unique : true,
            allowNull : false,
            validate : {
                notEmpty : true
            }
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
        // model.hasMany(models.Friend , { 
        //     as : "sender" ,
        //     FOREIGNKEY : {
        //         name : 'user_id',
        //         allowNull : false
        //     },
        //     onUpdate : 'RESTRICT',
        //     onDelete : 'RESTRICT'
        // })
        // model.hasMany(models.Friend , { 
        //     as : "receiver" ,
        //     FOREIGNKEY : {
        //         name : 'user_id',
        //         allowNull : false
        //     },
        //     onUpdate : 'RESTRICT',
        //     onDelete : 'RESTRICT'
        // })
    }

    return model
}