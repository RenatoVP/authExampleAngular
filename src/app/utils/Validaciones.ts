export class Validaciones {
    // El texto solo permite caracteres
    public static TEXT: RegExp = /^[A-Za-z\s]+$/;

    // El texto solo permite caracteres pero con espacios
    public static TEXT_NOT_CONTAIN_SPACE: RegExp = /^[A-Za-z]+$/;

    // Valida el email
    public static EMAIL: RegExp = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

    // El numero de dni debe contener 8 digitos
    public static DNI: RegExp = /^[\d]{8}$/;

    // La contraseña debe ser minimo de 8 caracteres, contar con al menos 1 caracter
	// especial y al menos un numero
    public static PASSWORD: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).{8,}$/;
}
