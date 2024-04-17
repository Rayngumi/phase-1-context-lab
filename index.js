function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(dateWorked) {
    const timeIn = this.timeInEvents.find(event => event.date === dateWorked);
    const timeOut = this.timeOutEvents.find(event => event.date === dateWorked);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(dateWorked) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateWorked);
    return hoursWorked * this.payPerHour;
}

function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(function (event) {
        return event.date;
    });

    const payable = eligibleDates.reduce(function (totalWages, date) {
        return totalWages + wagesEarnedOnDate.call(this, date);
    }.bind(this), 0);

    return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce(function (totalPayroll, employee) {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
}