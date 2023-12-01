import { Avatar, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import React, {useState} from 'react';
import useStyles from '../../theme/useStyles';
import { ProductoArray } from '../data/dataPrueba';
import { useEffect } from 'react';
import { getProductos } from './../../acciones/ProductoAction';
import Pagination from '@material-ui/lab/Pagination';

const Productos = (props) => {
    
    const [requestProductos, setRequestProductos] = useState({
        pageIndex: 1,
        pageSize: 2,
        search: ''
    });
    const [paginadorProductos, setPaginadorProductos] = useState(
        {
            "pageIndex": 0,
            "pageSize": 0,
            "count": 0,
            "data": [],
            "pageCount": 0
        });

    const handleChange = (event, value) => {
        setRequestProductos((anterior) => ({
            ...anterior,
            pageIndex: value
        }));
    }
    const miArray = ProductoArray;
    const  verProducto = (id) => {
        props.history.push("/detalleProducto/" + id);
    }


    const classes = useStyles();
    useEffect(() => {
        const getListaProductos = async () => {
               const response = await getProductos(requestProductos);
               console.log(response.data);
               setPaginadorProductos(response.data);
           }
           getListaProductos();
       }, [requestProductos]);



       if (paginadorProductos.data.length === 0) {
           return (
               <Container className={classes.containermt}>
                   <Typography variant="h4" className={classes.text_title}>
                       Productos
                   </Typography>
                   <Typography variant="h5" className={classes.text_title}>
                       No hay productos disponibles
                   </Typography>
               </Container>
           );
       }
   
    return (
        <Container className={classes.containermt}>
            <Typography variant="h4" className={classes.text_title}>
                Productos
            </Typography>
            <Grid container spacing={4}>
                { paginadorProductos.data.map(data => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={data.key}>
                    <Card>
                        <CardMedia
                        className={classes.media}
                        image="https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000"
                        title="mi producto"
                        >
                            <Avatar variant="square" className={classes.price}>
                                ${data.price}
                            </Avatar>
                        </CardMedia>
                        <CardContent>
                            <Typography variant="h6" className={classes.text_card}>
                                {data.name}
                            </Typography>
                            <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => verProducto(data.key)}>
                                MAS DETALLES
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            <Pagination count = {paginadorProductos.pageCount} page={paginadorProductos.pageIndex} onChange={handleChange} />
        </Container>
    );
};

export default Productos;