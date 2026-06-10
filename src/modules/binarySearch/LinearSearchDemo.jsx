import "./LinearSearchDemo.css";

function SearchCard({ value }) {
  return (
    <div className="search-card">
      <span className="card-value">{value}</span>
    </div>
  );
}

export default function LinearSearchDemo() {
  const cards = [90, 80, 70, 60, 50, 40, 30, 20, 10];

  return (
    <div className="demo">
      <div className="card-row">
        {cards.map((num) => (
          <SearchCard key={num} value={num} />
        ))}
      </div>
    </div>
  );
}