import { Avatar, Button, Card, Container, Grid, Icon, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from '../../theme/useStyles';
import { Link } from 'react-router-dom';
import { registrarUsuario } from '../../acciones/UsuarioAction';
import { useStateValue } from '../../contexto/store';

const clearUsuario = {
    displayName: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: ''
}

const RegistrarUsuario = (props) => {
    const [{sesionUsuario}, dispatch ] = useStateValue();

    const [ usuario, setUsuario ] = useState({
        displayName: '',
    email: '',
    username: '',
    firstName: '',
    lastName: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUsuario(prev => {
            // Update the user data with the new value
            const updatedUser = {
                ...prev,
                [name]: value
            };
    
            // If firstName or lastName is changed, update displayName
            if (name === 'firstName' || name === 'lastName') {
                updatedUser.displayName = `${updatedUser.firstName} ${updatedUser.lastName}`;
            }
    
            return updatedUser;
        });
    }

    const guardarUsuario = () => {
        registrarUsuario(usuario, dispatch).then(response => {

            if (response.status === 200)

            {
                alert("Usuario registrado correctamente");
                props.history.push("/login");
                console.log("Se registro el usuario", response);
                window.localStorage.setItem("token", response.data.token);
                setUsuario(clearUsuario);
    
            }
            else{
                alert("Error al registrar el usuario", response);
            }

        
          
        }
        ).catch(error => {
            console.log("Error al registrar el usuario", error);
        })

    }


    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item lg={6} md={8}>
                    <Card className={classes.card} align="center">
                        <Avatar className={classes.avatar}>
                            <Icon className={classes.icon}>person_add</Icon>
                        </Avatar>
                        <Typography variant="h5" color="primary">Registro de Usuario</Typography>
                    
                        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    name="firstName"
                                    value={usuario.firstName}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Apellidos"
                                    variant="outlined"
                                    fullWidth
                                    name="lastName"
                                    value={usuario.lastName}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Nombre De usuario"
                                    variant="outlined"
                                    fullWidth
                                    name="username"
                                    value={usuario.username}
                                    onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    type="email"
                                    name="email"
                                    value={usuario.email}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    name="password"
                                    value={usuario.password}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={guardarUsuario}
                                    type="submit"
                                    >
                                        Registrar
                                    </Button>
                                </Grid>
                            </Grid>
                            <Link
                            to="/login"
                            variant="body1"
                            className={classes.link}
                            >
                            ¿Ya tienes una cuenta?, Logueate
                            </Link>
                        </form>
                    </Card>
                    
                </Grid>
            </Grid>
        </Container>
    );
};

export default RegistrarUsuario;