import { Router, Request, Response } from 'express'
import { validateData } from '../../middlewares/validationMiddleware'
import { signIn, signUp } from './authSchemas'
import type { signInType, signUpType } from './authSchemas'
import prisma from '../../lib/prisma-client'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { SignJWT } from 'jose'
import { createSecretKey } from 'crypto'



const DEFAULT_AVATAR = 'https://i.pravatar.cc/'
const router: Router = Router()

/* Auth */

/* Sign in */

router.post('/signin', validateData(signIn), async (req: Request, res: Response) => {
  try {
    const { email, password }: signInType = req.body

    const existUser = await prisma.user.findFirst({
      where: {
        creadential: {
          email
        }
      },
      include: {
        creadential: true
      }
    })

    if (!existUser) {
      res.json({ error: 'User not found' })
    }

    if (!compareSync(password, existUser?.creadential?.password!)) {
      res.json({ error: 'Password not correct' })
    }


    if (!process.env.JWT_SECRET_KEY) {
      res.json({ error: 'JWT_SECRET_KEY not found' })
    }
    const secret_key = createSecretKey(process.env.JWT_SECRET_KEY!, 'utf-8')

    const token = await new SignJWT({ email: existUser?.creadential?.email, id: existUser?.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRATION_TIME ?? '1h')
      .sign(secret_key)

    console.log(token);


    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }).json({ token })

  } catch (error) {
    res.json({ error })
  }
})


/* Sign up */

router.post('/signup', validateData(signUp), async (req: Request, res: Response) => {

  try {
    const { email, firstName, lastName, username, password }: signUpType = req.body


    const exist_user = !!await prisma.user.findFirst({
      where: {
        creadential: {
          email
        }
      }

    })
    console.log(exist_user);

    if (exist_user) {
      res.json({ msg: 'User already exists' })
    }

    /* Cifrar password */

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);




    const new_user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        avatar: DEFAULT_AVATAR,
        creadential: {
          create: {
            email,
            password: hash
          }
        }
      }
    })
    if (!new_user) {
      res.json({ msg: 'User not created' })
    }
    res.json({ msg: 'User created' })


  } catch (error) {
    res.json({ error })
  }


})


router.get('/auth', (req: Request, res: Response) => {
  res.send('Get all users')
})

export default router
