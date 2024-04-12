import pool from '../dbConnection.js';

export async function getUserFromEmail(email_promise) {
  const email = await email_promise;
  console.log(email);
  try {
    const [rows] = await pool.query(
      `SELECT userID
      FROM USER
      WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      console.log('Fetched user');
      return rows[0].userID;
    } else {
      // No matching email found in the database
      console.log('no email found matching in database');
      return null;
    }
  } catch (err) {
    console.error('Error fetching user:', err.message);
    return null;
  }
}

export async function insertPayment(userID_promise) {
  try {
    const userID = await userID_promise;

    // Update renewDate and set subscriptionActive to 1
    await pool.query(
      `UPDATE SUBSCRIPTION 
       SET renewDate = DATE_ADD(renewDate, INTERVAL 1 MONTH), subcriptionActive = 1 
       WHERE userID = ?`,
      [userID]
    );

    console.log('Payment inserted successfully');
  } catch (err) {
    console.error(err.message);
  }
}