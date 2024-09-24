import { User } from '@/payload-types'
import { checkRole } from '@/utilities/checkRole'
import type { AccessArgs } from 'payload'


type isAdmin = (args: AccessArgs<User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
    return checkRole(['admin'], user!)
}
