
export const getLabelHowYouKnowUs = (value) => {
    switch (value) {
        case "instagram": return "Instagram";
        case "facebook": return "Facebook";
        case "twitter": return "Twitter";
        case "youtube": return "Youtube";
        case "news": return "Noticias";
        case "advertising": return "Publicidad";
        case "friend": return "Amigo / Conocido";
        default: return value;
    }
}