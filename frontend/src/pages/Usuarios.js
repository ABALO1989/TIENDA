import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Usuarios = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [Usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo usuario');



    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear Nuevo usuario');
            
        } else {
            setTextoBoton('Mostrar Todos los Usuarios');
            
        }
    }, [mostrarTabla]);

    return (
        <div className='flex w-full flex-col items-center justify-start pt-5'>
            <div className='flex flex-col'>
                <h2 className='text-xl text-center font-mono font-bold text-yellow-900'>
                    ADMINISTRACIÓN DE USUARIOS
                </h2>
                
                <button
                    onClick={() => {
                        setMostrarTabla(!mostrarTabla);
                    }}
                    className={`text-white font-bold bg-yellow-300 p-2 m-5 w-29 hover:bg-red-400 rounded self-end`}
                >
                    {textoBoton}
                </button>
            </div>
            {
                mostrarTabla ? (
                    <TablaUsuarios listaUsuarios={Usuarios} />
                ) : (
                    <FormularioCreacionUsuarios
                        setMostrarTabla={setMostrarTabla}
                        listaUsuarios={Usuarios}
                        setUsuarios={setUsuarios}
                    />
                )
            }

    
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div >
    )
}

const TablaUsuarios = ({ listaUsuarios}) => {
   
    useEffect(() => {
        console.log('este es el listado de Usuarios en el componente de tabla', listaUsuarios);
    }, [listaUsuarios]);
    return (
        <div className='flex flex-col items-center justify-center '>
            <div className="flex text-center">
                        <form className='flex flex-col pt-2'>
                            <h4 className='font-bold text-grey-900 justify-center'>Buscar Usuario</h4>
                            <div clasName="flex items-center justify-center gap-3">
                                    <div class="bg-white flex items-center rounded-l shadow-xl ">
                                        <input class="rounded-l-full w-full  px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="'ID usuario o Descripcion'" />
                                        <div class="p-4">
                                            <button class="bg-red-400 text-white p-2 font-bold hover:bg-yellow-300 focus:outline-none w-20 h-10 rounded-md -m-3flex items-center justify-center">
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                            </div>
                        </form>
                </div>
            <table className="mt-10 mb-10 ">
                <thead>
                    <tr>
                        <th className="border border-gray-500 bg-red-400 px-4 p-2 text-white">Identificador </th>
                        <th className="border border-gray-500 bg-red-400 px-4 p-2 text-white">Descripcion</th>
                        <th className="border border-gray-500 bg-red-400 px-4 p-2 text-white">Valor</th>
                        <th className="border border-gray-500 bg-red-400 px-4 p-2 text-white">Estado</th>
                        <th className="border border-gray-500 bg-red-400 px-4 p-2 text-white">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((Usuario) => {
                        return (
                            <tr>
                                <td className="border border-gray-500 bg-gray-200 px-6 p-2">{Usuario.id}</td>
                                <td className="border border-gray-500 bg-gray-200 px-6 p-2">{Usuario.descripcion}</td>
                                <td className="border border-gray-500 bg-gray-200 px-6 p-2">{Usuario.valor}</td>
                                <td className="border border-gray-500 bg-gray-200 px-6 p-2">{Usuario.estado}</td>
                                <td className="border border-gray-500 bg-gray-200 px-6 p-2">Editar </td>
 
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
};

const FormularioCreacionUsuarios = ({ setMostrarTabla, listaUsuarios, setUsuarios }) => {
    const form = useRef(null);

    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoUsuario= {};
        fd.forEach((value, key) => {
            nuevoUsuario[key] = value;
        });

        setMostrarTabla(true);
        setUsuarios([...listaUsuarios, nuevoUsuario]);
        // identificar el caso de éxito y mostrar un toast de éxito
        toast.success('Usuario Agregado con éxito');
        // identificar el caso de error y mostrar un toast de error
        //toast.error('Error creando un mueble');
    };

    return (
        <div>
            <h2 className='text-xl font-bold font-mono text-gray-800 pb-4'>Crear nuevo usuario</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor='id'>
                    Identificador del usuario
                    <input
                        name='id'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        placeholder='identificador usuario'
                        required
                    />
                </label>
                <label className='flex flex-col' htmlFor='descripcion'>
                    Descripción
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='descripcion'
                        type="text"
                        placeholder='Descripción'
                        required

                    />
                    <label className='flex flex-col' htmlFor='valor'>
                        Valor
                        <input
                            name='valor'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='number'
                            placeholder='Precio usuario'
                            required
                        />
                    </label>
                    <label className='flex flex-col' htmlFor='estado'>
                        Estado
                        <input
                            name='estado'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='txt'
                            placeholder='Disponible o no disponible'
                            required
                        />
                    </label>

                </label>

                <button
                    type='submit'
                    className='col-span-2 bg-yellow-300 p-2 rounded-md shadow-md hover:bg-red-400 text-white font-bold m-5'
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default Usuarios;
