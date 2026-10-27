const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      // Server not up yet
    }
    await sleep(400);
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

async function run() {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 1. Starting Personal Expense Tracker Express server...');
  const server = spawn('node', ['backend/server.js'], {
    cwd: __dirname,
    stdio: 'ignore'
  });

  try {
    console.log('⏳ Waiting for server to become healthy...');
    await waitForServer('http://localhost:5000/api/health');
    console.log('✅ Server is up and running!');

    // Seed sample expenses via API
    console.log('🌱 2. Seeding sample expenses via REST API...');
    const sampleExpenses = [
      { title: 'Supermarket Grocery & Produce', amount: 68.50, category: 'Food', date: '2026-10-26' },
      { title: 'Metro Monthly Transit Card', amount: 55.00, category: 'Travel', date: '2026-10-25' },
      { title: 'High-Speed Fiber Internet Bill', amount: 49.99, category: 'Bills', date: '2026-10-24' },
      { title: 'Ergonomic Office Chair Cushion', amount: 34.90, category: 'Shopping', date: '2026-10-23' },
      { title: 'Team Coffee & Cafe Meeting', amount: 14.50, category: 'Food', date: '2026-10-22' },
      { title: 'Electricity & Utility Bill', amount: 82.20, category: 'Bills', date: '2026-10-21' },
      { title: 'Cloud Storage & Dev Subscription', amount: 12.00, category: 'Other', date: '2026-10-20' },
      { title: 'Weekend Fuel & Toll Pass', amount: 45.00, category: 'Travel', date: '2026-10-19' }
    ];

    for (const exp of sampleExpenses) {
      await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exp)
      });
    }
    console.log(`✅ Seeded ${sampleExpenses.length} expense transactions!`);

    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    if (!fs.existsSync(chromePath)) {
      console.warn('⚠️ Chrome not found at standard path. Skipping headless screenshots.');
      return;
    }

    const capture = (url, outputPath, width, height, waitBudget = 2500) => {
      return new Promise((resolve) => {
        const tmpUserData = path.join(process.env.TEMP || '.', `chrome_temp_${Date.now()}_${Math.random().toString(36).substring(7)}`);
        const proc = spawn(chromePath, [
          '--headless=new',
          `--screenshot=${outputPath}`,
          `--window-size=${width},${height}`,
          `--user-data-dir=${tmpUserData}`,
          `--virtual-time-budget=${waitBudget}`,
          '--hide-scrollbars',
          url
        ], { stdio: 'ignore' });

        const killTimeout = setTimeout(() => {
          proc.kill();
          resolve();
        }, 12000);

        proc.on('exit', () => {
          clearTimeout(killTimeout);
          try {
            if (fs.existsSync(tmpUserData)) {
              fs.rmSync(tmpUserData, { recursive: true, force: true });
            }
          } catch (e) {}
          resolve();
        });
      });
    };

    console.log('📸 3. Capturing 01_dashboard_desktop.png (Full Desktop Dashboard)...');
    await capture('http://localhost:5000/', path.join(screenshotsDir, '01_dashboard_desktop.png'), 1366, 880);

    console.log('📸 4. Capturing 02_filtered_by_category.png (Filtered to Food)...');
    await capture('http://localhost:5000/?filter=Food', path.join(screenshotsDir, '02_filtered_by_category.png'), 1366, 880);

    console.log('📸 5. Capturing 03_edit_expense_prefilled.png (Edit Expense Form)...');
    await capture('http://localhost:5000/?edit=first', path.join(screenshotsDir, '03_edit_expense_prefilled.png'), 1366, 880);

    console.log('📸 6. Capturing 04_delete_confirmation_modal.png (Delete Modal)...');
    await capture('http://localhost:5000/?delete=first', path.join(screenshotsDir, '04_delete_confirmation_modal.png'), 1366, 880);

    console.log('📸 7. Capturing 05_dashboard_mobile.png (Mobile View)...');
    await capture('http://localhost:5000/', path.join(screenshotsDir, '05_dashboard_mobile.png'), 390, 844);

    console.log('🎉 All high-resolution screenshots captured successfully in screenshots/ directory!');
  } finally {
    try {
      server.kill();
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('❌ Screenshot capture error:', err);
  process.exit(1);
});
