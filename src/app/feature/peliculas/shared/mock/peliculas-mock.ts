import { of } from 'rxjs';
import { Pelicula } from '@pelicula/shared/model/pelicula.model';
import { Catalogo } from '@shared/model/catalogo.model';

export const listaPeliculas: Pelicula[] = [
    {
        id: 1,
        tituloPelicula: 'Black Widow',
        nombreDirector: 'Cate Shortland',
        actoresPrincipales: 'Scarlett Johansson',
        duracion: 133,
        idClasificacion: 3,
        idGenero: 3,
        fechaEstreno: new Date('24-Jun-2021'),
        precioVenta: 500,
        urlImagen: 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/8/1/0/9/19018-1-esl-CO/BLACKWIDOW_DOMESTIC_PAYOFF_LAS%20(1).jpg',
        argumento: 'En BLACK WIDOW de Marvel Studios, un thriller de espías lleno de acción, Natasha Romanoff, también conocida como Black Widow, se enfrenta a lo más oscuro de sus cuentas pendientes, cuando surge una peligrosa conspiración que tiene lazos con su pasado. Perseguida por una fuerza que no se detendrá ante nada para derribarla, Natasha debe lidiar con su historia como espía y con las relaciones rotas que dejó a su paso mucho antes de convertirse en parte de los Vengadores. Scarlett Johansson vuelve como Natasha/Black Widow, Florence Pugh interpreta a Yelena, David Harbour interpreta a Alexei/The Red Guardian y Rachel Weisz es Melina. Dirigida por Cate Shortland y producida por Kevin Feige.',
        clasificacion: 'Mayores de 15 años',
        genero: 'Fantasia'
    }, {
        id: 2,
        cantidad: 0,
        tituloPelicula: 'Rápidos y Furiosos 9',
        nombreDirector: 'Justin Lin',
        actoresPrincipales: 'Vin Diesel, Michelle Rodriguez, Tyrese Gibson, Chris “Ludacris” Bridges, John Cena, Jordana Brewster, Nathalie Emmanuel, Sung Kang, with Helen Mirren y Charlize Theron',
        duracion: 145,
        idClasificacion: 1,
        clasificacion: 'Para todos',
        idGenero: 1,
        genero: 'Terror',
        fechaEstreno: new Date('24-Jun-2021'),
        precioVenta: 800,
        urlImagen: 'https://archivos-cms.cinecolombia.com/images/_aliases/poster_card/1/2/7/8/18721-5-esl-CO/FF9_DIGTAL_1_SHEET_MONTAGE_LAT-AM.jpg',
        argumento: 'Toretto lleva una vida tranquila junto a Letty y su hijo Little Brian'
    },
    {
        id: 3,
        cantidad: 0,
        tituloPelicula: 'Ángel de mi vida',
        nombreDirector: 'Virginia María',
        actoresPrincipales: 'Actor numero 1',
        duracion: 100,
        idClasificacion: 1,
        clasificacion: 'Para todos',
        idGenero: 1,
        genero: 'Terror',
        fechaEstreno: new Date('21-Jun-2021'),
        precioVenta: 500,
        urlImagen: 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster_mobile/7/2/2/7/7227-31-esl-CO/ADMV_poster_480x670px.png',
        argumento: 'Ángel es un joven con discapacidad cognitiva que se'
    },
    {
        id: 4,
        cantidad: 0,
        tituloPelicula: 'Space Jam: Una Nueva Era',
        nombreDirector: 'Malcolm D. Lee',
        actoresPrincipales: 'LeBron James, Don Cheable, Ceyair J Wright',
        duracion: 120,
        idClasificacion: 1,
        clasificacion: 'Para todos',
        idGenero: 1,
        genero: 'Terror',
        fechaEstreno: new Date('21-Jul-2021'),
        precioVenta: 500,
        urlImagen: 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster_mobile/1/5/0/9/19051-1-esl-CO/ARTE%20-%20SPACE%20JAM%20UNA%20NUEVA%20ERA.png',
        argumento: 'LeBron y su hijo Dom quedan atrapados en un espacio digital creado'
    },
    {
        id: 5,
        cantidad: 0,
        tituloPelicula: 'La Purga Por Siempre',
        nombreDirector: 'Everardo Gout',
        actoresPrincipales: 'Ana de la Reguera, Tenoch Huerta, Josh Lucas, Cassidy Freeman, Leven Rambin, Alejandro Edda y Will Patton',
        duracion: 103,
        idClasificacion: 1,
        clasificacion: 'Para todos',
        idGenero: 1,
        genero: 'Terror',
        fechaEstreno: new Date('21-Jan-2021'),
        precioVenta: 500,
        urlImagen: 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster_mobile/7/0/2/9/19207-1-esl-CO/2-Cineco-poster-480x670px.png',
        argumento: 'Todas las reglas se rompen cuando una secta'
    }
];

export const catalogo: Catalogo[] = [
    { id: 1, descripcion: 'Terror' },
    { id: 2, descripcion: 'Acción' },
    { id: 3, descripcion: 'Fantasia' }
];

export const informacionPeliculaFormulario = {
    id: 1,
    tituloPelicula: 'Black Widow',
    nombreDirector: 'Cate Shortland',
    actoresPrincipales: 'Scarlett Johansson',
    duracion: 133,
    idClasificacion: 3,
    idGenero: 3,
    fechaEstreno: new Date('24-Jun-2021'),
    precioVenta: 500,
    urlImagen: 'https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_poster/8/1/0/9/19018-1-esl-CO/BLACKWIDOW_DOMESTIC_PAYOFF_LAS%20(1).jpg',
    argumento: 'En BLACK WIDOW de Marvel Studios',
    clasificacion: 'Mayores de 15 años',
    genero: 'Fantasia'
};

export const datosInicialesFormulario = {
    tituloPelicula: '',
    nombreDirector: '',
    actoresPrincipales: '',
    duracion: '',
    idClasificacion: '',
    idGenero: '',
    fechaEstreno: '',
    precioVenta: '',
    urlImagen: '',
    argumento: '',
};

export const datosCompletosFormulario = {
    tituloPelicula: 'Rápidos y Furiosos 9',
    nombreDirector: 'Justin Lin',
    actoresPrincipales: 'Vin Diesel',
    duracion: 145,
    idClasificacion: 1,
    idGenero: 1,
    fechaEstreno: new Date('2021-06-24'),
    precioVenta: 800,
    urlImagen: 'https://archivos-cms.cinecolombia.com/images/_aliases/poster_card/1/2/7/8/18721-5-esl-CO/FF9_DIGTAL_1_SHEET_MONTAGE_LAT-AM.jpg',
    argumento: 'Toretto lleva una vida tranquila junto a Letty y su hijo Little Brian'
};

export const PeliculasServicesMock = {
    guardarPelicula: (cuerpoPelicula: Pelicula) => of(cuerpoPelicula),
    editarPelicula: (cuerpoPelicula: Pelicula) => of(cuerpoPelicula),
    obtenerListadoPeliculas: () => of(listaPeliculas),
    eliminarPelicula: (idPelicula: number) => of(idPelicula),
};

export const CatalogoServiceMock = {
    obtenerCatalogo: (_: string) => of(catalogo)
};
