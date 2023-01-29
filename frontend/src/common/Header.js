import Container from "react-bootstrap/Container";
import Logotype from "./Logotype";
import "./Header.scss";

export default function Header() {
  return (
    <header class="page-header">
      <Container>
        <Logotype></Logotype>
      </Container>
    </header>
  );
}
