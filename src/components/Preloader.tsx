import { Container, Spinner } from "react-bootstrap";

export const Preloader: React.FC = () => {
  return (
    <>
      <Container
        style={{ top: "50%" }}
        className="d-flex justify-content-center position-absolute"
      >
        <Spinner animation="border" />
      </Container>
    </>
  );
};
