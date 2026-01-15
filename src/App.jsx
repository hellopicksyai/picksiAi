import { useState, useEffect } from "react";
import './App.css'

function OptionButton({ label, onClick }) {
  return (
    <>
      <button onClick={onClick}>{label}</button>
      <br /><br />
    </>
  );
}

function getRecommendation({ goingWith, mood, time, foodType, budget }) {
  // 🔴 Highest Priority: Date + Romantic
  if (goingWith === "date" && mood === "romantic") {
    return {
      name: "Cozy Candlelight Café",
      reason: "Romantic vibe, quiet seating, and perfect for quality time."
    };
  }

  // 🔴 Family always needs comfort
  if (goingWith === "family") {
    return {
      name: "Green Leaf Family Restaurant",
      reason: "Hygienic, calm atmosphere and family-friendly menu."
    };
  }

  // 🟠 Office outings
  if (goingWith === "office") {
    return {
      name: "Business Lunch Hub",
      reason: "Professional ambience with quick service."
    };
  }

  // 🟡 Friends + Fun
  if (goingWith === "friends" && mood === "fun") {
    return {
      name: "The Social Street",
      reason: "Energetic vibe, affordable food and great for groups."
    };
  }

  // 🟢 Budget-sensitive fallback
  if (budget === "low") {
    return {
      name: "Local Food Junction",
      reason: "Budget-friendly and satisfying choices."
    };
  }

  // 🔵 Default safe choice
  return {
    name: "Neighborhood Café",
    reason: "A balanced option that works for most situations."
  };
}

function Progress({ current, total }) {
  return (
    <p style={{ fontSize: "13px", opacity: 0.6, marginBottom: "10px" }}>
      Step {current} of {total}
    </p>
  );
}



function App() {
  const [screen, setScreen] = useState("landing");
  const [goingWith, setGoingWith] = useState("");
  const [time, setTime] = useState("");
  const [mood, setMood] = useState("");
  const [foodType, setFoodType] = useState("");
  const [budget, setBudget] = useState("");



  useEffect(() => {
  if (screen === "thinking") {
    const timer = setTimeout(() => {
      setScreen("result");
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [screen]);

  // LANDING SCREEN
  if (screen === "landing") {
    return (
      <div className="container">
        <h1>Can’t decide where to eat?</h1>
        <p>We’ll decide for you.</p>

        <button onClick={() => setScreen("q1")}>
          Start Decision
        </button>
      </div>
    );
  }

  // QUESTION 1
  if (screen === "q1") {
    return (
      <div className="container">
        <div className="card">
          <Progress current={1} total={5} />
          <h2>Who are you going with?</h2>

          <button onClick={() => {
            setGoingWith("friends");
            setScreen("q2");
          }}>
            Friends
          </button>

          <br /><br />

          <button onClick={() => {
            setGoingWith("date");
            setScreen("q2");
          }}>
            Date / Partner
          </button>

          <br /><br />

          <button onClick={() => {
            setGoingWith("family");
            setScreen("q2");
          }}>
            Family
          </button>

          <br /><br />

          <button onClick={() => {
            setGoingWith("office");
            setScreen("q2");
          }}>
            Office Team
          </button>
        </div>
      </div>
    );
  }

  // QUESTION 2 (TEMP VIEW)
  if (screen === "q2") {
    return (
      <div className="container">
        <div className="card">
          <Progress current={2} total={5} />
          <button onClick={() => {
              setTime("lunch");
              setScreen("q3");
            }}>
              Lunch
            </button>

            <br /><br />

            <button onClick={() => {
              setTime("dinner");
              setScreen("q3");
            }}>
              Dinner
            </button>
          </div>
      </div>
    );
  }


  // QUESTION 3
if (screen === "q3") {
  return (
    <div className="container">
      <div className="card">
        <Progress current={3} total={5} />
        <h2>What’s the vibe?</h2>

        <OptionButton
          label="Casual"
          onClick={() => {
            setMood("casual");
            setScreen("q4");
          }}
        />

        <OptionButton
          label="Quiet"
          onClick={() => {
            setMood("quiet");
            setScreen("q4");
          }}
        />

        <OptionButton
          label="Fun"
          onClick={() => {
            setMood("fun");
            setScreen("thinking");
          }}
        />

        <OptionButton
          label="Romantic"
          onClick={() => {
            setMood("romantic");
            setScreen("thinking");
          }}
        />
      </div>
    </div>
  );
}

// QUESTION 4
if (screen === "q4") {
  return (
    <div className="container">
      <div className="card">
        <Progress current={4} total={5} />
        <h2>Food preference?</h2>

        <OptionButton
          label="Veg"
          onClick={() => {
            setFoodType("veg");
            setScreen("q5");
          }}
        />

        <OptionButton
          label="Non-veg"
          onClick={() => {
            setFoodType("non-veg");
            setScreen("q5");
          }}
        />

        <OptionButton
          label="Mixed"
          onClick={() => {
            setFoodType("mixed");
            setScreen("q5");
          }}
        />
      </div>
    </div>
  );
}

// QUESTION 5
if (screen === "q5") {
  return (
    <div className="container">
      <div className="card">
        <Progress current={5} total={5} />
        <h2>Budget per person?</h2>

        <OptionButton
          label="₹ Budget"
          onClick={() => {
            setBudget("low");
            setScreen("thinking");
          }}
        />

        <OptionButton
          label="₹₹ Moderate"
          onClick={() => {
            setBudget("medium");
            setScreen("thinking");
          }}
        />

        <OptionButton
          label="₹₹₹ Premium"
          onClick={() => {
            setBudget("high");
            setScreen("thinking");
          }}
        />
      </div>
    </div>
  );
}

  // THINKING SCREEN
if (screen === "thinking") {
  return (
    <div className="container">
      <h2>Thinking...</h2>

      <p>Understanding your plan</p>
      <p>Finding best places</p>
      <p>Avoiding overcrowded spots</p>
    </div>
  );
}

// RESULT SCREEN
if (screen === "result") {
  const recommendation = getRecommendation({
    goingWith,
    mood,
    time,
    foodType,
    budget
  });

  return (
  <div className="container">
    <h2>Here’s our recommendation</h2>

    <p style={{ fontSize: "13px", color: "green" }}>
      High confidence recommendation
    </p>

    <h3>{recommendation.name}</h3>

    <p>{recommendation.reason}</p>

    <p style={{ fontSize: "14px", opacity: 0.7 }}>
      {goingWith} • {time} • {mood} • {foodType} • {budget}
    </p>

    <button onClick={() => setScreen("landing")}>
      Start Again
    </button>
  </div>
);

}

  return null;
}

export default App;
