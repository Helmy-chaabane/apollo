const jwt = require("jsonwebtoken");
const getUserId = (request, requireAuth = true) => {

  const header = request.req.headers.authorization || "";
  if (header) {
    const token = header.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, "secret");
      return decoded._id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  if (requireAuth) throw new Error("Authorization is required");
  return null;
};

module.exports = getUserId;
