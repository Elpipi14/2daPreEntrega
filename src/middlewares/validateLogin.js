// Middleware de ruta pública
export const publicRoute = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect('/profile');
  } else {
    next();
  }
};

export const validateLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log("Sesión de usuario presente. Permitiendo acceso.");
    next();
  } else {
    console.log("Redirigiendo a /login porque la sesión no esta.");
    res.redirect('/login');
  }
}


