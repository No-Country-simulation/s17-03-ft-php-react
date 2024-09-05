import Image from 'next/image';
import React from 'react';

const mascotas = [
  {
    name: 'Gyoza',
    sex: 'Hembra',
    age: 10,
    size: 'Mediano',
    image: '/perro.png',
  },
];

const Cards = () => {
  return (
    <div className="m-4 h-[452px] w-[380px] max-w-xs overflow-hidden rounded-[16px] bg-neutral-10 text-white shadow-lg">
      {mascotas.map((mascota, index) => (
        <div key={index}>
          <div className="mb-2 flex items-center justify-between p-3 text-xl font-semibold">
            <h3> {mascota.name}</h3>
            <div className="ml-auto flex space-x-1">
              <button>
                <Image
                  className="object-cover"
                  src="/compartir.png"
                  width={48}
                  height={48}
                  alt="Compartir"
                />
              </button>
              <button>
                <Image
                  className="object-cover"
                  src="/fav.png"
                  width={48}
                  height={48}
                  alt="Favorito"
                />
              </button>
            </div>
          </div>
          <div className="rounded-[12px] object-cover p-3">
            <Image src={mascota.image} width={348} height={180} alt="Gyoza" />
          </div>
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm">
                <p className="mb-2">
                  <span className="font-bold">Sexo: </span>
                  {mascota.sex}{' '}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Edad: </span> {mascota.age} años
                </p>
                <p className="mb-2">
                  <span className="font-bold">Tamaño: </span> {mascota.size}{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="h-[50px] w-[300px] rounded-[12px] bg-primario-70 text-primario-10 hover:bg-yellow-600">
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
