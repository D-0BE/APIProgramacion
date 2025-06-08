const caja = (name, img, nivel) =>
    `<div>
            <h3 id="nombreDigimon>${name}</h3>
            <img src='${img}' alt='${name}'>
            
            
    </div>`;

const printHtml = (html) => {
    //Output div ----------
    let divInfo = this.document.getElementById("infoDigimon");
    divInfo.innerHTML = html;

}
async function fetchData() {

    try {

        const nombreDigimon = document.getElementById("nombreDigimon").value.toLowerCase();

        var query = nombreDigimon ? `?name=${nombreDigimon}` : '';

        const response = await fetch(`https://digi-api.com/api/v1/digimon${query}`
        );

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

    
        const data = await response.json();

        if (!data?.content || data?.content?.length == 0) {
            printHtml('No se encontraron datos. Intentalo otra vez.');
            return;
        }

        /*
        {
            "id": 73,
            "name": "Monochromon",
            "href": "https://digi-api.com/api/v1/digimon/73",
            "image": "https://digi-api.com/images/digimon/w/Monochromon.png"
            }
      */
        var output = '';
        data.content.forEach(x => {
            output += caja(x.name, x.image, x.href);
        });

        printHtml(output);

        return; //----------------------------------

        // // imagenes
        // if (data && data.images && data.images.length > 0) {

        //     //take first or loop all
        //     const imgDigimon = data.images[0];
        //     const imgElement = document.getElementById("imgDigimon");


        //     imgElement.src = imgDigimon.href;
        //     imgElement.style.display = "block";

        //     var nombre = data.name.toUpperCase();
        //     const nivel = data.levels[0];
        //     var evoluciones = data.nextEvolutions[0];
        //     var fechaSalida = data.releaseDate;
        //     const habilidad = data.skills[0];

        //     divInfo.innerHTML = `<p><strong>Nombre:</strong> ${nombre}</p>
        //                         <p><strong>Siguiente evolución - Digimon: ${evoluciones.digimon}</strong></p>
        //                         <p><strong>Siguiente evolución - condición: ${evoluciones.condition}</strong></p>
        //                         <p><strong>Fecha de salida: ${fechaSalida}</strong></p>
        //                         <p><strong>Nivel: ${nivel.level}</strong></p>
        //                         <p><strong>Habilidad: ${habilidad.skill} -  ${habilidad.description}</strong></p>`;
        // }


    }
    catch (error) {
        console.error(error);
    }
}



