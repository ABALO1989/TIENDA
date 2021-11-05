import React, { useState, useEffect, useRef } from 'react'
import { obtenerVentas, crearVenta, editarVenta, eliminarVenta } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { Dialog, Tooltip } from '@material-ui/core';
import { nanoid } from 'nanoid';


const Ventas = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Crear Nueva venta');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    const [loading, setLoading] = useState(false);

    const [ventas, setVentas] = useState([])

    //OBTENER VENTAS DESDE EL BACKEND
    useEffect(() => {
        const fetchVentas = async () => {
            setLoading(true);
            await obtenerVentas(
                (response) => {
                    console.log('la respuesta que se recibio fue', response);
                    setVentas(response.data);
                    setEjecutarConsulta(false);
                    setLoading(false);
                },
                (error) => {
                    console.error('Salio un error:', error);
                    setLoading(false);
                }
            );
        };
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            fetchVentas();
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        //obtener lista de prodductos desde el backend
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);



    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear Nueva Venta');
        } else {
            setTextoBoton('Mostrar Todos las Ventas');

        }
    }, [mostrarTabla]);



    return (

        <div className='flex h-full w-full flex-col items-center justify-start p-10 '>
            <div className='flex flex-col w-full'>

                <div className='flex flex-col'>
                    <h2 className='text-2xl text-center font-mono font-bold text-yellow-900'>
                        ADMINISTRACIÓN DE VENTAS
                    </h2>

                    <button
                        onClick={() => {
                            setMostrarTabla(!mostrarTabla);
                        }}
                        className={`text-white font-bold bg-yellow-300 p-2 mr-32 mt-20 w-60 hover:bg-red-400 rounded self-end `}
                    >
                        {textoBoton}
                    </button>
                </div>
            </div>

            {mostrarTabla ? (
                <TablaVentas
                    loading={loading}
                    listaVentas={ventas}
                    setEjecutarConsulta={setEjecutarConsulta}
                />
            ) : (
                <FormularioCreacionVentas
                    setMostrarTabla={setMostrarTabla}
                    listaVentas={ventas}
                    setVentas={setVentas}
                />
            )}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>

    )
}

