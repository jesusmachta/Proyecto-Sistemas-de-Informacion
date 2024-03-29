import ThankYouPage from "../../Components/ThankYouPage";

export default function ThankYouRegisterPage() {


    return(
        <ThankYouPage
            title = "¡Gracias por Registrarte!"
            message = "Te damos la más cordial bienvenida a nuestra comunidad. Estamos encantados de tenerte como parte de nuestro grupo de usuarios. Tu registro ha sido exitoso y ahora podrás disfrutar de todos los beneficios y servicios que ofrecemos.¡Esperamos que disfrutes de tu experiencia con nosotros!"
            button = "Volver a la página principal"
            returnRoute= "/"
        />)
}