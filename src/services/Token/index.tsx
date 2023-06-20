import jwt_decoded from 'jwt-decode'

export const verificaTokenExpirou = (token: string | undefined) => {
    if (token) {
        let decodedToken: any = jwt_decoded(token);

        if (decodedToken != null) {
            if (decodedToken.exp < new Date().getTime() / 1000) {
                return true
            }
            return false
        }
        return false
    }
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