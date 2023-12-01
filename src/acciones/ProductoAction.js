import HttpCliente from '../servicios/HttpClient';

export const getProductos = (request) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get(`/api/product?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}`).then(response => {
            resolve(response);
        })
    });
}

 export default { getProductos };
