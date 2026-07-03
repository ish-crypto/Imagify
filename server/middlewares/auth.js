import jwt from 'jsonwebtoken'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const userAuth = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Login again" })
    }
    try {
        const tokenDecode = /** @type {import('jsonwebtoken').JwtPayload} */ (
            jwt.verify(/** @type {string} */ (token), process.env.JWT_SECRET || "")
        )
        if (tokenDecode.id) {
            if (!req.body) req.body = {}
            req.body.userId= tokenDecode.id
            next()
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error })
    }
}

export default userAuth