
export const getLabelWhyDoYouWantBePart = (value) => {
    switch (value) {
        case "learn_blockchain_and_cryptocurrencies": return "Quiero aprender blockchain y criptomonedas";
        case "have_cripto_bussines": return "Tengo un emprendimiento cripto";
        case "share_cripto_knowledge": return "Compartir mi conocimiento y contribuir al crecimiento de la comunidad";
        default: return value;
    }
}