import { Header03 } from "../src/components/Header/header";
import Footer from "../src/components/Footer/Footer";
import TelaSecretario from "../src/components/TelaPrincipalSecretario/telasecretario";
import { SegundaHeader02 } from "../src/components/AnotherHeader/anotherHeader";

function TelaPrincipalSecretarioPage() {
    return (
        <>
        <div>
            < Header03 />
            < SegundaHeader02 />
            < TelaSecretario />
            < Footer />
        </div>

        </>
    );
}

export default TelaPrincipalSecretarioPage
