class CorteException {
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class Corte {
    constructor(efectivo, dolares, retiroEnEfectivo, tarjeta, comprasEfectivo, gastosEfectivo, vales, devoluciones, totalSistema, diferencia, recibido, cajero, fecha, hora){
        this._RCC = getLatestRCC();
        this._efectivo = efectivo;
        this._dolares = dolares;
        this._retiroEnEfectivo = retiroEnEfectivo;
        this._tarjeta = tarjeta;
        this._comprasEfectivo = comprasEfectivo;
        this._gastosEfectivo = gastosEfectivo;
        this._vales = vales;
        this._devoluciones = devoluciones;
        this._totalSistema = totalSistema;
        this._diferencia = diferencia;
        this._recibido = recibido;
        this._cajero = cajero;
        this._fecha = fecha;
        this._hora = hora;
    }

    // Getters

    get RCC() {
        return this._RCC;
    }

    get efectivo() {
        return this._efectivo;
    }

    get dolares() {
        return this._dolares;
    }

    get retiroEnEfectivo() {
        return this._retiroEnEfectivo;
    }

    get tarjeta() {
        return this._tarjeta;
    }

    get comprasEfectivo() {
        return this._comprasEfectivo;
    }

    get gastosEfectivo() {
        return this._gastosEfectivo;
    }

    get vales() {
        return this._vales;
    }

    get devoluciones() {
        return this._devoluciones;
    }

    get totalSistema() {
        return this._totalSistema;
    }

    get diferencia() {
        return this._diferencia;
    }

    get recibido() {
        return this._recibido;
    }

    get cajero() {
        return this._cajero;
    }

    get fecha() {
        return this._fecha;
    }

    get hora() {
        return this._hora;
    }

    // Setters

    set RCC(value){
        throw new CorteException(`No se puede poner ${value} como RCC, son autogenerados.`)
    }

    set efectivo(value) {
        this._efectivo = value;
    }

    set dolares(value) {
        this._dolares = value;
    }

    set retiroEnEfectivo(value) {
        this._retiroEnEfectivo = value;
    }

    set tarjeta(value) {
        this._tarjeta = value;
    }

    set comprasEfectivo(value) {
        this._comprasEfectivo = value;
    }

    set gastosEfectivo(value) {
        this._gastosEfectivo = value;
    }

    set vales(value) {
        this._vales = value;
    }

    set devoluciones(value) {
        this._devoluciones = value;
    }

    set totalSistema(value) {
        this._totalSistema = value;
    }

    set diferencia(value) {
        this._diferencia = value;
    }

    set recibido(value) {
        if (isEmpty(value)) {
            throw new CorteException("Recibido vacío.");
        } else {
            this._recibido = value;
        }
    }

    set cajero(value) {
        if (isEmpty(value)) {
            throw new CorteException("Cajero vacío.");
        } else {
            this._cajero = value;
        }
    }

    set fecha(value) {
        if (isEmpty(value)) {
            throw new CorteException("Fecha vacía.");
        } else {
            this._fecha = value;
        }
    }

    set hora(value) {
        if (isEmpty(value)) {
            throw new CorteException("Hora vacía.");
        } else {
            this._hora = value;
        }
    }
      

}