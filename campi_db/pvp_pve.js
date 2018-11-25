module.exports = {

    pvp_e(scelta) {

        switch (scelta) {
            case "1":
                return "PVP";
                break;
            case "2":
                return "PVE";
                break;
            case "3":
                return "PVP-PVE";
                break;
            default:
                return "PVP-PVE";
                break
        }

    }

}