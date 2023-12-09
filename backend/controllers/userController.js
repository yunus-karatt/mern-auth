import asyncHandler from 'express-async-handler'

// Auth user/set token
// POST /api/users/auth
// public
const authUser =asyncHandler( async (req, res) => {
  res.status(200).json({ message: "Auth " });
});

export { authUser };
