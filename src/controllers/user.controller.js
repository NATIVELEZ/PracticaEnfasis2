const User = require("../models/user.model");
const response = require("../res/response");

const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        response.success(req, res, { total: users.length, users }, 200);
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return response.error(req, res, "Usuario no encontrado", 404);
        response.success(req, res, { user }, 200);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        response.success(req, res, { msg: "Usuario creado", userId: user.id }, 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await User.update(req.body, { where: { id } });
        if (!updated[0]) return response.error(req, res, "Usuario no encontrado", 404);
        response.success(req, res, { msg: "Usuario actualizado", id }, 200);
    } catch (error) {
        next(error);
    }
};

const deleted = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (!deleted) return response.error(req, res, "Usuario no encontrado", 404);
        response.success(req, res, { msg: "Usuario eliminado", id }, 200);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, getOne, create, update, deleted };
