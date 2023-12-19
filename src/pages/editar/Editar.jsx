import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useFetch } from "../../../useFetch";
import { enviroment } from "../../components/enviroment";

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    id_categoria: '',  // Cambiado a un campo de texto oculto para almacenar el ID de la categoría
    precio: '',
  });

  const { data: categorias } = useFetch(`${enviroment.url}/api/categoria`);

  console.log(categorias)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${enviroment.url}/api/comidas/${id}`, {
          headers: {
            'access-token': localStorage.getItem("token")
          }
        }).catch((error) => {
          navigate('/');
        });
        const data = await response.json();
        const { nombre, id_categoria, precio } = data;
        console.log(data)
        setFormData({ nombre, id_categoria, precio });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${enviroment.url}/api/comidas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta:', data);
        navigate("/lista");
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

 console.log(formData.id_categoria)

  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <div className="bg-sky-300 w-[50%] py-12 flex flex-col rounded-lg">
      <h2 className="text-center font-bold text-lg">Editar elemento {id}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input className="w-[80%] py-1 mt-3"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
        />
        <select
          className="w-[80%] my-3 py-1"
          name="id_categoria"
          value={formData.id_categoria}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria } selected={categoria.id_categoria === formData.id_categoria} >
                {categoria.nombre}
              </option>
            ))}
        </select>
        <input
        className="w-[80%] py-1"
          name="precio"
          type="text"
          value={formData.precio}
          onChange={handleChange}
        />
        <button className="mt-4 bg-blue-700 text-white px-2 py-2 rounded-lg border-none hover:bg-blue-900" type="submit">Guardar cambios</button>
      </form>
    </div>
    </div>
    
  );
};

export default Editar;
