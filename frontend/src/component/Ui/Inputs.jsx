import Input from "./Input";

export const TextFeild = ({ lableName, inputId, placeholder, register, errors }) => {
    let validation = {
        required: 'This feild is required',
        minLength: {
            value: 5,
            message: "Minumum 6 cheracter required"
        }
    }

    return <Input lableName={lableName}
        inputId={inputId}
        placeholder={placeholder}
        validation={validation}
        register={register}
        errors={errors}
    />
}

export const EmailFeild = ({ register, errors }) => {
    let validation = {
        required: 'Email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address'
        }
    }

    return <Input lableName={"Email"}
        inputId={"email"}
        type="email"
        placeholder="demo@mail.com"
        validation={validation}
        register={register}
        errors={errors}
    />
}

export const PasswordFeild = ({ register, errors, loginMode, newPwd }) => {
    let confPwdValidate = {
        validate: value => value === newPwd || 'Password do not match'
    }

    let validation = {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: "Minumum 6 cheracter required"
        },
        ...(!loginMode && confPwdValidate)
    }

    return <Input lableName={loginMode ? "Password" : "Conform Password"}
        inputId={"password"}
        type="password"
        placeholder="enter your passowrd "
        validation={validation}
        register={register}
        errors={errors}
    />
}
