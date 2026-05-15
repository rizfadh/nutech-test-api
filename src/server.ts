import app from './app.js';
import { env } from './configurations/envConfig.js';

const PORT = env.APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
