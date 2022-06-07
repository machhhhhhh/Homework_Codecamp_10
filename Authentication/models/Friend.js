module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Friend', {
        status : {
            type : DataTypes.STRING(255),
            allowNull : false
        },
        sender_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            reference : {
                model : {
                    tableName : 'user'
                },
                key : 'id'
            }
        },
        receiver_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            reference : {
                model : {
                    tableName : 'user'
                },
                key : 'id'
            }
        }
    },{
        tableName : 'friend',
        timestamps : true
    })

    // model.associate = models => {
    //     model.belongsTo(models.Friend , { 
    //         as : "sender" ,
    //         FOREIGNKEY : {
    //             name : 'user_id',
    //             allowNull : false
    //         },
    //         onUpdate : 'RESTRICT',
    //         onDelete : 'RESTRICT'
    //     })
    //     model.belongsTo(models.Friend , { 
    //         as : "receiver" ,
    //         FOREIGNKEY : {
    //             name : 'user_id',
    //             allowNull : false
    //         },
    //         onUpdate : 'RESTRICT',
    //         onDelete : 'RESTRICT'
    //     })
    // }

    return model
}