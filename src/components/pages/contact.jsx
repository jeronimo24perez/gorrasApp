import Menu from "../ui/menu.jsx";
import Footer from "../ui/footer.jsx";
import ContactForm from "../features/contactForm.jsx";

const Contact = ({usersGet})=>{
    return (
        <>
            <Menu usersGet={usersGet}/>
            <ContactForm />
            <Footer />
        </>
    )
}

export default Contact;