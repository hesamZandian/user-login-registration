
const auth = async (request, response, next) => {
  const token = req.header.authorization;

  if (!token) {
    return res.status(403).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
