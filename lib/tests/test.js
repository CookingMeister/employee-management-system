const db = require('../utils/config').promise();

beforeAll(() => {
  // Establish the database connection before running tests
  db.connect();
});

describe('db', () => {
  test('exports a mysql connection', () => {
    expect(db).toHaveProperty('connect');
    expect(db).toHaveProperty('query');
  });

  test('gets all departments', async () => {
    const departments = await db.query('SELECT * FROM department');
    expect(departments).toBeDefined();
    expect(departments.length).toBeGreaterThan(0);
  });

  test('gets all roles', async () => {
    const roles = await db.query('SELECT * FROM role');
    expect(roles).toBeDefined();
    expect(roles.length).toBeGreaterThan(0);
  });

  test('gets all employees', async () => {
    const employees = await db.query('SELECT * FROM employee');
    expect(employees).toBeDefined();
    expect(employees.length).toBeGreaterThan(0);
  });

  test('handles query for nonexistent table', async () => {
    try {
      const [results] = await db.query('SELECT * FROM non_existent_table');
      // Check if the results array is empty, indicating no rows were returned
      expect(results).toHaveLength(0);
    } catch (error) {
      // If an error occurs
      expect(`[Error: Table 'company.non_existent_table' doesn't exist]`);
    }
  });
});

afterAll(() => {
  // Close the database connection after running all tests
  db.close();
});
