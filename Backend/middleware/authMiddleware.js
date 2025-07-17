import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" "[1]);

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    console.log("Recieved Token :", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token :", decoded);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("JWT Verification Error : ", err.message);
    res.status(400).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;
