
const cron = require("node-cron");
const db = require("./db");
const moment = require("moment");

const setupShiftCron = () => {
  const assignShifts = (date, userList) => {
    const weekNumber = moment(date).week();
    const rotateCount = (weekNumber % 4) * 5;
    const rotatedUsers = [...userList.slice(rotateCount), ...userList.slice(0, rotateCount)];

    const shifts = [
      { id: 1, time: "10am-7pm" },
      { id: 2, time: "4pm-12am" },
      { id: 3, time: "7pm-4am" },
      { id: 4, time: "4am-1pm" },
    ];

    return [
      { shift: shifts[0], employees: rotatedUsers.slice(0, 5) },
      { shift: shifts[1], employees: rotatedUsers.slice(5, 10) },
      { shift: shifts[2], employees: rotatedUsers.slice(10, 15) },
      { shift: shifts[3], employees: rotatedUsers.slice(15, 20) },
    ];
  };

  const updateShiftsInDB = async () => {
    try {
      console.log("⏳ Updating shifts in user_shifts table...");

      // Delete old past records
      await db.promise().query("DELETE FROM user_shifts WHERE shift_date < CURDATE()");

      const [users] = await db.promise().query("SELECT id FROM users");
      if (!users.length) {
        console.log("⚠️ No users found, skipping shift generation.");
        return;
      }

      const weeksArray = [
        moment().startOf("isoWeek"),
        moment().add(1, "weeks").startOf("isoWeek"),
        moment().add(2, "weeks").startOf("isoWeek"),
      ];

      let shiftsToInsert = [];

      weeksArray.forEach((weekStartDate) => {
        const assignedShifts = assignShifts(weekStartDate, users);

        for (let i = 0; i < 7; i++) {
          const currentDate = weekStartDate.clone().add(i, "days").format("YYYY-MM-DD");

          assignedShifts.forEach((shiftBlock) => {
            shiftBlock.employees.forEach((emp) => {
              shiftsToInsert.push([
                emp.id,
                currentDate,
                shiftBlock.shift.time,
                "System",
                new Date(),
              ]);
            });
          });
        }
      });

      const query = `
        INSERT INTO user_shifts (user_id, shift_date, shift_time, modified_by, updated_at)
        VALUES ? 
        ON DUPLICATE KEY UPDATE 
          shift_time = IF(modified_by = 'Manager', shift_time, VALUES(shift_time)),
          modified_by = IF(modified_by = 'Manager', modified_by, VALUES(modified_by)),
          updated_at = IF(modified_by = 'Manager', updated_at, VALUES(updated_at))
      `;

      await db.promise().query(query, [shiftsToInsert]);

      console.log("✅ Shifts updated for current and next two weeks!");
    } catch (error) {
      console.error("❌ Error updating shifts:", error);
    }
  };

  // Schedule cron job every Sunday night at 11:59 PM
  cron.schedule("59 23 * * 0", async () => {
    console.log("🔄 Running weekly shift rotation cron job...");
    await updateShiftsInDB();
  });

  // Initial call on server start
  updateShiftsInDB();
};

module.exports = setupShiftCron;
