function getKorpa() {

    $.ajax({
        type: 'GET',
        url: "/test22",
        data: {'radnja':"getKorpa"},
        dataType:'json',
        success:addItemsToKorpa,
        error: zaGreske2
    });
    
}

function addItemsToKorpa(response) {
    /* dodaj nove knjige */
    for (let i = 0;i<response["stavke"].length;i++) {
        let knjiga = response["stavke"][i];
        if (!bookExist(knjiga["isbn"])) {
            console.log(knjiga)
            let oneItem = '<div class="korpa__item" id="Isbn1"> <img class="korpa__item__slika" src="mediaSlika1" width="180" height="250" /> <div class="korpa__item__details"> <p>Naslov: Naslov1</p> <p>Cena: Cena1</p> <p>Ukupno: Ukupno1</p> </div> <p style="flex:1 50%;">Komada: Komada1</p> <div> <button>Obrisi</button> <button>-</button> <button>+</button> </div> </div>';
            let oneItemReal = oneItem.replace("Naslov1",knjiga["naslov"]).
            replace("Slika1",knjiga["slika"])
            .replace("Cena1",knjiga["cena"]).
            replace("Komada1",knjiga["kolicina"]).
            replace("Isbn1",knjiga["isbn"]).
            replace("Ukupno1",knjiga["ukupno"]);
            $(".korpa").append(oneItemReal);
            addBookListener(knjiga["isbn"]);
        }
    }
}

function addBookListener(isbn) {

    function changeDom(response) {
        let poruka = response["poruka"];
        if (poruka == 2) {
            $("#"+response["knjigaISBN"]).remove();
            $(".modal-item.modal-item--full-column.selected-option h4")[0].textContent = "Ukupno: " + response["ukupnoSve"]

        }
        else if (poruka == 3) {
            $("#"+response["knjigaISBN"]+" p")[3].textContent = "Komada: " + response["kolicina"];
            $("#"+response["knjigaISBN"]+" p")[2].textContent = "Ukupno: " + response["ukupno"];
            $(".modal-item.modal-item--full-column.selected-option h4")[0].textContent = "Ukupno: " + response["ukupnoSve"]
        }

        else if (poruka == 4) {
            $("#"+response["knjigaISBN"]+" p")[3].textContent = "Komada: " + response["kolicina"];
            $("#"+response["knjigaISBN"]+" p")[2].textContent = "Ukupno: " + response["ukupno"];
            $(".modal-item.modal-item--full-column.selected-option h4")[0].textContent = "Ukupno: " + response["ukupnoSve"]
        }
    }
    let options = [{"url":"/brisanje_iz_korpe","radnja":"brisanje"},
    {"url":"/smanji_kolicinu","radnja":"oduzimanje"},
    {"url":"/povecaj_kolicinu","radnja":"dodavanje"}];

    for (let i=0;i<3;i++) {
        $("#"+isbn+" div button")[i].addEventListener('click',function(event) {
            event.preventDefault();
            // ovde ce ici ajaks
            $.ajax({
                type: 'POST',
                url: options[i]["url"],
                data:{'knjigaISBN':isbn,'radnja':options[i]["radnja"]},
                dataType:'json',
                success:changeDom,
                error: zaGreske2
            });
        })
    }
    
}

function zaGreske2() {
    console.log("greska");
}

function bookExist(isbn) {
    if ($("#"+isbn).length == 1) {
        return true;
    }
    else {
        return false;
    }
}