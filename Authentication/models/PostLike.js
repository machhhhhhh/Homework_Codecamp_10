module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('PostLike', 
    {
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            reference : {
                model : {
                    tableName : 'user'
                },
                key : 'id'
            }
        },
        post_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            reference : {
                model : {
                    tableName : 'post'
                },
                key : 'id'
            }
        }
    },
    {
        tableName : 'post_like',
        timestamps : true
    })

    // model.associate = models => {
    //     model.belongsTo(models.User, {FORIENGKEY : 'user_id'})
    //     model.belongsTo(models.Post, {FORIENGKEY : 'post_id'})
    // }

    return model
}