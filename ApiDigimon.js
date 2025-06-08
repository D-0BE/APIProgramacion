const caja = (id, name, img) =>
    `<div>
            <h3>${name}</h3>
            <img src='${img}' alt='${name}'>
            <button onclick='fetchDetail(${id})'>Ver detalle</button>
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
            output += caja(x.id, x.name, x.image);
        });

        printHtml(output);

    }
    catch (error) {
        console.error(error);
    }
}


async function fetchDetail(id) {

    try {

        const response = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        // imagenes
        if (data) {


            //take first or loop all
            const imgDigimon = data.images && data.images.length > 0 ?
                data.images[0] :
                null;

            var nombre = data.name?.toUpperCase();


            //array de atributos
            const attributes = [];

            if (data.levels && data.levels.length > 0)
                attributes.push({ key: "Level", value: data.levels[0].level })

            if (data.nextEvolutions && data.nextEvolutions.length > 0)
                attributes.push({ key: "Siguiente evolución", value: data.nextEvolutions[0].digimon })

            if (data.releaseDate)
                attributes.push({ key: "Fecha de salida", value: data.releaseDate })

            if (data.skills && data.skills.length > 0) {
                attributes.push({ key: "Habilidad", value: `${data.skills[0].skill} - ${data.skills[0].description}`});
            }

            //TODO: El boton volver vuelve a llamar al API. Optimizar
            var html = imgDigimon ? `<img src="${imgDigimon.href}" alt="${nombre}">` : '';
            html += `<p><strong>Nombre:</strong> ${nombre}</p>`;

            attributes.forEach(x => {
                html += `<p><strong>${x.key}:</strong> ${x.value}</p>`;
            });

            html += '<button onclick="fetchData()">Volver</button>';

            printHtml(html);
        }


    }
    catch (error) {
        console.error(error);
    }
}