const TablaVentas = ({ loading, listaVentas, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [ventasFiltradas, setVentasFiltrados] = useState(listaVentas);

    useEffect(() => {
        setVentasFiltrados(
            listaVentas.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        );
    }, [busqueda, listaVentas]);

    return (
        <div className='flex flex-col items-center justify-center w-5/6 pb-6 '>
            <form >
                <label className='mr-6 mt-10 mb-6 font-mono text-yellow-900 font-bold'>Buscar venta: </label>
                <input
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder='ID/ valorTotal / valor/'
                    className='border-2 border-yellow-900 px-4 py-1 self-start rounded-md focus:outline-none focus:border-yellow-500'

                />
            </form>

            <div className='hidden md:flex w-full'>
                {loading ? (
                    <ReactLoading type='cylon' color='#abc123' height={667} width={375} />
                ) : (
                    <table className='tabla'>
                        <thead>
                            <tr>
                                <th>ID Venta</th>
                                <th>Valor Total</th>
                                <th>Cantidad</th>
                                <th>Valor Unitario</th>
                                <th>Fecha Venta</th>
                                <th>ID Cliente</th>
                                <th>Nombre Cliente</th>
                                <th>Vendedor</th>

                            </tr>
                        </thead>
                        <tbody>
                            {ventasFiltradas.map((venta) => {
                                return (
                                    <FilaVenta
                                        key={nanoid()}
                                        venta={venta}
                                        setEjecutarConsulta={setEjecutarConsulta}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className='flex flex-col w-full m-2 md:hidden'>
                {ventasFiltradas.map((el) => {
                    return (
                        <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
                            <span>{el.valorTotal}</span>
                            <span>{el.IDproducto}</span>
                            <span>{el.cantidad}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const FilaVenta = ({ venta, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        _id: venta._id,
        valorTotal: venta.valorTotal,
        IDproducto: venta.IDproducto,
        cantidad: venta.cantidad,
        valorUnitario: venta.valorUnitario,
        fechaVenta: venta.fechaVenta,
        IDcliente: venta.IDcliente,
        nombreCliente: venta.nombreCliente,
        vendedor: venta.vendedor,
    });

    const actualizarVenta = async () => {
        //enviar la info al backend

        await editarVenta(
            venta._id,
            {
                valorTotal: infoNuevaVenta.valorTotal,
                IDproducto: infoNuevaVenta.IDproducto,
                cantidad: infoNuevaVenta.cantidad,
                valorUnitario: infoNuevaVenta.valorUnitario,
                fechaVenta: infoNuevaVenta.fechaVenta,
                IDcliente: infoNuevaVenta.IDcliente,
                nombreCliente: infoNuevaVenta.nombreCliente,
                vendedor: infoNuevaVenta.vendedor,
            },
            (response) => {
                console.log(response.data);
                toast.success('Venta modificada con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            },
            (error) => {
                toast.error('Error modificando la venta');
                console.error(error);
            }
        );
    };

    const deleteVenta = async () => {
        await eliminarVenta(
            venta._id,
            (response) => {
                console.log(response.data);
                toast.success('venta eliminada con éxito');
                setEjecutarConsulta(true);
            },
            (error) => {
                console.error(error);
                toast.error('Error eliminando la venta');
            }
        );

        setOpenDialog(false);
    };



    return (
        <tr>
            {edit ? (
                <>
                    <td>{infoNuevaVenta._id}</td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.valorTotal}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, valorTotal: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.IDproducto}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, IDproducto: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.cantidad}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, cantidad: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.valorUnitario}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, valorUnitario: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.fechaVenta}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, fechaVenta: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.IDcliente}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, IDcliente: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.nombreCliente}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, nombreCliente: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevaVenta.vendedor}
                            onChange={(e) =>
                                setInfoNuevaVenta({ ...infoNuevaVenta, vendedor: e.target.value })
                            }
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{venta._id.slice(20)}</td>
                    <td>{venta.valorTotal}</td>
                    <td>{venta.IDproducto}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.valorUnitario}</td>
                    <td>{venta.fechaVenta}</td>
                    <td>{venta.IDcliente}</td>
                    <td>{venta.nombreCliente}</td>
                    <td>{venta.vendedor}</td>
                </>
            )}

            <td>
                <div className='flex w-full justify-evenly'>
                    {edit ? (
                        <>
                            <Tooltip title='Confirmar Edición' arrow>
                                <i
                                    onClick={() => actualizarVenta()}
                                    className='fas fa-check text-green-700 hover:text-green-500'
                                />
                            </Tooltip>
                            <Tooltip title='Cancelar edición' arrow>
                                <i
                                    onClick={() => setEdit(!edit)}
                                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title='Editar Venta' arrow>
                                <i
                                    onClick={() => setEdit(!edit)}
                                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                            <Tooltip title='Eliminar Venta' arrow>
                                <i
                                    onClick={() => setOpenDialog(true)}
                                    className='fas fa-trash text-red-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                        </>
                    )}
                </div>

                <Dialog open={openDialog}>
                    <div className='p-8 flex flex-col'>
                        <h1 className='text-gray-900 text-2xl font-bold'>
                            ¿Está seguro de querer eliminar la Venta?
                        </h1>
                        <div className='flex w-full items-center justify-center my-4'>
                            <button
                                onClick={() => deleteVenta()}
                                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => setOpenDialog(false)}
                                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                            >
                                No
                            </button>
                        </div>
                    </div>
                </Dialog>
            </td>
        </tr>
    );
};

const FormularioCreacionVentas = ({ setMostrarTabla }) => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });



        await crearVenta(
            {
                valorTotal: nuevaVenta.valorTotal,
                IDproducto: nuevaVenta.IDproducto,
                cantidad: nuevaVenta.cantidad,
                valorUnitario: nuevaVenta.valorUnitario,
                fechaVenta: nuevaVenta.fechaVenta,
                IDcliente: nuevaVenta.IDcliente,
                nombreCliente: nuevaVenta.nombreCliente,
                vendedor: nuevaVenta.vendedor,
            },
            (response) => {
                console.log(response.data);
                toast.success('Venta agregada con éxito');
            },
            (error) => {
                console.error(error);
                toast.error('Error creando una Venta');
            }
        );

        setMostrarTabla(true);



    };



    return (
        <div>
            <h2 className='text-lg font-bold font-mono text-yellow-900 pb-6 pt-6 text-center'>CREAR NUEVA VENTA </h2>

            <form ref={form} onSubmit={submitForm} className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 inline-block' >

                <label htmlFor='valorTotal'>
                    :
                    <input
                        className='border border-gray-600 p-2 rounded-lg m-2'
                        name='valorTotal'
                        type="text"
                        placeholder=''
                        required

                    />
                    <label htmlFor='valor'>
                        Valor:
                        <input
                            name='IDproducto'
                            className='border border-gray-600 p-2 rounded-lg m-2'
                            type='number'
                            placeholder='Precio venta'
                            required

                        />
                    </label>
                    <label htmlFor='cantidad'>
                        cantidad
                        <select name="cantidad"
                            className=' border border-gray-600 p-2 rounded-lg m-2'
                            required
                            defaultValue={0}

                        >
                            <option disabled value={0}>
                                Seleccione una opción
                            </option>
                            <option>Disponible</option>
                            <option>No Disponible</option>
                        </select>

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


export default Ventas




