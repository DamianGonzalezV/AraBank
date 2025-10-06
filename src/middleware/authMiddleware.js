import express from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "Token was not found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "No token provided" });
    }

    req.id = decoded.id;
    req.username = decoded.username;
    next();
  });
}
