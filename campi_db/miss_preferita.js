module.exports = {

    miss_preferita(scelta) {

        switch (scelta) {
            case "1":
                return "Cacciatori d'Oro";
                break;
            case "2":
                return "Ordine delle Anime";
                break;
            case "3":
                return "Alleanza del Mercante";
                break;
            case "4":
                return "Legend";
                break;
            default:
                return "Cacciatori d'Oro";
                break;
        }

    }

}