
import {Table, Column, Model, DataType} from 'sequelize-typescript'

//definig a table

@Table({
    tableName : 'users',
    modelName : 'User',
    timestamps : true
})

class User extends Model {
    //defining the column in table

    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

  @Column({
    type : DataType.STRING,
    unique : true
  })
  declare username : string

    @Column({
    type : DataType.STRING
  })
  declare password : string

    @Column({
    type : DataType.STRING,
    unique : true
  })
  declare email : string

    @Column({
    type : DataType.ENUM('teacher','institute','super-admin','student'),
    defaultValue : 'student'
  })
  declare role : string
}

export default User