export interface Pelicula {
    id?: number;
    cantidad?: number;
    tituloPelicula: string;
    nombreDirector: string;
    actoresPrincipales: string;
    duracion: number;
    idClasificacion: number;
    clasificacion?: string;
    idGenero: number;
    genero?: string;
    fechaEstreno: Date;
    precioVenta: number;
    precioVentaNuevo?: number;
    urlImagen: string;
    argumento: string;
}

export interface PeliculaSeleccionada {
    pelicula: Pelicula;
    esEliminacion: boolean;
}
