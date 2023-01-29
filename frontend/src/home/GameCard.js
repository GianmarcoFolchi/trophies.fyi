import "./GameCard.scss";

export default function GameCard() {
  return (
    <div class="game-card-container">
      <div class="game-card">
        <img
          class="game-card-image"
          src="https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg?t=1666290860"
          alt="An image"
        />
        <div class="game-card-title">Terraria</div>
      </div>
    </div>
  );
}
