// Middleware de ruta pública
import session from "express-session";

export const publicRoute = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect('/profile');
  } else {
    next();
  }
};

export const validateLogin = (req, res, next) => {
  console.log("Middleware validateLogin ejecutándose");
  console.log("Sesión:", req.session);
  if (req.session && req.session.user) {
    console.log("Sesión de usuario presente. Permitiendo acceso.");
    next();
  } else {
    console.log("Redirigiendo a /login porque la sesión no está.");
    res.redirect('/login');
  }
}


