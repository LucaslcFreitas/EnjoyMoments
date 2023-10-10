import { Request, Response } from 'express'
import { JwtPayload, VerifyErrors, verify } from 'jsonwebtoken'

export function verifyJWD(
    request: Request,
    response: Response,
    next: Function
) {
    const token = String(request.headers['x-access-token'])

    const jwd_secrete = process.env.JWD_SECRET

    verify(token, jwd_secrete, (err: VerifyErrors, decode: JwtPayload) => {
        if (err) return response.status(401).json({ message: 'Invalid token' })

        request.auth_user_id = decode.id
        next()
    })
}
