const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    pic:{type:String,default:'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'},
},{
    timestamps:true
})


userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}



userSchema.pre('save',async function(next){
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


const User = mongoose.model('User',userSchema)
module.exports = User