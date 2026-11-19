// E l precio llega como texto: "8.999.000". para sumar hay que volverlo numero.
export function precioNumero(precio) {
    return Number(precio.replace(/[$.]/g, ""));
}


// y para mostrarlo: de numero otra vez a texto con puntos : 8999000 -> "$8.999.000"

export function formatearprecio(numero) {
    return "$" + numero.tolocaleString("es-CO")
}