const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../res/response");

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Auth.findOne({ where: { email } });
        if (existingUser) return response.error(req, res, "El correo ya está registrado", 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Auth.create({ email, password: hashedPassword });

        response.success(req, res, { msg: "Usuario registrado", id: newUser.id }, 201);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ where: { email } });
        if (!user) return response.error(req, res, "Credenciales incorrectas", 401);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return response.error(req, res, "Credenciales incorrectas", 401);

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
        response.success(req, res, { msg: "Inicio de sesión exitoso", token }, 200);
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };
