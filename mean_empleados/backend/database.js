const mongoose=require('mongoose')
const URI='mongodb://127.0.0.1:27017/usuarios_db';
//const URI = 'mongodb+srv://cristianlara:vm3IsMMAGWZ4sgF4@cluster0.msg63g1.mongodb.net/?authSource=admin';
mongoose.connect(URI)
.then(db=>console.log('BD conectada'))
.catch(err=>console.error(err));

module.exports=mongoose;