module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Comment', {
        description : {
            type : DataTypes.STRING(255),
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
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            reference : {
                model : {
                    tableName : 'user'
                },
                key : 'id'
            }
        }
    }, {
        tableName : 'comment',
        timestamps : true
    })

    // model.associate = models => {
    //     model.belongsTo(models.User, {FORIENGKEY : 'user_id'})
    //     model.belongsTo(models.Post, {FORIENGKEY : 'post_id'})

    //     model.hasMany(models.CommentLike, { FORIENGKEY : 'comment_id'})
    // }


    return model
}