const express = require('express');
const bodyParser = require('body-parser');
const InitiateMongoServer = require("./config/db");
const User = require("./model/user");
const Admin = require('./model/admin');
const Blog = require("./model/blog");
const Contact = require("./model/contact");
const Price = require('./model/price');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const port = 3001;



InitiateMongoServer();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/api/v1/getblog", async (req, res, next) => {
    const blog = await Blog.find()
    res.json(blog);
    next();
});


app.post("/api/v1/signup", async (req, res, next) => {
    const { username, email, password } = req.body;


    let existUser = await User.findOne({
        email
    })
    if (username == '' || !username) {
        res.status(404).json({
            msg: "نام کاربری خود را وارد کنید !"
        })
    }
    else if (email == '' | !email) {
        res.status(404).json({
            msg: "ایمیل خود را وارد کنید !"
        })
    }
    else if (password == '' || !password) {
        res.status(404).json({
            msg: "رمز عبور خود را وارد کنید !"
        })
    }
    else {
        if (existUser) {
            res.status(400).json({
                msg: "ایمیل موجود است !"
            })
        }
        else {
            const ch8p = password.split('').length
            if (ch8p <= 8) {
                res.status(401).json({
                    msg: "رمزعبور شما باید بیشتر از 8 کاراکتر باشد !"
                })
            }
            else {
                const newUser = new User({
                    "username": username,
                    "email": email,
                    "password": password
                })
                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(password, salt);
                await newUser.save();

                return res.status(200).json({
                    msg: "ثبت نام با موفقیت انجام شد !"
                })
            }
        }
    };
    next();
});







app.post("/api/v1/admin/signup", async (req, res, next) => {
    const { username, email, password } = req.body;


    let existAdmin = await Admin.findOne({
        email
    })
    if (username == '' || !username) {
        res.status(404).json({
            msg: "نام کاربری خود را وارد کنید !"
        })
    }
    else if (email == '' | !email) {
        res.status(404).json({
            msg: "ایمیل خود را وارد کنید !"
        })
    }
    else if (password == '' || !password) {
        res.status(404).json({
            msg: "رمز عبور خود را وارد کنید !"
        })
    }
    else {
        if (existAdmin) {
            res.status(400).json({
                msg: "ایمیل موجود است !"
            })
        }
        else {
            const ch8p = password.split('').length
            if (ch8p <= 8) {
                res.status(401).json({
                    msg: "رمزعبور شما باید بیشتر از 8 کاراکتر باشد !"
                })
            }
            else {
                const newAdmin = new Admin({
                    "username": username,
                    "email": email,
                    "password": password
                })
                const salt = await bcrypt.genSalt(10);
                newAdmin.password = await bcrypt.hash(password, salt);
                await newAdmin.save();

                return res.status(200).json({
                    msg: "ثبت نام با موفقیت انجام شد !"
                })
            }
        }
    };
    next();
});
















app.post("/api/v1/auth", async (req, res, next) => {
    const { token } = req.body;
    let FindUser = await User.findOne({
        token
    })
    let FindAdmin = await Admin.findOne({
        token
    })
    if (token == '' || !token) {
        res.json({
            auth: 'noAuth'
        })
    } else {
        if (FindUser) {
            res.json({
                auth: 'isUser'
            })
        }
        else if (FindAdmin) {
            res.json({
                auth: 'isAdmin'
            })
        }
        else {
            res.json({
                auth: 'noAuth'
            })
        }
    }
})

app.post("/api/v1/deleteuser", async (req, res, next) => {
    const { email } = req.body;
    let FindUser = await User.findOne({
        email
    })
    if (FindUser) {
        FindUser.delete();
        res.status(200).json({
            msg: 'کاربر با موفقیت خذف شد !'
        })
    } else {
        res.status(400).json({
            msg: 'کاربر پیدا نشد !'
        })
    }
})





