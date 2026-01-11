import { Pool } from 'pg'
import { getShard } from '../DB/db.js'
import { getRandomRow } from '../utils/ticketServer.util.js';

const row = getRandomRow(1, 30);

export const generateRandomIdService = async () => {
    const pool = getShard();
    const client = await pool.connect()
    const row = getRandomRow(1, 30);
    const SelectingRowQuery = {
        name: 'get-random-row',
        text: 'Select id,start,"end",current from tickets WHERE id = $1 FOR UPDATE',
        values: [row],
    }
    const UpdateCurrentQuery = {
        name: 'update-current-for-row',
        text: 'UPDATE tickets SET current=current+1 WHERE id = $1',
        values: [row],
    }

    try {
        await client.query('BEGIN');
        const res = await client.query(SelectingRowQuery);
        const currentRow = res.rows[0];

        if (!currentRow) {
            await client.query('ROLLBACK')
            console.log('Row Not Found');
            return -1;
        }

        if (currentRow.end === currentRow.current + 1) {
            await client.query('ROLLBACK')
            console.log('Range Exhausted,No more Tickets Left');
            return -1;
        }

        const updateTicket = await client.query(UpdateCurrentQuery);
        await client.query('COMMIT')
        return currentRow.current
    } catch (e) {
        await client.query('ROLLBACK')
        console.error("Error generating random ID:", e);
        throw e
    } finally {
        client.release()
    }
}
