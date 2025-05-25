import { SlSocialFacebook } from "react-icons/sl";
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";

// Componente Footer: muestra información de contacto y redes sociales
const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#f5f5f5", padding: "20px", textAlign: "center" }}>
            {/* Información legal y de contacto */}
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "10px" }}>
                <li>Todos los derechos reservados</li>
                <li>Correo: guardianlibros@gmail.com</li>
                <li>Visita nuestras redes!</li>
            </ul>

            {/* Íconos de redes sociales */}
            <div>
                <ul style={{ listStyle: "none", display: "flex", justifyContent: "center", gap: "20px", padding: 0 }}>
                    <li><SlSocialFacebook size={24} color="#1877F2" /></li>
                    <li><TiSocialLinkedin size={24} color="#0A66C2" /></li>
                    <li><TiSocialTwitter size={24} color="#1DA1F2" /></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;