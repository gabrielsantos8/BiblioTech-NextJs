import jwt_decoded from 'jwt-decode'
import { cookies } from 'next/headers';

export const verificaTokenExpirou = (token: string | undefined) => {
    const cookie = cookies();
    if (token) {
        let decodedToken: any = jwt_decoded(token);

        if (decodedToken != null) {
            if (decodedToken.exp < new Date().getTime() / 1000) {
                cookie.delete('bibliotech.token')
                return true
            }
            return false
        }
        return false
    }
    cookie.delete('bibliotech.token')
    return true;
}

export const validaPermissao = (
    token: string | undefined,
    permissao: Array<string>
) => {
    if (token) {
        const user = jwt_decoded<{ permissoes: string, id: number }>(token);

        if (typeof user.permissoes === 'string') {
            const temAlgumaPermissao = permissao.includes(user.permissoes)

            return temAlgumaPermissao
        }
        return false;
    }
    return true;
}