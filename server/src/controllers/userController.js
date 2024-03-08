const db = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { createAccessToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


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
            delete user.phone_number;
            delete user.city;

            res.status(200).json({
                id: user.user_id,
                name: `${user?.first_name} ${user?.middle_name} ${user?.last_name}`,
                email: user.email,
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
                id: userFound.user_id,
                name: `${userFound?.first_name} ${userFound.middle_name} ${userFound.last_name}`,
                email: userFound.email
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

    postRegisterUser: async (req, res) => {

        try {

            const result = validationResult(req);

            const errorsMap = result.errors.map((err) => ({
                [err.path]: err.msg
            }));

            if (result.errors.length > 0) {
                if (req.file) {
                    fs.unlinkSync(path.join(__dirname, `../../public/imgs/users/${req.file.filename}` ))
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
                email: req.body.email,
                city: req.body.city,
                avatar: req.file.filename,
                password: passwordHashSync
            };

            const userFound = await db.User.findOne({ 
                where: { email: newUser.email }, raw: true
            });

            if (userFound?.length > 0 || userFound) {
                if (req.file) {
                    fs.unlinkSync(path.join(__dirname, `../../public/imgs/users/${req.file.filename}` ))
                    return res.status(400).json({ existing: 'user already existing' });
                }else{
                    return res.status(400).json({ existing: 'user already existing' });
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
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', req.file.filename);
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

            const userId = req.params.id;

            const user = await db.User.findByPk(userId, {
                raw: true,
            });

            if (!user || user.length === 0) {
                if (req.file) {
                    const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', req.file.filename);
                    fs.unlinkSync(pathImage)
                    res.status(404).json({
                        success: false,
                        error: 'el usuario no existe'
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        error: 'el usuario no existe'
                    });
                };
            };

            if (req.file) {
                const pathImage = path.join(__dirname, '..', '..', 'public', 'imgs', 'users', user.avatar);
                fs.unlinkSync(pathImage);
            };

            const passwordHashSync = bcrypt.hashSync(req.body.password, 10);

            const userUpdate = {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                email: req.body.email,
                city: req.body.city,
                avatar: req.file ? req.file.filename : user.avatar,
                password: passwordHashSync
            };

            const [rowsUpdate, updateUser] = await db.User.update(userUpdate, {
                where: {
                    user_id: userId
                }
            });

            if (rowsUpdate === 0) {
                res.status(500).json({
                    success: false,
                    error: 'error interno, no se puedo actualizar el usuario',
                });
            };

            res.status(200).json({
                success: true,
                message: 'se actualizo correctamente el usuario',
            });

        } catch (error) {
            res.status(500).json({
                errorServer: 'error interno del servidor'
            })
            console.error(error);
        }
    },

    postLogoutSession: async (req, res) => {
        try {
            const userId = req.params.id;
    
            const user = await db.User.findByPk(userId, {
                raw: true,
            });
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuario no existente',
                });
            }
    
            res.clearCookie('authToken');
            req.session.destroy();
    
            return res.status(200).json({
                success: true,
                message: 'Se removió exitosamente la sesión',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                errorServer: 'Error interno del servidor',
            });
        }
    },
    
    destroyUser: async (req, res) => {
        try {

            const userId = req.params.id;

            const user = await db.User.findByPk(userId, {
                raw: true
            });


            if (!user || user.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'El usuario ya no existe'
                });
            };

            const userDestroy = await db.User.destroy({
                where: {
                    user_id: userId
                }
            });

            if (!userDestroy || userDestroy.length === 0) {
                return res.status(500).json({
                    sucess: false,
                    error: 'error interno del servidor, No se elimino el usuario'
                });
            };

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'error interno del servidor'
            });
        };
    },
};

module.exports = userController;