module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('CommentLike', {
        comment_id : {
            type : DataTypes.INTEGER(255),
            allowNull : false,
            reference : {
                model : {
                    tableName : 'comment'
                },
                key : 'id',
                onUpdate : 'RESTRICT',
                onDelete : 'RESTRICT'
            }
        },
        user_id : {
            type : DataTypes.INTEGER(255),
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
        tableName : 'comment_like',
        timestamps : true
    })

    // model.associate = models => {
    //     model.belongsTo(models.User, {FORIENGKEY : 'user_id'})
    //     model.belongsTo(models.Comment, {FORIENGKEY : 'comment_id'})

    // }

    return model
}