import Header from "../common/Header";
import GameCardList from "./GameCardList";
import MainContainer from "../common/MainContainer";

export default function HomePage() {
  return (
    <>
      <Header></Header>
      <MainContainer>
        <GameCardList></GameCardList>
      </MainContainer>
    </>
  );
}