app.post("/api/v1/signin", async (req, res, next) => {
    const { email, password } = req.body;

    if (email == '' | !email) {
        res.status(404).json({
            msg: "ایمیل خود را وارد کنید !",
        })

    }
    else if (password == '' || !password) {
        res.status(404).json({
            msg: "رمز عبور خود را وارد کنید !",
        })

    }
    else {
        let FindUser = await User.findOne({
            email
        })
        if (!FindUser) {
            res.status(400).json({
                msg: "کاربری با این ایمیل پیدا نشد  !",
            })

        }
        else {
            const isMatch = await bcrypt.compare(password, FindUser.password);

            if (!isMatch) {
                res.status(400).json({
                    msg: "ایمیل یا رمز عبور اشتباه است  !",
                })


            } else {
                const payload = {
                    details: {
                        id: FindUser._id,
                        email: FindUser.email,
                        isUser: FindUser.isUser,
                        username: FindUser.username,
                        password: FindUser.password
                    }
                };
                const jwtoken = jwt.sign(
                    payload,
                    "javadbayrami", {
                    expiresIn: 3600
                })
                res.status(200).json({
                    msg: "کاربر عزیز , با موفقیت وارد شدید  !",
                    token: jwtoken,
                })
            }

        }
    }
    next();
});





app.post("/api/v1/admin/signin", async (req, res, next) => {
    const { email, password } = req.body;

    if (email == '' | !email) {
        res.status(404).json({
            msg: "ایمیل خود را وارد کنید !",
        })

    }
    else if (password == '' || !password) {
        res.status(404).json({
            msg: "رمز عبور خود را وارد کنید !",
        })

    }
    else {
        let FindAdmin = await Admin.findOne({
            email
        })
        if (!FindAdmin) {
            res.status(400).json({
                msg: "کاربری با این ایمیل پیدا نشد  !",
            })

        }
        else {
            const isMatch = await bcrypt.compare(password, FindAdmin.password);

            if (!isMatch) {
                res.status(400).json({
                    msg: "ایمیل یا رمز عبور اشتباه است  !",
                })


            } else {
                const payload = {
                    details: {
                        id: FindAdmin._id,
                        email: FindAdmin.email,
                        isAdmin: FindAdmin.isAdmin,
                        username: FindAdmin.username,
                        password: FindAdmin.password
                    }
                };
                const jwtoken = jwt.sign(
                    payload,
                    "javadbayrami", {
                    expiresIn: 3600
                })
                res.status(200).json({
                    msg: " ادمین عزیز با موفقیت وارد شدید  !",
                    token: jwtoken,
                })
            }

        }
    }
    next();
});







app.get("/api/v1/getprice", async (req, res, next) => {
    const price = await Price.find()
    res.json(price);
    next();
});

app.get("/api/v1/getcontact", async (req, res, next) => {
    const contact = await Contact.find()
    res.json(contact);
    next();
});


app.get("/api/v1/getusers", async (req, res, next) => {
    const AllUsers = await User.find()
    res.json(AllUsers);
    next();
});

app.get("/api/v1/getblog/:id", (req, res, next) => {
    let id = req.params.id;
    if (id) {
        for (let index = 0; index < data.blogs.length; index++) {
            let post = data.blogs[index];
            if (id == post.id) {
                res.json(post)
            }
        }
        res.status(404);
    }
    res.status(400);
    next();
})



app.post("/api/v1/setblog", async (req, res, next) => {
    let { id, title, desc, img, alt, author } = req.body;
    const existBlog = await Blog.findOne({
        id
    })
    if (!existBlog) {
        const newBlog = new Blog({
            "id": id,
            "title": title,
            "desc": desc,
            "img": img,
            "alt": alt,
            "author": author
        })
        await newBlog.save();
        res.status(200).json({
            msg: "بلاگ شما با موفقیت ساخته شد  !"
        })
    } else {
        res.status(400).json({
            msg: "بلاگی با این آیدی موجود است  !"
        })
    }
    next()
})

app.post("/api/v1/sendContactForm", async (req, res, next) => {
    let { username, desc, email } = req.body;
    if (username != '' || email != '', desc != '') {
        const newComment = new Contact({
            "username": username,
            "desc": desc,
            "email": email
        })
        await newComment.save();
        res.status(200).json({
            msg: "متن شما با موفقیت ارسال شد  !"
        })
    }
    else {
        res.status(400).json({
            msg: "پر کردن تمامی فیلد ها ضروری است  !"
        })
    }

    next()
})

app.post("/api/v1/setprice", async (req, res, next) => {
    let { id, title, price, option } = req.body;
    const existPrice = await Price.findOne({
        id
    })
    if (!existPrice) {
        const newPrice = new Price({
            "id": id,
            "title": title,
            "price": price,
            "option": option
        })
        await newPrice.save();
        res.status(200).json({
            msg: " قیمت پکیج شما با موفقیت ثبت شد !"
        })
    } else {
        res.status(400).json({
            msg: "پکیجی با این آیدی موجود است  !"
        })
    }
    next()
})


app.listen(port, () => console.log(`app run in port: ${port}`))
