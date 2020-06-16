import React from "react";

const Meals = ({ schedule }) => {
  const list = Object.keys(schedule).map((key) => {
    return (
      <div key={key}>
        {schedule[key].map((hacker) => (
          <li key={hacker} className="morning">
            Breakfast for {hacker} on {key}
          </li>
        ))}

        {schedule[key].map((hacker) => (
          <li key={hacker} className="afternoon">
            Lunch for {hacker} on {key}
          </li>
        ))}

        {schedule[key].map((hacker) => (
          <li key={hacker} className="night">
            Dinner for {hacker} on {key}
          </li>
        ))}
      </div>
    );
  });
  return (
    <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
      <ol id="list">{list}</ol>
    </div>
  );
};
export default Meals;
