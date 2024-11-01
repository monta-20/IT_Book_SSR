const express=require('express')
const path=require('path')
const routerHome=require('./routes/home.route')
const routerBook=require('./routes/book.route')
const routerAuth=require('./routes/auth.route')
const routeMybooks=require('./routes/mybooks.route')
const routeContact=require('./routes/contact.route')
const routeAbout=require('./routes/about.route')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')


const app=express()


app.use(express.static(path.join(__dirname,'assets')))

app.set('view engine','ejs')
app.set('views','views')

var Store=new MongoDbStore({
    uri:'mongodb://localhost:27017/library',
    collection:'sessions'
}) 
app.use(flash())
app.use(session({
    secret:'this is my secret key',

    store:Store,
    resave: true,
    saveUninitialized: true
}))

app.use('/',routerHome)
app.use('/books',routerBook)
app.use('/',routerAuth)
app.use('/mybooks',routeMybooks)
app.use('/',routeContact)
app.use('/',routeAbout)


app.listen(4000,()=>console.log('server run in port 4000'))