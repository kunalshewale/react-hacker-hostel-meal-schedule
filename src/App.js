import React, { Component } from "react";
import Bookings from "./components/Bookings";
import Meals from "./components/Meals";
import Error from "./components/Error";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hackers: [],
      dates: [],
      invalidHackers: [],
      schedule: {},
    };

    this.handleHackerNameChange = this.handleHackerNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.generateMeals = this.generateMeals.bind(this);
  }

  handleHackerNameChange(evnt) {
    this.setState({
      hackers: evnt.target.value.split("\n"),
    });
  }

  handleDateChange(evnt) {
    this.setState({
      dates: evnt.target.value.split("\n"),
    });
  }

  generateMeals() {
    const { hackers, dates: dateRange } = this.state;
    let invalidHackers = [];
    let scheduleData = [];
    if (hackers.length === dateRange.length) {
      for (let i = 0; i < hackers.length; i++) {
        if (this.isDateValid(dateRange[i])) {
          const startDay = dateRange[i].split(" to ")[0];
          const endDay = dateRange[i].split(" to ")[1];
          const noOfDays = this.getDifference(startDay, endDay);
          for (let j = 0; j < noOfDays.length; j++) {
            scheduleData.push({
              name: hackers[i],
              date: noOfDays[j],
            });
          }
        } else {
          invalidHackers.push(hackers[i]);
        }
      }
    }

    const sortedData = this.sortByDate(scheduleData, "date");

    const schedule = sortedData.reduce(function (result, userDetails) {
      result[userDetails.date] = result[userDetails.date] || [];
      result[userDetails.date].push(userDetails.name);
      return result;
    }, {});

    this.setState({
      schedule,
      invalidHackers,
    });
  }

  sortByDate(schedule, key) {
    return schedule.sort((a, b) => new Date(a[key]) - new Date(b[key]));
  }

  getDifference(startDate, endDate) {
    let dateArray = [];

    const currentDate = this.formatDate(startDate);

    const endOfDate = this.formatDate(endDate);

    let todayDate = new Date(currentDate);
    while (new Date(todayDate).getTime() <= new Date(endOfDate).getTime()) {
      let formatTodayDate = this.formatDate(todayDate);
      dateArray.push(formatTodayDate);
      todayDate = new Date(todayDate).setDate(
        new Date(todayDate).getDate() + 1
      );
    }
    return dateArray;
  }

  formatDate(dateParam) {
    const date = new Date(dateParam);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return [year, month, day].join("-");
  }

  isDateValid(date) {
    //Used from net
    let dateChecker = /^(?:(19|20)[0-9]{2})[-.](0[1-9]|1[012])[-.](0[1-9]|1[0-9]|2[0-9]|[12][0-9]|3[01])$/;
    return (
      dateChecker.test(date.split(" to ")[0]) &&
      dateChecker.test(date.split(" to ")[1]) &&
      new Date(date.split(" to ")[1]) >= new Date(date.split(" to ")[0])
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <center>
          <h2>Hacker Hostel</h2>
        </center>
        <div className="container">
          <Bookings
            handleHackerNameChange={this.handleHackerNameChange}
            handleDateChange={this.handleDateChange}
            generateMeals={this.generateMeals}
          />
          {!!this.state.invalidHackers.length && (
            <Error invalidHackers={this.state.invalidHackers} />
          )}
          <Meals schedule={this.state.schedule} />
        </div>
      </div>
    );
  }
}

export default App;
