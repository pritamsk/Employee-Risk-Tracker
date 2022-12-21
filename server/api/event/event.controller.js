const {
  getEvent,
  getThreshold,
  getTeamRiskInfo,
  getEmployeeLeaveInfo,
} = require("./event.service");

module.exports = {
  getThreshold: async (req, res) => {
    const body = req.body;
    var results1 = await getThreshold(req, res);
    if (!results1) {
      return res.json({
        success: 0,
        message: "Record not found",
      });
    }

    var allowedLeavesMap = new Map();
    for (let i = 0; i < results1.length; i++) {
      allowedLeavesMap.set(
        results1[i].team_id,
        results1[i].count_emp - results1[i].threshold
      );
    }

    monthDateMap = new Map([
      [1, 31],
      [2, 28],
      [3, 31],
      [4, 30],
      [5, 31],
      [6, 30],
      [7, 31],
      [8, 31],
      [9, 30],
      [10, 31],
      [11, 30],
      [12, 31],
    ]);
    // console.log(body.fromDate)
    startDateArray = body.fromDate.split("-");
    // console.log("month",startDateArray[1])

    var listOftestRiskList = [];
    month = parseInt(startDateArray[1]);

    for (let i = 1; i <= monthDateMap.get(month); i++) {
      if (i < 10)
        var date = startDateArray[0] + "-" + startDateArray[1] + "-" + "0" + i;
      else var date = startDateArray[0] + "-" + startDateArray[1] + "-" + i;
      var results2 = await getEvent(req, res, date);
      // console.log("result2",results2);
      if (!results2) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      var teamRiskList = [];
      for (let i = 0; i < results2.length; i++) {
        // console.log(results2[i])
        results2[i].team_id;
        if (results2[i].count_emp > allowedLeavesMap.get(results2[i].team_id)) {
          teamRiskList.push(results2[i].team_id);
          // console.log("Team risk list",teamRiskList);
        }
      }

      listOftestRiskList.push({ date, teamRiskList });
    }
    return res.status(200).json(listOftestRiskList);
  },


  getEmployeeLeaveInfo: async (req, res) => {
    let employeeLeaveInfoList = [];
    const body = req.body;
    console.log("body", body);

    monthDateMap = new Map([
      [1, 31],
      [2, 28],
      [3, 31],
      [4, 30],
      [5, 31],
      [6, 30],
      [7, 31],
      [8, 31],
      [9, 30],
      [10, 31],
      [11, 30],
      [12, 31],
    ]);
    startDateArray = body.fromDate.split("-");
    month = parseInt(startDateArray[1]);
    for (let i = 1; i <= monthDateMap.get(month); i++) {
      if (i < 10)
        var date = startDateArray[0] + "-" + startDateArray[1] + "-" + "0" + i;
      else var date = startDateArray[0] + "-" + startDateArray[1] + "-" + i;
      let employeeInfoResult = await getEmployeeLeaveInfo(req, res, date);
        if (!employeeInfoResult) {
        return res.json({
            success: 0,
            message: "Record not found",
        });
        }
        employeeLeaveInfoList.push({date, employeeInfoResult});
    }

    return res.status(200).json(employeeLeaveInfoList);
  },

  getTeamRiskInfo: (req, res) => {
    const body = req.body;
    getTeamRiskInfo(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error in getting team info",
        });
      }
      return res.status(200).json(results);
    });
  },
};
