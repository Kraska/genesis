import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';

type LayoutProps = {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <>
        <Navbar sticky="top" expand="lg" bg="white">
            <Container>
                <Navbar.Brand as={Link} to="/">
                     <img src={logo} />
                </Navbar.Brand>
            </Container>
        </Navbar>

        <Container className="my-5">{children}</Container>
    </>
}