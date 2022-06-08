module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Friend', {
        status : {
            type : DataTypes.STRING(255),
            defaultValue : 'REQUESTED',
            validate : {
                isIn : [['REQUESTED', 'ACCEPTED']]
            }
        },
        sender_id : {
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
        },
        receiver_id : {
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
            // onUpdate : 'RESTRICT',
            // onDelete : 'RESTRICT'
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