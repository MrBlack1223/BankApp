
const User = require('../Schema/userSchema')


module.exports = {
    home: async(req,res) => {
        const user = await User.findById(req.session.passport.user)
        const emails = await User.find({},{email:1})
        res.render('index.ejs',{name: user.name,
                                balance: user.balance,
                                withdrawHistory: user.withdraws,
                                transferHistory: user.transactions,
                                depositHistory: user.deposit,
                                allUsers: emails })   
    },

    logout: (req,res)=>{
        req.logOut(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect('/login');
          })},

    withdraw: async (req,res)=>{
        const errorMessage = req.flash('error')
        res.render('withdraw.ejs',{error : errorMessage})
    },
    withdrawPost: async (req,res)=>{
        let user = await User.findById(req.session.passport.user)
        let newBalance = Math.abs(user.balance) - Math.abs(req.body.withdraw)
        if(newBalance < 0 || req.body.withdraw < 1)
        {
            newBalance < 0 ? req.flash('error','Masz za mało pieniędzy') : req.flash('error','Minimalna kwota to 1 zł')
            return res.redirect('/withdraw')

        }else if(isNaN(req.body.withdraw)){

            req.flash('error','Wprowadź liczbę')
            return res.redirect('/withdraw')
        }
        await User.updateOne({_id:user._id},{$set : {balance: newBalance}})
        await User.updateOne({_id:user._id},{$push: { withdraws: { by: Math.abs(req.body.withdraw), date: new Date()}}})
        res.redirect('/')},

    transactions: async (req,res)=>{
        const errorMessage = req.flash('error')
        res.render('transfer.ejs',{errorMsg: errorMessage})
    },
    transactionsPost: async (req,res)=>{
        const emailCount = await (await User.find({email:req.body.email})).length;
        let user = await User.findById(req.session.passport.user)
        let userNewBalance = Math.abs(user.balance) - Math.abs(req.body.transfer)
        if(userNewBalance < 0 || req.body.transfer < 1 )
        {   
            userNewBalance < 0 ? req.flash('error','Masz za mało pieniędzy') : req.flash('error','Minimalna kwota to 1 zł')
            return res.redirect('/transfer')
        }else if(user.email == req.body.email || emailCount == 0 )
        {   
            user.email == req.body.email ? req.flash('error','Nie możesz zrobić przelewu do siebie samego') : req.flash('error','Nie ma takiego użytkownika')
            return res.redirect('/transfer')
        }else if(isNaN(req.body.transfer)){
            req.flash('error','Wprowadź liczbę')
            return res.redirect('/transfer')
        }
        let user2 = await User.findOne({email:req.body.email}) 
        let user2NewBalance = Math.abs(user2.balance) + Math.abs(req.body.transfer)
        await User.updateOne({_id:user._id},{$set : {balance: userNewBalance}})
        await User.updateOne({_id:user._id},{$push: { transactions: { by: Math.abs(req.body.transfer), taken:false, from: user2.email}}})
        await User.updateOne({email:user2.email},{$set: {balance: user2NewBalance}})
        await User.updateOne({email:user2.email},{$push: { transactions: { by: Math.abs(req.body.transfer), taken:true, from: user.email}}})
    
        res.redirect('/')
    }, 
    deposit: async(req,res)=>{
        let user = await User.findById(req.session.passport.user)
        let newBalance = user.balance + Math.abs(req.body.deposit)
        if(req.body.deposit < 1)
        {   req.flash('error','Minimalna kwota to 1 zł')
            return res.redirect('/deposit')
        }else if(isNaN(req.body.deposit)){
            req.flash('error','Wprowadź liczbę')
            return res.redirect('/deposit')
        }
        await User.updateOne({_id: user._id},{$set: {balance:newBalance}})
        await User.updateOne({_id: user._id},{$push: {deposit: { by: Math.abs(req.body.deposit), date: new Date()}}})

        res.redirect('/')
    },
    depositView: async(req,res)=>{
        let errorMsg = req.flash('error')
        res.render('deposit.ejs',{errorMessage: errorMsg})
    }
}

