import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Bookings = ({
  handleHackerNameChange,
  handleDateChange,
  generateMeals,
}) => {
  return (
    <div className="row">
      <TextField
        className="col-md-6"
        multiline
        rows="4"
        placeholder="Enter the hacker list (one hacker per line)"
        onChange={handleHackerNameChange}
      />
      <TextField
        className="col-md-6"
        multiline
        rows="4"
        placeholder="Enter the date range for each hacker's stay (one range per line)"
        onChange={handleDateChange}
      />
      <Button
        variant="outlined"
        color="primary"
        className="block-center"
        onClick={generateMeals}
      >
        Get Meals Schedule
      </Button>
    </div>
  );
};

export default Bookings;
