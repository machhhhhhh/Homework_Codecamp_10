module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Friendship', {
        status : {
            type : DataTypes.BOOLEAN
        }
    },{
        tableName : 'friendship',
        timestamps : false
    })

    model.associate = models => {
       model.belongsTo(models.User,{as : 'sender'} ,{FOREIGNKEY : 'user_id'})
       model.belongsTo(models.User , {as : 'receiver'},{FOREIGNKEY : 'user_id'})
    //    model.belongsTo(models.User,{as : 'sender'} ,{FOREIGNKEY : 'sender_id'})
    //    model.belongsTo(models.User , {as : 'receiver'},{FOREIGNKEY : 'receiver_id'})
    }

    return model
}