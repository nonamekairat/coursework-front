export interface IResetPassword {
    password: string;
    confirmPassword: string;
}

export interface IResetPasswordWithToken {
    resetPasswordDto: IResetPassword;
    token: string;
}