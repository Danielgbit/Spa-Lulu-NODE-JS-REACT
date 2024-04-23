const db = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { createAccessToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, ADMIN_ACCESS, ADMIN_PASSWORD, ADMIN_ID, ADMIN_NAME, EmailNodeMailer, PasswordNodeMailer } = require('../config');
const nodemailer = require('nodemailer');
const tokenStore = {};


const userController = {

    getAllUsers: async (req, res) => {

        try {
            const allUsers = await db.User.findAll({
                raw: true
            });

            if (!allUsers || allUsers.length === 0) {
                res.status(400).json({
                    error: 'No se encontraron usuarios'
                });
            };

            const allUsersMap = allUsers.map((user) => ({
                user_id: user.user_id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                email: user.email,
                city: user.city,
                avatar: `http://localhost:4000/avatar/${user.user_id}`,
                userDetail: `http://localhost:4000/userDetail/${user.user_id}`
            }));

            res.status(200).json({
                allUsers: allUsersMap
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            })
            console.error(error);
        };

    },

    getUserDetail: async (req, res) => {

        try {

            const id = req.params.id;

            const user = await db.User.findByPk(id, {
                raw: true,
            });

            if (!user || user.length === 0) {
                res.status(400).json({
                    sucess: false,
                    error: 'No se encontro el usuario'
                });
            };

            const userDetail = {
                user_id: id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                email: user.email,
                city: user.city,
                avatar: `http://localhost:4000/avatar/${id}`,
                destroyUser: `http://localhost:4000/destroyUser/${id}`,
                updateUser: `http://localhost:4000/updateUser/${id}`
            };

            res.status(200).json({
                userDetail
            });

        } catch (error) {
            res.status(500).json({ message: error.msg })
            console.error(error);
        }

    },

    getProfile: async (req, res) => {

        try {
            const { id } = req.user;

            const user = await db.User.findByPk(id, { raw: true });

            if (!user) { res.status(400).json({ message: 'user not found' }); };

            delete user.password;

            res.status(200).json({
                id: user?.user_id,
                name: `${user?.first_name} ${user?.middle_name} ${user?.last_name}`,
                firstName: user?.first_name,
                middleName: user?.middle_name,
                lastName: user?.last_name,
                city: user?.city,
                phoneNumber: user.phone_number,
                email: user?.email,
                address: user?.address,
                district: user?.district,
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.error(error);
        }
    },

    getVerifyToken: async (req, res) => {

        const { token } = req.cookies;

        jwt.verify(token, JWT_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ message: 'Unautorized' });
            const { id } = user;
            const userFound = await db.User.findByPk(id);
            if (!userFound) return res.status(401).json({ message: 'Unautorized' });

            res.status(200).json({ 
                user: {
                    id: userFound.user_id,
                    userName: userFound?.first_name,
                    name: `${userFound?.first_name} ${userFound.middle_name} ${userFound.last_name}`,
                    email: userFound.email
                }
            });
        });
    },

    getVerifyTokenAdmin: async (req, res) => {

        const token = req.token;

        jwt.verify(token, JWT_SECRET, async (err, admin) => {
            if (err) return res.status(401).json({ message: 'Unautorized' });
            if(admin.id !== ADMIN_ID) return res.status(401).json({ message: 'Unautorized' });

            res.status(200).json({ 
                admin: {
                    name: ADMIN_NAME
                }
            });
        });
    },

    getUserAvatar: async (req, res) => {

        try {

            const userId = req.params.userId;

            const user = await db.User.findByPk(userId, {
                raw: true,
            });

            if (!user || user.length === 0 || user.avatar === null) {
                res.status(400).json({
                    sucess: false,
                    error: 'El usuario no tiene un avatar'
                });
            };

            const avatarPath = path.join(__dirname, '..', '..', '/public/imgs/users', user.avatar);


            fs.readFile(avatarPath, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(404).json({
                        error: 'La imagen no existe'
                    });
                };

                res.writeHead(200, {
                    'Content-Type': 'image/jpeg'
                });
                res.end(data, 'binary');

            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            })
            console.error(error);
        }

    },

    postLoginSession: async (req, res) => {
        try {

            const result = validationResult(req);

            const errorsMap = result.errors.map((err) => ({
                [err.path]: err.msg
            }));

            if (result.errors.length > 0) { return res.status(400).json({ errors: errorsMap }); };

            const userEmail = req.body.email;
            const userPassword = req.body.password;

            const user = await db.User.findOne({
                where: {
                    email: userEmail
                },
                raw: true
            });

            if (!user || user === null) {
                return res.status(404).json({
                    message: 'contraseña o email incorrecto'
                });
            };

            const compareSyncPassword = bcrypt.compareSync(userPassword, user.password);

            if (!compareSyncPassword || compareSyncPassword === false) {
                return res.status(404).json({
                    message: 'contraseña o email incorrecto'
                });
            };

            delete user.password;
            delete user.avatar;
            delete user.phone_number;

            const token = await createAccessToken({ id: user.user_id, });

            if (user) {
                res.cookie('token', token, {
                    sameSite: 'none',
                    maxAge: 30 * 60 * 1000,
                    secure: true
                });
            };

            res.status(200).json({ message: 'Ingreso exitoso' });


            const existingCart = await db.Cart.findOne({
                where: {
                    user_id: user.user_id
                }
            });

            if (!existingCart) {
                const newCart = {
                    user_id: user.user_id,
                };
                
                const cartCreate = await db.Cart.create(newCart);

                if (!cartCreate || cartCreate.length === 0) {
                    res.status(400).json({
                        success: false,
                        createError: 'error al crear el carrito'})
                };

                res.status(201).json({
                    success: true,
                    message: '¡Carrito creado exitosamente!',
                });
            };

        } catch (error) {
            console.error(error);
        }
    },

    postLoginAdmin: async (req, res) => {
        try {

            const result = validationResult(req);

            const errorsMap = result.errors.map((err) => ({
                [err.path]: err.msg
            }));

            if (result.errors.length > 0) { return res.status(400).json({ errors: errorsMap }); };

            const userEmail = req.body.email;
            const userPassword = req.body.password;

            if( ADMIN_ACCESS !== userEmail || ADMIN_PASSWORD !== userPassword ){ 
                return res.status(404).json({
                    message: 'contraseña o email incorrecto'
                });
            }

            
            if (ADMIN_ACCESS === userEmail && ADMIN_PASSWORD === userPassword) {

                const id = ADMIN_ID;
                const token = await createAccessToken({ id: id, });
    
                res.cookie('token', token, {
                    sameSite: 'none',
                    maxAge: 30 * 60 * 1000,
                    secure: true
                });

                res.status(200).json({ message: 'ingreso exitoso' });

            }

            


        } catch (error) {
            console.error(error);
        }
    },

    postRegisterUser: async (req, res) => {

        try {

            const result = validationResult(req);

            const errorsMap = result.errors.map((err) => ({ [err.path]: err.msg }));

            if (result.errors.length > 0) {
                if (req.file) {
                    fs.unlinkSync(path.join(__dirname, `../../public/imgs/users/${req.avatarFileName}` ))
                    return res.status(400).json({ errors: errorsMap});
                }else {
                    return res.status(400).json({ errors: errorsMap});
                };
            };

            const passwordHashSync = bcrypt.hashSync(req.body.password, 10);

            const newUser = {
                user_id: uuidv4(),
                first_name: req.body.firstName,
                middle_name: req.body.middleName,
                last_name: req.body.lastName,
                phone_number: req.body.phoneNumber,
                address: req.body.address,
                district: req.body.district,
                email: req.body.email,
                city: req.body.city,
                avatar: req.body.avatar === 'false' ? req.body.avatarDefault : req.avatarFileName,
                password: passwordHashSync
            };

            const userFound = await db.User.findOne({ 
                where: { email: newUser.email }, raw: true
            });

            if (userFound?.length > 0 || userFound) {
                if (req.file) {
                    fs.unlinkSync(path.join(__dirname, `../../public/imgs/users/${req.avatarFileName}` ))
                    return res.status(400).json({ existing: 'Este usuario ya existe' });
                }else{
                    return res.status(400).json({ existing: 'Este usuario ya existe' });
                }
            };

            const userCreate = await db.User.create(newUser);

            if (!userCreate || userCreate.length === 0) {
                return res.status(400).json({
                    success: false,
                    createError: 'error al crear el usuario'
                })
            };

            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente!',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                errorServer: 'error interno del servidor'
            });
        };
    },

    updateUser: async (req, res) => {

        try {

            const result = validationResult(req);

            if (result.errors.length > 0) {
                if (req.file) {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', req.avatarFileName);
                    fs.unlinkSync(pathImage)
                    const resultErrorsMap = result.errors.map((error) => ({
                        [error.path]: error.msg
                    }));
                    return res.status(400).json(resultErrorsMap);
                } else {
                    const resultErrorsMap = result.errors.map((error) => ({
                        [error.path]: error.msg
                    }));
                    return res.status(400).json(resultErrorsMap);
                };
            };

            const userId = req.user.id;

            const user = await db.User.findByPk(userId, {
                raw: true,
            });



            if (!user || user.length === 0) {
                if (req.file) {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', req.avatarFileName);
                    fs.unlinkSync(pathImage)
                    return res.status(404).json({
                        success: false,
                        error: 'el usuario no existe'
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        error: 'el usuario no existe'
                    });
                };
            };

            const emailUser = await db.User.findOne({
                where: {
                    email: req.body.email
                },
                raw: true
            },);


            if (emailUser) {
                if (emailUser.email !== user.email) {
                    if (req.file) {
                        const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', req.avatarFileName);
                        fs.unlinkSync(pathImage)
                        return res.status(409).json({ message: 'el email ya esta en uso' })                        
                    }else {
                        return res.status(409).json({ message: 'el email ya esta en uso' })                        
                    }; 
                }
            };


            if (req.file) {
                if (user.avatar !== 'avatar-1.png' && user.avatar !== 'avatar-2.png' && user.avatar !== 'avatar-3.png') {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', user.avatar);
                    fs.unlinkSync(pathImage);
                };
            }else {
                if (user.avatar !== 'avatar-1.png' && user.avatar !== 'avatar-2.png' && user.avatar !== 'avatar-3.png') {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', user.avatar);
                    fs.unlinkSync(pathImage);
                };
            }


            const userUpdate = {
                first_name: req.body.firstName,
                middle_name: req.body.middleName,
                last_name: req.body.lastName,
                phone_number: req.body.phoneNumber,
                email: req.body.email,
                city: req.body.city,
                avatar: req.body.avatar === 'false' && req.body.avatarDefault === 'null' ? user.avatar : req?.avatarFileName || req.body.avatarDefault,
                password: user.password,
                address: req.body.address,
                district: req.body.district,
                city: req.body.city,
            };

            const [rowsUpdate, updateUser] = await db.User.update(userUpdate, {
                where: {
                    user_id: userId
                }
            });

            if (rowsUpdate === 0) {
                return res.status(304).json({ message: 'No se actualizo ninguna columna' });
            };

            res.status(200).json({
                success: true,
                message: 'se actualizo correctamente el usuario',
            });

        } catch (e) {
            console.error(e);
            if (req.file) {
                const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', req.avatarFileName);
                fs.unlinkSync(pathImage);
            }
            return res.status(500).json({ message: e.message });
        }
    },

    passwordUpdate: async (req, res) => {

        try {

            const userId = req.user.id;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;


            const user = await db.User.findOne({
                where: {
                    user_id: userId
                }
            });

            if (!user || user.length === 0) { return res.status(404).json({ message: 'user not found' }); };

            const compareSync = bcrypt.compareSync(oldPassword, user.password);

            if (!compareSync) { return res.status(400).json({ message: 'La contraseña es incorrecta' }); };

            const newPasswordHashSync = bcrypt.hashSync(newPassword, 10);
            
            const [ rowsUpdate, userUpdate ] = await db.User.update({ password: newPasswordHashSync  },{
                where: {
                    user_id: userId
                }
            });

            if (!rowsUpdate || rowsUpdate === 0) { return res.status(400).json({ message: 'No se modifico ninguna linea' }); };

            res.status(200).json('succesfull');

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    deleteUserAuth: async (req, res) => {

        try {

            const userId = req.user.id;
            const password = req.body.password;

            const user = await db.User.findOne({
                where: {
                    user_id: userId
                }
            });

            if (!user || user.length === 0) { return res.status(404).json({ message: 'user not found' }); };

            const compareSync = bcrypt.compareSync(password, user.password);

            if (!compareSync) { return res.status(400).json({ message: 'La contraseña es incorrecta' }); };

            const findCartUser = await db.Cart.findOne({
                where: {
                    user_id: userId
                }
            }, { raw: true });


            await db.CartItems.destroy({
                where: {
                    cart_id: findCartUser.cart_id
                }
            });

            const destroyCart = await db.Cart.destroy({
                where: {
                    user_id: userId
                }
            });

            if (destroyCart === 0) { return res.status(404).json({ message: 'Fallo la eliminación de usuario' }); };

            const destroyUser = await db.User.destroy({
                where: {
                    user_id: userId
                }
            });

            if (destroyUser === 0) { return res.status(404).json({ message: 'Fallo la eliminación de usuario' }); };

            fs.unlinkSync(path.join(__dirname, `../../public/imgs/users/${user.avatar}` ))

            res.status(200).json('succesfull');

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: e.message });
        }
    },

    postLogoutSession: async (req, res) => {
        try {
            res.clearCookie('token');
    
            return res.status(200).json({
                success: true,
                message: 'Se removió exitosamente la sesión',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    },
    
    getLengthUsers: async (req, res) => {

        try {
            const users = await db.User.findAll({ raw: true });

            if (!users) { res.status(400).json({ message: 'user not found' }); };

            res.status(200).json({
                length: users.length
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.error(error);
        }

    },

    getShoppingHistory: async (req, res) => {

        try {
            const { id } = req.params;

            if (!id || id?.length === 0) {
                return res.status(404).json({ message: 'id not found' })
            }

            const orders = await db.Order.findAll({
                where: {
                    user_id: id
                },
                raw: true,
                nest: true
           });

           if (!orders) { return res.status(404).json({ message: 'not found orders' }) }

           const ordersMapped = orders.map((order) => ({
               orderId: order.order_id,
               orderDate: order.order_date,
               total: order.order_amount,
               status: order.status,
               paymentMethod: order.payment_method,
               paymentEmail: order.payment_email,
               phoneNumber: order.phone_number
           }));


            res.status(200).json({
                shoppings: ordersMapped
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }

    },

    postForgotPassword: async (req, res) => {

        try {

            const { email } = req.body
            const token = req.crypto

            tokenStore[email] = token;

            const config = { 
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: EmailNodeMailer,
                    pass: PasswordNodeMailer
                }
            }

            const transporter = nodemailer.createTransport(config);

            const mailOptions = {
                from: EmailNodeMailer,
                to: email,
                subject: 'Restablecer contraseña',
                text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:3000/reset-password/${token}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: error.message });
                } else {
                    console.log('Correo electrónico enviado: ' + info.response);
                    return res.status(200).json({ message: 'Correo enviado, ¡revisa tu bandeja!' });
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }

    },

    getResetToken: async (req, res) => {

        try {

            const { token } = req.query;
            const email = Object.keys(tokenStore).find(key => tokenStore[key] === token);

            if (!email) {
                return res.status(400).json({ message: 'acceso invalido' });
            };

            res.status(200).json({ message: 'successfull' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }

    },
};

module.exports = userController;